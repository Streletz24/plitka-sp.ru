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

Сборка использует относительный Vite `base` (`./`), чтобы JS/CSS/assets корректно открывались и на `https://plitka-sp.ru/`, и на `*.github.io/<repo>/`. Не задавайте `GH_PAGES_BASE=/<repo>/` для custom domain: браузер будет искать бандлы по несуществующему пути вида `/repo/assets/...`, что приводит к белому экрану.

Артефакт Pages также должен содержать `CNAME` со значением `plitka-sp.ru` и `.nojekyll`; workflow проверяет это после сборки. Если `https://plitka-sp.ru/` показывает старый сайт или белый экран, проверьте DNS домена и убедитесь, что GitHub Pages настроен на этот custom domain.
