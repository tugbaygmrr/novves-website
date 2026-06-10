import { TechnicalDocForm } from "@/components/panel/modules/technical-doc-form";

export const dynamic = "force-dynamic";

export default async function EditDokumanPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <TechnicalDocForm id={Number(id)} />;
}
