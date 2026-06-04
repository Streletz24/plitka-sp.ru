import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const RECIPIENT = "plitka-sp.ru@yandex.ru";

interface OrderItem {
  product: string;
  color: string | null;
  area: number | null;
  unit?: string | null;
  pieces: number | null;
  total: number | null;
  price: string | null;
}

interface OrderPayload {
  name: string;
  phone: string;
  email: string;
  // Multi-item (cart) payload
  items?: OrderItem[];
  total?: number;
  // Legacy single-item payload (kept for compatibility)
  product?: string;
  color?: string | null;
  area?: number | null;
  pieces?: number | null;
  price?: string | null;
}

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const renderItem = (it: OrderItem, idx: number) => {
  const unit = it.unit ?? "м²";
  return `
    <div style="border:1px solid #eee;border-radius:8px;padding:12px;margin-bottom:10px;">
      <p style="margin:0 0 6px;"><strong>${idx + 1}. ${escape(it.product)}</strong></p>
      ${it.color ? `<p style="margin:2px 0;">Цвет: ${escape(it.color)}</p>` : ""}
      ${it.area ? `<p style="margin:2px 0;">Объём: ${it.area} ${unit}</p>` : ""}
      ${it.pieces ? `<p style="margin:2px 0;">Количество: ${it.pieces} шт</p>` : ""}
      ${it.price ? `<p style="margin:2px 0;">Цена: ${escape(it.price)}</p>` : ""}
      ${it.total ? `<p style="margin:2px 0;"><strong>Сумма: ${it.total.toLocaleString("ru-RU")} руб</strong></p>` : ""}
    </div>
  `;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload: OrderPayload = await req.json();

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const items: OrderItem[] = payload.items && payload.items.length > 0
      ? payload.items
      : [
          {
            product: payload.product ?? "—",
            color: payload.color ?? null,
            area: payload.area ?? null,
            unit: "м²",
            pieces: payload.pieces ?? null,
            total: payload.total ?? null,
            price: payload.price ?? null,
          },
        ];

    const grandTotal =
      payload.total ?? items.reduce((acc, i) => acc + (i.total ?? 0), 0);

    const subject =
      items.length > 1
        ? `Новая заявка из корзины (${items.length} поз.)`
        : `Новая заявка: ${items[0].product}`;

    const html = `
      <h2>Новая заявка с сайта</h2>
      ${items.map(renderItem).join("")}
      <p style="font-size:16px;"><strong>Итого: ${grandTotal.toLocaleString("ru-RU")} руб</strong></p>
      <hr>
      <h3>Контакты клиента</h3>
      <p><strong>Имя:</strong> ${escape(payload.name)}</p>
      <p><strong>Телефон:</strong> <a href="tel:${escape(payload.phone)}">${escape(payload.phone)}</a></p>
      <p><strong>Email:</strong> <a href="mailto:${escape(payload.email)}">${escape(payload.email)}</a></p>
    `;

    const { error } = await supabase.functions.invoke("send-transactional-email", {
      body: {
        to: [RECIPIENT],
        reply_to: payload.email,
        subject,
        html,
        purpose: "transactional",
        idempotency_key: `order-${Date.now()}-${payload.phone}`,
      },
    });

    if (error) {
      console.error("Email send error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
