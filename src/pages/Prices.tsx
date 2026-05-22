import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { catalogCategories } from "@/data/catalogData";
import { ArrowLeft, FileText, Printer } from "lucide-react";
import { computeUnitPrice, isLinearProduct } from "@/lib/pricing";

const Prices = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formatPrice = (n: number | null, unit: string) =>
    n === null || n <= 0 ? "По запросу" : `${n.toLocaleString("ru-RU")} руб/${unit}`;

  const priceRows = useMemo(() => {
    const rows: Array<{ category: string; product: string; color: string; description: string; price: string }> = [];

    for (const category of catalogCategories) {
      for (const product of category.products) {
        const linear = isLinearProduct(product.name);
        const unit = linear ? "м.п." : "м²";
        const variants =
          product.colors && product.colors.length > 0
            ? product.colors.map((c) => ({
                color: c.name,
                description: c.description ?? product.description,
                price: computeUnitPrice(
                  product.name,
                  c.description ?? product.description,
                  c.price ?? product.price
                ),
              }))
            : [
                {
                  color: "—",
                  description: product.description,
                  price: computeUnitPrice(product.name, product.description, product.price),
                },
              ];

        for (const row of variants) {
          rows.push({
            category: category.title,
            product: product.name,
            color: row.color,
            description: row.description,
            price: formatPrice(row.price, unit),
          });
        }
      }
    }

    return rows;
  }, []);

  const downloadWordPriceList = () => {
    const exportDate = new Date().toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const esc = (value: string) =>
      value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");

    const rowsHtml = priceRows
      .map(
        (row, idx) => `
          <tr style="background:${idx % 2 === 0 ? "#ffffff" : "#f7f9f8"};">
            <td>${esc(row.category)}</td>
            <td>${esc(row.product)}</td>
            <td>${esc(row.color)}</td>
            <td>${esc(row.description)}</td>
            <td style="font-weight:700;color:#8D3F1E;">${esc(row.price)}</td>
          </tr>`
      )
      .join("");

    const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  body { font-family: Arial, sans-serif; color: #1f3a33; }
  .letterhead { border-bottom: 3px solid #1f3a33; padding-bottom: 12px; margin-bottom: 14px; }
  .company { font-size: 24px; font-weight: 700; letter-spacing: .4px; }
  .meta { font-size: 12px; color: #5b6b66; }
  table { border-collapse: collapse; width: 100%; }
  th, td { border: 1px solid #c8d0cd; padding: 8px; font-size: 12px; vertical-align: top; }
  th { background: #dce9e4; text-align: left; }
</style>
</head>
<body>
  <div class="letterhead">
    <div class="company">УДАЧНАЯ ПЛИТКА</div>
    <div class="meta">Прайс-лист на продукцию</div>
    <div class="meta">+7 (916) 133-50-56 · plitka-sp.ru@yandex.ru</div>
    <div class="meta">Московская обл., г. Сергиев Посад, ул. Фестивальная, д.6А</div>
    <div class="meta">Дата выгрузки: ${esc(exportDate)}</div>
  </div>
  <table>
    <thead>
      <tr>
        <th>Категория</th>
        <th>Наименование</th>
        <th>Цвет</th>
        <th>Описание</th>
        <th>Цена</th>
      </tr>
    </thead>
    <tbody>${rowsHtml}</tbody>
  </table>
</body>
</html>`;

    const fileName = `Прайс-Удачная-Плитка-${new Date().toISOString().slice(0, 10)}.doc`;
    const blob = new Blob(["﻿", html], { type: "application/octet-stream" });
    const nav = window.navigator as Navigator & { msSaveOrOpenBlob?: (blob: Blob, defaultName?: string) => boolean };
    if (typeof nav.msSaveOrOpenBlob === "function") {
      nav.msSaveOrOpenBlob(blob, fileName);
      return;
    }

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.target = "_self";
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 3000);
  };

  return (
    <div className="min-h-screen prices-page">
      <Header />
      <main className="pt-48 pb-20 print-main">
        <div className="container mx-auto px-4 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-8 no-print">
            <ArrowLeft className="w-4 h-4" />
            На главную
          </Link>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8 no-print">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Наши цены</h1>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={downloadWordPriceList}
                className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground"
              >
                <FileText className="h-4 w-4" />
                Скачать прайс Word
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                <Printer className="h-4 w-4" />
                Печать прайса
              </button>
            </div>
          </div>

          <div className="space-y-12">
            {catalogCategories.map((category) => {
              const linear = category.products.some((p) => isLinearProduct(p.name));
              return (
                <div key={category.slug}>
                  <h2 className="text-2xl font-bold text-foreground mb-6 border-b border-border pb-3 print-section-title">{category.title}</h2>

                  <div className="space-y-3 md:hidden">
                    {category.products.flatMap((product, pIdx) => {
                      const linearP = isLinearProduct(product.name);
                      const unit = linearP ? "м.п." : "м²";
                      const rows =
                        product.colors && product.colors.length > 0
                          ? product.colors.map((c) => ({
                              color: c.name,
                              description: c.description ?? product.description,
                              price: computeUnitPrice(
                                product.name,
                                c.description ?? product.description,
                                c.price ?? product.price
                              ),
                            }))
                          : [
                              {
                                color: "—",
                                description: product.description,
                                price: computeUnitPrice(product.name, product.description, product.price),
                              },
                            ];
                      return rows.map((row, rIdx) => (
                        <article
                          key={`${product.id}-mobile-${rIdx}`}
                          className={`rounded-lg border border-border p-4 ${((pIdx + rIdx) % 2 === 0) ? "bg-card" : "bg-muted/50"}`}
                        >
                          <p className="text-sm font-semibold text-foreground">{product.name}</p>
                          <p className="mt-1 text-sm text-foreground/80">Цвет: {row.color}</p>
                          <p className="mt-1 text-sm text-foreground/70">{row.description}</p>
                          <p className="mt-2 text-sm font-semibold text-primary">{formatPrice(row.price, unit)}</p>
                        </article>
                      ));
                    })}
                  </div>

                  <div className="hidden md:block overflow-x-auto print-visible-block">
                    <table className="w-full border-collapse print-price-table">
                      <thead>
                        <tr className="bg-muted">
                          <th className="text-left p-4 text-sm font-semibold text-foreground">Наименование</th>
                          <th className="text-left p-4 text-sm font-semibold text-foreground">Цвет</th>
                          <th className="text-left p-4 text-sm font-semibold text-foreground">Описание</th>
                          <th className="text-right p-4 text-sm font-semibold text-foreground whitespace-nowrap">
                            {linear ? "Цена за м.п." : "Цена за м²"}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {category.products.flatMap((product, pIdx) => {
                          const linearP = isLinearProduct(product.name);
                          const unit = linearP ? "м.п." : "м²";
                          const rows =
                            product.colors && product.colors.length > 0
                              ? product.colors.map((c) => ({
                                  color: c.name,
                                  description: c.description ?? product.description,
                                  price: computeUnitPrice(
                                    product.name,
                                    c.description ?? product.description,
                                    c.price ?? product.price
                                  ),
                                }))
                              : [
                                  {
                                    color: "—",
                                    description: product.description,
                                    price: computeUnitPrice(product.name, product.description, product.price),
                                  },
                                ];
                          return rows.map((row, rIdx) => {
                            const idx = pIdx + rIdx;
                            return (
                              <tr key={`${product.id}-${rIdx}`} className={idx % 2 === 0 ? "bg-card" : "bg-muted/50"}>
                                <td className="p-4 text-sm font-medium text-foreground">{rIdx === 0 ? product.name : ""}</td>
                                <td className="p-4 text-sm text-foreground/80">{row.color}</td>
                                <td className="p-4 text-sm text-foreground/70">{row.description}</td>
                                <td className="p-4 text-sm font-semibold text-primary text-right whitespace-nowrap">
                                  {formatPrice(row.price, unit)}
                                </td>
                              </tr>
                            );
                          });
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 p-6 bg-muted rounded-xl text-center no-print">
            <p className="text-foreground/70 text-sm mb-4">
              Цены указаны ориентировочно и могут зависеть от объёма заказа. Свяжитесь с нами для точного расчёта стоимости.
            </p>
            <a
              href="tel:+79161335056"
              className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-all"
            >
              Позвонить: +7 (916) 133-50-56
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Prices;
