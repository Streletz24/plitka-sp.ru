import { AnimateOnScroll } from "./AnimateOnScroll";

const steps = [
  { num: "01", title: "Заявка", desc: "Оставьте заявку на сайте или позвоните нам" },
  { num: "02", title: "Консультация", desc: "Обсудим задачу, особенности участка и пожелания" },
  { num: "03", title: "Подбор плитки", desc: "Подберём оптимальный вариант по стилю и бюджету" },
  { num: "04", title: "Расчёт", desc: "Точный расчёт количества и стоимости материалов" },
  { num: "05", title: "Доставка", desc: "Доставим на участок или организуем самовывоз" },
];

const StepsSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Как мы работаем
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Простой и понятный процесс от заявки до результата
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {steps.map((step, i) => (
            <AnimateOnScroll key={i} delay={i * 120}>
              <div className="text-center group">
                <div className="text-4xl font-extrabold text-accent mb-4 group-hover:scale-110 transition-transform duration-300">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
