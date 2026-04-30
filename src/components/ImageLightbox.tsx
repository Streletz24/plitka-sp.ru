import { useEffect, useState, useCallback } from "react";

const ImageLightbox = () => {
  const [src, setSrc] = useState<string | null>(null);
  const [alt, setAlt] = useState<string>("");
  const [closing, setClosing] = useState(false);

  const close = useCallback(() => {
    setClosing(true);
    window.setTimeout(() => {
      setSrc(null);
      setClosing(false);
    }, 250);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target || target.tagName !== "IMG") return;
      const img = target as HTMLImageElement;
      if (img.dataset.noZoom !== undefined) return;
      // skip header logo
      if (img.closest("header")) return;
      // skip images inside links/buttons
      if (img.closest("a, button")) return;
      e.preventDefault();
      setSrc(img.currentSrc || img.src);
      setAlt(img.alt || "");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!src) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [src, close]);

  if (!src) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={close}
      onDoubleClick={close}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-foreground/90 backdrop-blur-sm cursor-zoom-out p-4 transition-opacity duration-300 ${
        closing ? "opacity-0" : "opacity-100 animate-fade-in"
      }`}
    >
      <button
        type="button"
        onClick={close}
        aria-label="Закрыть"
        className="absolute top-4 right-4 w-11 h-11 rounded-full bg-background/20 hover:bg-background/30 text-primary-foreground flex items-center justify-center text-2xl transition-colors"
      >
        ×
      </button>
      <img
        src={src}
        alt={alt}
        data-no-zoom
        onClick={close}
        onDoubleClick={close}
        className={`max-w-[95vw] max-h-[95vh] object-contain rounded-lg shadow-2xl transition-transform duration-300 cursor-zoom-out ${
          closing ? "scale-95" : "scale-100 animate-scale-in"
        }`}
      />
    </div>
  );
};

export default ImageLightbox;
