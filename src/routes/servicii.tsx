import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, Check, Clock, FileText, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { CONTACT, SERVICES } from "@/lib/site-data";

const TITLE = "Servicii audit energetic Galați — certificate, audit industrial, NZEB";
const DESC =
  "Certificate de performanță energetică, audit energetic pentru clădiri și blocuri, audit industrial, consultanță NZEB și SER în Galați și județ.";

export const Route = createFileRoute("/servicii")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/servicii" },
    ],
    links: [{ rel: "canonical", href: "/servicii" }],
  }),
  component: ServiciiPage,
});

function ServiciiPage() {
  return (
    <>
      <PageHero
        eyebrow="Servicii"
        title="Servicii de audit și certificare energetică în Galați"
        description="Pentru persoane fizice, asociații de proprietari, firme, instituții publice și investitori industriali. Toate lucrările sunt realizate personal, cu vizită la fața locului."
      >
        <Button asChild variant="cta" size="lg">
          <a href={CONTACT.phoneHref}>
            <Phone /> {CONTACT.phoneDisplay}
          </a>
        </Button>
      </PageHero>

      <div className="mx-auto max-w-5xl space-y-8 px-6 py-16">
        {SERVICES.map((s, i) => (
          <Reveal key={s.slug} delay={i * 50}>
            <article id={s.slug} className="surface-card scroll-mt-28 p-7 md:p-9">
              <h2 className="text-xl font-bold md:text-2xl">{s.title}</h2>
              <p className="mt-3 text-muted-foreground">{s.description}</p>

              <div className="mt-7 grid gap-7 md:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold">Ce presupune</p>
                  <ul className="mt-3 space-y-2">
                    {s.includes.map((it) => (
                      <li key={it} className="flex gap-2 text-sm text-muted-foreground">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold">Documente necesare</p>
                  <ul className="mt-3 space-y-2">
                    {s.documents.map((it) => (
                      <li key={it} className="flex gap-2 text-sm text-muted-foreground">
                        <FileText className="mt-0.5 size-4 shrink-0 text-secondary" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-3 border-t border-border pt-5 text-sm">
                <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1.5 text-accent-foreground">
                  <Clock className="size-4" /> Durată estimată: {s.duration}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-secondary-soft px-3 py-1.5 text-secondary">
                  <Users className="size-4" /> {s.audience}
                </span>
              </div>
            </article>
          </Reveal>
        ))}

        <Reveal>
          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <h2 className="text-xl font-bold">Nu sunteți sigur de ce document aveți nevoie?</h2>
            <p className="mt-2 text-muted-foreground">
              Sunați și lămurim în câteva minute ce vă cere notarul, primăria sau finanțatorul.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild variant="cta" size="lg">
                <a href={CONTACT.phoneHref}>
                  <Phone /> {CONTACT.phoneDisplay}
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/preturi">Vezi prețurile orientative</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );
}
