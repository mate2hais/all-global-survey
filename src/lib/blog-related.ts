// Manually curated "Articole înrudite" mapping (slug → related slugs).
export const RELATED_POSTS: Record<string, string[]> = {
  "punti-termice-pierderi-invizibile": [
    "izolatia-termica-conteaza",
    "testul-blower-door-etanseitate-cladire",
    "certificatul-energetic-mai-mult-decat-o-litera",
  ],
  "izolatia-termica-conteaza": [
    "punti-termice-pierderi-invizibile",
    "tamplaria-performanta-ansamblu-complet",
    "racoare-naturala-si-facturi-mai-mici",
  ],
  "fotovoltaice-cu-plan-dimensionare-corecta": [
    "pompa-de-caldura-anvelopa-cladirii",
    "diagnosticul-energetic-inainte-de-investitie",
    "de-la-nzeb-la-zeb-standard-cladiri-noi",
  ],
  "pompa-de-caldura-anvelopa-cladirii": [
    "izolatia-termica-conteaza",
    "fotovoltaice-cu-plan-dimensionare-corecta",
    "diagnosticul-energetic-inainte-de-investitie",
  ],
  "ventilatia-cu-recuperare-de-caldura": [
    "condens-pe-geamuri-cauze-solutii",
    "testul-blower-door-etanseitate-cladire",
    "izolatia-termica-conteaza",
  ],
  "condens-pe-geamuri-cauze-solutii": [
    "ventilatia-cu-recuperare-de-caldura",
    "punti-termice-pierderi-invizibile",
    "tamplaria-performanta-ansamblu-complet",
  ],
  "certificatul-energetic-mai-mult-decat-o-litera": [
    "analiza-consumului-energetic-din-facturi",
    "de-la-nzeb-la-zeb-standard-cladiri-noi",
    "diagnosticul-energetic-inainte-de-investitie",
  ],
  "analiza-consumului-energetic-din-facturi": [
    "certificatul-energetic-mai-mult-decat-o-litera",
    "diagnosticul-energetic-inainte-de-investitie",
    "pompa-de-caldura-anvelopa-cladirii",
  ],
  "de-la-nzeb-la-zeb-standard-cladiri-noi": [
    "fotovoltaice-cu-plan-dimensionare-corecta",
    "certificatul-energetic-mai-mult-decat-o-litera",
    "diagnosticul-energetic-inainte-de-investitie",
  ],
  "diagnosticul-energetic-inainte-de-investitie": [
    "izolatia-termica-conteaza",
    "pompa-de-caldura-anvelopa-cladirii",
    "fotovoltaice-cu-plan-dimensionare-corecta",
  ],
  "racoare-naturala-si-facturi-mai-mici": [
    "izolatia-termica-conteaza",
    "tamplaria-performanta-ansamblu-complet",
    "ventilatia-cu-recuperare-de-caldura",
  ],
  "testul-blower-door-etanseitate-cladire": [
    "punti-termice-pierderi-invizibile",
    "tamplaria-performanta-ansamblu-complet",
    "ventilatia-cu-recuperare-de-caldura",
  ],
  "tamplaria-performanta-ansamblu-complet": [
    "izolatia-termica-conteaza",
    "racoare-naturala-si-facturi-mai-mici",
    "testul-blower-door-etanseitate-cladire",
  ],
};

export type RelatedPost = { slug: string; title: string; excerpt: string };

/** Resolve curated related slugs to real published posts (unpublished ones are skipped). */
export function resolveRelated(
  slug: string,
  posts: { slug: string; title: string; excerpt: string }[],
): RelatedPost[] {
  const wanted = RELATED_POSTS[slug] ?? [];
  const out: RelatedPost[] = [];
  for (const s of wanted) {
    const p = posts.find((x) => x.slug === s);
    if (p) out.push({ slug: p.slug, title: p.title, excerpt: p.excerpt });
  }
  return out;
}

export const SITE_ORIGIN = "https://certificatenergeticgalati.ro";

export function absoluteUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url;
  return `${SITE_ORIGIN}${url.startsWith("/") ? "" : "/"}${url}`;
}
