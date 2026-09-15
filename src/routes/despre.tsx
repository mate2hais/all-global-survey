import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Phone,
  BadgeCheck,
  ShieldCheck,
  Factory,
  Sun,
  Building2,
  Landmark,
  School,
  Hospital,
  Building,
  FileCheck,
  ClipboardList,
  Briefcase,
  HardHat,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { CONTACT } from "@/lib/site-data";
import portretAsset from "@/assets/portret-auditor.jpg.asset.json";
const portret = portretAsset.url;

const TITLE = "Despre Iulian Gabriel Panainte — Auditor Energetic Gradul I, Galați";
const DESC =
  "Auditor energetic pentru clădiri, Grad I, atestat CAA nr. 02471. Peste 4 ani de experiență în audituri energetice, studii SER / nZEB pentru clădiri publice, rezidențiale, administrative, medicale și educaționale.";

export const Route = createFileRoute("/despre")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/despre" },
    ],
    links: [{ rel: "canonical", href: "/despre" }],
  }),
  component: DesprePage,
});

const audits = [
  {
    icon: Landmark,
    title: "Sediu MAI Tecuci",
    area: "~ 998,3 m²",
    desc: "Clădire publică / administrativă. Analiza energetică a anvelopei, evaluarea instalațiilor, determinarea indicatorilor de performanță și stabilirea măsurilor de reducere a consumurilor.",
  },
  {
    icon: Building2,
    title: "ISU Ciolpani, județul Ilfov",
    area: "~ 897 m²",
    desc: "Clădire cu funcțiune publică. Documentația a inclus analiza stării energetice, evaluarea performanței și stabilirea soluțiilor de modernizare energetică.",
  },
  {
    icon: School,
    title: "Liceul „Alexandru cel Bun”, Botoșani",
    area: "~ 2.080 m²",
    desc: "Domeniul educațional. Auditul a vizat analiza energetică a clădirii de învățământ, evaluarea consumurilor și a măsurilor pentru creșterea eficienței energetice.",
  },
  {
    icon: Building,
    title: "Cămin „Alexandru cel Bun”, Botoșani",
    area: "~ 2.030,2 m²",
    desc: "Cămin. Au fost analizate elementele de anvelopă, instalațiile, consumurile și măsurile de reabilitare / modernizare necesare pentru îmbunătățirea performanței energetice.",
  },
  {
    icon: Hospital,
    title: "Policlinica Mare „Sf. Spiridon”, Iași",
    area: "~ 9.132 m²",
    desc: "Funcțiune medicală, complexitate ridicată. Experiență în gestionarea unui obiectiv mare, cu regim de exploatare complex și instalații diverse.",
  },
  {
    icon: Briefcase,
    title: "Alte clădiri publice și administrative",
    area: "Diverse",
    desc: "Portofoliu extins pentru clădiri administrative, birouri, spații comerciale și rezidențiale colective — adaptare la cerințe tehnice și configurații constructive variate.",
  },
];

const studies = [
  {
    icon: FileCheck,
    title: "Studiu SAER — Construire stadion pe structură metalică, Timișoara",
    desc: "Obiectiv public de anvergură, cu analiza soluțiilor energetice și integrarea cerințelor de eficiență energetică.",
  },
  {
    icon: ShieldCheck,
    title: "SAER — Poligon Timișoara",
    desc: "Clădire nouă, cu analiză energetică și încadrare în cerințele actuale de performanță energetică.",
  },
  {
    icon: Factory,
    title: "SAER — Parc Industrial Dolj",
    desc: "Documentație pentru un ansamblu de clădiri, cu abordare integrată a performanței energetice și a soluțiilor tehnice aplicabile mai multor corpuri.",
  },
  {
    icon: School,
    title: "SER — Școala Gimnazială nr. 1 Movileni, Galați",
    area: "~ 1.367,7 m²",
    desc: "Clădire publică educațională, cu specific funcțional relevant pentru obiectivele finanțate public.",
  },
  {
    icon: School,
    title: "SER — Școala Gimnazială nr. 2 Movileni, Galați",
    area: "~ 505 m²",
    desc: "Lucrare complementară pentru o clădire publică educațională din județul Galați.",
  },
  {
    icon: Sun,
    title: "Lucrări nZEB pentru birouri, hale și construcții private",
    desc: "Experiență în aplicarea cerințelor actuale privind performanța energetică la clădiri noi și modernizate.",
  },
];

