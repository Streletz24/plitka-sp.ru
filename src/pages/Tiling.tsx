import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Hammer, Package, Wrench, ListChecks, AlertTriangle } from "lucide-react";
import tilingHero from "@/assets/tiling-hero.jpg";
import step1 from "@/assets/tiling-step-1.jpg";
import step2 from "@/assets/tiling-step-2.jpg";
import step3 from "@/assets/tiling-step-3.jpg";
import step4 from "@/assets/tiling-step-4.jpg";
import step5 from "@/assets/tiling-step-5.jpg";
import step6 from "@/assets/tiling-step-6.jpg";
import step7 from "@/assets/tiling-step-7.jpg";
import step8 from "@/assets/tiling-step-8.jpg";

const materials = [
  "Песок",
  "Щебень",
  "Цемент или сухая смесь",
  "Геотекстиль",
];

const tools = [
  "Лопата",
  "Грабли",
  "Трамбовка (ручная или бензо)",
  "Топор",
  "Правило или ровная рейка",
  "Шнур для разметки",
  "Садовая тачка",
  "Уровень",
  "Мастерок и вёдра",
  "Веник",
  "Болгарка с алмазным диском",
];

const steps = [
  {
    title: "Определение границ и уклона",
    text: "Определяемся с границами и уклоном площадки. Уклон в несколько градусов необходим для водоотведения.",
    image: step1,
  },
  {
    title: "Разметка",
    text: "Делаем разметку границ, забивая колья и натягивая шнурок или леску по периметру, контролируя уклон уровнем.",
    image: step2,
  },
  {
    title: "Выемка грунта",
    text: "Глубина зависит от толщины основания. Для пешеходной зоны достаточно 15–20 см, для въезда и стоянки легкового автомобиля — не менее 30–40 см.",
    image: step3,
  },
  {
    title: "Нижний слой основания",
    text: "Нижний слой насыпаем щебнем 10–20 см (зависит от нагрузки), выравниваем и трамбуем. Для слабых грунтов используют геотекстиль — он укладывается под и на гравий, предотвращая перемешивание слоёв. На прочных грунтах достаточно уложить геотекстиль на утрамбованный щебень. Геотекстиль укрепляет покрытие и помогает избежать просадок от ливней и грунтовых вод.",
    image: step4,
  },
  {
    title: "Установка бордюра",
    text: "На щебень и приготовленный густой раствор бетона выставляем бордюр, выравнивая его по натянутой леске.",
    image: step5,
  },
  {
    title: "Верхний слой основания",
    text: "Насыпаем слой песка 10–15 см, выравниваем, обильно проливаем водой и трамбуем. Сверху — сухая цементно-песчаная смесь (1:5 или 1:8 в зависимости от марки цемента) слоем 3–5 см, выровненная правилом поперёк бордюров.",
    image: step6,
  },
  {
    title: "Укладка тротуарной плитки",
    text: "Плитку укладывают от прямой линии, плотно приставляя к соседней и аккуратно осаживая ударами резиновой киянки. Постоянно контролируем плоскость.",
    image: step7,
  },
  {
    title: "Заключительный этап",
    text: "Поверхность промести песком или песчано-цементной смесью, чтобы заполнить швы. При использовании смеси — мести особенно тщательно, чтобы избежать белесых пятен на цветной плитке.",
    image: step8,
  },
];

