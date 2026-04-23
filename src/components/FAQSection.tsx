import { useState } from "react";
import { AnimateOnScroll } from "./AnimateOnScroll";

const faqs = [
  {
    q: "Как выбрать плитку для двора?",
    a: "Мы поможем подобрать плитку исходя из назначения зоны, нагрузки, стиля дома и ваших предпочтений. Оставьте заявку — и мы проконсультируем бесплатно.",
  },
  {
    q: "Какая плитка подойдёт для въездной зоны?",
    a: "Для въезда рекомендуем усиленную плитку толщиной от 60 мм, которая выдерживает нагрузку от автомобиля. Подберём оптимальный вариант.",
  },
  {
    q: "Есть ли доставка?",
    a: "Да, мы доставляем плитку по всему региону. Также возможен самовывоз со склада. Стоимость доставки рассчитывается индивидуально.",
  },
  {
    q: "Какие сроки производства и доставки?",
    a: "Популярные позиции есть в наличии на складе. Под заказ — производство занимает 5-10 рабочих дней. Доставка — 1-3 дня после готовности.",
  },
  {
    q: "Как ухаживать за тротуарной плиткой?",
    a: "Плитка не требует сложного ухода. Достаточно периодически промывать водой. При необходимости можно использовать специальные средства для очистки.",
  },
];

const FAQSection = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Частые вопросы
            </h2>
          </div>
        </AnimateOnScroll>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <AnimateOnScroll key={i} delay={i * 80}>
              <div className="border border-border rounded-xl overflow-hidden bg-background">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full text-left p-6 flex justify-between items-center gap-4 hover:bg-muted/50 transition-colors duration-300"
                >
                  <span className="font-semibold text-foreground">{faq.q}</span>
                  <svg
                    className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {open === i && (
                  <div className="px-6 pb-6 text-muted-foreground leading-relaxed animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
