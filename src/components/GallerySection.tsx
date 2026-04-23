import { AnimateOnScroll } from "./AnimateOnScroll";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const images = [
  { src: gallery1, label: "Входная дорожка" },
  { src: gallery2, label: "Зона отдыха" },
  { src: gallery3, label: "Входная группа" },
  { src: gallery4, label: "Въездная зона" },
  { src: gallery5, label: "Площадка у дома" },
  { src: gallery6, label: "Декоративное мощение" },
];

const GallerySection = () => {
  return (
    <section id="gallery" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Галерея работ
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Реальные проекты — дворы, дорожки, площадки и въездные зоны наших клиентов
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <AnimateOnScroll key={i} delay={i * 100}>
              <div className="group rounded-xl overflow-hidden relative aspect-[4/3]">
                <img
                  src={img.src}
                  alt={img.label}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <span className="text-primary-foreground font-semibold text-lg">{img.label}</span>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
