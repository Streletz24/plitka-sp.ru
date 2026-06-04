# Cozy Yard Builder

## Локальный запуск

```bash
npm ci
npm run dev
```

## Деплой на GitHub Pages

В репозитории добавлен workflow `.github/workflows/deploy-gh-pages.yml`, который:

1. Запускается при пуше в ветку `main` и вручную через **Run workflow**.
2. Собирает проект (`npm ci` + `npm run build`) с флагом `GITHUB_PAGES=true`.
3. Публикует собранный `dist` в GitHub Pages через официальный `actions/deploy-pages`.

### Что нужно включить в GitHub

1. Откройте **Settings → Pages**.
2. В разделе **Build and deployment** выберите **Source: GitHub Actions**.
3. Убедитесь, что основная ветка проекта — `main`.

После следующего пуша в `main` сайт будет опубликован на GitHub Pages.
