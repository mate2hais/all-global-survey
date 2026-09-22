import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, Phone, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { TestimonialForm } from "@/components/site/TestimonialForm";
import { CONTACT, TESTIMONIALS, CASE_STUDIES } from "@/lib/site-data";
import { getPublicTestimonials } from "@/lib/public-content.functions";
import halaImg from "@/assets/hala-industriala.jpg";
import nzebImg from "@/assets/nzeb.jpg";

const TITLE = "Testimoniale și studii de caz — auditor energetic Galați";
const DESC =
  "Recenzii de la proprietari, asociații și firme din Galați, plus studii de caz pentru un audit industrial și o clădire NZEB.";

export const Route = createFileRoute("/testimoniale")({
  loader: () => getPublicTestimonials(),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/testimoniale" },
    ],
    links: [{ rel: "canonical", href: "/testimoniale" }],
  }),
  component: TestimonialePage,
});

const IMAGES = [halaImg, nzebImg];

function TestimonialePage() {
  const rows = Route.useLoaderData();
  const testimonials = rows.length > 0 ? rows : TESTIMONIALS;
  return (
    <>
      <PageHero
        eyebrow="Testimoniale"
        title="Clienți din Galați și din județ"
        description="Recenzii reale de la proprietari, asociații de proprietari și firme, plus două lucrări prezentate în detaliu."
      />

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 60}>
              <div className="surface-card h-full p-6">
                <div className="flex gap-0.5 text-primary">
                  {Array.from({ length: t.rating }).map((_, k) => (
                    <Star key={k} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-sm text-muted-foreground">„{t.text}”</p>
                <p className="mt-5 text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.city}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <h2 className="mt-20 text-2xl font-bold md:text-3xl">Lasă o recenzie</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Ați colaborat cu noi? Acordați un punctaj și povestiți experiența — recenzia apare pe site
            după verificare.
          </p>
          <div className="mt-6 max-w-3xl">
            <TestimonialForm />
          </div>
        </Reveal>

        <h2 className="mt-20 text-2xl font-bold md:text-3xl">Studii de caz</h2>
        <div className="mt-8 space-y-10">
          {CASE_STUDIES.map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <article className="surface-card grid gap-0 overflow-hidden md:grid-cols-[minmax(0,340px)_1fr]">
                <img
                  src={IMAGES[i]}
                  alt={c.title}
                  width={1200}
                  height={800}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="p-7">
                  <h3 className="text-lg font-semibold">{c.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{c.context}</p>
                  <ul className="mt-5 space-y-2">
                    {c.actions.map((a) => (
                      <li key={a} className="flex gap-2 text-sm text-muted-foreground">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                        {a}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 rounded-lg bg-accent p-4 text-sm font-medium text-accent-foreground">
                    Rezultat: {c.result}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-14 flex flex-wrap justify-center gap-3">
            <Button asChild variant="cta" size="lg">
              <a href={CONTACT.phoneHref}>
                <Phone /> {CONTACT.phoneDisplay}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Solicită o ofertă</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </>
  );
}
