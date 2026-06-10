import { TeamForm } from "@/components/panel/modules/team-form";

export const dynamic = "force-dynamic";

export default async function EditUyePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <TeamForm id={Number(id)} />;
}
