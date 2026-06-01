import { getSupabaseClient, supabaseEnvStatus } from "@/integrations/supabase/client";

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

const logTechError = (code: string) => {
  console.warn(`[send_site_request] ${code}`);
};

export const sendSiteRequest = async (payload: SiteRequestPayload) => {
  if (payload.honeypot?.trim()) {
    logTechError("spam_detected");
    throw new Error("spam_detected");
  }

  if (!supabaseEnvStatus.configured) {
    logTechError("missing_env");
    throw new Error("missing_env");
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    logTechError("function_not_configured");
    throw new Error("function_not_configured");
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
    const lowerMessage = error.message?.toLowerCase() ?? "";
    if (lowerMessage.includes("cors")) {
      logTechError("cors_error");
      throw new Error("cors_error");
    }

    if (lowerMessage.includes("email") || lowerMessage.includes("resend")) {
      logTechError("email_provider_error");
      throw new Error("email_provider_error");
    }

    logTechError("function_invoke_failed");
    throw new Error("function_invoke_failed");
  }
};
