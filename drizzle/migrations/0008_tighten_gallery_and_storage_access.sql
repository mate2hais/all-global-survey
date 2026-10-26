-- Gallery: visitors only see published images; admins see everything.
DROP POLICY IF EXISTS "Auth reads gallery" ON public.gallery_images;
DROP POLICY IF EXISTS "Public reads gallery" ON public.gallery_images;
CREATE POLICY "Public reads published gallery" ON public.gallery_images
  FOR SELECT TO anon USING (published = true);
CREATE POLICY "Auth reads published gallery or admin" ON public.gallery_images
  FOR SELECT TO authenticated USING (published = true OR public.is_admin());

-- Media bucket: public images are served by the site's proxy routes (service role);
-- direct reads/listing of the private bucket are limited to admins.
DROP POLICY IF EXISTS "Anyone reads media" ON storage.objects;
CREATE POLICY "Admins read media" ON storage.objects
  FOR SELECT TO authenticated USING (bucket_id = 'media' AND public.is_admin());

-- Request attachments: uploads now go through server-issued signed upload URLs,
-- so no open INSERT rule is needed on the private bucket.
DROP POLICY IF EXISTS "Anyone can upload request attachments" ON storage.objects;