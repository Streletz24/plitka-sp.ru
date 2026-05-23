# Настройка отправки заявок с сайта

## 1) Какие Supabase Functions нужно задеплоить
Обязательно задеплойте:
- `send-order-request`

Команда:
- `supabase functions deploy send-order-request`

> Отдельная функция `send-transactional-email` в текущей версии **не требуется**: отправка выполняется внутри `send-order-request` через Resend.

## 2) Какие secrets добавить в Supabase
Нужны следующие secrets (без публикации значений):
- `COMPANY_CONTACT_EMAIL` — почта получателя заявок.
- `RESEND_API_KEY` — API ключ Resend.
- `FROM_EMAIL` — подтверждённый отправитель в Resend (например `no-reply@your-domain.com`).

Команды:
- `supabase secrets set COMPANY_CONTACT_EMAIL=...`
- `supabase secrets set RESEND_API_KEY=...`
- `supabase secrets set FROM_EMAIL=...`
- Проверка списка ключей: `supabase secrets list`

## 3) Где смотреть логи в Supabase Dashboard
- Supabase Dashboard → ваш проект → **Edge Functions** → `send-order-request` → **Logs**.
- Ищите коды: `email_provider_error`, `internal_error`, `invalid_request_type`, `empty_cart_items`.

## 4) Какие переменные нужны для GitHub Pages
В frontend (GitHub Actions / Pages build env) задайте:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Допустимо legacy-имя ключа:
- `VITE_SUPABASE_PUBLISHABLE_KEY` (используется как fallback)

## 5) Как проверить тестовую заявку (контактная форма)
1. Откройте сайт и отправьте заявку из блока контактов.
2. В DevTools → Network проверьте запрос к `send-order-request`.
3. Ожидается `200` и JSON `{ "success": true }`.
4. Проверьте почту `COMPANY_CONTACT_EMAIL`.

## 6) Как проверить заказ из корзины
1. Добавьте товар(ы) в корзину.
2. Заполните имя и телефон.
3. Отправьте заказ.
4. Проверьте, что в письме есть список товаров и итоговая сумма.

## 7) Что означает ошибка CORS
Обычно это значит, что браузер заблокировал кросс-доменный запрос (preflight/headers/origin). Проверьте:
- что функция отвечает на `OPTIONS`;
- что в ответе есть `Access-Control-Allow-*` заголовки;
- что вызывается именно deployed функция Supabase.

## 8) Что означает 401/403
- Неверный/просроченный anon key;
- Некорректный URL проекта Supabase;
- Ограничения доступа к функции.

Проверьте `VITE_SUPABASE_URL` и `VITE_SUPABASE_ANON_KEY` в GitHub Pages окружении.

## 9) Что означает 500
Серверная ошибка внутри функции. Частые причины:
- не заданы secrets;
- ошибка провайдера email;
- некорректный payload.

Смотрите логи функции `send-order-request` в Supabase Dashboard.

## 10) Что делать, если функция вызывается, но письмо не приходит
1. Убедитесь, что ответ функции не содержит `email_provider_error`.
2. Проверьте, что `FROM_EMAIL` подтверждён в Resend.
3. Проверьте папки Spam/Promotions.
4. Сверьте `COMPANY_CONTACT_EMAIL` с email в контактах сайта.
5. Проверьте логи Edge Function и статус ответа API Resend.
