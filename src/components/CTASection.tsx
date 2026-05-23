import { AnimateOnScroll } from "./AnimateOnScroll";
import { useState } from "react";
import { COMPANY_CONTACTS } from "@/config/company";
import { sendSiteRequest } from "@/lib/sendSiteRequest";

const CTASection = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const validate = () => {
    if (!name.trim()) return "Укажите имя.";
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) return "Введите корректный телефон.";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    try {
      await sendSiteRequest({
        type: "contact_request",
        name: name.trim(),
        phone: phone.trim(),
        comment: comment.trim(),
        honeypot,
      });
      setSubmitted(true);
    } catch {
      setError("Не удалось отправить заявку. Попробуйте ещё раз или свяжитесь с нами по телефону.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contacts" className="py-24 lg:py-32 bg-primary">
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
                <a href="tel:+79161335056" className="flex items-center gap-3 text-primary-foreground font-semibold text-lg hover:opacity-80 transition-opacity">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  {COMPANY_CONTACTS.phone}
                </a>
                <a href={`mailto:${COMPANY_CONTACTS.email}`} className="flex items-center gap-3 text-primary-foreground/80 hover:opacity-80 transition-opacity">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  {COMPANY_CONTACTS.email}
                </a>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={200}>
            {submitted ? (
              <div className="bg-primary-foreground/10 backdrop-blur rounded-xl p-10 text-center">
                <div className="text-5xl mb-4">✓</div>
                <h3 className="text-xl font-bold text-primary-foreground mb-2">Спасибо! Заявка отправлена.</h3>
                <p className="text-primary-foreground/80">Мы свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-primary-foreground/10 backdrop-blur rounded-xl p-8 lg:p-10 space-y-5">
                <input type="text" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                <input
                  type="text"
                  placeholder="Ваше имя"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-5 py-4 rounded-lg bg-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 border-0 outline-none focus:ring-2 focus:ring-accent transition-all"
                />
                <input
                  type="tel"
                  placeholder="Телефон"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-5 py-4 rounded-lg bg-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 border-0 outline-none focus:ring-2 focus:ring-accent transition-all"
                />
                <textarea
                  placeholder="Расскажите о вашем проекте"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-5 py-4 rounded-lg bg-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 border-0 outline-none focus:ring-2 focus:ring-accent transition-all resize-none"
                />
                {error && <p className="text-sm text-red-100">{error}</p>}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-accent text-accent-foreground py-4 rounded-lg font-bold text-base hover:opacity-90 transition-all duration-300 hover:scale-[1.02] disabled:opacity-70"
                >
                  {submitting ? "Отправляем..." : "Отправить заявку"}
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
