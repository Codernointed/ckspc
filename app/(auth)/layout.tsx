import type { Metadata } from "next";
import "../admin.css";

export const metadata: Metadata = {
  title: "Sign in · CKSPC Platform",
  robots: { index: false, follow: false },
};

export default function AuthRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
