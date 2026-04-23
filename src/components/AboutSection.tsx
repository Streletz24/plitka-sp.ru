import { AnimateOnScroll } from "./AnimateOnScroll";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <AnimateOnScroll>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                О компании «Удачная Плитка»
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Мы — производители тротуарной плитки с фокусом на частных клиентов.
                Наша цель — сделать территорию вокруг вашего дома красивой, аккуратной и долговечной.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Собственное производство позволяет нам контролировать качество на каждом этапе
                и предлагать конкурентные цены. Мы ориентированы на результат — благоустроенный
                участок, которым вы будете гордиться.
              </p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={200}>
            <div className="grid grid-cols-2 gap-6">
              {[
                { num: "10+", label: "лет опыта" },
                { num: "500+", label: "довольных клиентов" },
                { num: "50+", label: "видов плитки" },
                { num: "100%", label: "контроль качества" },
              ].map((stat, i) => (
                <div key={i} className="bg-background rounded-xl p-6 text-center border border-border">
                  <div className="text-3xl md:text-4xl font-extrabold text-accent mb-2">{stat.num}</div>
                  <div className="text-muted-foreground text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
