import { useState, useMemo } from "react";
import { CatalogProduct } from "@/data/catalogData";
import { useCart } from "@/contexts/CartContext";
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

const parseLengthMeters = (desc: string) => {
  const m = desc.match(/(\d+[.,]?\d*)\s*[хx×]/i);
  if (!m) return null;
  const cm = parseFloat(m[1].replace(",", "."));
  return cm > 0 ? cm / 100 : null;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [area, setArea] = useState<string>("");
  const { addItem } = useCart();

  const hasColors = product.colors && product.colors.length > 0;
  const currentColor = hasColors ? product.colors![selectedIdx] : undefined;
  const currentImage = currentColor?.image ?? product.image;
  const currentDescription = currentColor?.description ?? product.description;
  const currentPrice = currentColor?.price ?? product.price;

  const isLinear = /бордюр|водосток/i.test(product.name);
  const unitLabel = isLinear ? "м.п." : "м²";

  const calc = useMemo(() => {
    const a = parseFloat(area.replace(",", "."));
    if (!a || a <= 0) return null;
    const p = parsePrice(currentPrice);
    if (!p) return null;
    if (isLinear) {
      const lengthM = parseLengthMeters(currentDescription);
      if (!lengthM) return null;
      const piecesPerM = 1 / lengthM;
      const totalPieces = Math.ceil(a * piecesPerM);
      const total = p.perPiece ? totalPieces * p.value : a * p.value;
      return { total: Math.round(total), pieces: totalPieces, area: a };
    }
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
  }, [area, currentPrice, currentDescription, isLinear]);

  const handleAddToCart = () => {
    if (!calc) return;
    addItem({
      productId: product.id,
      productName: product.name,
      colorName: currentColor?.name ?? null,
      image: currentImage,
      unit: unitLabel,
      area: calc.area,
      pieces: calc.pieces,
      unitPrice: currentPrice ?? null,
      total: calc.total,
    });
    setArea("");
    toast({
      title: "Добавлено в корзину",
      description: `${product.name}${currentColor ? " · " + currentColor.name : ""}`,
    });
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
        <div className="text-muted-foreground text-sm leading-relaxed space-y-1">
          <p className="break-words">
            {currentPrice && (
              <span className="font-semibold text-foreground mr-1">Цена: {currentPrice}.</span>
            )}
            {currentDescription.split(/\.\s*(.+)/s)[0]}
            {currentDescription.includes(".") ? "." : ""}
          </p>
          {currentDescription.split(/\.\s*(.+)/s)[1] && (
            <p className="break-words">
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
                placeholder={isLinear ? "Длина" : "Площадь"}
                className="flex-1 min-w-0 px-3 py-2.5 min-h-11 rounded-md border border-border bg-background text-base text-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <span className="text-sm text-muted-foreground shrink-0">{unitLabel}</span>
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
                  onClick={handleAddToCart}
                  className="w-full mt-2 bg-primary text-primary-foreground min-h-11 py-2.5 rounded-md text-sm font-semibold hover:opacity-90 transition-all duration-300"
                >
                  Добавить в корзину
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
