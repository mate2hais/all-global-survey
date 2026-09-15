-- Public visitors may upload attachments for their request, but cannot read them back
CREATE POLICY "Anyone can upload request attachments" ON storage.objects
  FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'solicitari');

CREATE POLICY "Admins read request attachments" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'solicitari' AND public.is_admin());

CREATE POLICY "Admins delete request attachments" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'solicitari' AND public.is_admin());

CREATE POLICY "Anyone reads media" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'media');

CREATE POLICY "Admins upload media" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'media' AND public.is_admin());

CREATE POLICY "Admins update media" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'media' AND public.is_admin());

CREATE POLICY "Admins delete media" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'media' AND public.is_admin());