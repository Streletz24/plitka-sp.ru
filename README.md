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

### Важно для GitHub Pages

Workflow собирает проект с относительным Vite `base` (`./`), чтобы один и тот же artifact корректно работал и на project site (`https://streletz24.github.io/plitka-sp.ru/`), и на пользовательском домене `https://plitka-sp.ru/`. Важно: адрес `https://streletz24.github.io/` относится к user-site репозиторию `streletz24.github.io`; этот репозиторий `plitka-sp.ru` не может обновить корневую страницу `streletz24.github.io` без перенастройки GitHub Pages или переноса сборки в user-site репозиторий.
