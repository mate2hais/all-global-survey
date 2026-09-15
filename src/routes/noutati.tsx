import { createFileRoute } from "@tanstack/react-router";
import { Newspaper, ScrollText } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { Badge } from "@/components/ui/badge";
import { getPublicNews } from "@/lib/public-content.functions";

const TITLE = "Noutăți și reglementări — Auditor energetic Galați";
const DESC =
  "Noutăți din domeniul performanței energetice a clădirilor și reglementări legislative actualizate, explicate de un auditor energetic Gradul I din Galați.";

export const Route = createFileRoute("/noutati")({
  loader: () => getPublicNews(),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/noutati" }],
  }),
  errorComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="text-2xl font-bold">Noutățile nu pot fi afișate momentan</h1>
      <p className="mt-3 text-muted-foreground">Vă rugăm reîncărcați pagina în câteva momente.</p>
    </div>
  ),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="text-2xl font-bold">Pagina nu a fost găsită</h1>
    </div>
  ),
  component: NoutatiPage,
});

function NoutatiPage() {
  const items = Route.useLoaderData();

  return (
    <>
      <PageHero
        eyebrow="Noutăți"
        title="Noutăți și reglementări în performanța energetică"
        description="Informații actualizate despre legislație, cerințe nZEB, programe de finanțare și obligațiile proprietarilor de clădiri."
      />

      <div className="mx-auto max-w-4xl px-6 py-16">
        {items.length === 0 ? (
          <p className="surface-card p-8 text-center text-muted-foreground">
            <Newspaper className="mx-auto mb-3 size-6" />
            Momentan nu există noutăți publicate. Reveniți în curând.
          </p>
        ) : (
          <div className="space-y-6">
            {items.map((item, i) => (
              <Reveal key={item.id} delay={i * 60}>
                <article className="surface-card p-7">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">
                      {item.category === "reglementare" ? (
                        <>
                          <ScrollText className="mr-1 size-3" /> Reglementare
                        </>
                      ) : (
                        <>
                          <Newspaper className="mr-1 size-3" /> Știre
                        </>
                      )}
                    </Badge>
                    <time className="text-xs text-muted-foreground">
                      {new Date(item.published_at).toLocaleDateString("ro-RO")}
                    </time>
                  </div>
                  <h2 className="mt-3 text-xl font-bold">{item.title}</h2>
                  {item.excerpt && (
                    <p className="mt-2 text-sm text-muted-foreground">{item.excerpt}</p>
                  )}
                  {item.content && (
                    <p className="mt-4 text-sm leading-relaxed whitespace-pre-line">
                      {item.content}
                    </p>
                  )}
                  {item.image_url && (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      loading="lazy"
                      className="mt-5 w-full rounded-xl object-cover"
                    />
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
