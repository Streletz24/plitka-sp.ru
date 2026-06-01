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
  lastAddedProductId: string | null;
  lastCatalogPath: string | null;
  lastCatalogScrollY: number | null;
  lastAddedProductAnchor: string | null;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "udachnaya-plitka-cart";
const LAST_ADDED_CONTEXT_KEY = "udachnaya-plitka-last-added-context";

interface LastAddedContext {
  lastAddedProductId: string | null;
  lastCatalogPath: string | null;
  lastCatalogScrollY: number | null;
  lastAddedProductAnchor: string | null;
}

const emptyLastAddedContext: LastAddedContext = {
  lastAddedProductId: null,
  lastCatalogPath: null,
  lastCatalogScrollY: null,
  lastAddedProductAnchor: null,
};

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
  const [lastAddedContext, setLastAddedContext] = useState<LastAddedContext>(() => {
    if (typeof window === "undefined") return emptyLastAddedContext;
    try {
      const raw = localStorage.getItem(LAST_ADDED_CONTEXT_KEY);
      return raw ? { ...emptyLastAddedContext, ...JSON.parse(raw) } : emptyLastAddedContext;
    } catch {
      return emptyLastAddedContext;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(LAST_ADDED_CONTEXT_KEY, JSON.stringify(lastAddedContext));
    } catch {}
  }, [lastAddedContext]);

  const addItem = useCallback((item: Omit<CartItem, "id">) => {
    const id = `${item.productId}-${item.colorName ?? "default"}-${Date.now()}`;
    setItems((prev) => [...prev, { ...item, id }]);
    if (typeof window !== "undefined") {
      const anchor = `product-card-${item.productId}`;
      setLastAddedContext({
        lastAddedProductId: item.productId,
        lastCatalogPath: `${window.location.pathname}${window.location.search}`,
        lastCatalogScrollY: window.scrollY,
        lastAddedProductAnchor: anchor,
      });
    }
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.id !== id);
      if (next.length === 0) {
        setIsOpen(false);
      }
      return next;
    });
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
        lastAddedProductId: lastAddedContext.lastAddedProductId,
        lastCatalogPath: lastAddedContext.lastCatalogPath,
        lastCatalogScrollY: lastAddedContext.lastCatalogScrollY,
        lastAddedProductAnchor: lastAddedContext.lastAddedProductAnchor,
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
