import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, Check, ShieldCheck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { CONTACT, PRICING } from "@/lib/site-data";
import { getPublicPrices } from "@/lib/public-content.functions";

const TITLE = "Prețuri certificat și audit energetic Galați — tarife orientative";
const DESC =
  "Tarife orientative pentru certificat energetic apartament, casă, clădiri publice, audit energetic clădiri și audit industrial în Galați. Preț final fără surprize.";

export const Route = createFileRoute("/preturi")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/preturi" },
    ],
    links: [{ rel: "canonical", href: "/preturi" }],
  }),
  component: PreturiPage,
});

function PreturiPage() {
  return (
    <>
      <PageHero
        eyebrow="Prețuri"
        title="Tarife orientative, comunicate din start"
        description="Tarifele serviciilor noastre sunt competitive și adaptate fiecărui proiect. Prețul final depinde de suprafață, tipul clădirii și complexitatea instalațiilor, dar îl aflați înainte de a începe lucrarea."
      >
        <Button asChild variant="cta" size="lg">
          <a href={CONTACT.phoneHref}>
            <Phone /> Cere ofertă: {CONTACT.phoneDisplay}
          </a>
        </Button>
      </PageHero>

      <div className="mx-auto max-w-5xl px-6 py-16">
        <Reveal>
          <div className="surface-card overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/60">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Tip serviciu</th>
                    <th className="px-5 py-4 font-semibold">Tarif</th>
                    <th className="px-5 py-4 font-semibold">Termen de livrare</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {PRICING.map((row, i) => (
                    <tr key={i} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-4 align-top font-medium">{row.service}</td>
                      <td className="px-5 py-4 align-top whitespace-nowrap gradient-text font-bold">
                        {row.price}
                      </td>
                      <td className="px-5 py-4 align-top whitespace-nowrap text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="size-3.5 text-primary" />
                          {row.delivery}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-t border-border bg-accent/40 px-5 py-4 text-sm text-accent-foreground">
              <p className="flex items-start gap-2">
                <Clock className="mt-0.5 size-4 shrink-0" />
                Auditul industrial începe de la 7 zile pentru realizarea auditului; pentru urgențe
                se poate percepe o taxă suplimentară.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Tarif comunicat înainte de lucru",
              "Fără costuri ascunse",
              "Deplasare și măsurători incluse",
              "Valabilitate 10 ani pentru certificate",
            ].map((item) => (
              <div
                key={item}
                className="surface-card flex items-start gap-3 p-4 text-sm"
              >
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 rounded-2xl border border-primary/25 bg-accent p-8">
            <p className="flex items-center gap-2 font-semibold text-accent-foreground">
              <ShieldCheck className="size-5" /> Transparență și corectitudine
            </p>
            <p className="mt-3 text-sm text-accent-foreground/90">
              Prețurile de mai sus sunt orientative și pornesc de la lucrări standard. Oferta finală
              se stabilește după o scurtă discuție despre suprafață, tipul clădirii și instalații,
              iar suma comunicată include deplasarea, măsurătorile, emiterea documentului și
              recomandările de eficientizare. Un preț suspect de mic pe piață înseamnă, de regulă,
              un document emis fără vizită la fața locului — cu riscul de a fi contestat.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="cta">
                <a href={CONTACT.phoneHref}>
                  <Phone /> {CONTACT.phoneDisplay}
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link to="/contact">Solicită ofertă personalizată</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );
}
