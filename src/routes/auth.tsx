import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const TITLE = "Autentificare administrare — Auditor energetic Galați";
const DESC = "Zonă de administrare a site-ului. Acces doar pentru personalul autorizat.";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => {
      if (data.session) void navigate({ to: "/administrare" });
    });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Bine ați revenit!");
        void navigate({ to: "/administrare" });
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/administrare` },
        });
        if (error) throw error;
        if (data.session) {
          void navigate({ to: "/administrare" });
        } else {
          toast.success("Cont creat. Verificați emailul pentru confirmare.");
          setMode("login");
        }
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Autentificare eșuată");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-md flex-col justify-center px-6 py-24">
      <div className="surface-card p-8">
        <span className="flex size-11 items-center justify-center rounded-lg bg-accent text-accent-foreground">
          <Lock className="size-5" />
        </span>
        <h1 className="mt-5 text-2xl font-bold">
          {mode === "login" ? "Autentificare administrare" : "Creare cont administrator"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Panou intern pentru gestionarea prețurilor, noutăților, imaginilor și solicitărilor.
        </p>
        <form className="mt-7 grid gap-5" onSubmit={onSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Parolă</Label>
            <Input
              id="password"
              type="password"
              required
              minLength={8}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" variant="cta" size="lg" disabled={loading}>
            {loading ? "Se procesează…" : mode === "login" ? "Intră în cont" : "Creează cont"}
          </Button>
        </form>
        <button
          type="button"
          className="mt-5 text-sm text-primary hover:underline"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
        >
          {mode === "login" ? "Nu aveți cont? Creați-l aici" : "Aveți deja cont? Autentificare"}
        </button>
      </div>
    </div>
  );
}
