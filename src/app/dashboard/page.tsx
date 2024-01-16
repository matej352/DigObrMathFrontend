"use client";
import React from "react";
import Header from "@/ui/components/Header/Header";
import { AdminDashboard, UserDashboard } from "@/ui/components";
import { useUser } from "@/ui/hooks";

export default function LecturePickerPage() {
  const { user } = useUser();

  return (
    <main>
      <Header />
      {user?.name === "admin" ? <AdminDashboard /> : <UserDashboard />}
    </main>
  );
}
