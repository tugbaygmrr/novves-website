import { SayfalarClient } from "@/components/panel/editor/sayfalar-client";

export const dynamic = "force-dynamic";

export default async function SayfalarPage({
  searchParams,
}: {
  searchParams: Promise<{ file?: string }>;
}) {
  const { file } = await searchParams;
  return <SayfalarClient initialFile={file} />;
}
