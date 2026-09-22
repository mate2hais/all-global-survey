import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"] ?? process.env["SUPABASE_ANON_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const getPublicPrices = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await publicClient()
    .from("prices")
    .select("id, service, price, delivery, note, sort_order")
    .eq("active", true)
    .order("sort_order", { ascending: true });
  return data ?? [];
});

export const getPublicNews = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await publicClient()
    .from("news")
    .select("id, title, category, excerpt, content, image_url, published_at")
    .eq("published", true)
    .order("published_at", { ascending: false });
  return data ?? [];
});

export const getPublicTestimonials = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await publicClient()
    .from("testimonials")
    .select("id, name, city, rating, text")
    .eq("published", true)
    .order("sort_order", { ascending: true });
  return data ?? [];
});

export const getPublicFaq = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await publicClient()
    .from("faq_items")
    .select("id, question, answer")
    .eq("published", true)
    .order("sort_order", { ascending: true });
  return data ?? [];
});

export const getPublicBlogPosts = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await publicClient()
    .from("blog_posts")
    .select("id, slug, title, excerpt, content, image_url, read_time, published_at")
    .eq("published", true)
    .order("published_at", { ascending: false });
  return data ?? [];
});

export const getPublicGallery = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await publicClient()
    .from("gallery_images")
    .select("id, title, image_url, storage_path, sort_order, published")
    .eq("published", true)
    .order("sort_order", { ascending: true });
  const rows = data ?? [];
  if (rows.length === 0) return [];
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const out: { id: string; title: string; url: string }[] = [];
  for (const row of rows) {
    let url = row.image_url;
    if (row.storage_path) {
      const signed = await supabaseAdmin.storage
        .from("media")
        .createSignedUrl(row.storage_path, 60 * 60 * 24);
      if (signed.data?.signedUrl) url = signed.data.signedUrl;
    }
    out.push({ id: row.id, title: row.title ?? "Imagine", url });
  }
  return out;
});

export const getSiteContent = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await publicClient().from("site_content").select("key, value");
  const map: Record<string, string> = {};
  for (const row of data ?? []) map[row.key] = row.value;
  return map;
});

export const submitTestimonial = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => {
    const d = data as Record<string, unknown>;
    const name = String(d?.["name"] ?? "").trim();
    const city = String(d?.["city"] ?? "").trim();
    const text = String(d?.["text"] ?? "").trim();
    const rating = Number(d?.["rating"] ?? 0);
    if (name.length < 2 || name.length > 80) throw new Error("Nume invalid.");
    if (city.length > 80) throw new Error("Localitate invalidă.");
    if (text.length < 10 || text.length > 1500) throw new Error("Mesaj invalid.");
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) throw new Error("Rating invalid.");
    return { name, city, text, rating };
  })
  .handler(async ({ data }) => {
    const { error } = await publicClient()
      .from("testimonials")
      .insert({ ...data, published: false, sort_order: 999 });
    if (error) throw new Error("Nu am putut salva recenzia.");
    return { ok: true };
  });
