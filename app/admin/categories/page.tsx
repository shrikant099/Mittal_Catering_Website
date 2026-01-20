import { cookies } from "next/headers";
import AdminCategoriesClient from "./components/AdminCategoriesClient";
export const metadata = {
  title: "Categories Management | Admin",
  description: "Manage food categories – create, search and manage categories",
};

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page || 1);
  const search = params.search || "";

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/categories?search=${search}&page=${page}&limit=10`,
    {
      headers: { Cookie: cookieHeader },
      cache: "no-store",
    }
  );

  const data = await res.json();

  return <AdminCategoriesClient serverData={data.data} />;
}
