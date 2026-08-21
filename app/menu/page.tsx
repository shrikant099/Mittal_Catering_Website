import { Metadata } from "next";
import MenuFaq from "./components/MenuFaq";
import Footer from "../components/Footer";
import AnnouncementBar from "../components/AnnouncementBar";
import Navbar from "../components/Navbar";
import { getBaseUrl } from "@/lib/getBaseUrl";

export const metadata: Metadata = {
  title: "Mittal Catering Menu | Fresh Vegetarian Catering in Ajmer",
  description:
    "Explore Mittal Catering's delicious vegetarian menu including thali, biryani, pizza, snacks, sweets and Jain special food. Order fresh hygienic meals online.",
  keywords:
    "Mittal Catering Menu, Vegetarian Catering Ajmer, Jain Food Ajmer, Party Catering Ajmer",
};

async function getCategories() {
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/categories?limit=100`, {
    next: { revalidate: 60 },
  });

  return res.json();
}

async function getMenuItems() {
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/menu?status=active&limit=500`, {
    next: { revalidate: 60 },
  });

  return res.json();
}

export default async function MenuPage() {
  const [categoriesRes, menuRes] = await Promise.all([
    getCategories(),
    getMenuItems(),
  ]);

  const categories = Array.isArray(categoriesRes?.data)
    ? categoriesRes.data
    : [];
  const menuItems = Array.isArray(menuRes?.data) ? menuRes.data : [];

  // Pre-group items by category so the whole menu can render open,
  // with no per-category fetch needed on the client.
  const itemsByCategory: Record<string, any[]> = {};
  for (const item of menuItems) {
    const categoryId =
      typeof item.category === "object" ? item.category?._id : item.category;
    if (!categoryId) continue;
    if (!itemsByCategory[categoryId]) itemsByCategory[categoryId] = [];
    itemsByCategory[categoryId].push(item);
  }

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="w-full max-w-5xl mx-auto px-4 py-10 overflow-x-hidden">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Mittal Catering Menu
        </h1>

        <MenuFaq categories={categories} itemsByCategory={itemsByCategory} />
      </main>
      <Footer />
    </>
  );
}
