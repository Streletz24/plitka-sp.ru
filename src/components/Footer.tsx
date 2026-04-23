import logo from "@/assets/logo.png";

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
            <div className="rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2209.5!2d38.1305!3d56.3153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTbCsDE4JzU1LjEiTiAzOMKwMDcnNDkuOCJF!5e0!3m2!1sru!2sru!4v1"
                width="100%"
                height="180"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Удачная Плитка на карте"
              />
            </div>
          </div>

          <div>
            <h4 className="text-primary-foreground font-bold mb-4">Часы работы</h4>
            <div className="space-y-2 text-primary-foreground/60 text-sm">
              <p>Пн–Пт: 8:00–17:00</p>
              <p className="pl-4 text-xs">(обед 12:00–13:00)</p>
              <p>Сб: 9:00–12:00</p>
              <p>Вс: выходной</p>
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
