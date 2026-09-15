import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock, Gauge } from "lucide-react";
import { CONTACT } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary text-secondary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="flex size-10 items-center justify-center rounded-lg bg-primary-foreground/15">
              <Gauge className="size-5" />
            </span>
            <div>
              <p className="font-bold">{CONTACT.name}</p>
              <p className="text-sm opacity-80">Auditor Energetic Gr. I</p>
            </div>
          </div>
          <p className="mt-4 max-w-md text-sm opacity-85">
            Certificate de performanță energetică, audituri pentru clădiri și obiective industriale,
            consultanță NZEB și surse regenerabile, în municipiul Galați și în tot județul Galați.
            Fiecare lucrare include vizită obligatorie la fața locului.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold">Contact</p>
          <ul className="mt-4 space-y-3 text-sm opacity-90">
            <li>
              <a href={CONTACT.phoneHref} className="flex items-center gap-2 hover:underline">
                <Phone className="size-4" /> {CONTACT.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 hover:underline">
                <Mail className="size-4" /> {CONTACT.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-4" /> Galați, județul Galați
            </li>
            <li className="flex items-start gap-2">
              <Clock className="mt-0.5 size-4 shrink-0" /> {CONTACT.program}
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold">Navigare</p>
          <ul className="mt-4 space-y-2 text-sm opacity-90">
            <li>
              <Link to="/servicii" className="hover:underline">
                Servicii
              </Link>
            </li>
            <li>
              <Link to="/preturi" className="hover:underline">
                Prețuri
              </Link>
            </li>
            <li>
              <Link to="/zona-de-acoperire" className="hover:underline">
                Zonă de acoperire
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:underline">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/termeni" className="hover:underline">
                Termeni și condiții
              </Link>
            </li>
            <li>
              <Link to="/confidentialitate" className="hover:underline">
                Politica de confidențialitate (GDPR)
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <p className="mx-auto max-w-7xl px-6 py-5 text-xs opacity-75">
          © {new Date().getFullYear()} {CONTACT.name} — Auditor Energetic Gradul I, Galați. Toate
          drepturile rezervate.
        </p>
      </div>
    </footer>
  );
}
