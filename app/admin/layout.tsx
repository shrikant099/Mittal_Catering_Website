// app/admin/layout.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/jwt";
import AdminSidebar from "./components/AdminSidebar";
import { getMe } from "@/lib/getMe";
import AdminShell from "./AdminShell";

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
