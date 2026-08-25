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

  const [menuRes, categoriesRes] = await Promise.all([
    fetch(`${baseUrl}/api/menu?search=${search}&page=${page}&limit=10`, {
      headers: { Cookie: cookieHeader },
      cache: "no-store",
    }),
    // The "Select Category" dropdown needs every category, not the
    // paginated slice the Categories admin table works with.
    fetch(`${baseUrl}/api/categories?limit=100`, {
      headers: { Cookie: cookieHeader },
      cache: "no-store",
    }),
  ]);

  const data = await menuRes.json();
  const categoriesData = await categoriesRes.json();

  return (
    <AdminMenuClient
      serverData={data}
      categories={Array.isArray(categoriesData?.data) ? categoriesData.data : []}
    />
  );
}
