# Cozy Yard Builder

## Локальный запуск

```bash
npm ci
npm run dev
```

## Деплой на GitHub Pages

В репозитории добавлен workflow `.github/workflows/deploy-gh-pages.yml`, который:

1. Запускается при пуше в ветку `main` и вручную через **Run workflow**.
2. Собирает проект (`npm install` + `npm run build`) с флагом `GITHUB_PAGES=true`.
3. Публикует собранный `dist` в GitHub Pages через официальный `actions/deploy-pages`.

### Что нужно включить в GitHub

1. Откройте **Settings → Pages**.
2. В разделе **Build and deployment** выберите **Source: GitHub Actions**.
3. Убедитесь, что основная ветка проекта — `main`.

После следующего пуша в `main` сайт будет опубликован на GitHub Pages.

### Важно для custom domain

Сайт открывается из корня GitHub Pages/custom domain (`https://streletz24.github.io/` и `https://plitka-sp.ru/`), поэтому workflow собирает Vite с `GH_PAGES_BASE=/`. Если собрать artifact с `/<repo>/`, браузер будет искать JS/CSS по неверному пути и вместо React-приложения останется пустой/статический экран.
