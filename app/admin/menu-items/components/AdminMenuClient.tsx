"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMenuItems } from "@/features/menu/menuSlice";
import { setCategories } from "@/features/category/categorySlice";
import MenuTable from "./MenuTable";

export default function AdminMenuClient({
  serverData,
  categories,
}: {
  serverData: any;
  categories: any[];
}) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setMenuItems(serverData?.data));
    dispatch(setCategories(categories));
  }, [serverData, categories]);

  return (
    <MenuTable
      initialPage={serverData?.meta?.page ?? 1}
      initialTotalPages={serverData?.meta?.totalPages ?? 1}
    />
  );
}
