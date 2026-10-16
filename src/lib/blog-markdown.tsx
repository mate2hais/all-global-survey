import { Fragment, type ReactNode } from "react";

export type Block =
  | { type: "h"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string };

/** Parse the light markdown used in blog posts (###, -, 1., >, [x](url), **b**). */
export function parseBlog(content: string): Block[] {
  const blocks: Block[] = [];
  for (const raw of content.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    const last = blocks[blocks.length - 1];
    if (line.startsWith("#")) blocks.push({ type: "h", text: line.replace(/^#+\s*/, "") });
    else if (line.startsWith(">")) blocks.push({ type: "quote", text: line.replace(/^>\s*/, "") });
    else if (/^[-*]\s+/.test(line)) {
      const item = line.replace(/^[-*]\s+/, "");
      if (last?.type === "ul") last.items.push(item);
      else blocks.push({ type: "ul", items: [item] });
    } else if (/^\d+\.\s+/.test(line)) {
      const item = line.replace(/^\d+\.\s+/, "");
      if (last?.type === "ol") last.items.push(item);
      else blocks.push({ type: "ol", items: [item] });
    } else blocks.push({ type: "p", text: line });
  }
  return blocks;
}

export function renderInline(text: string): ReactNode {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link)
      return (
        <a key={i} href={link[2]} className="font-semibold text-primary underline underline-offset-4">
          {link[1]}
        </a>
      );
    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    if (bold) return <strong key={i}>{bold[1]}</strong>;
    return <Fragment key={i}>{part}</Fragment>;
  });
}

/** Where to place inline images: before evenly spread headings (skipping the first), else at the end. */
export function imageSlots(blocks: Block[], count: number): number[] {
  const heads = blocks.map((b, i) => (b.type === "h" ? i : -1)).filter((i) => i > 0);
  const candidates = heads.slice(1).length >= count ? heads.slice(1) : heads;
  const slots: number[] = [];
  for (let k = 0; k < count; k++) {
    if (candidates.length === 0) slots.push(blocks.length);
    else {
      const idx = Math.round(((k + 1) * candidates.length) / (count + 1)) - (count >= candidates.length ? 1 : 0);
      const pick = candidates[Math.min(Math.max(idx, 0), candidates.length - 1)]!;
      slots.push(slots.includes(pick) ? blocks.length : pick);
    }
  }
  return slots;
}

export function BlogBlocks({
  blocks,
  images = [],
  title = "",
}: {
  blocks: Block[];
  images?: string[];
  title?: string;
}) {
  const slots = imageSlots(blocks, images.length);
  const imgAt = (pos: number) =>
    images
      .map((url, k) => ({ url, k }))
      .filter(({ k }) => slots[k] === pos)
      .map(({ url, k }) => (
        <img
          key={`img-${k}`}
          src={url}
          alt={`${title} — imagine ${k + 1}`}
          width={1200}
          height={800}
          loading="lazy"
          decoding="async"
          className="my-8 aspect-[3/2] w-full rounded-2xl object-cover"
        />
      ));
  return (
    <div className="mt-10 space-y-5">
      {blocks.map((b, i) => {
        const before = imgAt(i);
        const el = renderBlock(b, i);
        return before.length ? (
          <Fragment key={i}>
            {before}
            {el}
          </Fragment>
        ) : (
          el
        );
      })}
      {imgAt(blocks.length)}
    </div>
  );
}

function renderBlock(b: Block, i: number) {
  {
        if (b.type === "h")
          return (
            <h2 key={i} className="pt-4 text-xl font-bold">
              {b.text}
            </h2>
          );
        if (b.type === "quote")
          return (
            <blockquote key={i} className="border-l-4 border-primary pl-4 italic text-foreground">
              {renderInline(b.text)}
            </blockquote>
          );
        if (b.type === "ul" || b.type === "ol") {
          const Tag = b.type === "ul" ? "ul" : "ol";
          return (
            <Tag
              key={i}
              className={`space-y-1.5 pl-6 text-muted-foreground ${b.type === "ul" ? "list-disc" : "list-decimal"}`}
            >
              {b.items.map((it, j) => (
                <li key={j}>{renderInline(it)}</li>
              ))}
            </Tag>
          );
        }
        return (
          <p key={i} className="text-muted-foreground">
            {renderInline(b.text)}
          </p>
        );
  }
}
