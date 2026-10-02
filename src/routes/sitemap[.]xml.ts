import { createFileRoute } from "@tanstack/react-router";
import { getRouterInstance } from "@tanstack/react-start";
import { sitemapPathForLocation, sitemapStaticPaths, sitemapXML, type SitemapEntry } from "@/lib/sitemap";
import { POSTS } from "@/lib/site-data";

// Public site origin (custom domain). Never use a preview URL here.
const BASE_URL = "https://certificatenergeticgalati.ro";

export const Route = createFileRoute("/sitemap.xml")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: async () => {
        const router = await getRouterInstance();
        const entries: SitemapEntry[] = sitemapStaticPaths(router).map((path) => ({ path }));

        // Blog articles: database-published posts first (their lastmod wins on
        // slug overlap), then the static POSTS collection, deduped by URL.
        try {
          const { createClient } = await import("@supabase/supabase-js");
          const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
          const supabase = createClient(process.env["SUPABASE_URL"]!, key, {
            auth: { persistSession: false, autoRefreshToken: false },
            global: {
              fetch: (input, init) => {
                const headers = new Headers(init?.headers);
                // Opaque sb_ keys are not JWTs; send apikey without the default bearer.
                if (key.startsWith("sb_") && headers.get("Authorization") === "Bearer " + key) {
                  headers.delete("Authorization");
                }
                headers.set("apikey", key);
                return fetch(input, { ...init, headers });
              },
            },
          });

          const pageSize = 1000;
          for (let offset = 0; ; ) {
            const { data, error } = await supabase
              .from("blog_posts")
              .select("slug, published_at")
              .eq("published", true)
              .order("published_at", { ascending: true })
              .range(offset, offset + pageSize - 1);
            if (error) throw new Error(`blog_posts query failed: ${error.message}`);
            if (!data || data.length === 0) break;
            for (const row of data) {
              const location = router.buildLocation({
                to: "/blog/$slug",
                params: { slug: row.slug },
                search: () => ({}),
                hash: "",
              });
              const path = sitemapPathForLocation(router, location, "/blog/$slug");
              if (path) {
                entries.push({ path, lastmod: row.published_at ?? undefined });
              }
            }
            offset += data.length;
          }
        } catch (error) {
          console.error("Sitemap dynamic content failed:", error);
          return new Response("Sitemap temporarily unavailable", {
            status: 503,
            headers: { "Cache-Control": "no-store" },
          });
        }

        for (const post of POSTS) {
          const location = router.buildLocation({
            to: "/blog/$slug",
            params: { slug: post.slug },
            search: () => ({}),
            hash: "",
          });
          const path = sitemapPathForLocation(router, location, "/blog/$slug");
          if (path) entries.push({ path, lastmod: post.date });
        }

        if (entries.length === 0) {
          return new Response(
            'No pages are included in this sitemap. Check route decisions and ancestor exclusions. Setting "exclude-subtree" on the root excludes the entire site.',
            { status: 404, headers: { "Cache-Control": "no-store" } },
          );
        }

        return new Response(sitemapXML(BASE_URL, entries), {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
