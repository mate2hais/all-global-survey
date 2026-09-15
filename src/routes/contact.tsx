import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, Clock, MapPin, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { CONTACT } from "@/lib/site-data";

const TITLE = "Contact — Auditor energetic Galați, tel. 0773.932.496";
const DESC =
  "Solicitați o ofertă pentru certificat sau audit energetic în Galați. Telefon 0773.932.496, formular online și program de lucru.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const TYPES = [
  "CPE (Certificat de performanță energetică)",
  "Audit energetic",
  "Apartament",
  "Casă / locuință individuală",
  "Bloc de locuințe (asociație)",
  "Spațiu comercial / birouri",
  "Clădire publică",
  "Hală / spațiu industrial",
  "Construcție nouă (NZEB)",
  "Sistem regenerabil (SER)",
];

function ContactPage() {
  const [tip, setTip] = useState("");

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Solicitați o ofertă pentru clădirea dumneavoastră"
        description="Răspund personal la telefon și pe WhatsApp. Pentru o estimare rapidă, spuneți-mi tipul clădirii, suprafața și localitatea."
      >
        <Button asChild variant="cta" size="xl">
          <a href={CONTACT.phoneHref}>
            <Phone /> {CONTACT.phoneDisplay}
          </a>
        </Button>
        <Button asChild variant="onHero" size="xl">
          <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
            <MessageCircle /> WhatsApp
          </a>
        </Button>
      </PageHero>

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1fr_minmax(0,380px)]">
        <Reveal>
          <form
            className="surface-card grid gap-5 p-7 md:p-9"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              toast.success("Mesaj trimis! Vă contactez în cel mai scurt timp.");
              form.reset();
              setTip("");
            }}
          >
            <h2 className="text-xl font-bold">Formular de solicitare</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="nume">Nume și prenume *</Label>
                <Input id="nume" name="nume" required placeholder="Ion Popescu" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="telefon">Telefon *</Label>
                <Input id="telefon" name="telefon" type="tel" required placeholder="07xx xxx xxx" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="nume@exemplu.ro" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="localitate">Localitate *</Label>
                <Input id="localitate" name="localitate" required placeholder="Galați" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tip">Tip proprietate / clădire *</Label>
              <Select value={tip} onValueChange={setTip} required>
                <SelectTrigger id="tip">
                  <SelectValue placeholder="Alegeți tipul clădirii" />
                </SelectTrigger>
                <SelectContent>
                  {TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="mesaj">Mesaj</Label>
              <Textarea
                id="mesaj"
                name="mesaj"
                rows={5}
                placeholder="Suprafață aproximativă, termenul de care aveți nevoie, alte detalii utile."
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Prin trimiterea formularului sunteți de acord cu prelucrarea datelor în scopul
              transmiterii ofertei, conform politicii de confidențialitate.
            </p>
            <Button type="submit" variant="cta" size="lg" className="w-full sm:w-fit">
              Trimite solicitarea
            </Button>
          </form>
        </Reveal>

        <Reveal delay={100}>
          <div className="space-y-6">
            <div className="surface-card p-7">
              <h2 className="text-lg font-bold">Date de contact</h2>
              <ul className="mt-4 space-y-4 text-sm">
                <li className="flex items-center gap-3">
                  <Phone className="size-4 text-primary" />
                  <a href={CONTACT.phoneHref} className="font-semibold hover:underline">
                    {CONTACT.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="size-4 text-primary" />
                  <a href={`mailto:${CONTACT.email}`} className="hover:underline">
                    {CONTACT.email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="size-4 text-primary" />
                  Galați, județul Galați
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
                  {CONTACT.program}
                </li>
              </ul>
            </div>
            <div className="overflow-hidden rounded-2xl border border-border">
              <iframe
                title="Hartă Galați"
                src="https://www.openstreetmap.org/export/embed.html?bbox=27.95%2C45.39%2C28.10%2C45.48&layer=mapnik&marker=45.4353%2C28.0080"
                className="h-72 w-full"
                loading="lazy"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );
}
