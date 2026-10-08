import { createFileRoute } from "@tanstack/react-router";

// Stable, non-expiring image URL for published gallery images.
// Streams the file from the private bucket; only published rows are served.
export const Route = createFileRoute("/api/public/galerie/$id")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: async ({ params }) => {
        const id = params.id;
        if (!/^[0-9a-f-]{36}$/i.test(id)) return new Response("Not found", { status: 404 });
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data: row } = await supabaseAdmin
          .from("gallery_images")
          .select("storage_path, image_url, published")
          .eq("id", id)
          .maybeSingle();
        if (!row || !row.published) return new Response("Not found", { status: 404 });
        if (!row.storage_path) {
          if (row.image_url) return Response.redirect(row.image_url, 302);
          return new Response("Not found", { status: 404 });
        }
        const { data: file, error } = await supabaseAdmin.storage
          .from("media")
          .download(row.storage_path);
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
