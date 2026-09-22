import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Clock, Newspaper } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { POSTS } from "@/lib/site-data";
import { getPublicBlogPosts, getPublicNews } from "@/lib/public-content.functions";

const TITLE = "Blog — certificat energetic, NZEB și audit industrial în Galați";
const DESC =
  "Articole practice despre certificate energetice, clădiri NZEB, audit energetic industrial și surse regenerabile, explicate pentru proprietari și firme din Galați.";

export const Route = createFileRoute("/blog/")({
  loader: async () => ({
    posts: await getPublicBlogPosts(),
    news: await getPublicNews(),
  }),
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
  const { posts: dbPosts, news } = Route.useLoaderData();
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
      {news.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pt-14">
          <h2 className="text-xl font-bold">Noutăți și reglementări</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {news.slice(0, 4).map((n, i) => (
              <Reveal key={n.id} delay={i * 60}>
                <Link to="/noutati" className="surface-card flex h-full flex-col p-6">
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Newspaper className="size-3.5" />
                    {new Date(n.published_at).toLocaleDateString("ro-RO")}
                  </span>
                  <h3 className="mt-2 text-base font-semibold">{n.title}</h3>
                  {n.excerpt && (
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{n.excerpt}</p>
                  )}
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Vezi noutățile <ArrowRight className="size-4" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}
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
