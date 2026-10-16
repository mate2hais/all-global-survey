import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Phone } from "lucide-react";
import { RelativeDate } from "@/components/site/RelativeDate";
import { Button } from "@/components/ui/button";
import { BlogBlocks, parseBlog, type Block } from "@/lib/blog-markdown";
import { CONTACT, POSTS } from "@/lib/site-data";
import { getPublicBlogPosts } from "@/lib/public-content.functions";

export const Route = createFileRoute("/blog/$slug")({
  staticData: { sitemap: true },
  loader: async ({ params }) => {
    const staticPost = POSTS.find((p) => p.slug === params.slug);
    if (staticPost) {
      const blocks: Block[] = [];
      for (const s of staticPost.body) {
        if (s.heading) blocks.push({ type: "h", text: s.heading });
        for (const p of s.paragraphs) blocks.push({ type: "p", text: p });
      }
      return {
        post: {
          slug: staticPost.slug,
          title: staticPost.title,
          excerpt: staticPost.excerpt,
          date: staticPost.date,
          readTime: staticPost.readTime,
          imageUrl: null as string | null,
          contentImages: [] as string[],
          blocks,
        },
      };
    }
    const dbPosts = await getPublicBlogPosts();
    const row = dbPosts.find((p) => p.slug === params.slug);
    if (!row) throw notFound();
    return {
      post: {
        slug: row.slug,
        title: row.title,
        excerpt: row.excerpt,
        date: row.published_at,
        readTime: row.read_time,
        imageUrl: row.image_url,
        contentImages: (row.content_images ?? []).filter(Boolean),
        blocks: parseBlog(row.content),
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
        <RelativeDate date={post.date} className="inline-flex items-center gap-1.5" />
      </div>
      <p className="mt-6 text-lg text-muted-foreground">{post.excerpt}</p>
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          width={1200}
          height={800}
          decoding="async"
          className="mt-8 aspect-[3/2] w-full rounded-2xl object-cover"
        />
      )}

      <BlogBlocks blocks={post.blocks} images={post.contentImages} title={post.title} />

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
