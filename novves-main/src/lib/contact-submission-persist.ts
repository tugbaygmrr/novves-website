import { appendFile, mkdir } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";
import type { ContactSubmissionInput } from "@/lib/admin/schemas/contact-submission";

type PersistContactSubmissionInput = ContactSubmissionInput & {
  ip?: string;
  userAgent?: string | null;
};

const DEV_FALLBACK_FILE = path.join(process.cwd(), "data", "contact-submissions.jsonl");

function isDatabaseUnavailable(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const code = "code" in error ? String((error as { code?: string }).code) : "";
  const message = "message" in error ? String((error as { message?: string }).message) : "";
  return (
    code === "P1001" ||
    code === "P1017" ||
    message.includes("Can't reach database server") ||
    message.includes("Environment variable not found: DATABASE_URL")
  );
}

async function persistToDevFallback(data: PersistContactSubmissionInput): Promise<void> {
  await mkdir(path.dirname(DEV_FALLBACK_FILE), { recursive: true });
  await appendFile(
    DEV_FALLBACK_FILE,
    `${JSON.stringify({
      ...data,
      savedAt: new Date().toISOString(),
      source: "dev-fallback",
    })}\n`,
    "utf8",
  );
}

export async function persistContactSubmission(
  data: PersistContactSubmissionInput,
): Promise<{ ok: true; fallback?: boolean } | { ok: false; error: string }> {
  try {
    await prisma.contactSubmission.create({
      data: {
        name: data.name,
        company: data.company || null,
        email: data.email,
        phone: data.phone || null,
        department: data.department || null,
        subject: data.subject || null,
        message: data.message,
        kvkkConsent: data.kvkkConsent,
        ip: data.ip ?? null,
        userAgent: data.userAgent ?? null,
      },
    });
    return { ok: true };
  } catch (error) {
    if (process.env.NODE_ENV === "development" && isDatabaseUnavailable(error)) {
      try {
        await persistToDevFallback(data);
        console.warn("[contact-submit] Database unavailable; saved to data/contact-submissions.jsonl");
        return { ok: true, fallback: true };
      } catch (fallbackError) {
        console.error("[contact-submit] Dev fallback failed", fallbackError);
      }
    }

    console.error("[contact-submit]", error);
    return {
      ok: false,
      error: "Form \u015fu anda g\u00f6nderilemiyor. L\u00fctfen biraz sonra tekrar deneyin.",
    };
  }
}
