import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Phone, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/site-data";

const NAV = [
  { to: "/", label: "Acasă" },
  { to: "/servicii", label: "Servicii" },
  { to: "/despre", label: "Despre" },
  { to: "/proces", label: "Proces" },
  { to: "/zona-de-acoperire", label: "Zonă de acoperire" },
  { to: "/preturi", label: "Prețuri" },
  { to: "/galerie", label: "Galerie" },
  { to: "/testimoniale", label: "Testimoniale" },
  { to: "/blog", label: "Blog" },
  { to: "/noutati", label: "Noutăți" },
  { to: "/intrebari-frecvente", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="hidden bg-secondary text-secondary-foreground lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1.5 text-xs">
          <span>Auditor energetic atestat Gradul I · Galați și tot județul Galați</span>
          <a href={CONTACT.phoneHref} className="font-semibold hover:underline">
            Telefon: {CONTACT.phoneDisplay}
          </a>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="flex size-10 items-center justify-center rounded-lg bg-[image:var(--gradient-primary)] text-primary-foreground">
            <Gauge className="size-5" />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-bold tracking-tight">Iulian Gabriel Panainte</span>
            <span className="block text-[11px] text-muted-foreground">
              Auditor Energetic Gradul I · Galați
            </span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-0.5 xl:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-primary bg-accent" }}
              className="rounded-md px-2.5 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 xl:ml-4">
          <a
            href={CONTACT.phoneHref}
            className="hidden items-center gap-2 text-sm font-semibold text-foreground sm:flex"
          >
            <Phone className="size-4 text-primary" />
            {CONTACT.phoneDisplay}
          </a>
          <Button asChild variant="cta" size="sm" className="hidden sm:inline-flex">
            <Link to="/contact">Solicită ofertă</Link>
          </Button>
          <button
            type="button"
            aria-label="Deschide meniul"
            onClick={() => setOpen((v) => !v)}
            className="rounded-md border border-border p-2 xl:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background xl:hidden">
          <nav className="mx-auto grid max-w-7xl gap-1 px-4 py-3 sm:px-6">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-primary bg-accent" }}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild variant="cta" className="mt-2">
              <a href={CONTACT.phoneHref}>Sună la {CONTACT.phoneDisplay}</a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
