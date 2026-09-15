/**
 * Notificări pentru solicitările primite prin formularul de contact.
 * SMS-ul se trimite prin Twilio doar dacă există o conexiune Twilio configurată.
 */

export interface RequestPayload {
  id: string;
  nume: string;
  telefon: string;
  email?: string | null;
  localitate: string;
  tip: string;
  mesaj?: string | null;
  files: { file_name: string; path: string; url?: string | null }[];
}

/** Confirmare către solicitant + notificare completă către auditor. */
export async function sendRequestEmails(
  payload: RequestPayload,
): Promise<{ confirmationSent: boolean; noticeSent: boolean }> {
  const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
  const data = new Date().toLocaleString("ro-RO", { timeZone: "Europe/Bucharest" });

  let confirmationSent = false;
  if (payload.email) {
    try {
      const res = await sendTemplateEmail("solicitare-confirmare", payload.email, {
        idempotencyKey: `solicitare-confirmare-${payload.id}`,
        templateData: {
          nume: payload.nume,
          telefon: payload.telefon,
          localitate: payload.localitate,
          tip: payload.tip,
          mesaj: payload.mesaj ?? "",
          fisiere: payload.files.map((f) => f.file_name),
        },
      });
      confirmationSent = res.sent;
    } catch (e) {
      console.error("Email confirmare eșuat:", e);
    }
  }

  let noticeSent = false;
  try {
    const res = await sendTemplateEmail("solicitare-notificare", "", {
      idempotencyKey: `solicitare-notificare-${payload.id}`,
      ...(payload.email ? { replyTo: payload.email } : {}),
      templateData: {
        id: payload.id,
        nume: payload.nume,
        telefon: payload.telefon,
        email: payload.email ?? "",
        localitate: payload.localitate,
        tip: payload.tip,
        mesaj: payload.mesaj ?? "",
        data,
        fisiere: payload.files.map((f) => ({ name: f.file_name, url: f.url ?? null })),
      },
    });
    noticeSent = res.sent;
  } catch (e) {
    console.error("Email notificare auditor eșuat:", e);
  }

  return { confirmationSent, noticeSent };
}

const GATEWAY_URL = "https://connector-gateway.lovable.dev/twilio";

export async function sendConfirmationSms(payload: RequestPayload): Promise<boolean> {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const twilioKey = process.env["TWILIO_API_KEY"];
  const from = process.env["TWILIO_FROM_NUMBER"];
  if (!lovableKey || !twilioKey || !from) {
    console.warn("SMS neconfigurat (lipsește conexiunea Twilio) — solicitare:", payload.id);
    return false;
  }

  const to = normalizePhone(payload.telefon);
  if (!to) return false;

  const body = new URLSearchParams({
    To: to,
    From: from,
    Body: `Bună, ${payload.nume}! Am primit solicitarea dumneavoastră (${payload.tip}) pentru ${payload.localitate}. Vă contactez în cel mai scurt timp. Iulian Gabriel Panainte, auditor energetic Galați.`,
  });

  const res = await fetch(`${GATEWAY_URL}/Messages.json`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": twilioKey,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(`Trimitere SMS eșuată [${res.status}]: ${text}`);
    return false;
  }
  return true;
}

function normalizePhone(raw: string): string | null {
  const digits = raw.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return digits;
  if (digits.startsWith("07") && digits.length === 10) return `+4${digits}`;
  if (digits.startsWith("407")) return `+${digits}`;
  return null;
}
