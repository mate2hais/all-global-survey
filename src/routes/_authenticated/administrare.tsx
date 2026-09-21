import { useCallback, useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  BarChart3,
  FileText,
  Images,
  Inbox,
  LogOut,
  Newspaper,
  Plus,
  RefreshCw,
  Save,
  Tag,
  Trash2,
  Upload,
} from "lucide-react";
import { toast } from "sonner";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as ReTooltip,
  XAxis,
  YAxis,
} from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  REQUEST_STATUSES,
  normalizeStatus,
  statusLabel,
  statusTone,
} from "@/lib/request-status";

export const Route = createFileRoute("/_authenticated/administrare")({
  head: () => ({
    meta: [
      { title: "Panou de administrare — Auditor energetic Galați" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Panou intern de administrare a site-ului." },
    ],
  }),
  component: AdminPage,
});

type RequestRow = {
  id: string;
  nume: string;
  telefon: string;
  email: string | null;
  localitate: string;
  tip: string;
  mesaj: string | null;
  status: string;
  created_at: string;
};
type FileRow = { id: string; request_id: string; path: string; file_name: string };
type PriceRow = {
  id: string;
  service: string;
  price: string;
  delivery: string;
  note: string | null;
  sort_order: number;
  active: boolean;
};
type NewsRow = {
  id: string;
  title: string;
  category: string;
  excerpt: string | null;
  content: string;
  image_url: string | null;
  published: boolean;
  published_at: string;
};
type GalleryRow = {
  id: string;
  title: string | null;
  image_url: string;
  storage_path: string | null;
  sort_order: number;
};
type StatRow = { key: string; value: number; label: string };

const STATUSES = REQUEST_STATUSES;

function AdminPage() {
  const navigate = useNavigate();
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [requests, setRequests] = useState<RequestRow[]>([]);
  const [files, setFiles] = useState<FileRow[]>([]);
  const [prices, setPrices] = useState<PriceRow[]>([]);
  const [news, setNews] = useState<NewsRow[]>([]);
  const [gallery, setGallery] = useState<GalleryRow[]>([]);
  const [stats, setStats] = useState<StatRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const [r, f, p, n, g, s] = await Promise.all([
      supabase.from("audit_requests").select("*").order("created_at", { ascending: false }),
      supabase.from("request_files").select("id, request_id, path, file_name"),
      supabase.from("prices").select("*").order("sort_order"),
      supabase.from("news").select("*").order("published_at", { ascending: false }),
      supabase.from("gallery_images").select("*").order("sort_order"),
      supabase.from("site_stats").select("*").order("key"),
    ]);
    setRequests((r.data as RequestRow[]) ?? []);
    setFiles((f.data as FileRow[]) ?? []);
    setPrices((p.data as PriceRow[]) ?? []);
    setNews((n.data as NewsRow[]) ?? []);
    setGallery((g.data as GalleryRow[]) ?? []);
    setStats((s.data as StatRow[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    void (async () => {
      const { data, error } = await supabase.rpc("is_admin");
      const ok = !error && data === true;
      setAllowed(ok);
      if (ok) void load();
      else setLoading(false);
    })();
  }, [load]);

  const chartData = useMemo(() => {
    const days: { day: string; solicitari: number }[] = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      days.push({
        day: `${d.getDate()}.${d.getMonth() + 1}`,
        solicitari: requests.filter((x) => x.created_at.slice(0, 10) === key).length,
      });
    }
    return days;
  }, [requests]);

  async function signOut() {
    await supabase.auth.signOut();
    void navigate({ to: "/" });
  }

  if (allowed === false) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="text-2xl font-bold">Acces restricționat</h1>
        <p className="mt-3 text-muted-foreground">
          Contul cu care sunteți autentificat nu are drepturi de administrare.
        </p>
        <Button className="mt-6" variant="cta" onClick={signOut}>
          <LogOut /> Deconectare
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
            Administrare
          </p>
          <h1 className="mt-2 text-3xl font-bold">Panou de control</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Solicitări, tarife, noutăți, reglementări și imaginile site-ului — într-un singur loc.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="soft" onClick={() => void load()} disabled={loading}>
            <RefreshCw className={loading ? "animate-spin" : ""} /> Reîmprospătează
          </Button>
          <Button variant="outline" onClick={signOut}>
            <LogOut /> Deconectare
          </Button>
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Inbox} label="Solicitări primite" value={requests.length} />
        <StatCard
          icon={FileText}
          label="Solicitări noi"
          value={requests.filter((r) => r.status === "nou").length}
        />
        <StatCard
          icon={BarChart3}
          label="Lucrări realizate"
          value={stats.find((s) => s.key === "audituri_realizate")?.value ?? 0}
        />
        <StatCard icon={Newspaper} label="Noutăți publicate" value={news.length} />
      </div>

      <Tabs defaultValue="overview" className="mt-10">
        <TabsList className="flex-wrap">
          <TabsTrigger value="overview">Grafice</TabsTrigger>
          <TabsTrigger value="requests">Solicitări</TabsTrigger>
          <TabsTrigger value="prices">Prețuri</TabsTrigger>
          <TabsTrigger value="news">Noutăți & reglementări</TabsTrigger>
          <TabsTrigger value="gallery">Imagini</TabsTrigger>
          <TabsTrigger value="stats">Indicatori</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="surface-card p-6">
            <h2 className="text-lg font-bold">Solicitări în ultimele 14 zile</h2>
            <div className="mt-6 h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                  <XAxis dataKey="day" fontSize={12} />
                  <YAxis allowDecimals={false} fontSize={12} />
                  <ReTooltip />
                  <Bar dataKey="solicitari" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div className="surface-card p-6">
              <h3 className="font-semibold">Solicitări după tip de lucrare</h3>
              <ul className="mt-4 space-y-2 text-sm">
                {Object.entries(
                  requests.reduce<Record<string, number>>((acc, r) => {
                    acc[r.tip] = (acc[r.tip] ?? 0) + 1;
                    return acc;
                  }, {}),
                ).map(([tip, count]) => (
                  <li key={tip} className="flex justify-between border-b border-border pb-2">
                    <span>{tip}</span>
                    <span className="font-semibold">{count}</span>
                  </li>
                ))}
                {requests.length === 0 && (
                  <li className="text-muted-foreground">Nicio solicitare înregistrată încă.</li>
                )}
              </ul>
            </div>
            <div className="surface-card p-6">
              <h3 className="font-semibold">Solicitări după localitate</h3>
              <ul className="mt-4 space-y-2 text-sm">
                {Object.entries(
                  requests.reduce<Record<string, number>>((acc, r) => {
                    acc[r.localitate] = (acc[r.localitate] ?? 0) + 1;
                    return acc;
                  }, {}),
                ).map(([loc, count]) => (
                  <li key={loc} className="flex justify-between border-b border-border pb-2">
                    <span>{loc}</span>
                    <span className="font-semibold">{count}</span>
                  </li>
                ))}
                {requests.length === 0 && (
                  <li className="text-muted-foreground">Nicio solicitare înregistrată încă.</li>
                )}
              </ul>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="requests" className="mt-6 space-y-4">
          {requests.length === 0 && (
            <p className="surface-card p-6 text-sm text-muted-foreground">
              Nu există solicitări momentan.
            </p>
          )}
          {requests.map((r) => (
            <RequestCard
              key={r.id}
              request={r}
              files={files.filter((f) => f.request_id === r.id)}
              onChanged={load}
            />
          ))}
        </TabsContent>

        <TabsContent value="prices" className="mt-6">
          <PricesPanel rows={prices} onChanged={load} />
        </TabsContent>

        <TabsContent value="news" className="mt-6">
          <NewsPanel rows={news} onChanged={load} />
        </TabsContent>

        <TabsContent value="gallery" className="mt-6">
          <GalleryPanel rows={gallery} onChanged={load} />
        </TabsContent>

        <TabsContent value="stats" className="mt-6">
          <StatsPanel rows={stats} onChanged={load} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Inbox;
  label: string;
  value: number;
}) {
  return (
    <div className="surface-card p-6">
      <span className="flex size-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
        <Icon className="size-5" />
      </span>
      <p className="mt-4 text-3xl font-bold">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

function RequestCard({
  request,
  files,
  onChanged,
}: {
  request: RequestRow;
  files: FileRow[];
  onChanged: () => Promise<void>;
}) {
  const [status, setStatus] = useState(request.status);

  async function updateStatus(next: string) {
    setStatus(next);
    const { error } = await supabase
      .from("audit_requests")
      .update({ status: next })
      .eq("id", request.id);
    if (error) toast.error("Nu am putut actualiza starea.");
    else toast.success("Stare actualizată.");
  }

  async function remove() {
    const { error } = await supabase.from("audit_requests").delete().eq("id", request.id);
    if (error) toast.error("Ștergere eșuată.");
    else {
      toast.success("Solicitare ștearsă.");
      await onChanged();
    }
  }

  async function openFile(path: string) {
    const { data, error } = await supabase.storage.from("solicitari").createSignedUrl(path, 300);
    if (error || !data) toast.error("Nu am putut deschide fișierul.");
    else window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="surface-card p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-semibold">
            {request.nume} · <span className="text-primary">{request.tip}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            {request.localitate} · {new Date(request.created_at).toLocaleString("ro-RO")}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary">{status}</Badge>
          <Select value={status} onValueChange={updateStatus}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={() => void remove()} aria-label="Șterge">
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
      <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
        <p>
          <span className="text-muted-foreground">Telefon: </span>
          <a className="hover:underline" href={`tel:${request.telefon}`}>
            {request.telefon}
          </a>
        </p>
        <p>
          <span className="text-muted-foreground">Email: </span>
          {request.email ? (
            <a className="hover:underline" href={`mailto:${request.email}`}>
              {request.email}
            </a>
          ) : (
            "—"
          )}
        </p>
      </div>
      {request.mesaj && <p className="mt-3 text-sm">{request.mesaj}</p>}
      {files.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
            Documente atașate
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {files.map((f) => (
              <Button key={f.id} variant="soft" size="sm" onClick={() => void openFile(f.path)}>
                <FileText className="size-4" /> {f.file_name}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function PricesPanel({ rows, onChanged }: { rows: PriceRow[]; onChanged: () => Promise<void> }) {
  const [draft, setDraft] = useState<PriceRow[]>(rows);
  useEffect(() => setDraft(rows), [rows]);

  function patch(id: string, key: keyof PriceRow, value: string | number | boolean) {
    setDraft((d) => d.map((r) => (r.id === id ? { ...r, [key]: value } : r)));
  }

  async function save(row: PriceRow) {
    const { error } = await supabase
      .from("prices")
      .update({
        service: row.service,
        price: row.price,
        delivery: row.delivery,
        note: row.note,
        sort_order: row.sort_order,
        active: row.active,
      })
      .eq("id", row.id);
    if (error) toast.error("Salvare eșuată.");
    else toast.success("Tarif salvat.");
  }

  async function add() {
    const { error } = await supabase.from("prices").insert({
      service: "Serviciu nou",
      price: "de la 0 lei",
      delivery: "1-3 zile",
      sort_order: (draft.at(-1)?.sort_order ?? 0) + 1,
    });
    if (error) toast.error("Adăugare eșuată.");
    else await onChanged();
  }

  async function remove(id: string) {
    const { error } = await supabase.from("prices").delete().eq("id", id);
    if (error) toast.error("Ștergere eșuată.");
    else await onChanged();
  }

  return (
    <div className="space-y-4">
      <Button variant="cta" onClick={() => void add()}>
        <Plus /> Adaugă tarif
      </Button>
      {draft.map((row) => (
        <div key={row.id} className="surface-card grid gap-4 p-5 md:grid-cols-[2fr_1fr_1fr_auto]">
          <div className="grid gap-2">
            <Label>Serviciu</Label>
            <Input value={row.service} onChange={(e) => patch(row.id, "service", e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>Tarif</Label>
            <Input value={row.price} onChange={(e) => patch(row.id, "price", e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>Termen</Label>
            <Input
              value={row.delivery}
              onChange={(e) => patch(row.id, "delivery", e.target.value)}
            />
          </div>
          <div className="flex items-end gap-2">
            <Button variant="soft" onClick={() => void save(row)} aria-label="Salvează">
              <Save className="size-4" />
            </Button>
            <Button variant="outline" onClick={() => void remove(row.id)} aria-label="Șterge">
              <Trash2 className="size-4" />
            </Button>
          </div>
          <div className="grid gap-2 md:col-span-4">
            <Label>Notă (opțional)</Label>
            <Input
              value={row.note ?? ""}
              onChange={(e) => patch(row.id, "note", e.target.value)}
              placeholder="ex.: pentru urgențe se poate percepe o taxă suplimentară"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function NewsPanel({ rows, onChanged }: { rows: NewsRow[]; onChanged: () => Promise<void> }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("stire");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");

  async function add() {
    if (title.trim().length < 3) {
      toast.error("Titlul este obligatoriu.");
      return;
    }
    const { error } = await supabase.from("news").insert({
      title: title.trim(),
      category,
      excerpt: excerpt.trim() || null,
      content: content.trim(),
    });
    if (error) toast.error("Publicare eșuată.");
    else {
      toast.success("Articol publicat.");
      setTitle("");
      setExcerpt("");
      setContent("");
      await onChanged();
    }
  }

  async function togglePublished(row: NewsRow) {
    const { error } = await supabase
      .from("news")
      .update({ published: !row.published })
      .eq("id", row.id);
    if (error) toast.error("Actualizare eșuată.");
    else await onChanged();
  }

  async function remove(id: string) {
    const { error } = await supabase.from("news").delete().eq("id", id);
    if (error) toast.error("Ștergere eșuată.");
    else await onChanged();
  }

  return (
    <div className="space-y-6">
      <div className="surface-card grid gap-4 p-6">
        <h3 className="font-semibold">Adaugă știre sau reglementare</h3>
        <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
          <div className="grid gap-2">
            <Label>Titlu</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>Categorie</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stire">Știre</SelectItem>
                <SelectItem value="reglementare">Reglementare</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid gap-2">
          <Label>Rezumat</Label>
          <Input value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
        </div>
        <div className="grid gap-2">
          <Label>Conținut</Label>
          <Textarea rows={6} value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <Button variant="cta" className="w-fit" onClick={() => void add()}>
          <Plus /> Publică
        </Button>
      </div>

      {rows.map((row) => (
        <div key={row.id} className="surface-card p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <Badge variant="secondary">{row.category}</Badge>
              <p className="mt-2 font-semibold">{row.title}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(row.published_at).toLocaleDateString("ro-RO")}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="soft" size="sm" onClick={() => void togglePublished(row)}>
                {row.published ? "Ascunde" : "Publică"}
              </Button>
              <Button variant="outline" size="icon" onClick={() => void remove(row.id)}>
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>
          {row.excerpt && <p className="mt-3 text-sm text-muted-foreground">{row.excerpt}</p>}
        </div>
      ))}
    </div>
  );
}

function GalleryPanel({ rows, onChanged }: { rows: GalleryRow[]; onChanged: () => Promise<void> }) {
  const [busy, setBusy] = useState(false);

  async function upload(fileList: FileList | null) {
    if (!fileList?.length) return;
    setBusy(true);
    try {
      for (const file of Array.from(fileList)) {
        const path = `galerie/${crypto.randomUUID()}-${file.name.replace(/[^\w.\-]/g, "_")}`;
        const { error } = await supabase.storage.from("media").upload(path, file);
        if (error) throw error;
        const { data: signed } = await supabase.storage
          .from("media")
          .createSignedUrl(path, 60 * 60 * 24 * 365);
        const { error: insertError } = await supabase.from("gallery_images").insert({
          title: file.name,
          image_url: signed?.signedUrl ?? path,
          storage_path: path,
          sort_order: rows.length + 1,
        });
        if (insertError) throw insertError;
      }
      toast.success("Imagini încărcate.");
      await onChanged();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Încărcare eșuată.");
    } finally {
      setBusy(false);
    }
  }

  async function remove(row: GalleryRow) {
    if (row.storage_path) await supabase.storage.from("media").remove([row.storage_path]);
    const { error } = await supabase.from("gallery_images").delete().eq("id", row.id);
    if (error) toast.error("Ștergere eșuată.");
    else await onChanged();
  }

  return (
    <div className="space-y-6">
      <div className="surface-card p-6">
        <Label htmlFor="galerie-upload" className="font-semibold">
          Încarcă imagini pentru site
        </Label>
        <Input
          id="galerie-upload"
          type="file"
          accept="image/*"
          multiple
          className="mt-3"
          disabled={busy}
          onChange={(e) => void upload(e.target.files)}
        />
        <p className="mt-2 text-xs text-muted-foreground">
          <Upload className="mr-1 inline size-3" /> Imagini JPG sau PNG, maximum 10 MB fiecare.
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((row) => (
          <div key={row.id} className="surface-card overflow-hidden p-0">
            <img
              src={row.image_url}
              alt={row.title ?? "Imagine site"}
              className="h-44 w-full object-cover"
              loading="lazy"
            />
            <div className="flex items-center justify-between gap-3 p-4">
              <p className="truncate text-sm">{row.title}</p>
              <Button variant="outline" size="icon" onClick={() => void remove(row)}>
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>
        ))}
        {rows.length === 0 && (
          <p className="text-sm text-muted-foreground">
            <Images className="mr-1 inline size-4" /> Nicio imagine încărcată.
          </p>
        )}
      </div>
    </div>
  );
}

function StatsPanel({ rows, onChanged }: { rows: StatRow[]; onChanged: () => Promise<void> }) {
  const [draft, setDraft] = useState<StatRow[]>(rows);
  useEffect(() => setDraft(rows), [rows]);

  async function save(row: StatRow) {
    const { error } = await supabase
      .from("site_stats")
      .update({ value: row.value, label: row.label })
      .eq("key", row.key);
    if (error) toast.error("Salvare eșuată.");
    else {
      toast.success("Indicator salvat.");
      await onChanged();
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        <Tag className="mr-1 inline size-4" /> Numărul de lucrări realizate afișat pe site.
      </p>
      {draft.map((row) => (
        <div key={row.key} className="surface-card grid gap-4 p-5 md:grid-cols-[2fr_1fr_auto]">
          <div className="grid gap-2">
            <Label>Denumire</Label>
            <Input
              value={row.label}
              onChange={(e) =>
                setDraft((d) =>
                  d.map((x) => (x.key === row.key ? { ...x, label: e.target.value } : x)),
                )
              }
            />
          </div>
          <div className="grid gap-2">
            <Label>Valoare</Label>
            <Input
              type="number"
              value={row.value}
              onChange={(e) =>
                setDraft((d) =>
                  d.map((x) =>
                    x.key === row.key ? { ...x, value: Number(e.target.value) || 0 } : x,
                  ),
                )
              }
            />
          </div>
          <div className="flex items-end">
            <Button variant="soft" onClick={() => void save(row)}>
              <Save className="size-4" /> Salvează
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
