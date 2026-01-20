"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/features/user/userSlice";
import AdminSidebar from "./components/AdminSidebar";

export default function AdminShell({
  children,
  user,
}: {
  children: React.ReactNode;
  user: any;
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) dispatch(setUser(user));
  }, [user, dispatch]);

  return (
    <div className="min-h-screen flex bg-[#0f0f0f] text-white">
      <AdminSidebar />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
