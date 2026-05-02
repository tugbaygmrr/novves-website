import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="h-full antialiased light" data-theme="light" suppressHydrationWarning>
      <body className="min-h-full min-h-[100dvh] flex flex-col font-sans">{children}</body>
    </html>
  );
}
