import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const MAX_FILE_BYTES = 25 * 1024 * 1024;
// Paths are always "<server-generated uuid>/<sanitized name>".
const PATH_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\/[\w.\-]{1,200}$/i;

const fileSchema = z.object({
  path: z.string().regex(PATH_RE).max(400),
  file_name: z.string().min(1).max(200),
  content_type: z.string().max(120).optional(),
  size_bytes: z.number().int().nonnegative().max(MAX_FILE_BYTES).optional(),
});

const uploadRequestSchema = z.object({
  files: z
    .array(
      z.object({
        name: z.string().min(1).max(200),
        size: z.number().int().positive().max(MAX_FILE_BYTES),
      }),
    )
    .min(1)
    .max(10),
});

// Issues one-time signed upload links for contact-form attachments.
// The private bucket has no open upload rule; only these links can write to it.
export const createRequestUploadUrls = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => uploadRequestSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const folder = crypto.randomUUID();
    const uploads: { path: string; token: string }[] = [];
    const used = new Set<string>();
    for (const f of data.files) {
      let safeName = f.name.replace(/[^\w.\-]/g, "_").replace(/^\.+/, "").slice(0, 180) || "fisier";
      while (used.has(safeName)) safeName = `1_${safeName}`;
      used.add(safeName);
      const path = `${folder}/${safeName}`;
      const { data: signed, error } = await supabaseAdmin.storage
        .from("solicitari")
        .createSignedUploadUrl(path);
      if (error || !signed) {
        console.error("Creare link upload eșuată:", error);
        throw new Error("Nu am putut pregăti încărcarea fișierelor.");
      }
      uploads.push({ path: signed.path, token: signed.token });
    }
    return { uploads };
  });

const schema = z.object({
  nume: z.string().trim().min(2).max(120),
  telefon: z.string().trim().min(6).max(30),
  email: z.string().trim().email().max(180).optional().or(z.literal("")),
  localitate: z.string().trim().min(2).max(120),
  tip: z.string().trim().min(2).max(120),
  mesaj: z.string().trim().max(2000).optional().or(z.literal("")),
  files: z.array(fileSchema).max(10).default([]),
});

export const submitAuditRequest = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: inserted, error } = await supabaseAdmin
      .from("audit_requests")
      .insert({
        nume: data.nume,
        telefon: data.telefon,
        email: data.email || null,
        localitate: data.localitate,
        tip: data.tip,
        mesaj: data.mesaj || null,
      })
      .select("id")
      .single();

    if (error || !inserted) {
      console.error("Insert solicitare eșuat:", error);
      throw new Error("Nu am putut salva solicitarea. Vă rugăm încercați din nou.");
    }

    if (data.files.length > 0) {
      const { error: filesError } = await supabaseAdmin.from("request_files").insert(
        data.files.map((f) => ({
          request_id: inserted.id,
          path: f.path,
          file_name: f.file_name,
          content_type: f.content_type ?? null,
          size_bytes: f.size_bytes ?? null,
        })),
      );
      if (filesError) console.error("Insert fișiere eșuat:", filesError);
    }

    const files: { file_name: string; path: string; url: string | null }[] = [];
    for (const f of data.files) {
      const { data: signed } = await supabaseAdmin.storage
        .from("solicitari")
        .createSignedUrl(f.path, 60 * 60 * 24 * 7);
      files.push({ file_name: f.file_name, path: f.path, url: signed?.signedUrl ?? null });
    }

    const payload = {
      id: inserted.id,
      nume: data.nume,
      telefon: data.telefon,
      email: data.email || null,
      localitate: data.localitate,
      tip: data.tip,
      mesaj: data.mesaj || null,
      files,
    };

    const { sendConfirmationSms, sendRequestEmails } = await import("./notify.server");

    let smsSent = false;
    try {
      smsSent = await sendConfirmationSms(payload);
    } catch (e) {
      console.error("Notificare SMS eșuată:", e);
    }

    let emailSent = false;
    try {
      const emails = await sendRequestEmails(payload);
      emailSent = emails.confirmationSent;
    } catch (e) {
      console.error("Notificări email eșuate:", e);
    }

    return { id: inserted.id, smsSent, emailSent };
  });
