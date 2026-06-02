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

Сборка использует относительный Vite `base` (`./`), чтобы один и тот же artifact корректно открывался и на GitHub Pages URL проекта, и на custom domain `https://plitka-sp.ru/`. Не задавайте `GH_PAGES_BASE=/<repo>/` или `/`: при смене URL браузер может искать JS/CSS в неверной папке и показать пустой экран.
