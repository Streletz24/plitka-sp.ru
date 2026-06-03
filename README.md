# Cozy Yard Builder

## Локальный запуск

```bash
npm ci
npm run dev
```

## Деплой на GitHub Pages

Рабочий адрес разработки: `https://streletz24.github.io/plitka-sp.ru/`.

В репозитории добавлен минимальный workflow `.github/workflows/deploy-gh-pages.yml`, который:

1. Запускается при пуше в ветку `main` и вручную через **Run workflow**.
2. Собирает проект (`npm ci` + `npm run build`) с `GH_PAGES_BASE=/plitka-sp.ru/`.
3. Копирует `dist/index.html` в `dist/404.html`, создаёт `dist/.nojekyll` и `dist/deploy-version.txt`.
4. Публикует собранный `dist` в GitHub Pages через официальный `actions/deploy-pages`.

### Что нужно включить в GitHub

1. Откройте **Settings → Pages**.
2. В разделе **Build and deployment** выберите **Source: GitHub Actions**.
3. Убедитесь, что основная ветка проекта — `main`.

Если в DevTools на `https://streletz24.github.io/plitka-sp.ru/` виден исходный `<script type="module" src="/src/main.tsx">`, значит GitHub Pages публикует ветку/папку, а не `dist` из workflow. Переключите **Source** на **GitHub Actions**.

После успешного деплоя проверьте `https://streletz24.github.io/plitka-sp.ru/deploy-version.txt`: файл должен содержать SHA последнего коммита, `base=/plitka-sp.ru/` и `target_url=https://streletz24.github.io/plitka-sp.ru/`.
