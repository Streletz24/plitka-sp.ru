import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";

export interface CartItem {
  id: string; // unique cart line id
  productId: string;
  productName: string;
  colorName: string | null;
  image: string;
  unit: string; // м² or м.п.
  area: number; // area or length entered
  pieces: number | null;
  unitPrice: string | null; // human readable price string
  total: number; // total руб
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  totalSum: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "udachnaya-plitka-cart";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = useCallback((item: Omit<CartItem, "id">) => {
    const id = `${item.productId}-${item.colorName ?? "default"}-${Date.now()}`;
    setItems((prev) => [...prev, { ...item, id }]);
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const totalSum = items.reduce((acc, i) => acc + (i.total || 0), 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        toggle: () => setIsOpen((v) => !v),
        addItem,
        removeItem,
        clear,
        totalSum,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
