import { supabase } from "@/integrations/supabase/client";

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

export const sendSiteRequest = async (payload: SiteRequestPayload) => {
  if (payload.honeypot?.trim()) {
    throw new Error("spam_detected");
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
    throw new Error(error.message || "send_failed");
  }
};
