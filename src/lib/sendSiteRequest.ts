import { supabase, supabaseConfigError } from "@/integrations/supabase/client";

export interface RequestBase {
  name: string;
  phone: string;
  email?: string;
  comment?: string;
  pageUrl?: string;
  source?: string;
  honeypot?: string;
}

export interface OrderItem {
  product: string;
  color?: string | null;
  area?: number | null;
  unit?: string | null;
  pieces?: number | null;
  price?: string | null;
  total?: number | null;
}

export interface CartOrderRequest extends RequestBase {
  type: "cart_order";
  deliveryAddress?: string;
  total: number;
  items: OrderItem[];
}

export interface ContactRequest extends RequestBase {
  type: "contact_request";
}

export type SiteRequestPayload = CartOrderRequest | ContactRequest;

export type SiteRequestErrorCode =
  | "missing_env"
  | "function_not_configured"
  | "function_invoke_failed"
  | "email_provider_error"
  | "cors_error"
  | "unknown_error"
  | "spam_detected";

export class SiteRequestError extends Error {
  constructor(public readonly code: SiteRequestErrorCode, message?: string) {
    super(message ?? code);
    this.name = "SiteRequestError";
  }
}

const normalizeErrorCode = (errorMessage: string): SiteRequestErrorCode => {
  const normalized = errorMessage.toLowerCase();
  if (normalized.includes("email sending is not configured")) return "function_not_configured";
  if (normalized.includes("email_provider_error")) return "email_provider_error";
  if (normalized.includes("cors") || normalized.includes("failed to fetch")) return "cors_error";
  if (normalized.includes("function") && normalized.includes("not found")) return "function_not_configured";
  return "function_invoke_failed";
};

const debugLog = (code: SiteRequestErrorCode) => {
  console.error(`[sendSiteRequest] code=${code}`);
};

export const sendSiteRequest = async (payload: SiteRequestPayload) => {
  if (payload.honeypot?.trim()) {
    throw new SiteRequestError("spam_detected");
  }

  if (supabaseConfigError || !supabase) {
    debugLog("missing_env");
    throw new SiteRequestError("missing_env", "Supabase client is not configured");
  }

  const { error } = await supabase.functions.invoke("send-order-request", {
    body: {
      ...payload,
      source: payload.source ?? "сайт",
      pageUrl: payload.pageUrl ?? (typeof window !== "undefined" ? window.location.href : undefined),
      sentAt: new Date().toISOString(),
    },
  });

  if (error) {
    const code = normalizeErrorCode(error.message || "");
    debugLog(code);
    throw new SiteRequestError(code, error.message || "send_failed");
  }
};
