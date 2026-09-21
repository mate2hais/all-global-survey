import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { POSTS } from "@/lib/site-data";
import { getPublicBlogPosts } from "@/lib/public-content.functions";

const TITLE = "Blog — certificat energetic, NZEB și audit industrial în Galați";
const DESC =
  "Articole practice despre certificate energetice, clădiri NZEB, audit energetic industrial și surse regenerabile, explicate pentru proprietari și firme din Galați.";

export const Route = createFileRoute("/blog/")({
  loader: () => getPublicBlogPosts(),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const dbPosts = Route.useLoaderData();
  const posts = [
    ...dbPosts.map((p) => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      date: p.published_at,
      readTime: p.read_time,
    })),
    ...POSTS,
  ].sort((a, b) => (a.date < b.date ? 1 : -1));
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Ghiduri despre eficiența energetică a clădirilor"
        description="Răspunsuri clare la întrebările pe care le primesc cel mai des de la proprietari, asociații și firme din Galați."
      />
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-16 md:grid-cols-2">
        {posts.map((p, i) => (
          <Reveal key={p.slug} delay={i * 70}>
            <Link
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="surface-card flex h-full flex-col p-7"
            >
              <div className="flex gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="size-3.5" />
                  {new Date(p.date).toLocaleDateString("ro-RO", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-3.5" /> {p.readTime}
                </span>
              </div>
              <h2 className="mt-3 text-lg font-semibold">{p.title}</h2>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Citește articolul <ArrowRight className="size-4" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </>
  );
}
