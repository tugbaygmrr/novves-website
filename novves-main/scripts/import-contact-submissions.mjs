import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { PrismaClient } from "@prisma/client";

function loadEnvFiles() {
  for (const name of [".env.local", ".env"]) {
    const p = resolve(process.cwd(), name);
    if (!existsSync(p)) continue;
    const text = readFileSync(p, "utf8");
    for (const raw of text.split(/\r?\n/)) {
      const line = raw.trim();
      if (!line || line.startsWith("#")) continue;
      const eq = line.indexOf("=");
      if (eq <= 0) continue;
      const key = line.slice(0, eq).trim();
      let val = line.slice(eq + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (process.env[key] === undefined) process.env[key] = val;
    }
  }
}

loadEnvFiles();

const FALLBACK_FILE = resolve(process.cwd(), "data", "contact-submissions.jsonl");
const prisma = new PrismaClient();

async function main() {
  if (!existsSync(FALLBACK_FILE)) {
    console.log("Iceri aktarilacak dosya yok:", FALLBACK_FILE);
    return;
  }

  const lines = readFileSync(FALLBACK_FILE, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  let imported = 0;
  let skipped = 0;

  for (const line of lines) {
    const row = JSON.parse(line);
    const existing = await prisma.contactSubmission.findFirst({
      where: {
        email: row.email,
        name: row.name,
        message: row.message,
      },
    });

    if (existing) {
      skipped += 1;
      continue;
    }

    await prisma.contactSubmission.create({
      data: {
        name: row.name,
        company: row.company || null,
        email: row.email,
        phone: row.phone || null,
        department: row.department || null,
        subject: row.subject || null,
        message: row.message,
        kvkkConsent: Boolean(row.kvkkConsent),
        ip: row.ip || null,
        userAgent: row.userAgent || null,
        createdAt: row.savedAt ? new Date(row.savedAt) : undefined,
      },
    });
    imported += 1;
  }

  console.log(`Tamamlandi: ${imported} kayit aktarildi, ${skipped} zaten vardi.`);
}

main()
  .catch((error) => {
    console.error("Iceri aktarma basarisiz:", error.message || error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
