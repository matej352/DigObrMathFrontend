"use client";
import React from "react";
import { Task } from "@/ui/components";
import Header from "@/ui/components/Header/Header";

type TaskPageProps = {
  params: {
    grade: number;
    lectureId: string;
  };
};

export default function TaskPickerPage({ params }: TaskPageProps) {
  return (
    <main>
      <Header />
      <Task grade={params.grade} lectureId={params.lectureId} />
    </main>
  );
}
