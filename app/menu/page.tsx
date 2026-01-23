import { Metadata } from "next";
import MenuFaq from "./components/MenuFaq";
import Footer from "../components/Footer";
import AnnouncementBar from "../components/AnnouncementBar";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Mittal Catering Menu | Fresh Vegetarian Catering in Ajmer",
  description:
    "Explore Mittal Catering's delicious vegetarian menu including thali, biryani, pizza, snacks, sweets and Jain special food. Order fresh hygienic meals online.",
  keywords:
    "Mittal Catering Menu, Vegetarian Catering Ajmer, Jain Food Ajmer, Party Catering Ajmer",
};

async function getCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/categories`, {
    cache: "no-store",
  });

  return res.json();
}

export default async function MenuPage() {
  const data = await getCategories();
  const categories = Array.isArray(data?.data) ? data.data : [];

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="w-full max-w-5xl mx-auto px-4 py-10 overflow-x-hidden">
      <h1 className="text-4xl font-bold mb-8 text-center">
          Mittal Catering Menu
        </h1>

        <MenuFaq categories={categories} />
      </main>
      <Footer />
    </>
  );
}
