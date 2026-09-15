-- Roles
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.admin_emails (
  email text PRIMARY KEY
);
GRANT SELECT ON public.admin_emails TO authenticated;
GRANT ALL ON public.admin_emails TO service_role;
ALTER TABLE public.admin_emails ENABLE ROW LEVEL SECURITY;
INSERT INTO public.admin_emails (email) VALUES ('panainte.iuliangabriel@yahoo.com');

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  ) OR EXISTS (
    SELECT 1 FROM public.admin_emails
    WHERE email = lower(coalesce(auth.jwt() ->> 'email', ''))
  )
$$;

CREATE POLICY "Admins read roles" ON public.user_roles
  FOR SELECT TO authenticated USING (public.is_admin() OR user_id = auth.uid());
CREATE POLICY "Admins read admin emails" ON public.admin_emails
  FOR SELECT TO authenticated USING (public.is_admin());

-- Requests
CREATE TABLE public.audit_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nume text NOT NULL,
  telefon text NOT NULL,
  email text,
  localitate text NOT NULL,
  tip text NOT NULL,
  mesaj text,
  status text NOT NULL DEFAULT 'nou',
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE, DELETE ON public.audit_requests TO authenticated;
GRANT ALL ON public.audit_requests TO service_role;
ALTER TABLE public.audit_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage requests" ON public.audit_requests
  FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "Admins update requests" ON public.audit_requests
  FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins delete requests" ON public.audit_requests
  FOR DELETE TO authenticated USING (public.is_admin());

CREATE TABLE public.request_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id uuid NOT NULL REFERENCES public.audit_requests(id) ON DELETE CASCADE,
  path text NOT NULL,
  file_name text NOT NULL,
  content_type text,
  size_bytes bigint,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, DELETE ON public.request_files TO authenticated;
GRANT ALL ON public.request_files TO service_role;
ALTER TABLE public.request_files ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read request files" ON public.request_files
  FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "Admins delete request files" ON public.request_files
  FOR DELETE TO authenticated USING (public.is_admin());

-- Prices
CREATE TABLE public.prices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service text NOT NULL,
  price text NOT NULL,
  delivery text NOT NULL,
  note text,
  sort_order integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.prices TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.prices TO authenticated;
GRANT ALL ON public.prices TO service_role;
ALTER TABLE public.prices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads active prices" ON public.prices
  FOR SELECT TO anon USING (active);
CREATE POLICY "Auth reads prices" ON public.prices
  FOR SELECT TO authenticated USING (active OR public.is_admin());
CREATE POLICY "Admins insert prices" ON public.prices
  FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admins update prices" ON public.prices
  FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins delete prices" ON public.prices
  FOR DELETE TO authenticated USING (public.is_admin());

-- News / regulations
CREATE TABLE public.news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL DEFAULT 'stire',
  excerpt text,
  content text NOT NULL DEFAULT '',
  image_url text,
  published boolean NOT NULL DEFAULT true,
  published_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.news TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.news TO authenticated;
GRANT ALL ON public.news TO service_role;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads published news" ON public.news
  FOR SELECT TO anon USING (published);
CREATE POLICY "Auth reads news" ON public.news
  FOR SELECT TO authenticated USING (published OR public.is_admin());
CREATE POLICY "Admins insert news" ON public.news
  FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admins update news" ON public.news
  FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins delete news" ON public.news
  FOR DELETE TO authenticated USING (public.is_admin());

-- Gallery
CREATE TABLE public.gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text,
  image_url text NOT NULL,
  storage_path text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.gallery_images TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gallery_images TO authenticated;
GRANT ALL ON public.gallery_images TO service_role;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads gallery" ON public.gallery_images
  FOR SELECT TO anon USING (true);
CREATE POLICY "Auth reads gallery" ON public.gallery_images
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins insert gallery" ON public.gallery_images
  FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admins update gallery" ON public.gallery_images
  FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins delete gallery" ON public.gallery_images
  FOR DELETE TO authenticated USING (public.is_admin());

-- Completed audits counter (manual metric)
CREATE TABLE public.site_stats (
  key text PRIMARY KEY,
  value integer NOT NULL DEFAULT 0,
  label text NOT NULL DEFAULT ''
);
GRANT SELECT ON public.site_stats TO anon;
GRANT SELECT, INSERT, UPDATE ON public.site_stats TO authenticated;
GRANT ALL ON public.site_stats TO service_role;
ALTER TABLE public.site_stats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads stats" ON public.site_stats FOR SELECT TO anon USING (true);
CREATE POLICY "Auth reads stats" ON public.site_stats FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins update stats" ON public.site_stats
  FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins insert stats" ON public.site_stats
  FOR INSERT TO authenticated WITH CHECK (public.is_admin());

INSERT INTO public.site_stats (key, value, label) VALUES
  ('audituri_realizate', 146, 'Lucrări realizate'),
  ('certificate_emise', 132, 'Certificate de performanță energetică'),
  ('audituri_cladiri', 6, 'Audituri energetice pentru clădiri'),
  ('studii_nzeb_ser', 13, 'Studii nZEB / SER');

INSERT INTO public.prices (service, price, delivery, sort_order) VALUES
  ('Certificat Energetic Garsonieră', '150 lei', '1-3 zile', 1),
  ('Certificat Energetic Apartament', '200 lei', '1-3 zile', 2),
  ('Certificat Energetic Casă', '350 lei', '2-4 zile', 3),
  ('Certificat Energetic Spațiu Comercial', 'de la 400 lei', '2-5 zile', 4),
  ('Audit Energetic Clădire', 'ofertă personalizată', '5-10 zile', 5),
  ('Audit Energetic Industrial', 'ofertă personalizată', 'de la 7 zile', 6),
  ('Consultanță nZEB / SER', 'ofertă personalizată', 'la cerere', 7);