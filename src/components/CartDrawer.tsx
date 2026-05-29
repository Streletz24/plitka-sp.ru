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
import { downloadOrderDocx, printOrderBlank } from "@/lib/orderDocx";
import { sendSiteRequest } from "@/lib/sendSiteRequest";
import { Download, Printer, Trash2, ShoppingBag } from "lucide-react";

const DOCX_DOWNLOAD_VERSION = "DOCX_DOWNLOAD_ENABLED_V2";

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

  const handlePrintOrder = () => {
    if (items.length === 0) {
      toast({ title: "Корзина пуста", description: "Добавьте товары, чтобы распечатать заказ.", variant: "destructive" });
      return;
    }

    const opened = printOrderBlank(items, totalSum);
    if (!opened) {
      toast({
        title: "Не удалось открыть печать",
        description: "Разрешите всплывающие окна для сайта и попробуйте снова.",
        variant: "destructive",
      });
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
                onClick={() => removeItem(item.id)}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleDownloadBlank}
                disabled={downloadingBlank}
                data-docx-version={DOCX_DOWNLOAD_VERSION}
                data-download-format="docx"
                className="inline-flex items-center justify-center gap-2 w-full text-base bg-primary text-primary-foreground min-h-11 rounded-md font-semibold hover:opacity-90 transition-colors disabled:opacity-60"
              >
                <Download className="h-4 w-4" />
                {downloadingBlank ? "Готовим Word..." : "Скачать Word-бланк заказа"}
              </button>
              <button
                type="button"
                onClick={handlePrintOrder}
                className="inline-flex items-center justify-center gap-2 w-full text-base border border-border bg-background min-h-11 rounded-md font-medium hover:border-primary/50 hover:text-primary transition-colors"
              >
                <Printer className="h-4 w-4" />
                Распечатать заказ
              </button>
            </div>
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
