"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    todayOrders: 0,
    todayEarnings: 0,
    customers: 0,
    avgDaily: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/stats", { cache: "no-store" });
        const json = await res.json();
        if (json.success) setStats(json.data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#1e1e1e] p-4 rounded-xl">
          <p className="text-white/60">Today Orders</p>
          <p className="text-3xl font-extrabold">
            {loading ? "…" : stats.todayOrders}
          </p>
        </div>
        <div className="bg-[#1e1e1e] p-4 rounded-xl">
          <p className="text-white/60">Today Earnings</p>
          <p className="text-3xl font-extrabold">
            ₹{loading ? "…" : stats.todayEarnings}
          </p>
        </div>
        <div className="bg-[#1e1e1e] p-4 rounded-xl">
          <p className="text-white/60">Customers</p>
          <p className="text-3xl font-extrabold">
            {loading ? "…" : stats.customers}
          </p>
        </div>
        <div className="bg-[#1e1e1e] p-4 rounded-xl">
          <p className="text-white/60">Avg Daily</p>
          <p className="text-3xl font-extrabold">
            ₹{loading ? "…" : stats.avgDaily}
          </p>
        </div>
      </div>
    </div>
  );
}