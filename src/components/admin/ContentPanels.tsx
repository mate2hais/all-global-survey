import { useEffect, useState } from "react";
import { Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export type TestimonialRow = {
  id: string;
  name: string;
  city: string;
  rating: number;
  text: string;
  published: boolean;
  sort_order: number;
};
export type FaqRow = {
  id: string;
  question: string;
  answer: string;
  published: boolean;
  sort_order: number;
};
export type BlogRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  read_time: string;
  published: boolean;
  published_at: string;
};
export type ContentRow = { key: string; label: string; value: string };

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function SiteTextPanel({
  rows,
  onChanged,
}: {
  rows: ContentRow[];
  onChanged: () => Promise<void>;
}) {
  const [draft, setDraft] = useState(rows);
  useEffect(() => setDraft(rows), [rows]);

  async function save(row: ContentRow) {
    const { error } = await supabase
      .from("site_content")
      .update({ value: row.value, updated_at: new Date().toISOString() })
      .eq("key", row.key);
    if (error) toast.error("Salvare eșuată.");
    else {
      toast.success("Text salvat.");
      await onChanged();
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Textele de mai jos apar direct în paginile site-ului. Lăsați câmpul „Anunț” gol pentru a
        ascunde bara de anunț de pe prima pagină.
      </p>
      {draft.map((row) => (
        <div key={row.key} className="surface-card grid gap-3 p-5">
          <Label>{row.label}</Label>
          <Textarea
            rows={row.value.length > 90 ? 3 : 2}
            value={row.value}
            onChange={(e) =>
              setDraft((d) =>
                d.map((x) => (x.key === row.key ? { ...x, value: e.target.value } : x)),
              )
            }
          />
          <Button variant="soft" className="w-fit" onClick={() => void save(row)}>
            <Save className="size-4" /> Salvează
          </Button>
        </div>
      ))}
    </div>
  );
}

export function TestimonialsPanel({
  rows,
  onChanged,
}: {
  rows: TestimonialRow[];
  onChanged: () => Promise<void>;
}) {
  const [draft, setDraft] = useState(rows);
  useEffect(() => setDraft(rows), [rows]);

  async function add() {
    const { error } = await supabase.from("testimonials").insert({
      name: "Client nou",
      city: "Galați",
      rating: 5,
      text: "Text recenzie",
      sort_order: rows.length + 1,
    });
    if (error) toast.error("Adăugare eșuată.");
    else await onChanged();
  }

  async function save(row: TestimonialRow) {
    const { error } = await supabase
      .from("testimonials")
      .update({
        name: row.name,
        city: row.city,
        rating: row.rating,
        text: row.text,
        published: row.published,
        sort_order: row.sort_order,
      })
      .eq("id", row.id);
    if (error) toast.error("Salvare eșuată.");
    else toast.success("Recenzie salvată.");
  }

  async function remove(id: string) {
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) toast.error("Ștergere eșuată.");
    else await onChanged();
  }

  return (
    <div className="space-y-4">
      <Button variant="cta" onClick={() => void add()}>
        <Plus /> Adaugă recenzie
      </Button>
      {draft.map((row) => (
        <div key={row.id} className="surface-card grid gap-4 p-5">
          <div className="grid gap-4 md:grid-cols-[2fr_1fr_100px]">
            <div className="grid gap-2">
              <Label>Nume</Label>
              <Input
                value={row.name}
                onChange={(e) =>
                  setDraft((d) =>
                    d.map((x) => (x.id === row.id ? { ...x, name: e.target.value } : x)),
                  )
                }
              />
            </div>
            <div className="grid gap-2">
              <Label>Localitate</Label>
              <Input
                value={row.city}
                onChange={(e) =>
                  setDraft((d) =>
                    d.map((x) => (x.id === row.id ? { ...x, city: e.target.value } : x)),
                  )
                }
              />
            </div>
            <div className="grid gap-2">
              <Label>Stele</Label>
              <Input
                type="number"
                min={1}
                max={5}
                value={row.rating}
                onChange={(e) =>
                  setDraft((d) =>
                    d.map((x) =>
                      x.id === row.id ? { ...x, rating: Number(e.target.value) || 5 } : x,
                    ),
                  )
                }
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Recenzie</Label>
            <Textarea
              rows={3}
              value={row.text}
              onChange={(e) =>
                setDraft((d) =>
                  d.map((x) => (x.id === row.id ? { ...x, text: e.target.value } : x)),
                )
              }
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="soft" onClick={() => void save(row)}>
              <Save className="size-4" /> Salvează
            </Button>
            <Button
              variant="soft"
              onClick={() => {
                const next = { ...row, published: !row.published };
                setDraft((d) => d.map((x) => (x.id === row.id ? next : x)));
                void save(next).then(onChanged);
              }}
            >
              {row.published ? "Ascunde" : "Publică"}
            </Button>
            <Badge variant={row.published ? "default" : "secondary"}>
              {row.published ? "Publicată" : "Ascunsă"}
            </Badge>
            <Button variant="outline" size="icon" onClick={() => void remove(row.id)}>
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export function FaqPanel({ rows, onChanged }: { rows: FaqRow[]; onChanged: () => Promise<void> }) {
  const [draft, setDraft] = useState(rows);
  useEffect(() => setDraft(rows), [rows]);

  async function add() {
    const { error } = await supabase.from("faq_items").insert({
      question: "Întrebare nouă",
      answer: "Răspuns",
      sort_order: rows.length + 1,
    });
    if (error) toast.error("Adăugare eșuată.");
    else await onChanged();
  }

  async function save(row: FaqRow) {
    const { error } = await supabase
      .from("faq_items")
      .update({
        question: row.question,
        answer: row.answer,
        published: row.published,
        sort_order: row.sort_order,
      })
      .eq("id", row.id);
    if (error) toast.error("Salvare eșuată.");
    else toast.success("Întrebare salvată.");
  }

  async function remove(id: string) {
    const { error } = await supabase.from("faq_items").delete().eq("id", id);
    if (error) toast.error("Ștergere eșuată.");
    else await onChanged();
  }

  return (
    <div className="space-y-4">
      <Button variant="cta" onClick={() => void add()}>
        <Plus /> Adaugă întrebare
      </Button>
      {draft.map((row) => (
        <div key={row.id} className="surface-card grid gap-3 p-5">
          <div className="grid gap-2">
            <Label>Întrebare</Label>
            <Input
              value={row.question}
              onChange={(e) =>
                setDraft((d) =>
                  d.map((x) => (x.id === row.id ? { ...x, question: e.target.value } : x)),
                )
              }
            />
          </div>
          <div className="grid gap-2">
            <Label>Răspuns</Label>
            <Textarea
              rows={4}
              value={row.answer}
              onChange={(e) =>
                setDraft((d) =>
                  d.map((x) => (x.id === row.id ? { ...x, answer: e.target.value } : x)),
                )
              }
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="soft" onClick={() => void save(row)}>
              <Save className="size-4" /> Salvează
            </Button>
            <Button
              variant="soft"
              onClick={() => {
                const next = { ...row, published: !row.published };
                setDraft((d) => d.map((x) => (x.id === row.id ? next : x)));
                void save(next).then(onChanged);
              }}
            >
              {row.published ? "Ascunde" : "Publică"}
            </Button>
            <Button variant="outline" size="icon" onClick={() => void remove(row.id)}>
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export function BlogPanel({
  rows,
  onChanged,
  imageOptions,
}: {
  rows: BlogRow[];
  onChanged: () => Promise<void>;
  imageOptions: { url: string; title: string }[];
}) {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  async function add() {
    if (title.trim().length < 5) {
      toast.error("Titlul este obligatoriu.");
      return;
    }
    const { error } = await supabase.from("blog_posts").insert({
      slug: slugify(title),
      title: title.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      image_url: imageUrl || null,
    });
    if (error) toast.error("Publicare eșuată: " + error.message);
    else {
      toast.success("Articol publicat pe blog.");
      setTitle("");
      setExcerpt("");
      setContent("");
      setImageUrl("");
      await onChanged();
    }
  }

  async function togglePublished(row: BlogRow) {
    const { error } = await supabase
      .from("blog_posts")
      .update({ published: !row.published })
      .eq("id", row.id);
    if (error) toast.error("Actualizare eșuată.");
    else await onChanged();
  }

  async function remove(id: string) {
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) toast.error("Ștergere eșuată.");
    else await onChanged();
  }

  return (
    <div className="space-y-6">
      <div className="surface-card grid gap-4 p-6">
        <h3 className="font-semibold">Articol nou pe blog</h3>
        <div className="grid gap-2">
          <Label>Titlu</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="grid gap-2">
          <Label>Rezumat (apare în listă și pe Google)</Label>
          <Textarea rows={2} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
        </div>
        <div className="grid gap-2">
          <Label>Conținut</Label>
          <Textarea
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={"Un rând gol separă paragrafele.\nUn rând care începe cu # devine subtitlu."}
          />
        </div>
        <div className="grid gap-2">
          <Label>Imagine (opțional — din imaginile încărcate)</Label>
          <select
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          >
            <option value="">Fără imagine</option>
            {imageOptions.map((img) => (
              <option key={img.url} value={img.url}>
                {img.title}
              </option>
            ))}
          </select>
        </div>
        <Button variant="cta" className="w-fit" onClick={() => void add()}>
          <Plus /> Publică articolul
        </Button>
      </div>

      {rows.map((row) => (
        <div key={row.id} className="surface-card p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-semibold">{row.title}</p>
              <p className="text-xs text-muted-foreground">
                /blog/{row.slug} · {new Date(row.published_at).toLocaleDateString("ro-RO")}
              </p>
            </div>
            <div className="flex gap-2">
              <Badge variant={row.published ? "default" : "secondary"}>
                {row.published ? "Publicat" : "Ascuns"}
              </Badge>
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
