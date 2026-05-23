# Настройка отправки заявок и заказов (Supabase + GitHub Pages)

## 1) Какие функции нужно задеплоить

Обязательно:
- `send-order-request`

Отдельная функция `send-transactional-email` **не требуется** в текущей реализации: отправка идёт напрямую в Resend из `send-order-request`.

Команда деплоя:
```bash
supabase functions deploy send-order-request
```

## 2) Какие secrets добавить в Supabase

Для функции `send-order-request` нужны secrets:
- `RESEND_API_KEY`
- `FROM_EMAIL`
- `COMPANY_CONTACT_EMAIL`

Пример:
```bash
supabase secrets set RESEND_API_KEY=... FROM_EMAIL=... COMPANY_CONTACT_EMAIL=...
```

> Важно: `FROM_EMAIL` должен быть подтверждён в Resend (домен/адрес верифицирован), иначе поставщик может отклонять отправку.

## 3) Где смотреть логи в Supabase Dashboard

- Supabase Dashboard → **Edge Functions** → `send-order-request` → **Logs**.
- Смотрите HTTP status, `error` и `code` в JSON-ответах функции.

## 4) Какие переменные нужны для GitHub Pages (frontend)

Нужны переменные сборки Vite:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Дополнительно поддерживается fallback `VITE_SUPABASE_PUBLISHABLE_KEY`, но рекомендуется использовать `VITE_SUPABASE_ANON_KEY`.

## 5) Как проверить тестовую заявку (форма контактов)

1. Откройте форму «Оставьте заявку».
2. Заполните имя/телефон.
3. Отправьте форму.
4. Проверьте:
   - в браузере: нет ошибки, есть подтверждение отправки;
   - в Supabase logs: вызов `send-order-request` со статусом `200`;
   - в почте компании: пришло письмо.

## 6) Как проверить заказ из корзины

1. Добавьте товар в корзину.
2. Оформите заказ (имя/телефон, при желании email).
3. Убедитесь, что список товаров не пустой.
4. Проверьте статус функции и входящее письмо.

## 7) Что означает ошибка CORS

Обычно это блокировка браузером запроса к Edge Function (preflight/headers/origin). Проверьте:
- что `OPTIONS` отвечает успешно;
- что есть `Access-Control-Allow-Origin` и `Access-Control-Allow-Headers`;
- что запрос реально уходит на URL Supabase function.

## 8) Что означает ошибка 401/403

- Неверный/отсутствующий `VITE_SUPABASE_ANON_KEY`.
- Неверный URL проекта.
- Ограничения доступа/политики в Supabase.

## 9) Что означает ошибка 500

Как правило, серверная проблема в Edge Function:
- не заданы secrets (`RESEND_API_KEY` / `FROM_EMAIL` / `COMPANY_CONTACT_EMAIL`),
- ошибка почтового провайдера,
- некорректный payload.

## 10) Что делать, если функция вызывается, но письмо не приходит

1. Проверьте `send-order-request` logs.
2. Если `502` и `email_provider_error` — проблема на стороне провайдера (Resend), проверьте ключ/лимиты/верификацию отправителя.
3. Проверьте `FROM_EMAIL` (верифицирован ли домен/адрес).
4. Проверьте `COMPANY_CONTACT_EMAIL` (корректность адреса получателя).
5. Проверьте спам/промо-папки у получателя.
