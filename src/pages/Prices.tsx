import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { catalogCategories } from "@/data/catalogData";
import { ArrowLeft } from "lucide-react";
import { computeUnitPrice, isLinearProduct } from "@/lib/pricing";

const Prices = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-48 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            На главную
          </Link>

          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-12">
            Наши цены
          </h1>

          <div className="space-y-12">
            {catalogCategories.map((category) => {
              const linear = category.products.some((p) => isLinearProduct(p.name));
              return (
                <div key={category.slug}>
                  <h2 className="text-2xl font-bold text-foreground mb-6 border-b border-border pb-3">
                    {category.title}
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-muted">
                          <th className="text-left p-4 text-sm font-semibold text-foreground">
                            Наименование
                          </th>
                          <th className="text-left p-4 text-sm font-semibold text-foreground">
                            Цвет
                          </th>
                          <th className="text-left p-4 text-sm font-semibold text-foreground">
                            Описание
                          </th>
                          <th className="text-right p-4 text-sm font-semibold text-foreground whitespace-nowrap">
                            {linear ? "Цена за м.п." : "Цена за м²"}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {category.products.flatMap((product, pIdx) => {
                          const linearP = isLinearProduct(product.name);
                          const unit = linearP ? "м.п." : "м²";
                          const fmt = (n: number | null) =>
                            n === null || n <= 0
                              ? "По запросу"
                              : `${n.toLocaleString("ru-RU")} руб/${unit}`;
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
                                    price: computeUnitPrice(
                                      product.name,
                                      product.description,
                                      product.price
                                    ),
                                  },
                                ];
                          return rows.map((row, rIdx) => {
                            const idx = pIdx + rIdx;
                            return (
                              <tr
                                key={`${product.id}-${rIdx}`}
                                className={idx % 2 === 0 ? "bg-card" : "bg-muted/50"}
                              >
                                <td className="p-4 text-sm font-medium text-foreground">
                                  {rIdx === 0 ? product.name : ""}
                                </td>
                                <td className="p-4 text-sm text-foreground/80">
                                  {row.color}
                                </td>
                                <td className="p-4 text-sm text-foreground/70">
                                  {row.description}
                                </td>
                                <td className="p-4 text-sm font-semibold text-primary text-right whitespace-nowrap">
                                  {fmt(row.price)}
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
              Цены указаны ориентировочно и могут зависеть от объёма заказа.
              Свяжитесь с нами для точного расчёта стоимости.
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
