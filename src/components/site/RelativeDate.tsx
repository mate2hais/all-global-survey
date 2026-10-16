import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";

export function formatRelativeRo(date: Date, now: number = Date.now()): string {
  const minutes = Math.floor((now - date.getTime()) / 60000);
  if (minutes < 1) return "acum 1 minut";
  if (minutes < 60) return `acum ${minutes} minute`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return hours === 1 ? "acum 1 oră" : `acum ${hours} ore`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "acum 1 zi";
  return `acum ${days} zile`;
}

/**
 * Data publicării afișată relativ la momentul citirii ("acum 2 minute").
 * Randarea inițială (SSR + prima hidratare) arată data absolută, apoi
 * textul relativ se recalculează în browser la fiecare minut.
 */
export function RelativeDate({
  date,
  className,
}: {
  date: string;
  className?: string;
}) {
  const [text, setText] = useState<string | null>(null);

  useEffect(() => {
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return;
    const update = () => setText(formatRelativeRo(d));
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, [date]);

  const parsed = new Date(date);
  const absolute = Number.isNaN(parsed.getTime())
    ? date
    : parsed.toLocaleDateString("ro-RO", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

  return (
    <span className={className} title={absolute}>
      <CalendarDays className="size-3.5" />
      {text ?? absolute}
    </span>
  );
}
