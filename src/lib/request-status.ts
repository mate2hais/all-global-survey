export const REQUEST_STATUSES = [
  { value: "nou", label: "Nouă" },
  { value: "sunat", label: "Sunat" },
  { value: "oferta_trimisa", label: "Ofertă trimisă" },
  { value: "castigata", label: "Câștigată" },
  { value: "pierduta", label: "Pierdută" },
] as const;

export type RequestStatus = (typeof REQUEST_STATUSES)[number]["value"];

const LEGACY: Record<string, string> = {
  contactat: "sunat",
  programat: "oferta_trimisa",
  finalizat: "castigata",
  anulat: "pierduta",
};

export function normalizeStatus(value: string): string {
  return LEGACY[value] ?? value;
}

export function statusLabel(value: string): string {
  const v = normalizeStatus(value);
  return REQUEST_STATUSES.find((s) => s.value === v)?.label ?? value;
}

export function statusTone(value: string): "default" | "secondary" | "outline" | "destructive" {
  switch (normalizeStatus(value)) {
    case "castigata":
      return "default";
    case "pierduta":
      return "destructive";
    case "nou":
      return "secondary";
    default:
      return "outline";
  }
}
