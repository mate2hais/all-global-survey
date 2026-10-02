import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, FileText, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { CONTACT, PROCESS } from "@/lib/site-data";

const TITLE = "Procesul de lucru — cum se emite un certificat sau audit energetic în Galați";
const DESC =
  "De la primul telefon până la predarea documentului: pașii, documentele necesare și durata medie de livrare pentru certificate și audituri energetice.";

export const Route = createFileRoute("/proces")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/proces" },
    ],
    links: [{ rel: "canonical", href: "/proces" }],
  }),
  component: ProcesPage,
});

const DOCS = [
  "Act de proprietate (contract, extras de carte funciară)",
  "Copie act de identitate al proprietarului",
  "Releveu / schiță cu suprafețele, dacă există",
  "Facturi de energie pe ultimele 12–36 de luni (pentru audit)",
  "Detalii despre lucrările de reabilitare făcute (termosistem, tâmplărie, centrală, panouri)",
  "Pentru asociații: hotărârea adunării generale și datele administratorului",
];

function ProcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Procesul de lucru"
        title="Cum decurge o lucrare, pas cu pas"
        description="Un proces clar, fără surprize: știți de la început ce trimiteți, când vin la fața locului și când primiți documentul."
      />

      <div className="mx-auto max-w-5xl px-6 py-16">
        <ol className="relative space-y-8 border-l-2 border-border pl-8">
          {PROCESS.map((step, i) => (
            <Reveal key={step.title} as="li" delay={i * 70}>
              <span className="absolute -left-[21px] flex size-10 items-center justify-center rounded-full bg-[image:var(--gradient-primary)] text-sm font-bold text-primary-foreground">
                {i + 1}
              </span>
              <div className="surface-card p-6">
                <h2 className="font-semibold">{step.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="surface-card h-full p-7">
              <p className="flex items-center gap-2 font-semibold">
                <FileText className="size-5 text-primary" /> Documente necesare din partea
                dumneavoastră
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {DOCS.map((d) => (
                  <li key={d} className="flex gap-2">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="surface-card h-full p-7">
              <p className="flex items-center gap-2 font-semibold">
                <Clock className="size-5 text-secondary" /> Durata medie de livrare
              </p>
              <ul className="mt-4 space-y-3 text-sm">
                {[
                  ["Certificat apartament / casă", "1–3 zile lucrătoare"],
                  ["Certificat spațiu comercial", "2–4 zile lucrătoare"],
                  ["Audit clădire / bloc", "5–20 zile lucrătoare"],
                  ["Audit industrial", "2–6 săptămâni"],
                  ["Studiu NZEB / SER", "7–15 zile lucrătoare"],
                ].map(([k, v]) => (
                  <li key={k} className="flex justify-between gap-4 border-b border-border pb-2">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-semibold">{v}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-muted-foreground">
                Pentru situații urgente (semnare la notar în aceeași săptămână) sunați direct — de
                cele mai multe ori găsim o soluție.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <Button asChild variant="cta" size="lg">
              <a href={CONTACT.phoneHref}>
                <Phone /> {CONTACT.phoneDisplay}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Trimite o solicitare</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </>
  );
}
