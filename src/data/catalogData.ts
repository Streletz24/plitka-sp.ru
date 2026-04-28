import catalogYard from "@/assets/catalog-yard.jpg";
import catalogPaths from "@/assets/catalog-paths.jpg";
import catalogDriveway from "@/assets/catalog-driveway.jpg";
import catalogBorders from "@/assets/catalog-borders.jpg";
import tile8Brown from "@/assets/tile-8bricks-brown.jpg";
import tile8Gray from "@/assets/tile-8bricks-gray.jpg";
import tile8Red from "@/assets/tile-8bricks-red.webp";
import tileOldYellow from "@/assets/tile-oldtown-yellow.webp";
import tileOldGray from "@/assets/tile-oldtown-gray.jpg";
import tileOldRed from "@/assets/tile-oldtown-red.webp";
import tileStoneYellow from "@/assets/tile-stone-yellow.jpg";
import tileStoneGray from "@/assets/tile-stone-gray.webp";
import tileStoneRed from "@/assets/tile-stone-red.webp";
import tileParquetYellow from "@/assets/tile-parquet-yellow.jpg";
import tileParquetGray from "@/assets/tile-parquet-gray.webp";
import tileParquetRed from "@/assets/tile-parquet-red.jpg";
import tileWoodYellow from "@/assets/tile-wood-yellow.webp";
import tileWoodGray from "@/assets/tile-wood-gray.webp";
import tileWoodRed from "@/assets/tile-wood-red.webp";
import tileCloverYellow from "@/assets/tile-clover-yellow.webp";
import tileCloverGray from "@/assets/tile-clover-gray.webp";
import tileCloverRed from "@/assets/tile-clover-red.jpg";

export interface ProductColor {
  name: string;
  hex: string;
  image: string;
  description?: string;
  price?: string;
}

export interface CatalogProduct {
  id: string;
  name: string;
  description: string;
  image: string;
  price?: string;
  colors?: ProductColor[];
}

export interface CatalogCategory {
  slug: string;
  img: string;
  title: string;
  desc: string;
  fullDescription: string;
  products: CatalogProduct[];
}

