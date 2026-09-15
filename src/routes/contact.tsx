import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, Clock, MapPin, MessageCircle, Paperclip, X } from "lucide-react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
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
import { supabase } from "@/integrations/supabase/client";
import { submitAuditRequest } from "@/lib/requests.functions";

const TITLE = "Contact — Auditor energetic Galați, tel. 0773.932.496";
const DESC =
  "Solicitați o ofertă pentru certificat sau audit energetic în Galați. Telefon 0773.932.496, formular online cu încărcare de documente și program de lucru.";

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

const MAX_FILES = 10;
const MAX_SIZE = 25 * 1024 * 1024;

function ContactPage() {
  const [tip, setTip] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [sending, setSending] = useState(false);
  const submit = useServerFn(submitAuditRequest);

  function addFiles(list: FileList | null) {
    if (!list) return;
    const next = [...files];
    for (const file of Array.from(list)) {
      if (file.size > MAX_SIZE) {
        toast.error(`Fișierul „${file.name}” depășește 25 MB.`);
        continue;
      }
      if (next.length >= MAX_FILES) {
        toast.error(`Puteți încărca maximum ${MAX_FILES} fișiere.`);
        break;
      }
      next.push(file);
    }
    setFiles(next);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (!tip) {
      toast.error("Selectați tipul lucrării sau al clădirii.");
      return;
    }
    setSending(true);
    try {
      const folder = crypto.randomUUID();
      const uploaded: {
        path: string;
        file_name: string;
        content_type?: string | undefined;
        size_bytes?: number | undefined;
      }[] = [];

      for (const file of files) {
        const safeName = file.name.replace(/[^\w.\-]/g, "_");
        const path = `${folder}/${safeName}`;
        const { error } = await supabase.storage.from("solicitari").upload(path, file);
        if (error) throw new Error(`Nu am putut încărca „${file.name}”.`);
        uploaded.push({
          path,
          file_name: file.name,
          content_type: file.type || undefined,
          size_bytes: file.size,
        });
      }

      const result = await submit({
        data: {
          nume: String(fd.get("nume") ?? ""),
          telefon: String(fd.get("telefon") ?? ""),
          email: String(fd.get("email") ?? ""),
          localitate: String(fd.get("localitate") ?? ""),
          tip,
          mesaj: String(fd.get("mesaj") ?? ""),
          files: uploaded,
        },
      });

      toast.success(
        result.smsSent
          ? "Solicitare trimisă! Ați primit o confirmare prin SMS și pe email."
          : "Solicitare trimisă! Vă contactez în cel mai scurt timp.",
      );
      form.reset();
      setTip("");
      setFiles([]);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Trimiterea a eșuat. Încercați din nou.",
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Solicitați o ofertă pentru clădirea dumneavoastră"
        description="Răspund personal la telefon și pe WhatsApp. Pentru o estimare rapidă, spuneți-mi tipul clădirii, suprafața și localitatea. Puteți atașa poze și documente direct în formular."
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
          <form className="surface-card grid gap-5 p-7 md:p-9" onSubmit={onSubmit}>
            <h2 className="text-xl font-bold">Formular de solicitare</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="nume">Nume și prenume *</Label>
                <Input id="nume" name="nume" required maxLength={120} placeholder="Ion Popescu" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="telefon">Telefon *</Label>
                <Input
                  id="telefon"
                  name="telefon"
                  type="tel"
                  required
                  maxLength={30}
                  placeholder="07xx xxx xxx"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  maxLength={180}
                  placeholder="nume@exemplu.ro"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="localitate">Localitate *</Label>
                <Input
                  id="localitate"
                  name="localitate"
                  required
                  maxLength={120}
                  placeholder="Galați"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tip">Tip lucrare / clădire *</Label>
              <Select value={tip} onValueChange={setTip} required>
                <SelectTrigger id="tip">
                  <SelectValue placeholder="Alegeți tipul lucrării sau al clădirii" />
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
                maxLength={2000}
                placeholder="Suprafață aproximativă, termenul de care aveți nevoie, alte detalii utile."
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="atasamente">Poze și documente (opțional)</Label>
              <Input
                id="atasamente"
                type="file"
                multiple
                accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.dwg,.zip"
                onChange={(e) => {
                  addFiles(e.target.files);
                  e.target.value = "";
                }}
              />
              <p className="text-xs text-muted-foreground">
                Plan, schițe, cartea funciară, poze ale clădirii — maximum {MAX_FILES} fișiere, 25 MB
                fiecare.
              </p>
              {files.length > 0 && (
                <ul className="mt-2 grid gap-2">
                  {files.map((f, i) => (
                    <li
                      key={`${f.name}-${i}`}
                      className="flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2 text-sm"
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        <Paperclip className="size-4 shrink-0 text-primary" />
                        <span className="truncate">{f.name}</span>
                      </span>
                      <button
                        type="button"
                        aria-label={`Elimină ${f.name}`}
                        className="text-muted-foreground hover:text-foreground"
                        onClick={() => setFiles(files.filter((_, idx) => idx !== i))}
                      >
                        <X className="size-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <p className="text-xs text-muted-foreground">
              Prin trimiterea formularului sunteți de acord cu prelucrarea datelor în scopul
              transmiterii ofertei, conform politicii de confidențialitate.
            </p>
            <Button
              type="submit"
              variant="cta"
              size="lg"
              className="w-full sm:w-fit"
              disabled={sending}
            >
              {sending ? "Se trimite…" : "Trimite solicitarea"}
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
