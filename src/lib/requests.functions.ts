import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const fileSchema = z.object({
  path: z.string().min(1).max(400),
  file_name: z.string().min(1).max(200),
  content_type: z.string().max(120).optional(),
  size_bytes: z.number().int().nonnegative().max(30 * 1024 * 1024).optional(),
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

    const { sendConfirmationSms } = await import("./notify.server");
    let smsSent = false;
    try {
      smsSent = await sendConfirmationSms({
        id: inserted.id,
        nume: data.nume,
        telefon: data.telefon,
        email: data.email || null,
        localitate: data.localitate,
        tip: data.tip,
        mesaj: data.mesaj || null,
        files: data.files.map((f) => ({ file_name: f.file_name, path: f.path })),
      });
    } catch (e) {
      console.error("Notificare SMS eșuată:", e);
    }

    return { id: inserted.id, smsSent };
  });
