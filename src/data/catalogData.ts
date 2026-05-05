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
import tileKosaSquareYellow from "@/assets/tile-kosa-square-yellow.webp";
import tileKosaSquareGray from "@/assets/tile-kosa-square-gray.webp";
import tileKosaSquareRed from "@/assets/tile-kosa-square-red.jpg";
import borderGardenYellow from "@/assets/border-garden-yellow.webp";
import borderGardenGray from "@/assets/border-garden-gray.jpg";
import borderGardenRed from "@/assets/border-garden-red.webp";
import borderThinBrown from "@/assets/border-thin-brown.webp";
import borderThinGray from "@/assets/border-thin-gray.webp";
import borderThinRed from "@/assets/border-thin-red.webp";
import borderMeterGray from "@/assets/border-meter-gray.jpeg";
import borderMeterRed from "@/assets/border-meter-red.jpg";
import borderMeterBrown from "@/assets/border-meter-brown.png";
import borderMeterYellow from "@/assets/border-meter-yellow.png";
import drainageBrown from "@/assets/drainage-brown.webp";
import drainageGray from "@/assets/drainage-gray.webp";
import drainageRed from "@/assets/drainage-red.webp";
import drainageYellow from "@/assets/drainage-yellow.png";

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
        name: "Плитка «Брекчия»",
        description: "30х30х3см. 11 шт/м2, 5,5 кг/шт, 180шт/поддон.",
        image: tileStoneYellow,
        price: "100 руб/шт",
        colors: [
          {
            name: "Жёлтый",
            hex: "#D4C25A",
            image: tileStoneYellow,
            description: "30х30х3см. 11 шт/м2, 5,5 кг/шт, 180шт/поддон.",
            price: "100 руб/шт",
          },
          {
            name: "Серый",
            hex: "#A8A8A8",
            image: tileStoneGray,
            description: "30х30х3см. 11 шт/м2, 5,5 кг/шт, 180шт/поддон.",
            price: "70 руб/шт",
          },
          {
            name: "Красный",
            hex: "#C84F55",
            image: tileStoneRed,
            description: "30х30х3см. 11 шт/м2, 5,5 кг/шт, 180шт/поддон.",
            price: "80 руб/шт",
          },
        ],
      },
      {
        id: "yard-parquet",
        name: "Плитка «Шоколадка»",
        description: "30х30х3см. 11 шт/м2, 5,5 кг/шт, 180шт/поддон.",
        image: tileParquetYellow,
        price: "100 руб/шт",
        colors: [
          {
            name: "Жёлтый",
            hex: "#D4C25A",
            image: tileParquetYellow,
            description: "30х30х3см. 11 шт/м2, 5,5 кг/шт, 180шт/поддон.",
            price: "100 руб/шт",
          },
          {
            name: "Серый",
            hex: "#A8A8A8",
            image: tileParquetGray,
            description: "30х30х3см. 11 шт/м2, 5,5 кг/шт, 180шт/поддон.",
            price: "70 руб/шт",
          },
          {
            name: "Красный",
            hex: "#C84F55",
            image: tileParquetRed,
            description: "30х30х3см. 11 шт/м2, 5,5 кг/шт, 180шт/поддон.",
            price: "80 руб/шт",
          },
        ],
      },
      {
        id: "yard-wood",
        name: "Плитка «3 доски»",
        description: "40х40х5см. 6,25 шт/м2, 16,5 кг/шт, 66 шт/поддон.",
        image: tileWoodYellow,
        price: "235 руб/шт",
        colors: [
          {
            name: "Жёлтый",
            hex: "#D4C25A",
            image: tileWoodYellow,
            description: "40х40х5см. 6,25 шт/м2, 16,5 кг/шт, 66 шт/поддон.",
            price: "235 руб/шт",
          },
          {
            name: "Серый",
            hex: "#A8A8A8",
            image: tileWoodGray,
            description: "40х40х5см. 6,25 шт/м2, 16,5 кг/шт, 66 шт/поддон.",
            price: "155 руб/шт",
          },
          {
            name: "Красный",
            hex: "#C84F55",
            image: tileWoodRed,
            description: "40х40х5см. 6,25 шт/м2, 16,5 кг/шт, 66 шт/поддон.",
            price: "180 руб/шт",
          },
        ],
      },
      {
        id: "yard-clover",
        name: "Плитка «Коса Узор»",
        description: "40х40х5см. 6,25 шт/м2, 16,5 кг/шт, 66 шт/поддон.",
        image: tileCloverYellow,
        price: "235 руб/шт",
        colors: [
          {
            name: "Коричневый",
            hex: "#B5734A",
            image: tileCloverYellow,
            description: "40х40х5см. 6,25 шт/м2, 16,5 кг/шт, 66 шт/поддон.",
            price: "235 руб/шт",
          },
          {
            name: "Серый",
            hex: "#A8A8A8",
            image: tileCloverGray,
            description: "40х40х5см. 6,25 шт/м2, 16,5 кг/шт, 66 шт/поддон.",
            price: "155 руб/шт",
          },
          {
            name: "Красный",
            hex: "#C84F55",
            image: tileCloverRed,
            description: "40х40х5см. 6,25 шт/м2, 16,5 кг/шт, 66 шт/поддон.",
            price: "180 руб/шт",
          },
        ],
      },
      {
        id: "yard-1",
        name: "Плитка 8 кирпичей",
        description: "40х40х5см. 6,25 шт/м2, 16,5 кг/шт, 66 шт/поддон.",
        image: tile8Brown,
        price: "235 руб/шт",
        colors: [
          {
            name: "Коричневый",
            hex: "#B5734A",
            image: tile8Brown,
            description: "40х40х5см. 6,25 шт/м2, 16,5 кг/шт, 66 шт/поддон.",
            price: "235 руб/шт",
          },
          {
            name: "Серый",
            hex: "#A8A8A8",
            image: tile8Gray,
            description: "40х40х5см. 6,25 шт/м2, 16,5 кг/шт, 66 шт/поддон.",
            price: "155 руб/шт",
          },
          {
            name: "Красный",
            hex: "#C84F55",
            image: tile8Red,
            description: "40х40х5см. 6,25 шт/м2, 16,5 кг/шт, 66 шт/поддон.",
            price: "180 руб/шт",
          },
        ],
      },
      {
        id: "yard-2",
        name: "Плитка 12 кирпичей",
        description: "50х50х5см. 4 шт/м2, 25 кг/шт, 44 шт/поддон.",
        image: tileOldYellow,
        price: "380 руб/шт",
        colors: [
          {
            name: "Жёлтый",
            hex: "#D4C25A",
            image: tileOldYellow,
            description: "50х50х5см. 4 шт/м2, 25 кг/шт, 44 шт/поддон.",
            price: "380 руб/шт",
          },
          {
            name: "Серый",
            hex: "#A8A8A8",
            image: tileOldGray,
            description: "50х50х5см. 4 шт/м2, 25 кг/шт, 44 шт/поддон.",
            price: "250 руб/шт",
          },
          {
            name: "Красный",
            hex: "#C84F55",
            image: tileOldRed,
            description: "50х50х5см. 4 шт/м2, 25 кг/шт, 44 шт/поддон.",
            price: "300 руб/шт",
          },
        ],
      },
      {
        id: "yard-3",
        name: "Плитка «Коса Квадрат»",
        description: "50х50х5см. 4 шт/м2, 25 кг/шт, 44 шт/поддон.",
        image: tileKosaSquareYellow,
        price: "380 руб/шт",
        colors: [
          {
            name: "Жёлтый",
            hex: "#D4C25A",
            image: tileKosaSquareYellow,
            description: "50х50х5см. 4 шт/м2, 25 кг/шт, 44 шт/поддон.",
            price: "380 руб/шт",
          },
          {
            name: "Серый",
            hex: "#A8A8A8",
            image: tileKosaSquareGray,
            description: "50х50х5см. 4 шт/м2, 25 кг/шт, 44 шт/поддон.",
            price: "250 руб/шт",
          },
          {
            name: "Красный",
            hex: "#C84F55",
            image: tileKosaSquareRed,
            description: "50х50х5см. 4 шт/м2, 25 кг/шт, 44 шт/поддон.",
            price: "300 руб/шт",
          },
        ],
      },
    ],
  },
  {
    slug: "paths",
    img: catalogPaths,
    title: "Брусчатка для двора и дорожек",
    desc: "Элегантные решения для садовых и пешеходных дорожек",
    fullDescription:
      "Садовые дорожки — важный элемент ландшафтного дизайна. Наша плитка для дорожек сочетает красоту и практичность, обеспечивая комфортное передвижение по участку в любую погоду.",
    products: [
      {
        id: "paths-1",
        name: "Кирпич тонкий",
        description: "20х10х3см.",
        image: tile8Gray,
        price: "1250 руб/м2",
        colors: [
          {
            name: "Серый",
            hex: "#A8A8A8",
            image: tile8Gray,
            description: "20х10х3см.",
            price: "1250 руб/м2",
          },
        ],
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
        name: "Бордюр садовый стандарт",
        description: "50х20х6см. 13 кг/шт, 70 шт/поддон.",
        image: borderGardenYellow,
        price: "170 руб/шт",
        colors: [
          {
            name: "Жёлтый",
            hex: "#D4C25A",
            image: borderGardenYellow,
            description: "50х20х6см. 13 кг/шт, 70 шт/поддон.",
            price: "170 руб/шт",
          },
          {
            name: "Серый",
            hex: "#A8A8A8",
            image: borderGardenGray,
            description: "50х20х6см. 13 кг/шт, 70 шт/поддон.",
            price: "140 руб/шт",
          },
          {
            name: "Красный",
            hex: "#C84F55",
            image: borderGardenRed,
            description: "50х20х6см. 13 кг/шт, 70 шт/поддон.",
            price: "160 руб/шт",
          },
        ],
      },
      {
        id: "borders-2",
        name: "Бордюр садовый тонкий",
        description: "50х20х3,5см. 8,7 кг/шт, 110 шт/поддон.",
        image: borderThinBrown,
        price: "135 руб/шт",
        colors: [
          {
            name: "Коричневый",
            hex: "#B5734A",
            image: borderThinBrown,
            description: "50х20х3,5см. 8,7 кг/шт, 110 шт/поддон.",
            price: "135 руб/шт",
          },
          {
            name: "Серый",
            hex: "#A8A8A8",
            image: borderThinGray,
            description: "50х20х3,5см. 8,7 кг/шт, 110 шт/поддон.",
            price: "110 руб/шт",
          },
          {
            name: "Красный",
            hex: "#C84F55",
            image: borderThinRed,
            description: "50х20х3,5см. 8,7 кг/шт, 110 шт/поддон.",
            price: "120 руб/шт",
          },
        ],
      },
      {
        id: "borders-3",
        name: "Бордюр метровый",
        description: "100х20х8см. 40 кг/шт, 31 шт/поддон.",
        image: borderMeterGray,
        price: "300 руб/шт",
        colors: [
          {
            name: "Серый",
            hex: "#A8A8A8",
            image: borderMeterGray,
            description: "100х20х8см. 40 кг/шт, 31 шт/поддон.",
            price: "300 руб/шт",
          },
          {
            name: "Красный",
            hex: "#C84F55",
            image: borderMeterRed,
            description: "100х20х8см. 40 кг/шт, 31 шт/поддон.",
            price: "340 руб/шт",
          },
          {
            name: "Коричневый",
            hex: "#B5734A",
            image: borderMeterBrown,
            description: "100х20х8см. 40 кг/шт, 31 шт/поддон.",
            price: "370 руб/шт",
          },
          {
            name: "Жёлтый",
            hex: "#D4C25A",
            image: borderMeterYellow,
            description: "100х20х8см. 40 кг/шт, 31 шт/поддон.",
            price: "370 руб/шт",
          },
        ],
      },
      {
        id: "borders-4",
        name: "Водосток",
        description: "50х16х6см. 126 шт/поддон.",
        image: drainageBrown,
        price: "120 руб/шт",
        colors: [
          {
            name: "Коричневый",
            hex: "#B5734A",
            image: drainageBrown,
            description: "50х16х6см. 126 шт/поддон.",
            price: "120 руб/шт",
          },
          {
            name: "Серый",
            hex: "#A8A8A8",
            image: drainageGray,
            description: "50х16х6см. 126 шт/поддон.",
            price: "110 руб/шт",
          },
          {
            name: "Красный",
            hex: "#C84F55",
            image: drainageRed,
            description: "50х16х6см. 126 шт/поддон.",
            price: "120 руб/шт",
          },
          {
            name: "Жёлтый",
            hex: "#D4C25A",
            image: drainageYellow,
            description: "50х16х6см. 126 шт/поддон.",
            price: "120 руб/шт",
          },
        ],
      },
    ],
  },
];
