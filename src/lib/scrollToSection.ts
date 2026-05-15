const SECTION_ALIASES: Record<string, string> = {
  contact: "contacts",
  delivery: "services",
};

export const normalizeSectionId = (sectionId: string) => {
  const cleanId = sectionId.replace(/^#/, "");
  return SECTION_ALIASES[cleanId] ?? cleanId;
};

export const scrollToSection = (sectionId: string, behavior: ScrollBehavior = "smooth") => {
  const normalizedId = normalizeSectionId(sectionId);
  const target = document.getElementById(normalizedId);

  if (!target) {
    return false;
  }

  const header = document.querySelector("header");
  const headerHeight = header instanceof HTMLElement ? header.offsetHeight : 0;
  const safeGap = window.matchMedia("(max-width: 1023px)").matches ? 16 : 24;
  const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - safeGap;

  if (window.location.pathname === "/" && window.location.hash !== `#${normalizedId}`) {
    window.history.pushState(null, "", `/#${normalizedId}`);
  }

  window.scrollTo({
    top: Math.max(top, 0),
    behavior,
  });

  return true;
};
