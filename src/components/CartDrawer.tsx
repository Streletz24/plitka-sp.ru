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
import logo from "@/assets/logo.png";
import { ArrowLeft, Download, Printer, Trash2, ShoppingBag } from "lucide-react";

const CartDrawer = () => {
  const { items, isOpen, close, removeItem, clear, totalSum } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

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

  const buildOrderHtml = (dateText: string, logoSrc: string) => `<!doctype html><html><head><meta charset="utf-8" /><style>body{font-family:Arial,sans-serif;color:#1f3a33;padding:20px}.head{display:flex;gap:14px;align-items:center;border-bottom:2px solid #1f3a33;padding-bottom:10px;margin-bottom:14px}.head img{width:120px}.firm{font-size:22px;font-weight:700}.meta{font-size:12px;color:#5b6b66}table{border-collapse:collapse;width:100%;margin-top:10px}th,td{border:1px solid #c8d0cd;padding:8px;font-size:12px;text-align:left}th{background:#dce9e4}.sum{margin-top:12px;font-size:16px;font-weight:700}</style></head><body><div class="head"><img src="${logoSrc}" alt="logo"/><div><div class="firm">УДАЧНАЯ ПЛИТКА</div><div class="meta">+7 (916) 133-50-56 · streletz24.github.io/plitka-sp.ru</div><div class="meta">Дата: ${dateText}</div></div></div><h2>Бланк заказа</h2><table><thead><tr><th>Товар</th><th>Цвет</th><th>Кол-во</th><th>Ед.</th><th>Цена</th></tr></thead><tbody>${items.map((i)=>`<tr><td>${i.productName}</td><td>${i.colorName ?? '—'}</td><td>${i.area}${i.pieces!==null?` · ${i.pieces} шт`:''}</td><td>${i.unit}</td><td>${i.total.toLocaleString('ru-RU')} руб</td></tr>`).join('')}</tbody></table><div class="sum">Итого: ${totalSum.toLocaleString('ru-RU')} руб</div></body></html>`;

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
    if (items.length === 0) return;
    const dateText = new Date().toLocaleString("ru-RU");
    const logoSrc = await getLogoDataUrl();
    const html = buildOrderHtml(dateText, logoSrc);
    const blob = new Blob(["\uFEFF", html], { type: "application/msword;charset=utf-8" });
    const fileName = `Заказ-Удачная-Плитка-${new Date().toISOString().slice(0,10)}.doc`;
    const nav = window.navigator as Navigator & { msSaveOrOpenBlob?: (blob: Blob, defaultName?: string) => boolean };
    if (typeof nav.msSaveOrOpenBlob === "function") { nav.msSaveOrOpenBlob(blob, fileName); return; }
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = fileName; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 3000);
  };

  const handlePrintOrder = async () => {
    if (items.length === 0) return;
    const dateText = new Date().toLocaleString("ru-RU");
    const logoSrc = await getLogoDataUrl();
    const html = buildOrderHtml(dateText, logoSrc);
    const w = window.open("", "_blank", "noopener,noreferrer,width=900,height=800");
    if (!w) return;
    w.document.open();
    w.document.write(html);
    w.document.close();
    w.focus();
    w.print();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setSubmitting(true);
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      const { error } = await supabase.functions.invoke("send-order-request", {
        body: {
          name,
          phone,
          email,
          items: items.map((i) => ({
            product: i.productName,
            color: i.colorName,
            area: i.area,
            unit: i.unit,
            pieces: i.pieces,
            price: i.unitPrice,
            total: i.total,
          })),
          total: totalSum,
        },
      });
      if (error) throw error;
      clear();
      setName("");
      setPhone("");
      setEmail("");
      close();
      toast({
        title: "Заявка отправлена!",
        description: "Мы свяжемся с вами в ближайшее время.",
      });
    } catch (err) {
      toast({
        title: "Ошибка отправки",
        description: "Попробуйте позже или позвоните нам.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={(o) => (o ? null : close())}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <div className="sm:hidden mb-2">
            <button
              type="button"
              onClick={goToCatalog}
              className="inline-flex items-center gap-2 h-11 px-3 rounded-md border border-border bg-background text-foreground hover:text-primary hover:border-primary/50 active:scale-[0.99] transition-all"
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

        <div className="flex-1 overflow-y-auto -mx-6 px-6 py-4 space-y-3">
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
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Итого:</span>
              <span className="text-lg font-bold text-primary">
                {totalSum.toLocaleString("ru-RU")} руб
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button type="button" onClick={() => void handleDownloadOrder()} className="inline-flex items-center justify-center gap-2 h-10 rounded-md bg-accent text-accent-foreground text-sm font-semibold">
                <Download className="w-4 h-4" /> Скачать заказ
              </button>
              <button type="button" onClick={() => void handlePrintOrder()} className="inline-flex items-center justify-center gap-2 h-10 rounded-md bg-primary text-primary-foreground text-sm font-semibold">
                <Printer className="w-4 h-4" /> Распечатать заказ
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-2">
              <input
                type="text"
                placeholder="Ваше имя"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <input
                type="tel"
                placeholder="Телефон"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <input
                type="email"
                placeholder="Электронная почта"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary text-primary-foreground py-3 rounded-md font-semibold hover:opacity-90 transition-all duration-300 disabled:opacity-60"
              >
                {submitting ? "Отправка..." : "Отправить заявку"}
              </button>
              <button
                type="button"
                onClick={handleClearCart}
                className="w-full text-xs text-muted-foreground hover:text-foreground py-1"
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
