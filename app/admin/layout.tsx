// app/admin/layout.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/jwt";
import AdminSidebar from "./components/AdminSidebar";
import { getMe } from "@/lib/getMe";
import AdminShell from "./AdminShell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Best Caterers in India | Top Event Caterers in Rajasthan, India - Mittal Catering",
  description:
    "Mittal Catering is one of India’s Top Event Caterers specializing in offering best event catering services for all occasions across Rajasthan, India.",
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get("token")?.value;
  let user = null;
  if (token) {
    user = await getMe();
  }

  return <AdminShell user={user}>{children}</AdminShell>;
}
