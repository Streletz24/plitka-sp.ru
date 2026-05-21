import emotionalImg from "@/assets/emotional-block.jpg";
import { AnimateOnScroll } from "./AnimateOnScroll";
import { scrollToSection } from "@/lib/scrollToSection";

const EmotionalSection = () => {
  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToSection("contacts");
  };

  return (
    <section className="relative py-32 lg:py-40 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${emotionalImg})` }}
      >
        <div className="absolute inset-0 bg-foreground/60" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <AnimateOnScroll>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-8 leading-tight">
              Не просто плитка — а красивый, ухоженный двор вашей мечты
            </h2>
            <p className="text-lg md:text-xl text-primary-foreground/85 leading-relaxed mb-10">
              Мы помогаем создать уют, порядок и завершённый внешний вид вашего участка.
              Каждый проект — это продуманное решение для комфортной жизни в частном доме.
            </p>
            <a
              href="/#contacts"
              onClick={handleContactClick}
              className="inline-block bg-accent text-accent-foreground px-10 py-4 rounded-lg text-base font-bold hover:opacity-90 transition-all duration-300 hover:scale-105"
            >
              Обсудить проект
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default EmotionalSection;
