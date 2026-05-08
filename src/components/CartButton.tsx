import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const CartButton = ({ className = "" }: { className?: string }) => {
  const { items, open } = useCart();
  const count = items.length;
  return (
    <button
      type="button"
      onClick={open}
      aria-label="Корзина"
      className={`relative inline-flex items-center justify-center h-10 w-10 rounded-md border border-border bg-card text-foreground hover:text-primary hover:border-primary/50 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 ${className}`}
    >
      <ShoppingCart className="w-4 h-4" />
      {count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
};

export default CartButton;
