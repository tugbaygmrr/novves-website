import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";
import { z } from "zod";
import { requirePermission } from "@/lib/admin/rbac-server";
import { getFooterStrings } from "@/components/footer-i18n";
import { locales } from "@/i18n/config";

export const dynamic = "force-dynamic";

const DATA_PATH = path.join(process.cwd(), "src", "data", "footer-content.json");

const s = (max: number) => z.string().max(max);
const lineList = (max = 200, count = 20) => z.array(s(max)).max(count);
const iconPair = z.object({ icon: s(60).optional(), iconImage: s(500).optional() });

const footerSchema = z.object({
  brandSlogan: s(300),
  contactLabels: z.object({ phone: s(60), email: s(60) }),
  phone: s(60).optional(),
  email: s(120).optional(),
  videoTitle: s(200),
  contactIcons: z
    .object({
      phone: iconPair.optional(),
      email: iconPair.optional(),
      headOffice: iconPair.optional(),
      factory: iconPair.optional(),
    })
    .optional(),
  cta: z.object({
    title: s(300),
    desc: s(800),
    button: s(80),
    note: s(200),
    icon: s(60).optional(),
    iconImage: s(500).optional(),
  }),
  pillars: z
    .array(z.object({ line1: s(80), line2: s(80), icon: s(60).optional(), iconImage: s(500).optional() }))
    .max(8),
  brand: z.object({ desc: s(1000) }),
  contact: z.object({ headOffice: s(80), factory: s(80) }),
  sections: z.object({
    products: s(80),
    solutions: s(80),
    engineering: s(80),
    resources: s(80),
    corporate: s(80),
  }),
  links: z.object({
    products: lineList(),
    solutions: lineList(),
    engineering: lineList(),
    resources: lineList(),
    corporate: lineList(),
  }),
  certificates: z.object({
    title: s(120),
    items: lineList(200, 10),
    itemIcons: z.array(iconPair).max(10).optional(),
    downloadIcon: iconPair.optional(),
    downloadCatalog: s(120),
    downloadCatalogDesc: s(200),
  }),
  newsletter: z.object({
    title: s(120),
    desc: s(300),
    placeholder: s(120),
    success: s(200),
    icon: s(60).optional(),
    iconImage: s(500).optional(),
  }),
  langTitle: s(80),
  applicationAreas: z.object({
    title: s(120),
    items: z
      .array(z.object({ line1: s(80), line2: s(80).optional(), icon: s(60).optional(), iconImage: s(500).optional() }))
      .max(12),
  }),
  globalCaption: z.object({ line1: s(120), line2: s(120) }),
  bottom: z.object({
    copyright: s(300),
    legalCenter: s(120),
    kvkk: s(80),
    privacyPolicy: s(120),
    cookieSettings: s(120),
    applicationForm: s(120),
    poweredBy: s(120),
  }),
});

const bodySchema = z.object({
  locale: z.enum(locales as unknown as [string, ...string[]]),
  data: footerSchema,
});

function readStore(): Record<string, unknown> {
  try {
    return JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
  } catch {
    return {};
  }
}

export async function GET(request: NextRequest) {
  const auth = requirePermission(request, "home", "read");
  if (auth instanceof NextResponse) return auth;

  const locale = new URL(request.url).searchParams.get("locale") ?? "tr";
  const data = getFooterStrings(locale);
  const overridden = Object.keys(readStore());
  return NextResponse.json({ data, overriddenLocales: overridden });
}

export async function PUT(request: NextRequest) {
  const auth = requirePermission(request, "home", "write");
  if (auth instanceof NextResponse) return auth;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz JSON" }, { status: 400 });
  }
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Doğrulama hatası", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const store = readStore();
  store[parsed.data.locale] = parsed.data.data;

  fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true });
  fs.writeFileSync(DATA_PATH, JSON.stringify(store, null, 2) + "\n", "utf-8");
  revalidatePath("/", "layout");

  return NextResponse.json({ success: true });
}
