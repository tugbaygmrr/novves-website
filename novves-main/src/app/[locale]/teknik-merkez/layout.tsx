import { TechnicalCenterGate } from "@/components/technical-center-gate";

export default async function TeknikMerkezLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <TechnicalCenterGate locale={locale}>{children}</TechnicalCenterGate>;
}
