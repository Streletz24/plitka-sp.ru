import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const RECIPIENT = "plitka-sp.ru@yandex.ru";

interface OrderPayload {
  name: string;
  phone: string;
  email: string;
  product: string;
  color: string | null;
  area: number | null;
  pieces: number | null;
  total: number | null;
  price: string | null;
}

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

    const subject = `Новая заявка: ${payload.product}`;
    const html = `
      <h2>Новая заявка на расчёт</h2>
      <p><strong>Товар:</strong> ${payload.product}</p>
      ${payload.color ? `<p><strong>Цвет:</strong> ${payload.color}</p>` : ""}
      ${payload.area ? `<p><strong>Площадь:</strong> ${payload.area} м²</p>` : ""}
      ${payload.pieces ? `<p><strong>Количество:</strong> ${payload.pieces} шт</p>` : ""}
      ${payload.price ? `<p><strong>Цена за единицу:</strong> ${payload.price}</p>` : ""}
      ${payload.total ? `<p><strong>Итоговая стоимость:</strong> ${payload.total.toLocaleString("ru-RU")} руб</p>` : ""}
      <hr>
      <h3>Контакты клиента</h3>
      <p><strong>Имя:</strong> ${payload.name}</p>
      <p><strong>Телефон:</strong> <a href="tel:${payload.phone}">${payload.phone}</a></p>
      <p><strong>Email:</strong> <a href="mailto:${payload.email}">${payload.email}</a></p>
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
