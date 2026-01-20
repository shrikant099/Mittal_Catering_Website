"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMenuItems } from "@/features/menu/menuSlice";
import MenuTable from "./MenuTable";

export default function AdminMenuClient({ serverData }: any) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setMenuItems(serverData));
  }, [serverData]);
  return <MenuTable />;
}
