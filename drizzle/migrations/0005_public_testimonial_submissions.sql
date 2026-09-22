GRANT INSERT ON public.testimonials TO anon;
GRANT INSERT ON public.testimonials TO authenticated;

CREATE POLICY "public submit testimonial"
ON public.testimonials
FOR INSERT
TO anon, authenticated
WITH CHECK (published = false AND rating BETWEEN 1 AND 5 AND length(text) BETWEEN 10 AND 1500 AND length(name) BETWEEN 2 AND 80 AND length(city) <= 80);