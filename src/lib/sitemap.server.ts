// Dynamic sitemap.xml generator — served from src/server.ts at /sitemap.xml.
// Server-only module: reads published blog posts from the DB and merges them
// with the static routes and the static POSTS fallback.
import { POSTS } from "./site-data";

const STATIC_ROUTES: Array<{ path: string; priority: string; changefreq: string }> = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/servicii", priority: "0.9", changefreq: "monthly" },
  { path: "/preturi", priority: "0.9", changefreq: "monthly" },
  { path: "/despre", priority: "0.8", changefreq: "monthly" },
  { path: "/proces", priority: "0.7", changefreq: "monthly" },
  { path: "/zona-de-acoperire", priority: "0.7", changefreq: "monthly" },
  { path: "/galerie", priority: "0.7", changefreq: "monthly" },
  { path: "/testimoniale", priority: "0.6", changefreq: "monthly" },
  { path: "/noutati", priority: "0.7", changefreq: "weekly" },
  { path: "/blog/", priority: "0.8", changefreq: "weekly" },
  { path: "/intrebari-frecvente", priority: "0.7", changefreq: "monthly" },
  { path: "/contact", priority: "0.8", changefreq: "monthly" },
  { path: "/termeni", priority: "0.3", changefreq: "yearly" },
  { path: "/confidentialitate", priority: "0.3", changefreq: "yearly" },
];

type BlogEntry = { slug: string; lastmod?: string };

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function urlEntry(origin: string, path: string, lastmod?: string, changefreq?: string, priority?: string): string {
  const loc = `${origin}${path === "/" ? "/" : path.replace(/\/$/, "")}`;
  const parts = [`<loc>${escapeXml(loc)}</loc>`];
  if (lastmod) parts.push(`<lastmod>${lastmod}</lastmod>`);
  if (changefreq) parts.push(`<changefreq>${changefreq}</changefreq>`);
  if (priority) parts.push(`<priority>${priority}</priority>`);
  return `<url>${parts.join("")}</url>`;
}

export async function buildSitemapResponse(origin: string): Promise<Response> {
  const blogEntries: BlogEntry[] = POSTS.map((p) => ({
    slug: p.slug,
    lastmod: p.date,
  }));

  // Merge in published blog posts from the DB (admin can add new ones at runtime).
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("blog_posts")
      .select("slug, updated_at, created_at")
      .eq("published", true);
    if (!error && Array.isArray(data)) {
      const rows = data as unknown as Array<{
        slug: string;
        updated_at?: string | null;
        created_at?: string | null;
      }>;
      for (const row of rows) {
        if (!row.slug) continue;
        const lastmod = (row.updated_at ?? row.created_at ?? "").slice(0, 10);
        const existing = blogEntries.find((b) => b.slug === row.slug);
        if (existing) {
          if (lastmod) existing.lastmod = lastmod;
        } else if (lastmod) {
          blogEntries.push({ slug: row.slug, lastmod });
        } else {
          blogEntries.push({ slug: row.slug });
        }
      }
    }
  } catch (error) {
    console.error("[sitemap] failed to load blog posts, using static fallback:", error);
  }

  const urls: string[] = [];
  for (const route of STATIC_ROUTES) {
    urls.push(urlEntry(origin, route.path, undefined, route.changefreq, route.priority));
  }
  for (const post of blogEntries) {
    urls.push(urlEntry(origin, `/blog/${post.slug}`, post.lastmod, "monthly", "0.7"));
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
