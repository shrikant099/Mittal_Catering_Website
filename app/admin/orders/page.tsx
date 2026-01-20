import { Metadata } from "next";
import OrdersTable from "./components/OrdersTable";

export const metadata: Metadata = {
  title: "Orders Management | Mittal Catering Admin",
  description:
    "Manage all orders, update status, payment status and track customer deliveries for Mittal Catering.",
  robots: { index: false, follow: false },
};

export default function OrdersPage() {
  return (
    <main className="min-h-screen px-1 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-white mb-6">
          Orders Management
        </h1>
        <OrdersTable />
      </div>
    </main>
  );
}
