import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { catalogCategories } from "@/data/catalogData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";

const CatalogDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  const category = catalogCategories.find((c) => c.slug === slug);

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center pt-28">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Категория не найдена</h1>
            <Link to="/" className="text-primary hover:underline">
              Вернуться на главную
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero banner */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-20">
        <div className="absolute inset-0 z-0">
          <img
            src={category.img}
            alt={category.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <AnimateOnScroll>
            <Link
              to="/#catalog"
              className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Назад в каталог
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
              {category.title}
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl">
              {category.fullDescription}
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Products grid */}
      <section className="py-16 lg:py-24 bg-background flex-1">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimateOnScroll>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10">
              Наша продукция
            </h2>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.products.map((product, i) => (
              <AnimateOnScroll key={product.id} delay={i * 150}>
                <div className="rounded-xl overflow-hidden bg-card border border-border hover:shadow-xl transition-all duration-500 group">
                  <div className="overflow-hidden aspect-[4/3]">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* CTA */}
          <AnimateOnScroll>
            <div className="mt-16 text-center bg-card border border-border rounded-2xl p-8 lg:p-12">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                Нужна консультация?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                Поможем подобрать плитку под ваш проект и рассчитаем стоимость
              </p>
              <a
                href="tel:+79161335056"
                className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105"
              >
                Позвонить: +7 (916) 133-50-56
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CatalogDetail;
