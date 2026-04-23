import { AnimateOnScroll } from "./AnimateOnScroll";
import { useState } from "react";

const CTASection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-primary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <AnimateOnScroll>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
                Подберём плитку для вашего участка
              </h2>
              <p className="text-primary-foreground/80 text-lg leading-relaxed mb-8">
                Оставьте заявку — мы свяжемся с вами, обсудим задачу и предложим лучшее решение
                для благоустройства вашей территории.
              </p>
              <div className="space-y-4">
                <a href="tel:+79001234567" className="flex items-center gap-3 text-primary-foreground font-semibold text-lg hover:opacity-80 transition-opacity">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  +7 (900) 123-45-67
                </a>
                <a href="mailto:info@udachnaya-plitka.ru" className="flex items-center gap-3 text-primary-foreground/80 hover:opacity-80 transition-opacity">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  info@udachnaya-plitka.ru
                </a>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={200}>
            {submitted ? (
              <div className="bg-primary-foreground/10 backdrop-blur rounded-xl p-10 text-center">
                <div className="text-5xl mb-4">✓</div>
                <h3 className="text-xl font-bold text-primary-foreground mb-2">Заявка отправлена!</h3>
                <p className="text-primary-foreground/80">Мы свяжемся с вами в ближайшее время</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-primary-foreground/10 backdrop-blur rounded-xl p-8 lg:p-10 space-y-5">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  required
                  className="w-full px-5 py-4 rounded-lg bg-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 border-0 outline-none focus:ring-2 focus:ring-accent transition-all"
                />
                <input
                  type="tel"
                  placeholder="Телефон"
                  required
                  className="w-full px-5 py-4 rounded-lg bg-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 border-0 outline-none focus:ring-2 focus:ring-accent transition-all"
                />
                <textarea
                  placeholder="Расскажите о вашем проекте"
                  rows={3}
                  className="w-full px-5 py-4 rounded-lg bg-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 border-0 outline-none focus:ring-2 focus:ring-accent transition-all resize-none"
                />
                <button
                  type="submit"
                  className="w-full bg-accent text-accent-foreground py-4 rounded-lg font-bold text-base hover:opacity-90 transition-all duration-300 hover:scale-[1.02]"
                >
                  Получить консультацию
                </button>
              </form>
            )}
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
