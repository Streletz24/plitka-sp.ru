import { createRoot } from "react-dom/client";
import "./index.css";

const renderBootstrapError = (message = "Попробуйте обновить страницу или очистить кэш браузера.") => {
  const root = document.getElementById("root");
  if (!root) return;

  root.innerHTML = `
    <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;background:#faf8f4;color:#1f2d2a;font-family:Arial,sans-serif;">
      <div style="max-width:560px;width:100%;border:1px solid #d9d2c7;border-radius:16px;background:#fff;padding:28px;text-align:center;box-shadow:0 12px 32px rgba(31,45,42,.08);">
        <h1 style="margin:0 0 12px;font-size:28px;line-height:1.2;color:#1f3a33;">Сайт загружается некорректно</h1>
        <p style="margin:0 0 20px;font-size:16px;line-height:1.5;color:#5b6662;">${message}</p>
        <button type="button" onclick="window.location.reload()" style="min-height:44px;border:0;border-radius:10px;background:#1f3a33;color:#fff;padding:0 20px;font-weight:700;cursor:pointer;">Обновить страницу</button>
      </div>
    </div>
  `;
};

const rootElement = document.getElementById("root");

if (!rootElement) {
  renderBootstrapError("Не найден корневой элемент приложения.");
} else {
  import("./App.tsx")
    .then(({ default: App }) => {
      createRoot(rootElement).render(<App />);
    })
    .catch((error) => {
      console.error("App bootstrap error:", error);
      renderBootstrapError();
    });
}
