import { cookies } from "next/headers";
import AdminMenuClient from "./components/AdminMenuClient";
import { getBaseUrl } from "@/lib/getBaseUrl";

export const metadata = {
  title: "Menu Items | Admin",
  description: "Manage menu items",
};

export default async function MenuPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page || 1);
  const search = params.search || "";

  const cookieHeader = (await cookies()).toString();
  const baseUrl = await getBaseUrl();
  const res = await fetch(
    `${baseUrl}/api/menu?search=${search}&page=${page}&limit=10`,
    { headers: { Cookie: cookieHeader }, cache: "no-store" }
  );
  const data = await res.json();

  return <AdminMenuClient serverData={data.data} />;
}
