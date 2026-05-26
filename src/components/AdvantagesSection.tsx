import { AnimateOnScroll } from "./AnimateOnScroll";

const advantages: Array<{
  icon: string;
  title: string;
  desc: string;
}> = [
  {
    icon: "🏭",
    title: "Собственное производство",
    desc: "Контролируем качество на каждом этапе — от сырья до готовой продукции",
  },
  {
    icon: "💎",
    title: "Качественные материалы",
    desc: "Используем только проверенные компоненты для долговечного результата",
  },
  {
    icon: "✨",
    title: "Эстетичный внешний вид",
    desc: "Широкий выбор форм, цветов и текстур для любого архитектурного стиля",
  },
  {
    icon: "📐",
    title: "Подбор под участок",
    desc: "Поможем подобрать оптимальное решение именно для вашей территории",
  },
  {
    icon: "🤝",
    title: "Помощь с выбором",
    desc: "Консультируем, рассчитываем количество и предлагаем лучшие варианты",
  },
];

const AdvantagesSection = () => {
  return (
    <section id="advantages" className="py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Почему выбирают нас
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Мы не просто продаём плитку — мы помогаем создать красивое и долговечное пространство вокруг вашего дома
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {advantages.map((item, i) => (
            <AnimateOnScroll key={i} delay={i * 100}>
              <div className="w-full max-w-sm h-full bg-background rounded-xl p-8 hover:shadow-lg transition-all duration-500 hover:-translate-y-1 border border-border group flex flex-col">
                <div className="text-4xl mb-5 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                {item.extraBottomText?.length ? (
                  <div className="mt-4 pt-4 border-t border-border/70 space-y-2">
                    {item.extraBottomText.map((line) => (
                      <p key={line} className="text-muted-foreground leading-relaxed">
                        {line}
                      </p>
                    ))}
                  </div>
                ) : null}
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
