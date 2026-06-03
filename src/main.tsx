import { createRoot } from "react-dom/client";
import "./index.css";

const rootElement = document.getElementById("root");

const renderBootError = (message = "Произошла ошибка загрузки сайта. Обновите страницу или свяжитесь с нами по телефону.") => {
  if (!rootElement) return;

  rootElement.innerHTML = `
    <main style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;background:#f6f1ea;color:#1f3b34;font-family:Arial,sans-serif;">
      <section style="max-width:560px;width:100%;border:1px solid #d9cfc3;border-radius:18px;background:#fff;padding:28px;text-align:center;box-shadow:0 18px 45px rgba(31,59,52,.12);">
        <p style="margin:0 0 10px;color:#a1562d;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">Удачная плитка</p>
        <h1 style="margin:0 0 14px;font-size:28px;line-height:1.15;">${message}</h1>
        <p style="margin:0 0 22px;color:#4b5a55;font-size:16px;line-height:1.5;">Телефон для связи: <strong>+7 (916) 133-50-56</strong></p>
        <button type="button" onclick="window.location.reload()" style="border:0;border-radius:10px;background:#1f3b34;color:#fff;font-weight:700;padding:12px 18px;cursor:pointer;">Обновить страницу</button>
      </section>
    </main>
  `;
};

if (!rootElement) {
  console.error('React root element "#root" was not found.');
} else {
  const root = createRoot(rootElement);

  import("./App.tsx")
    .then(({ default: App }) => {
      root.render(<App />);
    })
    .catch((error) => {
      console.error("Failed to load React application bundle:", error);
      renderBootError();
    });
}
