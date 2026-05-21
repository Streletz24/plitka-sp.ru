import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const HEADER_OFFSET = 120;

const ScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      return;
    }

    const id = location.hash.replace("#", "");

    const scrollToSection = () => {
      const el = document.getElementById(id);
      if (!el) {
        return;
      }

      const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    };

    requestAnimationFrame(scrollToSection);
  }, [location.pathname, location.hash]);

  return null;
};

export default ScrollToHash;
