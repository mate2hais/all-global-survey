import { useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitTestimonial } from "@/lib/public-content.functions";

export function TestimonialForm() {
  const send = useServerFn(submitTestimonial);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await send({ data: { name, city, text, rating } });
      setDone(true);
      toast.success("Mulțumim! Recenzia a fost trimisă spre verificare.");
      setName("");
      setCity("");
      setText("");
      setRating(5);
    } catch {
      toast.error("Nu am putut trimite recenzia. Verificați câmpurile și încercați din nou.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="surface-card p-7 text-center">
        <h3 className="text-lg font-semibold">Mulțumim pentru recenzie!</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Părerea dumneavoastră va apărea pe site după o scurtă verificare.
        </p>
        <Button className="mt-5" variant="outline" onClick={() => setDone(false)}>
          Trimite altă recenzie
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="surface-card grid gap-5 p-7">
      <div>
        <h3 className="text-lg font-semibold">Lăsați-vă părerea</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Spuneți-ne cum a fost colaborarea și acordați un punctaj.
        </p>
      </div>

      <div className="grid gap-2">
        <Label>Punctaj</Label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              aria-label={`${n} stele`}
              onClick={() => setRating(n)}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(0)}
              className="p-0.5 text-primary transition-transform hover:scale-110"
            >
              <Star className={`size-7 ${(hover || rating) >= n ? "fill-current" : ""}`} />
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="rev-name">Nume</Label>
          <Input
            id="rev-name"
            required
            maxLength={80}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Numele dumneavoastră"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="rev-city">Localitate</Label>
          <Input
            id="rev-city"
            maxLength={80}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Galați"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="rev-text">Recenzia</Label>
        <Textarea
          id="rev-text"
          required
          minLength={10}
          maxLength={1500}
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Cum a fost experiența cu serviciile noastre?"
        />
      </div>

      <Button type="submit" variant="cta" size="lg" disabled={loading} className="justify-self-start">
        {loading ? "Se trimite..." : "Trimite recenzia"}
      </Button>
    </form>
  );
}
