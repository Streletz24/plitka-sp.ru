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

const Index = () => {
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
