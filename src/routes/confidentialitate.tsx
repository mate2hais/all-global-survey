import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { CONTACT } from "@/lib/site-data";

const TITLE = "Politica de confidențialitate (GDPR) — auditor energetic Galați";
const DESC =
  "Cum sunt colectate, folosite și protejate datele personale transmise prin formularul de contact sau telefonic.";

export const Route = createFileRoute("/confidentialitate")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/confidentialitate" },
    ],
    links: [{ rel: "canonical", href: "/confidentialitate" }],
  }),
  component: GdprPage,
});

const SECTIONS = [
  {
    h: "1. Operatorul datelor",
    p: [
      `Datele personale transmise prin acest site sunt prelucrate de ${CONTACT.name}, auditor energetic gradul I, Galați. Contact pentru orice solicitare privind datele: ${CONTACT.email}, telefon ${CONTACT.phoneDisplay}.`,
    ],
  },
  {
    h: "2. Ce date colectăm",
    p: [
      "Prin formularul de contact se colectează: nume și prenume, număr de telefon, adresă de email (opțional), localitatea și tipul clădirii, precum și detaliile pe care alegeți să le includeți în mesaj.",
      "În cadrul unei lucrări contractate pot fi prelucrate suplimentar date din actele de proprietate, strict în scopul întocmirii documentației tehnice.",
    ],
  },
  {
    h: "3. Scopul și temeiul prelucrării",
    p: [
      "Datele sunt folosite exclusiv pentru a răspunde solicitării dumneavoastră, a transmite oferta și a executa lucrarea contractată. Temeiul îl constituie consimțământul dumneavoastră și, după caz, executarea contractului și obligațiile legale ce revin auditorului energetic.",
    ],
  },
  {
    h: "4. Durata păstrării",
    p: [
      "Solicitările de ofertă care nu se finalizează într-un contract se păstrează maximum 12 luni. Documentațiile tehnice și datele aferente lucrărilor executate se păstrează pe durata prevăzută de reglementările aplicabile.",
    ],
  },
  {
    h: "5. Cui sunt transmise datele",
    p: [
      "Datele nu sunt vândute și nu sunt transmise către terți în scopuri de marketing. Ele pot fi comunicate exclusiv autorităților competente, atunci când legea o impune.",
    ],
  },
  {
    h: "6. Drepturile dumneavoastră",
    p: [
      "Aveți dreptul de acces, rectificare, ștergere, restricționare a prelucrării, portabilitate și opoziție, precum și dreptul de a vă retrage consimțământul în orice moment. Aceste drepturi pot fi exercitate printr-o solicitare la adresa de email de mai sus.",
      "De asemenea, aveți dreptul de a depune o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP).",
    ],
  },
  {
    h: "7. Cookie-uri",
    p: [
      "Site-ul folosește doar cookie-uri strict necesare funcționării corecte a paginilor. Nu sunt utilizate cookie-uri de profilare pentru publicitate.",
    ],
  },
];

function GdprPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Politica de confidențialitate (GDPR)" />
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
