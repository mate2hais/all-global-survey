import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { CONTACT, POSTS } from "@/lib/site-data";
import { getPublicBlogPosts } from "@/lib/public-content.functions";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const staticPost = POSTS.find((p) => p.slug === params.slug);
    if (staticPost) return { post: staticPost };
    const dbPosts = await getPublicBlogPosts();
    const row = dbPosts.find((p) => p.slug === params.slug);
    if (!row) throw notFound();
    const body: { heading: string; paragraphs: string[] }[] = [];
    for (const block of row.content.split(/\n\s*\n/)) {
      const trimmed = block.trim();
      if (!trimmed) continue;
      if (trimmed.startsWith("#")) {
        body.push({ heading: trimmed.replace(/^#+\s*/, ""), paragraphs: [] });
      } else if (body.length > 0) {
        body[body.length - 1]!.paragraphs.push(trimmed);
      } else {
        body.push({ heading: "", paragraphs: [trimmed] });
      }
    }
    return {
      post: {
        slug: row.slug,
        title: row.title,
        excerpt: row.excerpt,
        date: row.published_at,
        readTime: row.read_time,
        body,
      },
    };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Articol indisponibil" }, { name: "robots", content: "noindex" }] };
    }
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} | Auditor energetic Galați` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            author: { "@type": "Person", name: CONTACT.name },
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="text-2xl font-bold">Articolul nu a fost găsit</h1>
      <Button asChild variant="cta" className="mt-6">
        <Link to="/blog">Înapoi la blog</Link>
      </Button>
    </div>
  ),
  component: BlogPost,
});

function BlogPost() {
  const { post } = Route.useLoaderData();

  return (
    <article className="mx-auto max-w-3xl px-6 py-14">
      <Link
        to="/blog"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="size-4" /> Toate articolele
      </Link>
      <h1 className="mt-6 text-3xl font-bold md:text-4xl">{post.title}</h1>
      <div className="mt-4 flex gap-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="size-3.5" />
          {new Date(post.date).toLocaleDateString("ro-RO", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="size-3.5" /> {post.readTime}
        </span>
      </div>
      <p className="mt-6 text-lg text-muted-foreground">{post.excerpt}</p>

      <div className="mt-10 space-y-9">
        {post.body.map((section, i) => (
          <Reveal key={section.heading || i} delay={i * 60}>
            {section.heading && <h2 className="text-xl font-bold">{section.heading}</h2>}
            {section.paragraphs.map((p) => (
              <p key={p} className="mt-3 text-muted-foreground">
                {p}
              </p>
            ))}
          </Reveal>
        ))}
      </div>

      <div className="mt-14 rounded-2xl bg-[image:var(--gradient-primary)] p-8 text-center text-primary-foreground">
        <p className="text-lg font-semibold">Aveți o situație concretă de lămurit?</p>
        <p className="mt-2 text-sm opacity-90">
          Sunați și primiți un răspuns direct, fără obligații.
        </p>
        <Button asChild variant="onHero" size="lg" className="mt-5">
          <a href={CONTACT.phoneHref}>
            <Phone /> {CONTACT.phoneDisplay}
          </a>
        </Button>
      </div>
    </article>
  );
}
