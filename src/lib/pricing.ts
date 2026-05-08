import { CatalogProduct, ProductColor } from "@/data/catalogData";

export const isLinearProduct = (name: string) =>
  /бордюр|водосток/i.test(name);

export const parsePriceValue = (price?: string) => {
  if (!price) return null;
  const num = parseFloat(price.replace(/\s/g, "").replace(",", "."));
  if (isNaN(num)) return null;
  const perPiece = /шт/i.test(price) && !/м2|м²/i.test(price);
  const perM2 = /м2|м²/i.test(price);
  return { value: num, perPiece, perM2 };
};

export const parsePiecesPerM2 = (desc: string) => {
  const m = desc.match(/(\d+[.,]?\d*)\s*шт\s*\/\s*м2/i);
  return m ? parseFloat(m[1].replace(",", ".")) : null;
};

export const parseLengthMeters = (desc: string) => {
  const m = desc.match(/(\d+[.,]?\d*)\s*[хx×]/i);
  if (!m) return null;
  const cm = parseFloat(m[1].replace(",", "."));
  return cm > 0 ? cm / 100 : null;
};

/**
 * Returns price per м² (or per м.п. for linear products) for a given color/desc/price.
 */
export const computeUnitPrice = (
  productName: string,
  desc: string,
  price?: string
): number | null => {
  const p = parsePriceValue(price);
  if (!p) return null;
  const linear = isLinearProduct(productName);
  if (linear) {
    if (p.perM2) return p.value;
    if (p.perPiece) {
      const lengthM = parseLengthMeters(desc);
      if (!lengthM) return null;
      return Math.round(p.value / lengthM);
    }
    return p.value;
  }
  if (p.perM2) return p.value;
  if (p.perPiece) {
    const piecesPerM2 = parsePiecesPerM2(desc);
    if (!piecesPerM2) return null;
    return Math.round(p.value * piecesPerM2);
  }
  return p.value;
};

export interface CatalogPriceSummary {
  min: number | null;
  max: number | null;
  unit: string; // м² or м.п.
}

export const summarizeCatalogPrice = (
  product: CatalogProduct
): CatalogPriceSummary => {
  const linear = isLinearProduct(product.name);
  const unit = linear ? "м.п." : "м²";
  const sources: { desc: string; price?: string }[] = [];
  if (product.colors && product.colors.length > 0) {
    for (const c of product.colors) {
      sources.push({
        desc: c.description ?? product.description,
        price: c.price ?? product.price,
      });
    }
  } else {
    sources.push({ desc: product.description, price: product.price });
  }
  const values = sources
    .map((s) => computeUnitPrice(product.name, s.desc, s.price))
    .filter((v): v is number => v !== null && v > 0);
  if (values.length === 0) return { min: null, max: null, unit };
  return { min: Math.min(...values), max: Math.max(...values), unit };
};

export const formatPriceSummary = (s: CatalogPriceSummary) => {
  if (s.min === null) return "По запросу";
  const fmt = (n: number) => n.toLocaleString("ru-RU");
  if (s.min === s.max) return `${fmt(s.min)} руб/${s.unit}`;
  return `от ${fmt(s.min!)} до ${fmt(s.max!)} руб/${s.unit}`;
};
