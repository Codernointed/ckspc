import type { Metadata } from "next";
import "../admin.css";
import { redirect } from "next/navigation";
import { Sidebar } from "../../components/Sidebar";
import { auth } from "@/lib/auth/config";

export const metadata: Metadata = {
  title: { default: "CKSPC Platform", template: "%s · CKSPC Admin" },
  description: "CKSPC church management platform — operations console.",
  robots: { index: false, follow: false },
};

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <html lang="en">
      <body>
        <div className="app">
          <Sidebar user={session.user} />
          <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
