import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Phone,
  ShieldCheck,
  MapPin,
  ArrowRight,
  Factory,
  Sun,
  Building2,
  Home,
  ClipboardCheck,
  Star,
  BadgeCheck,
  Timer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { CONTACT, SERVICES, AREAS, TESTIMONIALS } from "@/lib/site-data";
import { getSiteContent } from "@/lib/public-content.functions";
import heroImg from "@/assets/hero-cladiri.jpg";
import termografieImg from "@/assets/termografie.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const TITLE =
  "Auditor Energetic Galați — Certificate și audituri energetice | Iulian Gabriel Panainte";
const DESC =
  "Auditor energetic atestat Gradul I în Galați: certificate de performanță energetică, audituri pentru clădiri și industrie, consultanță NZEB și SER. Sună la 0773.932.496.";

export const Route = createFileRoute("/")({
  loader: () => getSiteContent(),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const ICONS = [Home, Building2, Factory, Sun, Sun, Building2];

function Index() {
  const content = Route.useLoaderData();
  const anunt = content["anunt_bara"]?.trim();
  return (
    <>
      {anunt && (
        <div className="bg-accent px-6 py-3 text-center text-sm font-medium text-accent-foreground">
          {anunt}
        </div>
      )}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImg}
          alt="Blocuri de locuințe și clădire industrială în Galați"
          width={1600}
          height={1000}
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[image:var(--gradient-hero)]" />
        <div className="mx-auto max-w-7xl px-6 py-20 text-primary-foreground md:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
            <BadgeCheck className="size-3.5" /> Atestat Gradul I · Ministerul Dezvoltării
          </span>
          <h1 className="mt-5 max-w-4xl text-3xl leading-tight font-bold md:text-5xl lg:text-6xl">
            {content["home_hero_title"]?.trim() ||
              "Iulian Gabriel Panainte — Auditor Energetic Gradul I în Galați"}
          </h1>
          <p className="mt-5 max-w-2xl text-base opacity-90 md:text-xl">
            {content["home_hero_subtitle"]?.trim() ||
              "Certificate de performanță energetică, audituri pentru clădiri și obiective industriale, consultanță NZEB și surse regenerabile. Fiecare lucrare include vizită la fața locului."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="cta" size="xl">
              <a href={CONTACT.phoneHref}>
                <Phone /> Sună acum: {CONTACT.phoneDisplay}
              </a>
            </Button>
            <Button asChild variant="onHero" size="xl">
              <Link to="/servicii">Vezi serviciile</Link>
            </Button>
          </div>
          <dl className="mt-12 grid max-w-3xl grid-cols-2 gap-6 border-t border-primary-foreground/20 pt-8 md:grid-cols-4">
            {[
              ["4+", "ani de experiență"],
              ["600+", "documente emise"],
              ["100%", "vizite la fața locului"],
              ["1–3 zile", "termen certificat"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="text-2xl font-bold md:text-3xl">{v}</dt>
                <dd className="text-xs opacity-80 md:text-sm">{l}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 max-w-3xl rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 p-5 text-sm leading-relaxed opacity-90 backdrop-blur-sm">
            Conform memoriului de activitate și registrului de evidență, au fost realizate în total{" "}
            <strong className="font-semibold">146 de lucrări</strong>, dintre care{" "}
            <strong className="font-semibold">132 certificate de performanță energetică</strong>,{" "}
            <strong className="font-semibold">6 audituri energetice pentru clădiri</strong> și{" "}
            <strong className="font-semibold">13 studii nZEB / SER</strong>.
          </p>
        </div>
      </section>

      <section className="section-soft py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Servicii</p>
            <h2 className="mt-3 text-2xl font-bold md:text-4xl">
              Tot ce ține de performanța energetică a clădirii dumneavoastră
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              De la certificatul necesar la notar, până la auditul unei hale de producție și studiile
              NZEB pentru construcții noi.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => {
              const Icon = ICONS[i] ?? ClipboardCheck;
              return (
                <Reveal key={service.slug} delay={i * 70}>
                  <Link
                    to="/servicii"
                    hash={service.slug}
                    className="surface-card flex h-full flex-col p-6"
                  >
                    <span className="flex size-11 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="mt-4 text-lg font-semibold">{service.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{service.short}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      Detalii <ArrowRight className="size-4" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
          <Reveal>
            <img
              src={termografieImg}
              alt="Măsurători termografice pe fațada unei clădiri"
              width={1200}
              height={800}
              loading="lazy"
              className="w-full rounded-2xl object-cover shadow-[var(--shadow-card)]"
            />
          </Reveal>
          <Reveal delay={100}>
            <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
              De ce să mă alegeți
            </p>
            <h2 className="mt-3 text-2xl font-bold md:text-4xl">
              Gradul I înseamnă că pot audita orice tip de clădire
            </h2>
            <ul className="mt-7 space-y-5">
              {[
                {
                  icon: ShieldCheck,
                  t: "Atestare Gradul I, fără limitări",
                  d: "Rezidențial, comercial, public sau industrial — indiferent de mărime sau complexitate, lucrarea poate fi semnată de mine.",
                },
                {
                  icon: ClipboardCheck,
                  t: "Vizită obligatorie la fața locului",
                  d: "Nu emit niciun document „din birou”. Măsor efectiv clădirea, ca valorile din certificat să reflecte realitatea.",
                },
                {
                  icon: Timer,
                  t: "Termene respectate",
                  d: "Certificat în 1–3 zile lucrătoare, audituri livrate la data stabilită de comun acord.",
                },
                {
                  icon: MapPin,
                  t: "Acoperire în tot județul",
                  d: "Galați, Tecuci, Târgu Bujor, Berești și comunele din județ — mă deplasez la dumneavoastră.",
                },
              ].map((b) => (
                <li key={b.t} className="flex gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <b.icon className="size-5" />
                  </span>
                  <div>
                    <p className="font-semibold">{b.t}</p>
                    <p className="text-sm text-muted-foreground">{b.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-secondary py-20 text-secondary-foreground">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.18em] uppercase opacity-80">
              Zonă de acoperire
            </p>
            <h2 className="mt-3 text-2xl font-bold md:text-4xl">
              Municipiul Galați și tot județul Galați
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {AREAS.map((area, i) => (
              <Reveal key={area.name} delay={i * 60}>
                <div className="h-full rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 p-6">
                  <p className="flex items-center gap-2 font-semibold">
                    <MapPin className="size-4" /> {area.name}
                  </p>
                  <p className="mt-2 text-sm opacity-80">{area.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <Button asChild variant="onHero" size="lg" className="mt-8">
              <Link to="/zona-de-acoperire">Vezi toate localitățile deservite</Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <h2 className="text-2xl font-bold md:text-4xl">Ce spun clienții din Galați</h2>
          </Reveal>
          <Reveal delay={80}>
            <Carousel opts={{ align: "start", loop: true }} className="mt-10">
              <CarouselContent>
                {TESTIMONIALS.map((t) => (
                  <CarouselItem key={t.name} className="md:basis-1/2 lg:basis-1/3">
                    <div className="surface-card h-full p-6">
                      <div className="flex gap-0.5 text-primary">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} className="size-4 fill-current" />
                        ))}
                      </div>
                      <p className="mt-4 text-sm text-muted-foreground">„{t.text}”</p>
                      <p className="mt-5 text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.city}</p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="rounded-3xl bg-[image:var(--gradient-primary)] px-8 py-14 text-center text-primary-foreground md:px-16">
              <h2 className="text-2xl font-bold md:text-4xl">
                Aveți nevoie de un certificat sau de un audit energetic?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl opacity-90">
                Spuneți-mi tipul clădirii și suprafața, iar în aceeași zi primiți o estimare clară de
                preț și de termen.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button asChild variant="onHero" size="xl">
                  <a href={CONTACT.phoneHref}>
                    <Phone /> {CONTACT.phoneDisplay}
                  </a>
                </Button>
                <Button asChild size="xl" variant="secondary">
                  <Link to="/contact">Completează formularul</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