export const catalogCategories: CatalogCategory[] = [
  {
    slug: "yard",
    img: catalogYard,
    title: "Плитка для двора",
    desc: "Прочная и красивая плитка для мощения дворовой территории",
    fullDescription:
      "Тротуарная плитка для двора — это надёжное и эстетичное решение для благоустройства придомовой территории. Мы предлагаем широкий выбор форм, цветов и текстур, чтобы создать уникальный дизайн вашего двора.",
    products: [
      {
        id: "yard-stone",
        name: "Плитка «Тучка»",
        description: "33х33х4см. Декоративная плитка с фактурой природного камня.",
        image: tileStoneYellow,
        price: "130 руб/шт",
        colors: [
          {
            name: "Жёлтый",
            hex: "#D4C25A",
            image: tileStoneYellow,
            description: "33х33х4см. Декоративная плитка с фактурой природного камня.",
            price: "130 руб/шт",
          },
          {
            name: "Серый",
            hex: "#A8A8A8",
            image: tileStoneGray,
            description: "33х33х4см. Декоративная плитка с фактурой природного камня.",
            price: "120 руб/шт",
          },
          {
            name: "Красный",
            hex: "#C84F55",
            image: tileStoneRed,
            description: "33х33х4см. Декоративная плитка с фактурой природного камня.",
            price: "135 руб/шт",
          },
        ],
      },
      {
        id: "yard-parquet",
        name: "Плитка «Паркет»",
        description: "30х30х3см. Декоративная плитка с рисунком паркета.",
        image: tileParquetYellow,
        price: "110 руб/шт",
        colors: [
          {
            name: "Жёлтый",
            hex: "#D4C25A",
            image: tileParquetYellow,
            description: "30х30х3см. Декоративная плитка с рисунком паркета.",
            price: "110 руб/шт",
          },
          {
            name: "Серый",
            hex: "#A8A8A8",
            image: tileParquetGray,
            description: "30х30х3см. Декоративная плитка с рисунком паркета.",
            price: "100 руб/шт",
          },
          {
            name: "Красный",
            hex: "#C84F55",
            image: tileParquetRed,
            description: "30х30х3см. Декоративная плитка с рисунком паркета.",
            price: "115 руб/шт",
          },
        ],
      },
      {
        id: "yard-wood",
        name: "Плитка «Доска»",
        description: "30х30х3см. Декоративная плитка с фактурой натурального дерева.",
        image: tileWoodYellow,
        price: "120 руб/шт",
        colors: [
          {
            name: "Коричневый",
            hex: "#B5734A",
            image: tileWoodYellow,
            description: "30х30х3см. Декоративная плитка с фактурой натурального дерева.",
            price: "120 руб/шт",
          },
          {
            name: "Серый",
            hex: "#A8A8A8",
            image: tileWoodGray,
            description: "30х30х3см. Декоративная плитка с фактурой натурального дерева.",
            price: "110 руб/шт",
          },
          {
            name: "Красный",
            hex: "#C84F55",
            image: tileWoodRed,
            description: "30х30х3см. Декоративная плитка с фактурой натурального дерева.",
            price: "125 руб/шт",
          },
        ],
      },
      {
        id: "yard-clover",
        name: "Плитка «Клевер»",
        description: "35х35х4см. Декоративная плитка с узором клевера и плетёным бордюром.",
        image: tileCloverYellow,
        price: "140 руб/шт",
        colors: [
          {
            name: "Жёлтый",
            hex: "#D4C25A",
            image: tileCloverYellow,
            description: "35х35х4см. Декоративная плитка с узором клевера и плетёным бордюром.",
            price: "140 руб/шт",
          },
          {
            name: "Серый",
            hex: "#A8A8A8",
            image: tileCloverGray,
            description: "35х35х4см. Декоративная плитка с узором клевера и плетёным бордюром.",
            price: "130 руб/шт",
          },
          {
            name: "Красный",
            hex: "#C84F55",
            image: tileCloverRed,
            description: "35х35х4см. Декоративная плитка с узором клевера и плетёным бордюром.",
            price: "145 руб/шт",
          },
        ],
      },
      {
        id: "yard-1",
        name: "Плитка 8 кирпичей",
        description: "40х40х5см. Подходит для пешеходных зон и дворовых территорий.",
        image: tile8Brown,
        price: "150 руб/шт",
        colors: [
          {
            name: "Коричневый",
            hex: "#B5734A",
            image: tile8Brown,
            description: "40х40х5см. Подходит для пешеходных зон и дворовых территорий.",
            price: "150 руб/шт",
          },
          {
            name: "Серый",
            hex: "#A8A8A8",
            image: tile8Gray,
            description: "40х40х5см. Подходит для пешеходных зон и дворовых территорий.",
            price: "140 руб/шт",
          },
          {
            name: "Красный",
            hex: "#C84F55",
            image: tile8Red,
            description: "40х40х5см. Подходит для пешеходных зон и дворовых территорий.",
            price: "155 руб/шт",
          },
        ],
      },
      {
        id: "yard-2",
        name: "Плитка 12 кирпичей",
        description: "50х50х5см Плитка с эффектом состаренного камня. Создаёт атмосферу уюта и классического стиля.",
        image: tileOldYellow,
        price: "200 руб/шт",
        colors: [
          {
            name: "Жёлтый",
            hex: "#D4C25A",
            image: tileOldYellow,
            description: "50х50х5см Плитка с эффектом состаренного камня. Создаёт атмосферу уюта и классического стиля.",
            price: "200 руб/шт",
          },
          {
            name: "Серый",
            hex: "#A8A8A8",
            image: tileOldGray,
            description: "50х50х5см Плитка с эффектом состаренного камня. Создаёт атмосферу уюта и классического стиля.",
            price: "190 руб/шт",
          },
          {
            name: "Красный",
            hex: "#C84F55",
            image: tileOldRed,
            description: "50х50х5см Плитка с эффектом состаренного камня. Создаёт атмосферу уюта и классического стиля.",
            price: "210 руб/шт",
          },
        ],
      },
      {
        id: "yard-3",
        name: "Плитка «Катушка»",
        description: "Фигурная плитка с надёжным сцеплением элементов. Высокая устойчивость к нагрузкам.",
        image: catalogYard,
      },
    ],
  },
  {
    slug: "paths",
    img: catalogPaths,
    title: "Плитка для дорожек",
    desc: "Элегантные решения для садовых и пешеходных дорожек",
    fullDescription:
      "Садовые дорожки — важный элемент ландшафтного дизайна. Наша плитка для дорожек сочетает красоту и практичность, обеспечивая комфортное передвижение по участку в любую погоду.",
    products: [
      {
        id: "paths-1",
        name: "Плитка «Волна»",
        description: "Элегантная волнообразная плитка для извилистых садовых дорожек. Толщина 40 мм.",
        image: catalogPaths,
      },
      {
        id: "paths-2",
        name: "Плитка «Кирпичик»",
        description: "Классическая прямоугольная форма, идеальна для прямых и изогнутых дорожек.",
        image: catalogPaths,
      },
      {
        id: "paths-3",
        name: "Плитка «Ромб»",
        description: "Ромбовидная плитка, создающая интересный геометрический рисунок на дорожках.",
        image: catalogPaths,
      },
    ],
  },
  {
    slug: "driveway",
    img: catalogDriveway,
    title: "Плитка для въездной зоны",
    desc: "Усиленная плитка для парковок и подъездных путей",
    fullDescription:
      "Въездная зона требует особо прочного покрытия, способного выдерживать вес автомобилей. Наша усиленная плитка толщиной от 80 мм обеспечивает долговечность и надёжность покрытия.",
    products: [
      {
        id: "driveway-1",
        name: "Брусчатка «Усиленная»",
        description: "Толщина 80 мм. Выдерживает нагрузку до 10 тонн. Идеальна для парковок и въездов.",
        image: catalogDriveway,
      },
      {
        id: "driveway-2",
        name: "Плитка «Квадрат 300×300»",
        description: "Крупноформатная плитка для быстрого мощения больших площадей. Толщина 80 мм.",
        image: catalogDriveway,
      },
      {
        id: "driveway-3",
        name: "Плитка «Двойное Т»",
        description: "Форма обеспечивает максимальное сцепление элементов и устойчивость к сдвигам.",
        image: catalogDriveway,
      },
    ],
  },
  {
    slug: "borders",
    img: catalogBorders,
    title: "Бордюры и элементы",
    desc: "Бордюры, водостоки и элементы благоустройства территории",
    fullDescription:
      "Бордюры и сопутствующие элементы завершают композицию мощения, придают аккуратный вид и защищают покрытие от разрушения. Мы предлагаем бордюры различных размеров и водосточные элементы.",
    products: [
      {
        id: "borders-1",
        name: "Бордюр садовый",
        description: "Компактный бордюр для садовых дорожек и клумб. Размер 500×200×40 мм.",
        image: catalogBorders,
      },
      {
        id: "borders-2",
        name: "Бордюр дорожный",
        description: "Усиленный бордюр для въездных зон и парковок. Размер 1000×300×150 мм.",
        image: catalogBorders,
      },
      {
        id: "borders-3",
        name: "Водосточный лоток",
        description: "Бетонный лоток для отвода дождевой воды. Обеспечивает долговечность покрытия.",
        image: catalogBorders,
      },
    ],
  },
];