const Tiling = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32 lg:pt-36 pb-20">
        {/* Hero */}
        <section className="relative h-[55vh] min-h-[420px] overflow-hidden">
          <img
            src={tilingHero}
            alt="Подготовка основания для укладки тротуарной плитки"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
          <div className="relative container mx-auto px-4 lg:px-8 h-full flex flex-col justify-end pb-12">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-foreground/90 hover:text-primary transition-colors mb-6 self-start bg-card/70 backdrop-blur px-3 py-1.5 rounded-md text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              На главную
            </Link>
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground max-w-3xl leading-tight">
              Укладка плитки своими руками
            </h1>
            <p className="mt-4 text-base lg:text-lg text-foreground/80 max-w-2xl">
              Подробное руководство для тех, кто хочет уложить тротуарную плитку самостоятельно — от подготовки основания до финишной затирки швов.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 lg:px-8 mt-16 max-w-5xl">
          {/* Intro */}
          <div className="bg-card border border-border rounded-xl p-6 lg:p-8 shadow-sm">
            <p className="text-foreground/80 leading-relaxed">
              Информация носит ознакомительный характер и предназначена для тех, кого не устраивает самый простой способ
              уложить тротуарную плитку — позвонить по объявлению об укладке и пригласить специалиста или бригаду.
            </p>
          </div>

          {/* Materials & Tools */}
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <div className="bg-card border border-border rounded-xl p-6 lg:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-accent/15 text-accent flex items-center justify-center">
                  <Package className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-foreground">Материалы</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Количество необходимо рассчитать самостоятельно:
              </p>
              <ul className="space-y-2.5">
                {materials.map((m, i) => (
                  <li key={m} className="flex gap-3 text-foreground/85">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    {m}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 lg:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-accent/15 text-accent flex items-center justify-center">
                  <Wrench className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-foreground">Инструмент</h2>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {tools.map((t) => (
                  <li key={t} className="flex items-start gap-2 text-sm text-foreground/85">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Process */}
          <div className="mt-14">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <ListChecks className="w-5 h-5" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Процесс укладки</h2>
            </div>

            <ol className="space-y-5">
              {steps.map((s, i) => (
                <li
                  key={s.title}
                  className="group bg-card border border-border rounded-xl p-6 lg:p-7 shadow-sm hover:shadow-md hover:border-accent/40 transition-all"
                >
                  <div className="flex gap-5">
                    <div className="shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground font-bold text-lg flex items-center justify-center shadow-sm">
                        {i + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg lg:text-xl font-semibold text-foreground mb-2">
                        {s.title}
                      </h3>
                      <p className="text-foreground/80 leading-relaxed">{s.text}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Efflorescence */}
          <div className="mt-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-sale/15 text-sale flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                «Высолы» на бетонных изделиях
              </h2>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 lg:p-8 shadow-sm space-y-5 text-foreground/80 leading-relaxed">
              <p>
                Этот термин часто используется для описания белесых отложений на строительных материалах. Высолы, имея
                множество форм, в общем сводятся к нарушению цветовой картины белым оттенком. Стоит отметить, что высолы
                на глиняных кирпичах имеют другую природу, нежели на бетоне. Их появление часто интерпретируется как
                выгорание или вымывание цвета.
              </p>
              <p>
                Однако высолы на бетоне и бетонных изделиях — это естественный феномен, получаемый в результате
                нормальной химической реакции между цементом и водой. Результатом этой реакции является гидроокись
                кальция (известь), которая легко растворима в воде. При определённых условиях (наличие плёнки воды на
                поверхности) она мигрирует через поры бетона на поверхность, где реагирует с атмосферным оксидом
                углерода, образуя кристаллы карбоната кальция. Внешне это выглядит как белесые пятна. При влажной погоде
                отложения становятся прозрачными и кажутся исчезнувшими.
              </p>
              <p>
                Этот феномен — временное явление и всегда исчезает с течением времени. Высолы поверхностны и не влияют
                на прочность, истираемость и морозостойкость бетонных изделий.
              </p>
              <p>
                Дождевая вода, будучи слегка кислотной, растворяет отложения. Удаление может быть ускорено механическим
                истиранием в процессе эксплуатации — проходящими людьми или проезжающими автомобилями.
              </p>
              <p>
                Существуют средства для удаления высолов. Однако большинство из них содержит кислоты и активные добавки —
                некорректная или несоответствующая чистка может привести к нарушению, разрушению или изменению цвета
                поверхности бетонных изделий.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-14 bg-gradient-to-br from-primary to-accent rounded-2xl p-8 lg:p-10 text-center shadow-md">
            <Hammer className="w-10 h-10 text-primary-foreground mx-auto mb-4" />
            <h3 className="text-2xl lg:text-3xl font-bold text-primary-foreground mb-3">
              Нужна качественная плитка для укладки?
            </h3>
            <p className="text-primary-foreground/90 mb-6 max-w-xl mx-auto">
              Подберём подходящий вариант под ваш проект и рассчитаем точное количество материала.
            </p>
            <Link
              to="/#catalog"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-md bg-card text-foreground font-bold text-sm uppercase tracking-wider shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              Перейти в каталог
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Tiling;
