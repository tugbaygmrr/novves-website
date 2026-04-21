export const metadata = {
  title: "NOVVES Panel",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 antialiased">
      {children}
    </div>
  );
}

