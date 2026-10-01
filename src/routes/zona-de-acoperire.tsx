import { createFileRoute } from "@tanstack/react-router";
import { Phone, MapPin, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { CONTACT, AREAS } from "@/lib/site-data";

const TITLE = "Zonă de acoperire — auditor energetic în Galați, Tecuci, Târgu Bujor, Berești";
const DESC =
  "Certificate și audituri energetice în municipiul Galați și în tot județul: Tecuci, Târgu Bujor, Berești și comunele din județul Galați.";

export const Route = createFileRoute("/zona-de-acoperire")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/zona-de-acoperire" },
    ],
    links: [{ rel: "canonical", href: "/zona-de-acoperire" }],
  }),
  component: ZonaPage,
});

const COMUNE = [
  "Pechea", "Independența", "Șendreni", "Vânători", "Smârdan", "Tulucești", "Liești", "Ivești",
  "Matca", "Corod", "Cudalbi", "Umbrărești", "Braniștea", "Frumușița", "Foltești", "Măstăcani",
  "Nămoloasa", "Barcea", "Munteni", "Drăgănești", "Schela", "Costache Negri", "Piscu", "Slobozia Conachi",
];

function ZonaPage() {
  return (
    <>
      <PageHero
        eyebrow="Zonă de acoperire"
        title="Mă deplasez în tot județul Galați"
        description="Vizita la fața locului este obligatorie pentru orice lucrare, așa că deplasarea face parte din serviciu — indiferent dacă sunteți în Mazepa sau într-o comună la 60 de km."
      >
        <Button asChild variant="cta" size="lg">
          <a href={CONTACT.phoneHref}>
            <Phone /> {CONTACT.phoneDisplay}
          </a>
        </Button>
      </PageHero>

      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {AREAS.map((a, i) => (
            <Reveal key={a.name} delay={i * 60}>
              <div className="surface-card h-full p-6">
                <p className="flex items-center gap-2 font-semibold">
                  <MapPin className="size-4 text-primary" /> {a.name}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{a.note}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 overflow-hidden rounded-2xl border border-border">
            <iframe
              title="Hartă Galați"
              src="https://www.openstreetmap.org/export/embed.html?bbox=27.85%2C45.35%2C28.20%2C45.55&layer=mapnik&marker=45.4353%2C28.0080"
              width={1152}
              height={380}
              className="h-[380px] w-full"
              loading="lazy"
            />
          </div>
        </Reveal>

        <Reveal>
          <h2 className="mt-14 text-2xl font-bold">Comune deservite în județul Galați</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {COMUNE.map((c) => (
              <li
                key={c}
                className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-muted-foreground"
              >
                {c}
              </li>
            ))}
            <li className="rounded-full bg-accent px-3.5 py-1.5 text-sm font-medium text-accent-foreground">
              și restul localităților din județ
            </li>
          </ul>
        </Reveal>

        <Reveal>
          <div className="mt-12 flex gap-4 rounded-2xl border border-secondary/25 bg-secondary-soft p-7">
            <Car className="size-6 shrink-0 text-secondary" />
            <div>
              <p className="font-semibold text-secondary">Deplasarea în teren</p>
              <p className="mt-2 text-sm text-secondary/90">
                În municipiul Galați deplasarea este inclusă în preț. Pentru localitățile aflate la
                peste 30 km se poate aplica o taxă de deplasare, comunicată din start, la ofertare.
                Nu apar niciodată costuri suplimentare după acceptarea ofertei.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );
}
