import heroImg from "@/assets/hero-house.jpg";
import { scrollToSection } from "@/lib/scrollToSection";

const HeroSection = () => {
  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-2xl animate-fade-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-6">
            Тротуарная плитка для красивого
            <span className="text-secondary"> и благоустроенного двора</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 leading-relaxed max-w-lg">
            Решения для частных домов, коттеджей и участков. Собственное производство, качественные материалы, помощь с выбором.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/#catalog"
              onClick={(e) => handleSectionClick(e, "catalog")}
              className="bg-accent text-accent-foreground px-8 py-4 rounded-lg text-base font-bold hover:opacity-90 transition-all duration-300 hover:scale-105 text-center"
            >
              Смотреть каталог
            </a>
            <a
              href="/#contacts"
              onClick={(e) => handleSectionClick(e, "contacts")}
              className="border-2 border-primary-foreground/40 text-primary-foreground px-8 py-4 rounded-lg text-base font-bold hover:bg-primary-foreground/10 transition-all duration-300 hover:scale-105 text-center"
            >
              Получить консультацию
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
