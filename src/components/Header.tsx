import { useState } from "react";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "Преимущества", href: "#advantages" },
  { label: "Каталог", href: "#catalog" },
  { label: "О компании", href: "#about" },
  { label: "Галерея", href: "#gallery" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contact" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between py-3 px-4 lg:px-8">
        <a href="#" className="flex items-center gap-3">
          <img src={logo} alt="Удачная Плитка" className="h-16 lg:h-20 w-auto" />
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a href="tel:+79161335056" className="text-sm font-semibold text-foreground">
            +7 (916) 133-50-56
          </a>
          <a
            href="#contact"
            className="bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105"
          >
            Консультация
          </a>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 text-foreground"
          aria-label="Меню"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-card border-t border-border px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block text-sm font-medium text-foreground/80 hover:text-primary py-2"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a href="tel:+79161335056" className="block text-sm font-semibold text-foreground py-2">
            +7 (916) 133-50-56
          </a>
          <a
            href="#contact"
            className="block bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold text-center"
            onClick={() => setMenuOpen(false)}
          >
            Консультация
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
