# Cozy Yard Builder

## Локальный запуск

```bash
npm ci
npm run dev
```

## Деплой на GitHub Pages

В репозитории добавлен workflow `.github/workflows/deploy-gh-pages.yml`, который:

1. Запускается при пуше в ветки репозитория и вручную через **Run workflow**.
2. Собирает проект (`npm install` + `npm run build`) с флагом `GITHUB_PAGES=true`.
3. Публикует собранный `dist` в GitHub Pages через официальный `actions/deploy-pages`.

### Что нужно включить в GitHub

1. Откройте **Settings → Pages**.
2. В разделе **Build and deployment** выберите **Source: GitHub Actions**.
3. Убедитесь, что нужная ветка с исправлениями запушена в репозиторий.

После следующего пуша workflow соберёт и опубликует сайт на GitHub Pages.

### Важно для GitHub Pages

Сайт публикуется из корня GitHub Pages/custom domain, поэтому сборка использует Vite `base` `/` и загружает JS/CSS из `/assets/...`. Не используйте `/<repo>/` как `GH_PAGES_BASE` для этого сайта: браузер будет искать бандлы в неверной папке и покажет пустой экран.
