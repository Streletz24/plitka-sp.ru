const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface OrderItem {
  product: string;
  color?: string | null;
  area?: number | null;
  unit?: string | null;
  pieces?: number | null;
  total?: number | null;
  price?: string | null;
}

interface RequestPayload {
  type: "contact_request" | "cart_order";
  name: string;
  phone: string;
  email?: string;
  comment?: string;
  deliveryAddress?: string;
  items?: OrderItem[];
  total?: number;
  source?: string;
  pageUrl?: string;
  sentAt?: string;
  honeypot?: string;
}

const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const jsonResponse = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

const toText = (payload: RequestPayload) => {
  const base = [`Имя: ${payload.name}`, `Телефон: ${payload.phone}`, `Email: ${payload.email || "—"}`, `Источник: ${payload.source || "сайт"}`, `Страница: ${payload.pageUrl || "—"}`, `Дата: ${payload.sentAt || new Date().toISOString()}`];
  if (payload.type === "contact_request") {
    return ["Новая заявка с сайта Удачная Плитка", ...base, `Комментарий: ${payload.comment || "—"}`].join("\n");
  }
  const rows = (payload.items || []).map((i, idx) => `${idx + 1}) ${i.product}; цвет: ${i.color || "—"}; кол-во: ${i.pieces || "—"}; цена: ${i.price || "—"}; сумма: ${i.total || 0}`).join("\n");
  return ["Новый заказ с сайта Удачная Плитка", ...base, `Адрес доставки: ${payload.deliveryAddress || "—"}`, `Комментарий: ${payload.comment || "—"}`, "Товары:", rows, `Итого: ${(payload.total || 0).toLocaleString("ru-RU")} руб`].join("\n");
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return jsonResponse(405, { error: "method_not_allowed" });

  let payload: RequestPayload;
  try {
    payload = (await req.json()) as RequestPayload;
  } catch {
    return jsonResponse(400, { error: "invalid_json" });
  }

  if (payload.honeypot?.trim()) {
    return jsonResponse(200, { success: true, skipped: "honeypot" });
  }

  if (!payload?.name?.trim() || !payload?.phone?.trim()) {
    return jsonResponse(400, { error: "invalid_payload" });
  }
  if (payload.type !== "contact_request" && payload.type !== "cart_order") {
    return jsonResponse(400, { error: "invalid_type" });
  }
  if (payload.type === "cart_order" && (!Array.isArray(payload.items) || payload.items.length === 0)) {
    return jsonResponse(400, { error: "empty_items" });
  }

  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  const FROM_EMAIL = Deno.env.get("FROM_EMAIL");
  const COMPANY_CONTACT_EMAIL = Deno.env.get("COMPANY_CONTACT_EMAIL");

  if (!RESEND_API_KEY || !FROM_EMAIL || !COMPANY_CONTACT_EMAIL) {
    return jsonResponse(500, { error: "Email sending is not configured", code: "function_not_configured" });
  }

  const subject = payload.type === "cart_order" ? "Новый заказ с сайта Удачная Плитка" : "Новая заявка с сайта Удачная Плитка";
  const html = payload.type === "cart_order"
    ? `<h2>${subject}</h2><p><b>Имя:</b> ${escape(payload.name)}</p><p><b>Телефон:</b> ${escape(payload.phone)}</p><p><b>Email:</b> ${escape(payload.email || "—")}</p><p><b>Адрес:</b> ${escape(payload.deliveryAddress || "—")}</p><p><b>Комментарий:</b> ${escape(payload.comment || "—")}</p><p><b>Источник:</b> ${escape(payload.source || "сайт")}</p><p><b>Страница:</b> ${escape(payload.pageUrl || "—")}</p><table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;"><tr><th>#</th><th>Товар</th><th>Цвет</th><th>Количество</th><th>Ед.</th><th>Цена</th><th>Сумма</th></tr>${(payload.items || []).map((i, idx) => `<tr><td>${idx + 1}</td><td>${escape(i.product)}</td><td>${escape(i.color || "—")}</td><td>${i.pieces || "—"}</td><td>${escape(i.unit || "шт")}</td><td>${escape(i.price || "—")}</td><td>${(i.total || 0).toLocaleString("ru-RU")} руб</td></tr>`).join("")}</table><p><b>Итого:</b> ${(payload.total || 0).toLocaleString("ru-RU")} руб</p><p><b>Дата:</b> ${escape(payload.sentAt || new Date().toISOString())}</p>`
    : `<h2>${subject}</h2><p><b>Имя:</b> ${escape(payload.name)}</p><p><b>Телефон:</b> ${escape(payload.phone)}</p><p><b>Email:</b> ${escape(payload.email || "—")}</p><p><b>Комментарий:</b> ${escape(payload.comment || "—")}</p><p><b>Источник:</b> ${escape(payload.source || "сайт")}</p><p><b>Страница:</b> ${escape(payload.pageUrl || "—")}</p><p><b>Дата:</b> ${escape(payload.sentAt || new Date().toISOString())}</p>`;

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [COMPANY_CONTACT_EMAIL],
      reply_to: payload.email,
      subject,
      html,
      text: toText(payload),
    }),
  });

  if (!resendResponse.ok) {
    return jsonResponse(502, { error: "email_provider_error", provider: "resend" });
  }

  return jsonResponse(200, { success: true });
});
