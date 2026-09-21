-- Testimoniale
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  city TEXT NOT NULL DEFAULT '',
  rating INT NOT NULL DEFAULT 5,
  text TEXT NOT NULL,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.testimonials TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.testimonials TO authenticated;
GRANT ALL ON public.testimonials TO service_role;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "testimonials public read" ON public.testimonials FOR SELECT TO anon, authenticated USING (published = true);
CREATE POLICY "testimonials admin all" ON public.testimonials FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Intrebari frecvente
CREATE TABLE public.faq_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.faq_items TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.faq_items TO authenticated;
GRANT ALL ON public.faq_items TO service_role;
ALTER TABLE public.faq_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "faq public read" ON public.faq_items FOR SELECT TO anon, authenticated USING (published = true);
CREATE POLICY "faq admin all" ON public.faq_items FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Articole blog
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  read_time TEXT NOT NULL DEFAULT '5 min',
  published BOOLEAN NOT NULL DEFAULT TRUE,
  published_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.blog_posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.blog_posts TO authenticated;
GRANT ALL ON public.blog_posts TO service_role;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "blog public read" ON public.blog_posts FOR SELECT TO anon, authenticated USING (published = true);
CREATE POLICY "blog admin all" ON public.blog_posts FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Texte editabile din site
CREATE TABLE public.site_content (
  key TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  value TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_content TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_content TO authenticated;
GRANT ALL ON public.site_content TO service_role;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "site_content public read" ON public.site_content FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "site_content admin all" ON public.site_content FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

INSERT INTO public.site_content (key, label, value) VALUES
  ('home_hero_title', 'Acasă — titlu principal', 'Certificate și audituri energetice în Galați, cu vizită la fața locului'),
  ('home_hero_subtitle', 'Acasă — subtitlu', 'Auditor energetic atestat Gradul I pentru orice tip de clădire: apartamente, case, blocuri, spații comerciale, clădiri publice și hale industriale.'),
  ('home_cta_text', 'Acasă — text CTA final', 'Spuneți-mi ce clădire aveți și primiți un termen și un preț clar, fără costuri ascunse.'),
  ('contact_program', 'Contact — program de lucru', 'Luni – Vineri: 08:00 – 19:00 · Sâmbătă: 09:00 – 14:00'),
  ('contact_phone', 'Contact — telefon afișat', '0773.932.496'),
  ('contact_email', 'Contact — email', 'Panainte.iuliangabriel@yahoo.com'),
  ('anunt_bara', 'Anunț afișat în bara de sus (gol = ascuns)', ''),
  ('despre_intro', 'Despre — paragraf de prezentare', '');
