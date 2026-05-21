import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { catalogCategories } from "@/data/catalogData";
import { ArrowLeft, Download, Printer } from "lucide-react";
import { computeUnitPrice, isLinearProduct } from "@/lib/pricing";

const Prices = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formatPrice = (n: number | null, unit: string) =>
    n === null || n <= 0 ? "По запросу" : `${n.toLocaleString("ru-RU")} руб/${unit}`;

  const csvData = useMemo(() => {
    const rows = [["Категория", "Наименование", "Цвет", "Описание", "Цена"]];

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
          rows.push([
            category.title,
            product.name,
            row.color,
            row.description,
            formatPrice(row.price, unit),
          ]);
        }
      }
    }

    return rows;
  }, []);

  const handleDownload = () => {
    const csv = csvData
      .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(";"))
      .join("\n");

    const bom = "\uFEFF";
    const blob = new Blob([bom + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ceny-udachnaya-plitka.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-48 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
            <ArrowLeft className="w-4 h-4" />
            На главную
          </Link>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Наши цены</h1>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground"
              >
                <Download className="h-4 w-4" />
                Скачать цены
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                <Printer className="h-4 w-4" />
                Печать
              </button>
            </div>
          </div>

          <div className="space-y-12">
            {catalogCategories.map((category) => {
              const linear = category.products.some((p) => isLinearProduct(p.name));
              return (
                <div key={category.slug}>
                  <h2 className="text-2xl font-bold text-foreground mb-6 border-b border-border pb-3">{category.title}</h2>

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

                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full border-collapse">
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

          <div className="mt-12 p-6 bg-muted rounded-xl text-center">
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
