import { createFileRoute } from "@tanstack/react-router";

// Stable, non-expiring URL for blog images stored under media/blog/.
// Only files in the blog/ folder can be served.
export const Route = createFileRoute("/api/public/blog-imagine/$name")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: async ({ params }) => {
        const name = params.name;
        if (!/^[\w.-]{1,200}$/.test(name) || name.startsWith("."))
          return new Response("Not found", { status: 404 });
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data: file, error } = await supabaseAdmin.storage
          .from("media")
          .download(`blog/${name}`);
        if (error || !file) return new Response("Not found", { status: 404 });
        return new Response(file, {
          headers: {
            "content-type": file.type || "image/jpeg",
            "cache-control": "public, max-age=86400, stale-while-revalidate=604800",
          },
        });
      },
    },
  },
});
