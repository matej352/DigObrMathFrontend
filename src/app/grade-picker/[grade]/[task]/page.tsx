"use client";
import React from "react";
import { Task } from "@/ui/components";

type TaskPageProps = {
  params: {
    grade: number;
    task: number;
  };
};

export default function TaskPickerPage({ params }: TaskPageProps) {
  return (
    <main>
      <Task grade={params.grade} task={params.task} />
    </main>
  );
}
