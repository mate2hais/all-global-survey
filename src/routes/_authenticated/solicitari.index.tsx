import { useCallback, useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Inbox, RefreshCw, Search } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { REQUEST_STATUSES, normalizeStatus, statusLabel, statusTone } from "@/lib/request-status";

export const Route = createFileRoute("/_authenticated/solicitari/")({
  head: () => ({
    meta: [
      { title: "Solicitări — administrare" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Lista solicitărilor primite prin formularul site-ului." },
    ],
  }),
  component: RequestsListPage,
});

type Row = {
  id: string;
  nume: string;
  telefon: string;
  email: string | null;
  localitate: string;
  tip: string;
  status: string;
  created_at: string;
};

function RequestsListPage() {
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("toate");
  const [tip, setTip] = useState("toate");

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("audit_requests")
      .select("id, nume, telefon, email, localitate, tip, status, created_at")
      .order("created_at", { ascending: false });
    if (error) toast.error("Nu am putut încărca solicitările.");
    setRows((data as Row[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    void (async () => {
      const { data, error } = await supabase.rpc("is_admin");
      const ok = !error && data === true;
      setAllowed(ok);
      if (ok) await load();
      else setLoading(false);
    })();
  }, [load]);

  const tipuri = useMemo(() => Array.from(new Set(rows.map((r) => r.tip))).sort(), [rows]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return rows.filter((r) => {
      if (status !== "toate" && normalizeStatus(r.status) !== status) return false;
      if (tip !== "toate" && r.tip !== tip) return false;
      if (!term) return true;
      return [r.nume, r.telefon, r.email ?? "", r.localitate, r.tip]
        .join(" ")
        .toLowerCase()
        .includes(term);
    });
  }, [rows, q, status, tip]);

  async function updateStatus(id: string, next: string) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status: next } : r)));
    const { error } = await supabase.from("audit_requests").update({ status: next }).eq("id", id);
    if (error) {
      toast.error("Nu am putut actualiza starea.");
      await load();
    } else toast.success("Stare actualizată.");
  }

  if (allowed === false) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="text-2xl font-bold">Acces restricționat</h1>
        <p className="mt-3 text-muted-foreground">
          Contul cu care sunteți autentificat nu are drepturi de administrare.
        </p>
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
          <h1 className="mt-2 text-3xl font-bold">Solicitări</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {filtered.length} din {rows.length} solicitări afișate.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="soft" onClick={() => void load()} disabled={loading}>
            <RefreshCw className={loading ? "animate-spin" : ""} /> Reîmprospătează
          </Button>
          <Button variant="outline" asChild>
            <Link to="/administrare">Panou de control</Link>
          </Button>
        </div>
      </div>

      <div className="surface-card mt-8 grid gap-4 p-5 md:grid-cols-[2fr_1fr_1fr]">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Caută după nume, telefon, email sau localitate"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Stare" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="toate">Toate stările</SelectItem>
            {REQUEST_STATUSES.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={tip} onValueChange={setTip}>
          <SelectTrigger>
            <SelectValue placeholder="Tip lucrare" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="toate">Toate tipurile</SelectItem>
            {tipuri.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="surface-card mt-6 overflow-x-auto">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="border-b border-border text-left text-muted-foreground">
            <tr>
              <th className="px-5 py-4 font-semibold">Dată</th>
              <th className="px-5 py-4 font-semibold">Nume</th>
              <th className="px-5 py-4 font-semibold">Telefon</th>
              <th className="px-5 py-4 font-semibold">Localitate</th>
              <th className="px-5 py-4 font-semibold">Tip lucrare</th>
              <th className="px-5 py-4 font-semibold">Stare</th>
              <th className="px-5 py-4" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-b border-border/70 last:border-0">
                <td className="px-5 py-4 whitespace-nowrap">
                  {new Date(r.created_at).toLocaleString("ro-RO")}
                </td>
                <td className="px-5 py-4 font-medium">{r.nume}</td>
                <td className="px-5 py-4">
                  <a className="hover:underline" href={`tel:${r.telefon}`}>
                    {r.telefon}
                  </a>
                </td>
                <td className="px-5 py-4">{r.localitate}</td>
                <td className="px-5 py-4">{r.tip}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Badge variant={statusTone(r.status)}>{statusLabel(r.status)}</Badge>
                    <Select
                      value={normalizeStatus(r.status)}
                      onValueChange={(v) => void updateStatus(r.id, v)}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {REQUEST_STATUSES.map((s) => (
                          <SelectItem key={s.value} value={s.value}>
                            {s.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </td>
                <td className="px-5 py-4 text-right">
                  <Button variant="soft" size="sm" asChild>
                    <Link to="/solicitari/$id" params={{ id: r.id }}>
                      Deschide <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && !loading && (
              <tr>
                <td colSpan={7} className="px-5 py-12 text-center text-muted-foreground">
                  <Inbox className="mx-auto mb-3 size-6" />
                  Nicio solicitare care să corespundă filtrelor.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
