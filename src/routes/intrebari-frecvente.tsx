import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CONTACT, FAQ } from "@/lib/site-data";
import { getPublicFaq } from "@/lib/public-content.functions";

const TITLE = "Întrebări frecvente — certificat și audit energetic Galați";
const DESC =
  "Ce este certificatul energetic, diferența față de audit, ce înseamnă Gradul I, standardul NZEB, costuri, durate și valabilitatea de 10 ani.";

export const Route = createFileRoute("/intrebari-frecvente")({
  loader: () => getPublicFaq(),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/intrebari-frecvente" },
    ],
    links: [{ rel: "canonical", href: "/intrebari-frecvente" }],
  }),
  component: FaqPage,
});

function FaqPage() {
  const rows = Route.useLoaderData();
  const items = rows.length > 0
    ? rows.map((r) => ({ q: r.question, a: r.answer }))
    : FAQ;
  return (
    <>
      <PageHero
        eyebrow="Întrebări frecvente"
        title="Răspunsuri la cele mai frecvente întrebări"
        description="Dacă nu găsiți răspunsul aici, sunați — răspund personal la telefon."
      />
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Reveal>
          <Accordion type="single" collapsible className="w-full">
            {items.map((item, i) => (
              <AccordionItem key={item.q} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-base font-semibold">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>

        <Reveal>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <Button asChild variant="cta" size="lg">
              <a href={CONTACT.phoneHref}>
                <Phone /> {CONTACT.phoneDisplay}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Scrie-mi un mesaj</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </>
  );
}
