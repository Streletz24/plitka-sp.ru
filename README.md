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

На этапе разработки рабочий адрес проекта — `https://streletz24.github.io/plitka-sp.ru/`, поэтому Vite `base` по умолчанию и `GH_PAGES_BASE` в workflow равны `/plitka-sp.ru/`. Адрес `https://streletz24.github.io/` относится к отдельному user-site репозиторию `streletz24.github.io` и не используется для этого проекта. Custom domain `https://plitka-sp.ru/` временно не подключается: файл `public/CNAME` не должен попадать в artifact до отдельного переключения на домен и `base: "/"`.


После успешного деплоя проверяйте `https://streletz24.github.io/plitka-sp.ru/deploy-version.txt`: файл должен содержать SHA последнего коммита, `base=/plitka-sp.ru/` и `target_url=https://streletz24.github.io/plitka-sp.ru/`.
