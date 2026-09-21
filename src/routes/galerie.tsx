import { createFileRoute, Link } from "@tanstack/react-router";
import { Images, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { CONTACT } from "@/lib/site-data";
import { getPublicGallery } from "@/lib/public-content.functions";

const TITLE = "Galerie lucrări — certificate și audituri energetice Galați";
const DESC =
  "Imagini din lucrările de certificare energetică și audit energetic realizate în Galați și județul Galați.";

export const Route = createFileRoute("/galerie")({
  loader: () => getPublicGallery(),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/galerie" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/galerie" }],
  }),
  component: GaleriePage,
});

function GaleriePage() {
  const images = Route.useLoaderData();

  return (
    <>
      <PageHero
        eyebrow="Galerie"
        title="Galerie lucrări"
        description="Imagini din activitatea de certificare și audit energetic pentru locuințe, blocuri, clădiri publice și hale industriale."
      />

      <div className="mx-auto max-w-7xl px-6 py-16">
        {images.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((img, i) => (
              <Reveal key={img.id} delay={i * 60}>
                <figure className="surface-card overflow-hidden p-0">
                  <img
                    src={img.url}
                    alt={img.title}
                    loading="lazy"
                    className="h-64 w-full object-cover"
                  />
                  {img.title && (
                    <figcaption className="p-4 text-sm text-muted-foreground">
                      {img.title}
                    </figcaption>
                  )}
                </figure>
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            <Images className="mr-1 inline size-4" /> Galeria se completează în curând.
          </p>
        )}

        <div className="surface-card mt-14 flex flex-col items-start gap-5 p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-bold">Ai nevoie de un certificat energetic?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Sună pentru o ofertă rapidă sau trimite detaliile prin formular.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="cta">
              <a href={CONTACT.phoneHref}>
                <Phone className="mr-2 size-4" /> {CONTACT.phoneDisplay}
              </a>
            </Button>
            <Button asChild variant="outline">
              <Link to="/contact">Solicită ofertă</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
