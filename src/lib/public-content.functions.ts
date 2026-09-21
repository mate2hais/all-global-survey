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

export const getSiteContent = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await publicClient().from("site_content").select("key, value");
  const map: Record<string, string> = {};
  for (const row of data ?? []) map[row.key] = row.value;
  return map;
});
