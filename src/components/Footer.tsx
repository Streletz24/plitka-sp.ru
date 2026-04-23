import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-foreground py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <img src={logo} alt="Удачная Плитка" className="h-20 w-auto brightness-0 invert mb-4" />
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              Уют • Порядок • Надёжность
            </p>
          </div>

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
              <p>г. Москва, ул. Примерная, 1</p>
            </div>
          </div>

          <div>
            <h4 className="text-primary-foreground font-bold mb-4">Мессенджер</h4>
            <div className="space-y-2 text-primary-foreground/60 text-sm">
              <a href="#" className="block hover:text-primary-foreground transition-colors">Max</a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-primary-foreground/40 text-sm">
          © 2025 Удачная Плитка. Все права защищены.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
