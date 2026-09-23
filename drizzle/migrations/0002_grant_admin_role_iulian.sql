insert into public.user_roles (user_id, role)
select id, 'admin'::app_role from auth.users where lower(email) = 'certificatenergeticgalati@yahoo.com'
on conflict (user_id, role) do nothing;