"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  List,
  Tags,
  Users,
  Package,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";

const menu = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Categories", href: "/admin/categories", icon: List },
  { name: "Menu Items", href: "/admin/menu-items", icon: Package },
  { name: "Blogs", href: "/admin/blogs", icon: Package },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.user);
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    const response = await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      toast.success("Logged out successfully");
      router.push("/login");
    }
  };

  return (
    <aside className="w-64 bg-[#181818] border-r border-white/10 p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-6 text-orange-400">
        Mittal {user?.role}
      </h1>

      <nav className="space-y-2 flex-1">
        {menu.map((m) => (
          <Link
            key={m.href}
            href={m.href}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              pathname === m.href
                ? "bg-orange-500 text-black"
                : "hover:bg-white/10 text-white"
            }`}
          >
            <m.icon size={18} /> {m.name}
          </Link>
        ))}

        {/* Settings Dropdown */}
        <div className="mt-2">
          <button
            onClick={() => setOpen(!open)}
            className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition text-white hover:bg-white/10 ${
              pathname.startsWith("/admin/settings") ? "bg-white/10" : ""
            }`}
          >
            <span className="flex items-center gap-3">
              <Settings size={18} /> Settings
            </span>
            <ChevronDown
              size={18}
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>

          {open && (
            <div className="mt-2 ml-4 rounded-xl bg-[#111] border border-white/10 overflow-hidden shadow-lg">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
}
