import { AnimateOnScroll } from "./AnimateOnScroll";

const reviews = [
  {
    name: "Алексей К.",
    text: "Заказывали плитку для двора у загородного дома. Качество отличное — уже третий год лежит как новая. Подобрали красивый цвет, всё смотрится очень аккуратно.",
    location: "Московская область",
  },
  {
    name: "Марина С.",
    text: "Очень довольны результатом! Дорожки по саду получились красивые и практичные. Помогли с расчётом, доставили вовремя. Рекомендую!",
    location: "Тульская область",
  },
  {
    name: "Дмитрий В.",
    text: "Делали въездную зону — плитка выдерживает нагрузку от машины без проблем. Выглядит солидно, соседи уже спрашивают где заказывали.",
    location: "Калужская область",
  },
];

const ReviewsSection = () => {
  return (
    <section id="reviews" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Отзывы клиентов
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Что говорят владельцы домов и участков о нашей плитке
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <AnimateOnScroll key={i} delay={i * 150}>
              <div className="bg-card rounded-xl p-8 border border-border hover:shadow-lg transition-all duration-500">
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-foreground/80 leading-relaxed mb-6 italic">«{r.text}»</p>
                <div>
                  <div className="font-bold text-foreground">{r.name}</div>
                  <div className="text-muted-foreground text-sm">{r.location}</div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
