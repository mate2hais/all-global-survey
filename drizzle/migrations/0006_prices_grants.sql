GRANT SELECT, INSERT, UPDATE, DELETE ON public.prices TO authenticated;
GRANT SELECT ON public.prices TO anon;
GRANT ALL ON public.prices TO service_role;