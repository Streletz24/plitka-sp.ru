import { Link } from "react-router-dom";
import { AnimateOnScroll } from "./AnimateOnScroll";
import { catalogCategories } from "@/data/catalogData";

const CatalogSection = () => {
  return (
    <section id="catalog" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Каталог продукции
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Подберём идеальное решение для каждой зоны вашего участка
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-2 gap-8">
          {catalogCategories.map((cat, i) => (
            <AnimateOnScroll key={cat.slug} delay={i * 150}>
              <div className="group rounded-xl overflow-hidden bg-card border border-border hover:shadow-xl transition-all duration-500">
                <div className="overflow-hidden aspect-[4/3]">
                  <img
                    src={cat.img}
                    alt={cat.title}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 lg:p-8">
                  <h3 className="text-xl font-bold text-foreground mb-2">{cat.title}</h3>
                  <p className="text-muted-foreground mb-5">{cat.desc}</p>
                  <Link
                    to={`/catalog/${cat.slug}`}
                    className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg text-sm font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105"
                  >
                    Подробнее
                  </Link>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CatalogSection;
