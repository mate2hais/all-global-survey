import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { CONTACT } from "@/lib/site-data";

const TITLE = "Termeni și condiții — Iulian Gabriel Panainte, auditor energetic Galați";
const DESC =
  "Condițiile de utilizare a site-ului și de prestare a serviciilor de audit și certificare energetică.";

export const Route = createFileRoute("/termeni")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/termeni" },
    ],
    links: [{ rel: "canonical", href: "/termeni" }],
  }),
  component: TermeniPage,
});

const SECTIONS = [
  {
    h: "1. Informații generale",
    p: [
      `Acest site este administrat de ${CONTACT.name}, auditor energetic pentru clădiri, gradul I, cu activitate în municipiul Galați și în județul Galați. Contact: ${CONTACT.phoneDisplay}, ${CONTACT.email}.`,
    ],
  },
  {
    h: "2. Serviciile prestate",
    p: [
      "Serviciile constau în întocmirea certificatelor de performanță energetică, a auditurilor energetice pentru clădiri și obiective industriale, precum și în consultanță pentru clădiri NZEB și pentru integrarea surselor regenerabile de energie.",
      "Lucrările se realizează în conformitate cu legislația în vigoare, inclusiv Legea 372/2005 privind performanța energetică a clădirilor și reglementările tehnice aplicabile.",
    ],
  },
  {
    h: "3. Ofertare și contractare",
    p: [
      "Prețurile afișate pe site sunt orientative. Oferta fermă se comunică după stabilirea datelor concrete ale clădirii (suprafață, destinație, instalații, localitate) și rămâne neschimbată pe parcursul lucrării, cu excepția situațiilor în care beneficiarul modifică obiectul solicitării.",
      "Emiterea documentelor este condiționată de punerea la dispoziție a informațiilor și actelor solicitate, precum și de asigurarea accesului pentru vizita la fața locului.",
    ],
  },
  {
    h: "4. Responsabilitatea beneficiarului",
    p: [
      "Beneficiarul răspunde pentru corectitudinea informațiilor și a documentelor puse la dispoziție. Documentele emise reflectă situația constatată la data vizitei la fața locului.",
    ],
  },
  {
    h: "5. Conținutul site-ului",
    p: [
      "Informațiile publicate au caracter informativ și nu înlocuiesc o evaluare tehnică personalizată. Conținutul site-ului (texte, imagini, structură) este protejat și nu poate fi reprodus fără acord scris.",
    ],
  },
  {
    h: "6. Modificarea termenilor",
    p: [
      "Termenii pot fi actualizați periodic. Versiunea aplicabilă este cea publicată pe site la momentul solicitării serviciului.",
    ],
  },
];

function TermeniPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Termeni și condiții" />
      <div className="mx-auto max-w-3xl space-y-8 px-6 py-16">
        {SECTIONS.map((s) => (
          <section key={s.h}>
            <h2 className="text-lg font-bold">{s.h}</h2>
            {s.p.map((p) => (
              <p key={p} className="mt-3 text-sm text-muted-foreground">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>
    </>
  );
}
