"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCategories } from "@/features/category/categorySlice";
import CategoriesTable from "./CategoriesTable";

export default function AdminCategoriesClient({ serverData }: any) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCategories(serverData));
  }, [serverData]);

  return <CategoriesTable />;
}
