import { redirect } from "next/navigation";
import { getServerUser } from "@/lib/admin/rbac-server";
import { PanelProviders } from "@/components/panel/panel-providers";
import { PanelShell } from "@/components/panel/shell/panel-shell";

export const dynamic = "force-dynamic";

export default async function PanelV2Layout({ children }: { children: React.ReactNode }) {
  const user = await getServerUser();
  if (!user) redirect("/novves-panel");

  return (
    <PanelProviders>
      <PanelShell user={{ username: user.username, role: user.role }}>{children}</PanelShell>
    </PanelProviders>
  );
}
