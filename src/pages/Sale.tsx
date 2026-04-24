import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Flame, Percent, Clock, Phone } from "lucide-react";
import saleHero from "@/assets/sale-hero.jpg";
import saleProduct1 from "@/assets/sale-product-1.jpg";
import saleProduct2 from "@/assets/sale-product-2.jpg";
import saleProduct3 from "@/assets/sale-product-3.jpg";

const offers = [
  {
    image: saleProduct1,
    title: "Брусчатка «Классика» серая",
    oldPrice: "750 ₽/м²",
    newPrice: "590 ₽/м²",
    discount: "-20%",
    description: "Толщина 60 мм. Идеально для дворов и пешеходных зон.",
  },
  {
    image: saleProduct2,
    title: "Плитка «Старый город» цветная",
    oldPrice: "920 ₽/м²",
    newPrice: "690 ₽/м²",
    discount: "-25%",
    description: "Эффект состаренного камня. Уникальный дизайн вашего двора.",
  },
  {
    image: saleProduct3,
    title: "Бордюр садовый",
    oldPrice: "320 ₽/шт",
    newPrice: "220 ₽/шт",
    discount: "-30%",
    description: "Размер 500×200×40 мм. Аккуратное обрамление дорожек.",
  },
];

const Sale = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-44">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${saleHero})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sale/90 via-sale/70 to-sale-glow/60" />
          <div className="relative container mx-auto px-4 lg:px-8 py-20 lg:py-28 text-sale-foreground">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sale-foreground/90 hover:text-sale-foreground mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              На главную
            </Link>

            <div className="inline-flex items-center gap-2 bg-sale-foreground/15 backdrop-blur-sm border border-sale-foreground/30 px-4 py-2 rounded-full mb-6">
              <Flame className="w-4 h-4" />
              <span className="text-sm font-bold uppercase tracking-wider">
                Горячее предложение
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 leading-tight">
              РАСПРОДАЖА<br />
              <span className="text-sale-foreground/95">до -30%</span>
            </h1>
            <p className="text-lg lg:text-2xl max-w-2xl mb-8 text-sale-foreground/90">
              Успейте купить тротуарную плитку и бордюры по специальным ценам. Количество ограничено!
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="tel:+79161335056"
                className="inline-flex items-center gap-2 bg-sale-foreground text-sale px-7 py-4 rounded-lg text-base font-bold hover:scale-105 transition-transform shadow-2xl"
              >
                <Phone className="w-5 h-5" />
                Заказать со скидкой
              </a>
              <Link
                to="/prices"
                className="inline-flex items-center gap-2 bg-sale-foreground/10 backdrop-blur-sm border-2 border-sale-foreground text-sale-foreground px-7 py-4 rounded-lg text-base font-bold hover:bg-sale-foreground/20 transition-colors"
              >
                Смотреть все цены
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 mt-10 text-sm">
              <div className="flex items-center gap-2">
                <Percent className="w-5 h-5" />
                <span>Скидки до 30%</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>Только до конца месяца</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5" />
                <span>Хиты продаж</span>
              </div>
            </div>
          </div>
        </section>

        {/* Offers grid */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 text-center">
              Товары по акции
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Лучшие предложения месяца — качественная продукция нашего производства по сниженным ценам
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {offers.map((offer) => (
                <article
                  key={offer.title}
                  className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-border"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      loading="lazy"
                      width={800}
                      height={600}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-sale text-sale-foreground font-bold px-4 py-2 rounded-full text-sm shadow-lg">
                      {offer.discount}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {offer.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {offer.description}
                    </p>
                    <div className="flex items-baseline gap-3 mb-4">
                      <span className="text-2xl font-bold text-sale">
                        {offer.newPrice}
                      </span>
                      <span className="text-base text-muted-foreground line-through">
                        {offer.oldPrice}
                      </span>
                    </div>
                    <a
                      href="tel:+79161335056"
                      className="block w-full text-center bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                    >
                      Заказать
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-gradient-to-r from-sale to-sale-glow py-16">
          <div className="container mx-auto px-4 lg:px-8 text-center text-sale-foreground">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Не упустите выгоду!
            </h2>
            <p className="text-lg mb-8 max-w-xl mx-auto opacity-95">
              Позвоните прямо сейчас и получите персональную скидку на ваш заказ
            </p>
            <a
              href="tel:+79161335056"
              className="inline-flex items-center gap-2 bg-sale-foreground text-sale px-8 py-4 rounded-lg text-lg font-bold hover:scale-105 transition-transform shadow-xl"
            >
              <Phone className="w-5 h-5" />
              +7 (916) 133-50-56
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Sale;
