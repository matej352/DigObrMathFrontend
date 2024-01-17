"use client";
import React from "react";
import Header from "@/ui/components/Header/Header";
import AdminDashboard from "@/ui/components/Dashboard/AdminDashboard";
import UserDashboard from "@/ui/components/Dashboard/UserDashboard";
import { useUser } from "@/ui/hooks";

export default function LecturePickerPage() {
  const { user } = useUser();

  return (
    <main>
      <Header />
      {user?.username === "admin" ? <AdminDashboard /> : <UserDashboard />}
    </main>
  );
}
