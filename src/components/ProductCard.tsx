import { useState, useMemo } from "react";
import { CatalogProduct } from "@/data/catalogData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: CatalogProduct;
}

const parsePrice = (price?: string) => {
  if (!price) return null;
  const num = parseFloat(price.replace(/\s/g, "").replace(",", "."));
  if (isNaN(num)) return null;
  const perPiece = /шт/i.test(price) && !/м2|м²/i.test(price);
  return { value: num, perPiece };
};

const parsePiecesPerM2 = (desc: string) => {
  const m = desc.match(/(\d+[.,]?\d*)\s*шт\s*\/\s*м2/i);
  return m ? parseFloat(m[1].replace(",", ".")) : null;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [area, setArea] = useState<string>("");
  const [orderOpen, setOrderOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const hasColors = product.colors && product.colors.length > 0;
  const currentColor = hasColors ? product.colors![selectedIdx] : undefined;
  const currentImage = currentColor?.image ?? product.image;
  const currentDescription = currentColor?.description ?? product.description;
  const currentPrice = currentColor?.price ?? product.price;

  const calc = useMemo(() => {
    const a = parseFloat(area.replace(",", "."));
    if (!a || a <= 0) return null;
    const p = parsePrice(currentPrice);
    if (!p) return null;
    const piecesPerM2 = parsePiecesPerM2(currentDescription);
    const totalPieces = piecesPerM2 ? Math.ceil(a * piecesPerM2) : null;
    let total: number;
    if (p.perPiece) {
      if (!piecesPerM2) return null;
      total = a * piecesPerM2 * p.value;
    } else {
      total = a * p.value;
    }
    return { total: Math.round(total), pieces: totalPieces, area: a };
  }, [area, currentPrice, currentDescription]);

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setOrderOpen(false);
      setName("");
      setPhone("");
      toast({
        title: "Заявка отправлена!",
        description: "Мы свяжемся с вами в ближайшее время.",
      });
    }, 600);
  };

  return (
    <div className="rounded-xl overflow-hidden bg-card border border-border hover:shadow-xl transition-all duration-500 group flex flex-col">
      <div className="overflow-hidden aspect-[4/3] bg-muted flex items-center justify-center">
        <img
          src={currentImage}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-foreground mb-2">{product.name}</h3>
        <div className="text-muted-foreground text-sm leading-relaxed">
          <p className="whitespace-nowrap overflow-hidden text-ellipsis">
            {currentPrice && (
              <span className="font-semibold text-foreground mr-1">Цена: {currentPrice}.</span>
            )}
            {currentDescription.split(/\.\s*(.+)/s)[0]}
            {currentDescription.includes(".") ? "." : ""}
          </p>
          {currentDescription.split(/\.\s*(.+)/s)[1] && (
            <p className="whitespace-nowrap overflow-hidden text-ellipsis">
              {currentDescription.split(/\.\s*(.+)/s)[1]}
            </p>
          )}
        </div>

        {hasColors && (
          <div className="mt-5 pt-5 border-t border-border">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Выберите цвет
            </p>
            <div className="flex flex-wrap gap-1.5">
              {product.colors!.map((color, idx) => {
                const isActive = idx === selectedIdx;
                return (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setSelectedIdx(idx)}
                    aria-label={color.name}
                    aria-pressed={isActive}
                    title={color.name}
                    className={`flex-1 min-w-0 flex items-center justify-center gap-1 px-1 py-1 rounded-md border transition-all duration-300 ${
                      isActive
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-border/50 shadow-inner shrink-0"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-[11px] font-medium text-foreground truncate">{color.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {currentPrice && (
          <div className="mt-5 pt-5 border-t border-border">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Калькулятор расхода
            </p>
            <div className="flex items-center gap-2">
              <input
                type="number"
                inputMode="decimal"
                min="0"
                step="0.1"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="Площадь"
                className="flex-1 min-w-0 px-3 py-2 rounded-md border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <span className="text-sm text-muted-foreground shrink-0">м²</span>
            </div>
            {calc && (
              <div className="mt-3 p-3 rounded-md bg-primary/5 border border-primary/20 space-y-2">
                {calc.pieces !== null && (
                  <p className="text-sm text-foreground">
                    Потребуется: <span className="font-semibold">{calc.pieces} шт</span>
                  </p>
                )}
                <p className="text-sm text-foreground">
                  Стоимость:{" "}
                  <span className="font-bold text-primary">
                    {calc.total.toLocaleString("ru-RU")} руб
                  </span>
                </p>
                <button
                  type="button"
                  onClick={() => setOrderOpen(true)}
                  className="w-full mt-2 bg-primary text-primary-foreground py-2 rounded-md text-sm font-semibold hover:opacity-90 transition-all duration-300"
                >
                  Оформить заявку
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <Dialog open={orderOpen} onOpenChange={setOrderOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Заявка на расчёт</DialogTitle>
            <DialogDescription>
              Оставьте контакты — мы свяжемся с вами и подтвердим заказ.
            </DialogDescription>
          </DialogHeader>

          {calc && (
            <div className="rounded-md bg-muted p-4 text-sm space-y-1">
              <p>
                <span className="text-muted-foreground">Товар:</span>{" "}
                <span className="font-semibold text-foreground">{product.name}</span>
              </p>
              {currentColor && (
                <p>
                  <span className="text-muted-foreground">Цвет:</span>{" "}
                  <span className="font-semibold text-foreground">{currentColor.name}</span>
                </p>
              )}
              <p>
                <span className="text-muted-foreground">Площадь:</span>{" "}
                <span className="font-semibold text-foreground">{calc.area} м²</span>
              </p>
              {calc.pieces !== null && (
                <p>
                  <span className="text-muted-foreground">Количество:</span>{" "}
                  <span className="font-semibold text-foreground">{calc.pieces} шт</span>
                </p>
              )}
              <p>
                <span className="text-muted-foreground">Стоимость:</span>{" "}
                <span className="font-bold text-primary">
                  {calc.total.toLocaleString("ru-RU")} руб
                </span>
              </p>
            </div>
          )}

          <form onSubmit={handleOrderSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Ваше имя"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-md border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
            />
            <input
              type="tel"
              placeholder="Телефон"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-md border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
            />
            <DialogFooter>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary text-primary-foreground py-3 rounded-md font-semibold hover:opacity-90 transition-all duration-300 disabled:opacity-60"
              >
                {submitting ? "Отправка..." : "Отправить заявку"}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductCard;
