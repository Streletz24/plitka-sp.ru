import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import logo from "@/assets/logo-transparent.png";
import CartButton from "./CartButton";

const navLinks = [
  { label: "Преимущества", href: "advantages" },
  { label: "Каталог", href: "catalog" },
  { label: "О компании", href: "about" },
  { label: "Галерея", href: "gallery" },
  { label: "Отзывы", href: "reviews" },
  { label: "Контакты", href: "contact" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/#" + sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMenuOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between py-3 px-4 lg:px-8 gap-6">
        <a href="/" onClick={handleLogoClick} className="flex items-center gap-3 shrink-0">
          <img
            src={logo}
            alt="Удачная Плитка"
            className="h-20 lg:h-24 w-auto"
            data-no-zoom
          />
        </a>

        <nav className="hidden lg:flex items-center gap-7 flex-1 justify-center">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={`/#${link.href}`}
              onClick={(e) => handleNavClick(e, link.href)}
              className="relative whitespace-nowrap text-[13px] font-medium tracking-wide uppercase text-foreground/75 hover:text-primary transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-accent hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <a href="tel:+79161335056" className="text-sm font-semibold text-foreground/90 mr-1 tracking-wide">
            +7 (916) 133-50-56
          </a>
          <Link
            to="/sale"
            className="inline-flex items-center gap-1.5 h-10 px-4 rounded-md text-xs font-bold uppercase tracking-wider bg-sale text-sale-foreground shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
          >
            <span>🔥</span> Распродажа
          </Link>
          <Link
            to="/prices"
            className="inline-flex items-center h-10 px-4 rounded-md text-xs font-bold uppercase tracking-wider bg-accent text-accent-foreground shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
          >
            Наши цены
          </Link>
          <a
            href={`/#contact`}
            onClick={(e) => handleNavClick(e, "contact")}
            className="inline-flex items-center h-10 px-4 rounded-md text-xs font-bold uppercase tracking-wider bg-primary text-primary-foreground shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
          >
            Консультация
          </a>
          <CartButton />
        </div>

        <div className="lg:hidden flex items-center gap-2">
          <CartButton />
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
        <div className="lg:hidden bg-card border-t border-border px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={`/#${link.href}`}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block text-xs font-medium uppercase tracking-wider text-foreground/80 hover:text-primary py-2"
            >
              {link.label}
            </a>
          ))}
          <a href="tel:+79161335056" className="block text-sm font-semibold text-foreground py-2">
            +7 (916) 133-50-56
          </a>
          <div className="grid grid-cols-1 gap-2 pt-2">
            <Link
              to="/sale"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center justify-center gap-1.5 h-10 px-4 rounded-md text-xs font-bold uppercase tracking-wider bg-sale text-sale-foreground shadow-sm"
            >
              🔥 Распродажа
            </Link>
            <Link
              to="/prices"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center justify-center h-10 px-4 rounded-md text-xs font-bold uppercase tracking-wider bg-accent text-accent-foreground shadow-sm"
            >
              Наши цены
            </Link>
            <a
              href={`/#contact`}
              onClick={(e) => handleNavClick(e, "contact")}
              className="inline-flex items-center justify-center h-10 px-4 rounded-md text-xs font-bold uppercase tracking-wider bg-primary text-primary-foreground shadow-sm"
            >
              Консультация
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
