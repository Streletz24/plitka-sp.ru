import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h4 className="text-primary-foreground font-bold mb-4">Меню</h4>
            <div className="space-y-2">
              {["Каталог", "О компании", "Галерея", "Отзывы", "Контакты"].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="block text-primary-foreground/60 text-sm hover:text-primary-foreground transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-primary-foreground font-bold mb-4">Контакты</h4>
            <div className="space-y-2 text-primary-foreground/60 text-sm">
              <p>+7 (916) 133-50-56</p>
              <p>petrov321@yandex.ru</p>
              <p>Московская обл., г. Сергиев Посад, ул. Фестивальная, д.6А</p>
            </div>
          </div>

          <div>
            <h4 className="text-primary-foreground font-bold mb-4">Мы на карте</h4>
            <a
              href="https://yandex.ru/maps/?pt=38.1649728,56.2939722&z=17&l=map"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
            >
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=38.1649728%2C56.2939722&z=16&pt=38.1649728%2C56.2939722%2Cpm2rdm"
                width="100%"
                height="180"
                style={{ border: 0, pointerEvents: "none" }}
                allowFullScreen
                loading="lazy"
                title="Удачная Плитка на карте"
              />
            </a>
          </div>

          <div>
            <h4 className="text-primary-foreground font-bold mb-4">Часы работы</h4>
            <div className="space-y-2 text-primary-foreground/60 text-sm">
              <p>Пн–Пт: 8:00–17:00 (обед 12:00–13:00)</p>
              <p>Сб: 9:00–12:00</p>
              <p>Вс: выходной</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col items-center gap-4">
          <Link
            to="/prices"
            className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105"
          >
            Наши цены
          </Link>
          <span className="text-primary-foreground/40 text-sm">
            © 2025 Удачная Плитка. Все права защищены.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
