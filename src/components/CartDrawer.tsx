import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import { downloadOrderDocx } from "@/lib/orderDocx";
import { sendSiteRequest } from "@/lib/sendSiteRequest";
import { ArrowLeft, Download, Trash2, ShoppingBag } from "lucide-react";

const DOCX_DOWNLOAD_VERSION = "DOCX_DOWNLOAD_ENABLED_V4";

const CartDrawer = () => {
  const {
    items,
    isOpen,
    close,
    removeItem,
    clear,
    totalSum,
    lastAddedProductId,
    lastCatalogPath,
    lastCatalogScrollY,
    lastAddedProductAnchor,
  } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [downloadingBlank, setDownloadingBlank] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const goToCatalog = () => {
    close();
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: "catalog" } });
      return;
    }

    const target = document.getElementById("catalog");
    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    }
  };

  const handleRemoveItem = (id: string) => {
    const removingLastItem = items.length === 1;
    removeItem(id);

    if (removingLastItem) {
      goToCatalog();
    }
  };

  const handleClearCart = () => {
    clear();
    goToCatalog();
  };

  const buildOrderHtml = (dateText: string, logoSrc: string) => `<!doctype html><html><head><meta charset="utf-8" /><style>
    @page{size:A4 portrait;margin:12mm}
    body{font-family:Arial,sans-serif;color:#143a3a;padding:0;margin:0;background:#fff}
    .doc{max-width:780px;margin:0 auto}
    .head-top{font-size:11px;color:#3d4b4b;margin-bottom:6px}
    .head{display:flex;gap:12px;align-items:flex-start;border-bottom:3px solid #1f4a48;padding:8px 0 10px;margin-bottom:10px}
    .head img{height:3cm;width:auto;object-fit:contain;display:block}
    .firm{font-size:34px;font-weight:700;line-height:1;letter-spacing:.2px}
    .meta{font-size:12px;color:#2f3f3f;line-height:1.35}
    .title{font-size:34px;font-weight:700;margin:10px 0 8px}
    table{border-collapse:collapse;width:100%;margin-top:6px}
    th,td{border:1px solid #9fb0b0;padding:8px;font-size:12px;vertical-align:top}
    th{background:#eef3f3;font-weight:700;text-align:center}
    .num{width:42px;text-align:center}
    .sum{margin-top:14px;font-size:30px;font-weight:700}
    .photo{width:54px;height:54px;object-fit:cover;border:1px solid #c7d2d2;flex:0 0 auto}
    .product-cell{display:flex;justify-content:space-between;gap:10px;align-items:flex-start}
    .product-title{display:inline-block;max-width:220px;word-break:break-word}
  </style></head><body>
    <div class="doc">
      <div class="head-top">${dateText}</div>
      <div class="head">
        <img src="${logoSrc}" alt="logo"/>
        <div>
          <div class="firm">УДАЧНАЯ ПЛИТКА</div>
          <div class="meta">Адрес: Московская обл., г. Сергиев Посад, ул. Фестивальная, д.6А</div>
          <div class="meta">Тел.: +7 (916) 133-50-56</div>
          <div class="meta">E-mail: plitka-sp.ru@yandex.ru</div>
          <div class="meta">Дата заказа: ${dateText}</div>
        </div>
      </div>
      <div class="title">Бланк заказа</div>
      <table>
        <thead>
          <tr><th class="num">№</th><th>Товар</th><th>Цвет</th><th>Количество</th><th>Ед.</th><th>Сумма</th></tr>
        </thead>
        <tbody>${items.map((i,idx)=>`<tr><td class="num">${idx+1}</td><td><div class="product-cell"><span class="product-title">${i.productName}</span><img class="photo" src="${i.image}" alt="${i.productName}" /></div></td><td>${i.colorName ?? "—"}</td><td>${i.area}${i.pieces!==null?` · ${i.pieces} шт`:''}</td><td>${i.unit}</td><td>${i.total.toLocaleString('ru-RU')} руб</td></tr>`).join('')}</tbody>
      </table>
      <div class="sum">Итого: ${totalSum.toLocaleString('ru-RU')} руб</div>
    </div>
  </body></html>`;

  const getLogoDataUrl = async () => {
    const blob = await fetch(logo).then((r) => r.blob());
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(String(reader.result ?? ""));
      reader.onerror = () => reject(new Error("logo read failed"));
      reader.readAsDataURL(blob);
    });
  };

  const handleDownloadOrder = async () => {
    if (items.length === 0) {
      toast({ title: "Корзина пуста", description: "Добавьте товары, чтобы скачать бланк заказа." });
      return;
    }

    const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
      import("https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/+esm"),
      import("https://cdn.jsdelivr.net/npm/jspdf@2.5.1/+esm"),
    ]);

    const date = new Date();
    const dateText = date.toLocaleString("ru-RU");
    const logoSrc = await getLogoDataUrl();
    const html = buildOrderHtml(dateText, logoSrc);

    const wrapper = document.createElement("div");
    wrapper.style.position = "fixed";
    wrapper.style.left = "-99999px";
    wrapper.style.top = "0";
    wrapper.style.width = "794px";
    wrapper.style.padding = "40px";
    wrapper.style.background = "#fff";
    wrapper.style.zIndex = "-1";
    wrapper.innerHTML = html;
    document.body.appendChild(wrapper);

    try {
      const canvas = await html2canvas(wrapper, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });

      const pdf = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });
      const pageWidthMm = 210;
      const pageHeightMm = 297;
      const marginMm = 10;
      const printableWidthMm = pageWidthMm - marginMm * 2;
      const printableHeightMm = pageHeightMm - marginMm * 2;
      const pageHeightPx = Math.floor((canvas.width * printableHeightMm) / printableWidthMm);

      let renderedPx = 0;
      let pageIndex = 0;

      while (renderedPx < canvas.height) {
        const sliceHeight = Math.min(pageHeightPx, canvas.height - renderedPx);
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = canvas.width;
        pageCanvas.height = sliceHeight;

        const ctx = pageCanvas.getContext("2d");
        if (!ctx) break;

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
        ctx.drawImage(
          canvas,
          0,
          renderedPx,
          canvas.width,
          sliceHeight,
          0,
          0,
          canvas.width,
          sliceHeight
        );

        const imgData = pageCanvas.toDataURL("image/jpeg", 0.96);
        const renderedHeightMm = (sliceHeight * printableWidthMm) / canvas.width;

        if (pageIndex > 0) pdf.addPage();
        pdf.addImage(imgData, "JPEG", marginMm, marginMm, printableWidthMm, renderedHeightMm);

        renderedPx += sliceHeight;
        pageIndex += 1;
      }

      const pad = (n: number) => String(n).padStart(2, "0");
      const fileName = `blank-zakaza-${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}-${pad(date.getHours())}-${pad(date.getMinutes())}.pdf`;
      pdf.save(fileName);
    } finally {
      wrapper.remove();
    }
  };

  const handlePrintOrder = async () => {
    if (items.length === 0) return;
    const w = window.open("", "_blank", "width=900,height=800");
    if (!w) return;
    w.document.write("<html><body style='font-family:Arial;padding:20px'>Подготовка бланка заказа...</body></html>");
    const dateText = new Date().toLocaleString("ru-RU");
    const logoSrc = await getLogoDataUrl();
    const html = buildOrderHtml(dateText, logoSrc);
    w.document.open();
    w.document.write(html);
    w.document.close();
    w.focus();
    w.print();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      toast({ title: "Корзина пуста", description: "Добавьте товары перед отправкой заявки.", variant: "destructive" });
      return;
    }

    const digits = phone.replace(/\D/g, "");
    if (!name.trim()) {
      toast({ title: "Ошибка", description: "Укажите имя.", variant: "destructive" });
      return;
    }
    if (digits.length < 10) {
      toast({ title: "Ошибка", description: "Введите корректный телефон.", variant: "destructive" });
      return;
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast({ title: "Ошибка", description: "Проверьте email.", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      await sendSiteRequest({
        type: "cart_order",
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        honeypot,
        total: totalSum,
        items: items.map((i) => ({
          product: i.productName,
          color: i.colorName,
          area: i.area,
          unit: i.unit,
          pieces: i.pieces,
          price: i.unitPrice,
          total: i.total,
        })),
      });
      setName("");
      setPhone("");
      setEmail("");
      setHoneypot("");
      close();
      toast({
        title: "Спасибо! Заявка отправлена.",
        description: "Мы свяжемся с вами в ближайшее время.",
      });
    } catch {
      toast({
        title: "Ошибка отправки",
        description: "Не удалось отправить заявку. Попробуйте позже или свяжитесь с нами по телефону.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDownloadBlank = async () => {
    if (items.length === 0) {
      toast({
        title: "Корзина пуста",
        description: "Добавьте товары, чтобы скачать бланк заказа.",
        variant: "destructive",
      });
      return;
    }

    setDownloadingBlank(true);
    try {
      await downloadOrderDocx(items, totalSum);
    } catch {
      toast({
        title: "Не удалось скачать бланк",
        description: "Попробуйте ещё раз или распечатайте заказ.",
        variant: "destructive",
      });
    } finally {
      setDownloadingBlank(false);
    }
  };

  const handleContinueShopping = () => {
    close();
    const targetPath = lastCatalogPath || "/";
    const anchor = lastAddedProductAnchor || (lastAddedProductId ? `product-card-${lastAddedProductId}` : null);

    if (`${location.pathname}${location.search}` !== targetPath) {
      navigate(targetPath, {
        state: {
          restoreCatalogPosition: true,
          lastAddedProductId,
          lastAddedProductAnchor: anchor,
          lastCatalogScrollY,
        },
      });
      return;
    }

    const catalogFallback = document.getElementById("catalog");
    const target = anchor ? document.getElementById(anchor) : null;
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (typeof lastCatalogScrollY === "number") {
      window.scrollTo({ top: Math.max(0, lastCatalogScrollY), behavior: "smooth" });
      return;
    }
    if (catalogFallback) {
      catalogFallback.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    navigate("/");
  };

  return (
    <Sheet open={isOpen} onOpenChange={(o) => (o ? null : close())}>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-[100dvh] pb-[env(safe-area-inset-bottom)]">
        <SheetHeader>
          <div className="sm:hidden mb-2">
            <button
              type="button"
              onClick={goToCatalog}
              className="inline-flex w-full items-center justify-start gap-2 h-11 px-3 rounded-md border border-primary/30 bg-primary/10 text-primary hover:bg-primary/15 active:scale-[0.99] transition-all shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Продолжить покупки</span>
            </button>
          </div>
          <SheetTitle>Корзина</SheetTitle>
          <SheetDescription>
            {items.length > 0
              ? "Проверьте позиции и оформите заявку — мы свяжемся с вами."
              : "Корзина пуста. Добавьте позиции из калькулятора расхода."}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto -mx-6 px-6 py-4 space-y-3 overscroll-contain">
          {items.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-40" />
              <p className="text-sm">Здесь появятся выбранные позиции</p>
            </div>
          )}
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-3 p-3 rounded-lg border border-border bg-card"
            >
              <img
                src={item.image}
                alt={item.productName}
                className="w-16 h-16 rounded-md object-cover bg-muted shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">
                  {item.productName}
                </p>
                {item.colorName && (
                  <p className="text-xs text-muted-foreground">{item.colorName}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  {item.area} {item.unit}
                  {item.pieces !== null ? ` · ${item.pieces} шт` : ""}
                </p>
                <p className="text-sm font-bold text-primary mt-1">
                  {item.total.toLocaleString("ru-RU")} руб
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveItem(item.id)}
                aria-label="Удалить"
                className="text-muted-foreground hover:text-destructive transition-colors p-1 h-fit"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border pt-4 space-y-3">
            <button
              type="button"
              onClick={handleContinueShopping}
              className="w-full text-base border border-border bg-background min-h-11 rounded-md font-medium hover:border-primary/50 hover:text-primary transition-colors"
            >
              Вернуться к покупкам
            </button>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Итого:</span>
              <span className="text-lg font-bold text-primary">
                {totalSum.toLocaleString("ru-RU")} руб
              </span>
            </div>
            <button
              type="button"
              onClick={handleDownloadBlank}
              disabled={downloadingBlank}
              data-docx-version={DOCX_DOWNLOAD_VERSION}
              data-download-format="docx"
              data-action="download-order-docx"
              className="inline-flex items-center justify-center gap-2 w-full text-base bg-primary text-primary-foreground min-h-11 rounded-md font-semibold hover:opacity-90 transition-colors disabled:opacity-60"
            >
              <Download className="h-4 w-4" />
              {downloadingBlank ? "Готовим Word..." : "Скачать Word-бланк заказа (.docx)"}
            </button>
            <form onSubmit={handleSubmit} className="space-y-2">
              <input type="text" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <input
                type="text"
                placeholder="Ваше имя"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 min-h-11 rounded-md border border-border bg-background text-base text-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <input
                type="tel"
                placeholder="Телефон"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 min-h-11 rounded-md border border-border bg-background text-base text-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <input
                type="email"
                placeholder="Электронная почта"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 min-h-11 rounded-md border border-border bg-background text-base text-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary text-primary-foreground min-h-12 rounded-md font-semibold text-base hover:opacity-90 transition-all duration-300 disabled:opacity-60"
              >
                {submitting ? "Отправляем..." : "Отправить заявку"}
              </button>
              <button
                type="button"
                onClick={clear}
                className="w-full text-sm text-muted-foreground hover:text-foreground min-h-11"
              >
                Очистить корзину
              </button>
            </form>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
