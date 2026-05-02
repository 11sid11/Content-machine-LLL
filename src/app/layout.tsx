import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LeanLogicLab Content Machine",
  description: "Local-first Instagram post generation dashboard for @leanlogiclab"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
