import { useCallback, useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, FileText, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { REQUEST_STATUSES, normalizeStatus, statusLabel, statusTone } from "@/lib/request-status";

export const Route = createFileRoute("/_authenticated/solicitari/$id")({
  head: () => ({
    meta: [
      { title: "Detalii solicitare — administrare" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Detaliile complete ale unei solicitări primite." },
    ],
  }),
  component: RequestDetailPage,
});

type Row = {
  id: string;
  nume: string;
  telefon: string;
  email: string | null;
  localitate: string;
  tip: string;
  mesaj: string | null;
  status: string;
  notes: string | null;
  created_at: string;
};
type FileRow = {
  id: string;
  path: string;
  file_name: string;
  content_type: string | null;
  size_bytes: number | null;
};

function RequestDetailPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [row, setRow] = useState<Row | null>(null);
  const [files, setFiles] = useState<(FileRow & { url: string | null })[]>([]);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const [{ data, error }, { data: fileRows }] = await Promise.all([
      supabase.from("audit_requests").select("*").eq("id", id).maybeSingle(),
      supabase
        .from("request_files")
        .select("id, path, file_name, content_type, size_bytes")
        .eq("request_id", id)
        .order("created_at"),
    ]);
    if (error) toast.error("Nu am putut încărca solicitarea.");
    setRow((data as Row) ?? null);
    setNotes(((data as Row) ?? null)?.notes ?? "");

    const list = (fileRows as FileRow[]) ?? [];
    // Linkuri semnate generate la deschiderea paginii, valabile 10 minute.
    const signed = await Promise.all(
      list.map(async (f) => {
        const { data: s } = await supabase.storage
          .from("solicitari")
          .createSignedUrl(f.path, 600);
        return { ...f, url: s?.signedUrl ?? null };
      }),
    );
    setFiles(signed);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    void load();
  }, [load]);

  async function setStatus(next: string) {
    const { error } = await supabase.from("audit_requests").update({ status: next }).eq("id", id);
    if (error) toast.error("Nu am putut actualiza starea.");
    else {
      setRow((r) => (r ? { ...r, status: next } : r));
      toast.success("Stare actualizată.");
    }
  }

  async function saveNotes() {
    const { error } = await supabase.from("audit_requests").update({ notes }).eq("id", id);
    if (error) toast.error("Nu am putut salva notițele.");
    else toast.success("Notițe salvate.");
  }

  async function remove() {
    if (!window.confirm("Ștergeți definitiv această solicitare?")) return;
    const { error } = await supabase.from("audit_requests").delete().eq("id", id);
    if (error) toast.error("Ștergere eșuată.");
    else {
      toast.success("Solicitare ștearsă.");
      void navigate({ to: "/solicitari" });
    }
  }

  if (loading) {
    return <div className="mx-auto max-w-4xl px-6 py-24 text-muted-foreground">Se încarcă…</div>;
  }

  if (!row) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="text-2xl font-bold">Solicitare inexistentă</h1>
        <p className="mt-3 text-muted-foreground">
          Solicitarea a fost ștearsă sau nu aveți drepturi de acces.
        </p>
        <Button className="mt-6" variant="cta" asChild>
          <Link to="/solicitari">Înapoi la listă</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <Button variant="ghost" size="sm" asChild>
        <Link to="/solicitari">
          <ArrowLeft className="size-4" /> Toate solicitările
        </Link>
      </Button>

      <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{row.nume}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {row.tip} · {row.localitate} · {new Date(row.created_at).toLocaleString("ro-RO")}
          </p>
        </div>
        <Badge variant={statusTone(row.status)}>{statusLabel(row.status)}</Badge>
      </div>

      <div className="surface-card mt-8 p-6">
        <h2 className="text-lg font-bold">Date solicitare</h2>
        <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
          <Field label="Nume">{row.nume}</Field>
          <Field label="Telefon">
            <a className="hover:underline" href={`tel:${row.telefon}`}>
              {row.telefon}
            </a>
          </Field>
          <Field label="Email">
            {row.email ? (
              <a className="hover:underline" href={`mailto:${row.email}`}>
                {row.email}
              </a>
            ) : (
              "—"
            )}
          </Field>
          <Field label="Localitate">{row.localitate}</Field>
          <Field label="Tip lucrare">{row.tip}</Field>
          <Field label="Dată">{new Date(row.created_at).toLocaleString("ro-RO")}</Field>
        </dl>
        {row.mesaj && (
          <div className="mt-5">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Mesaj
            </p>
            <p className="mt-2 text-sm whitespace-pre-wrap">{row.mesaj}</p>
          </div>
        )}
      </div>

      <div className="surface-card mt-6 p-6">
        <h2 className="text-lg font-bold">Fișiere atașate</h2>
        {files.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">Nu au fost încărcate fișiere.</p>
        ) : (
          <ul className="mt-4 space-y-2 text-sm">
            {files.map((f) => (
              <li
                key={f.id}
                className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 pb-2 last:border-0"
              >
                <span className="flex items-center gap-2">
                  <FileText className="size-4 text-primary" /> {f.file_name}
                  {f.size_bytes ? (
                    <span className="text-muted-foreground">
                      ({Math.round(f.size_bytes / 1024)} KB)
                    </span>
                  ) : null}
                </span>
                {f.url ? (
                  <Button variant="soft" size="sm" asChild>
                    <a href={f.url} target="_blank" rel="noopener noreferrer">
                      Deschide
                    </a>
                  </Button>
                ) : (
                  <span className="text-muted-foreground">link indisponibil</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="surface-card mt-6 p-6">
        <h2 className="text-lg font-bold">Stare</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {REQUEST_STATUSES.map((s) => (
            <Button
              key={s.value}
              variant={normalizeStatus(row.status) === s.value ? "cta" : "outline"}
              size="sm"
              onClick={() => void setStatus(s.value)}
            >
              {s.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="surface-card mt-6 p-6">
        <div className="grid gap-2">
          <Label htmlFor="notes">Notițe interne</Label>
          <Textarea
            id="notes"
            rows={6}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Discuții, ofertă trimisă, termen convenit…"
          />
        </div>
        <div className="mt-4 flex flex-wrap justify-between gap-3">
          <Button variant="cta" onClick={() => void saveNotes()}>
            <Save className="size-4" /> Salvează notițele
          </Button>
          <Button variant="outline" onClick={() => void remove()}>
            <Trash2 className="size-4" /> Șterge solicitarea
          </Button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        {label}
      </dt>
      <dd className="mt-1">{children}</dd>
    </div>
  );
}
