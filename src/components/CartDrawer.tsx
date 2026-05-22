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
import { Trash2, ShoppingBag } from "lucide-react";

const CartDrawer = () => {
  const { items, isOpen, close, removeItem, clear, totalSum } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);


  const handleRemoveItem = (id: string) => {
    const removingLastItem = items.length === 1;
    removeItem(id);

    if (removingLastItem) {
      close();
      if (location.pathname !== "/") {
        navigate("/", { state: { scrollTo: "catalog" } });
      } else {
        const target = document.getElementById("catalog");
        if (target) {
          const y = target.getBoundingClientRect().top + window.scrollY - 120;
          window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
        }
      }
    }
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
                onClick={clear}
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
