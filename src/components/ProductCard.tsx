import { useState } from "react";
import { CatalogProduct } from "@/data/catalogData";

interface ProductCardProps {
  product: CatalogProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const hasColors = product.colors && product.colors.length > 0;
  const currentColor = hasColors ? product.colors![selectedIdx] : undefined;
  const currentImage = currentColor?.image ?? product.image;
  const currentDescription = currentColor?.description ?? product.description;
  const currentPrice = currentColor?.price ?? product.price;

  return (
    <div className="rounded-xl overflow-hidden bg-card border border-border hover:shadow-xl transition-all duration-500 group flex flex-col">
      <div className="overflow-hidden aspect-[4/3]">
        <img
          src={currentImage}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
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
            <div className="grid grid-cols-3 gap-2">
              {product.colors!.map((color, idx) => {
                const isActive = idx === selectedIdx;
                return (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setSelectedIdx(idx)}
                    aria-label={color.name}
                    aria-pressed={isActive}
                    className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg border-2 transition-all duration-300 w-full ${
                      isActive
                        ? "border-primary bg-primary/5 scale-105"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full border border-border/50 shadow-inner shrink-0"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-sm font-medium text-foreground truncate">{color.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
