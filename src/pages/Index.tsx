import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AdvantagesSection from "@/components/AdvantagesSection";
import CatalogSection from "@/components/CatalogSection";
import EmotionalSection from "@/components/EmotionalSection";
import AboutSection from "@/components/AboutSection";
import GallerySection from "@/components/GallerySection";
import StepsSection from "@/components/StepsSection";
import ReviewsSection from "@/components/ReviewsSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { normalizeSectionId, scrollToSection } from "@/lib/scrollToSection";

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.location.hash) {
      return;
    }

    const sectionId = normalizeSectionId(window.location.hash);
    const basePath = window.location.pathname || "/";
    window.history.replaceState(null, "", `${basePath}#${sectionId}`);

    const timeoutId = window.setTimeout(() => {
      scrollToSection(sectionId, "auto");
    }, 80);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const state = location.state as
      | {
          restoreCatalogPosition?: boolean;
          lastAddedProductAnchor?: string | null;
          lastAddedProductId?: string | null;
          lastCatalogScrollY?: number | null;
        }
      | null;

    if (!state?.restoreCatalogPosition) return;

    const anchorId =
      state.lastAddedProductAnchor || (state.lastAddedProductId ? `product-card-${state.lastAddedProductId}` : null);

    const scrollToSavedPosition = () => {
      if (typeof state.lastCatalogScrollY === "number") {
        window.scrollTo({ top: Math.max(0, state.lastCatalogScrollY), behavior: "smooth" });
        return true;
      }
      return false;
    };

    const tryRestore = () => {
      const headerOffset = 150;
      if (anchorId) {
        const el = document.getElementById(anchorId);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;
          window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
          return;
        }
      }
      if (scrollToSavedPosition()) return;
      const catalogSection = document.getElementById("catalog");
      if (catalogSection) {
        catalogSection.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const raf = window.requestAnimationFrame(() => {
      window.setTimeout(tryRestore, 90);
    });

    navigate(location.pathname + location.search + location.hash, { replace: true, state: null });

    return () => window.cancelAnimationFrame(raf);
  }, [location, navigate]);

  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <AdvantagesSection />
      <CatalogSection />
      <EmotionalSection />
      <AboutSection />
      <GallerySection />
      <StepsSection />
      <ReviewsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