const activities = [
  "Colectarea și verificarea documentației tehnice existente",
  "Analiza caracteristicilor geometrice și constructive ale clădirilor",
  "Identificarea și evaluarea elementelor de anvelopă",
  "Analiza instalațiilor de încălzire, apă caldă de consum, ventilare, climatizare și iluminat",
  "Determinarea indicatorilor specifici de performanță energetică",
  "Evaluarea nivelului consumurilor energetice și a potențialului de reducere",
  "Elaborarea scenariilor de îmbunătățire a performanței energetice",
  "Formularea măsurilor de intervenție tehnică pentru modernizare și creșterea eficienței energetice",
  "Întocmirea documentațiilor finale specifice",
];

const capabilities = [
  "Experiență în elaborarea auditurilor energetice pentru clădiri publice",
  "Experiență relevantă pentru clădiri educaționale și cămine",
  "Experiență în lucrări pentru obiective de dimensiuni mari",
  "Capacitatea de a întocmi documentații tehnice clare, complete și conforme cu cerințele legale",
  "Experiență complementară în studii SER / nZEB, utilă în proiecte finanțate prin PNRR",
];

function DesprePage() {
  return (
    <>
      <PageHero
        eyebrow="Despre"
        title="Iulian Gabriel Panainte, Auditor Energetic Gradul I"
        description="Auditor energetic pentru clădiri, atestat CAA nr. 02471 / 22.02.2021. Peste 4 ani de activitate în evaluarea performanței energetice a clădirilor din Galați și din județ, cu peste 600 de documente și lucrări realizate."
      />

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[minmax(0,380px)_1fr]">
        <Reveal>
          <img
            src={portret}
            alt="Iulian Gabriel Panainte, auditor energetic gradul I în Galați"
            width={1000}
            height={1200}
            loading="lazy"
            className="w-full rounded-2xl object-cover shadow-[var(--shadow-card)]"
          />
          <div className="surface-card mt-6 p-6">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <BadgeCheck className="size-4 text-primary" /> Calitate profesională
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              <strong>Auditor energetic pentru clădiri – Grad I</strong>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              <strong>Atestat:</strong> CAA nr. 02471, emis la data de 22.02.2021
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              <strong>Domeniu de activitate:</strong> audit energetic pentru clădiri, certificate de
              performanță energetică, studii SER / nZEB pentru clădiri publice, rezidențiale,
              administrative, medicale și educaționale.
            </p>
          </div>
        </Reveal>

        <div className="space-y-10">
          <Reveal>
            <h2 className="text-2xl font-bold">Cine sunt și ce fac</h2>
            <p className="mt-3 text-muted-foreground">
              Lucrez ca auditor energetic în Galați și mă ocup de tot ce înseamnă evaluarea
              consumului de energie al unei clădiri: de la certificatul cerut de notar la vânzarea
              unui apartament, până la auditul complet al unei hale de producție sau la documentația
              NZEB pentru o construcție nouă.
            </p>
            <p className="mt-3 text-muted-foreground">
              Fiecare lucrare este realizată personal, de la măsurători până la semnătura de pe
              document. Nu lucrez cu intermediari și nu subcontractez.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="text-2xl font-bold">Ce înseamnă Gradul I</h2>
            <p className="mt-3 text-muted-foreground">
              Atestarea de gradul I permite întocmirea certificatelor și auditurilor energetice
              pentru orice tip și mărime de clădire — locuințe individuale, blocuri, spații
              comerciale, clădiri publice și obiective industriale. Un auditor cu grad inferior nu
              poate semna toate aceste categorii de lucrări.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <h2 className="text-2xl font-bold">Specializări</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {[
                { icon: Sun, t: "Studii NZEB", d: "Clădiri noi și renovări majore cu consum aproape zero." },
                { icon: Sun, t: "Studii SER", d: "Fotovoltaice, pompe de căldură, solar termic." },
                { icon: Factory, t: "Audit industrial", d: "Hale, fabrici și spații de producție." },
              ].map((s) => (
                <div key={s.t} className="surface-card p-5">
                  <s.icon className="size-5 text-primary" />
                  <p className="mt-3 font-semibold">{s.t}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="rounded-2xl border border-primary/25 bg-accent p-7">
              <p className="flex items-center gap-2 font-semibold text-accent-foreground">
                <ShieldCheck className="size-5" /> Angajamentul meu: vizita la fața locului
              </p>
              <p className="mt-3 text-sm text-accent-foreground/90">
                Pe piață există practica de a emite certificate „din birou”, doar pe baza unei
                suprafețe comunicate telefonic. Un astfel de document nu reflectă clădirea reală și
                poate fi contestat. Eu vin întotdeauna la fața locului, măsor și fotografiez, iar
                valorile din certificat corespund construcției dumneavoastră.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="cta" size="lg">
                <a href={CONTACT.phoneHref}>
                  <Phone /> {CONTACT.phoneDisplay}
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/proces">Vezi cum decurge o lucrare</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>

      <section className="border-t border-border bg-muted/20">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <Reveal>
            <div className="max-w-3xl">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                Portofoliu
              </span>
              <h2 className="mt-2 text-3xl font-bold">Audituri energetice relevante realizate</h2>
              <p className="mt-3 text-muted-foreground">
                În cadrul activității desfășurate au fost realizate audituri energetice pentru clădiri
                publice și obiective cu complexitate ridicată, dintre care menționez următoarele
                exemple relevante:
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {audits.map((a, i) => (
              <Reveal key={a.title} delay={i * 60}>
                <div className="surface-card h-full p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-primary/10 p-3 text-primary">
                      <a.icon className="size-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{a.title}</h3>
                      <span className="mt-1 inline-block rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                        {a.area}
                      </span>
                      <p className="mt-2 text-sm text-muted-foreground">{a.desc}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-16 max-w-3xl">
              <h2 className="text-3xl font-bold">Studii SER / nZEB și documentații pentru investiții</h2>
              <p className="mt-3 text-muted-foreground">
                Pe lângă auditurile energetice propriu-zise, activitatea profesională a inclus
                elaborarea de studii SER / SAER / nZEB pentru investiții publice și private — un
                avantaj important în contextul proiectelor finanțate prin PNRR.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {studies.map((s, i) => (
              <Reveal key={s.title} delay={i * 60}>
                <div className="surface-card h-full p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-secondary/10 p-3 text-secondary-foreground">
                      <s.icon className="size-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{s.title}</h3>
                      {s.area && (
                        <span className="mt-1 inline-block rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                          {s.area}
                        </span>
                      )}
                      <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="surface-card h-full p-6">
                <p className="flex items-center gap-2 font-semibold">
                  <ClipboardList className="size-5 text-primary" />
                  Tipologia activităților desfășurate
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  În cadrul lucrărilor executate, activitatea profesională a presupus în mod curent:
                </p>
                <ul className="mt-4 space-y-2.5">
                  {activities.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="surface-card h-full p-6">
                <p className="flex items-center gap-2 font-semibold">
                  <HardHat className="size-5 text-primary" />
                  Capacitate profesională și organizare
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Activitatea desfășurată reflectă experiență atât pe lucrări individuale, cât și pe
                  obiective multiple, cu diferite grade de complexitate:
                </p>
                <ul className="mt-4 space-y-2.5">
                  {capabilities.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-muted-foreground">
                  Pentru fiecare lucrare au fost asigurate condițiile de trasabilitate și control al
                  calității, fiind arhivate documentația primită, breviarele de calcul, fotografiile,
                  rapoartele și fișierele de ieșire, precum și, după caz, dovada transmiterii în
                  baza de date.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
