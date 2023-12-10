"use client";
import React from "react";
import { LecturePicker } from "@/ui/components";

type LecturePickerPageProps = {
  params: {
    grade: number;
  };
};

export default function LecturePickerPage({ params }: LecturePickerPageProps) {
  return (
    <main>
      <h1>Sretno Ante</h1>
      <LecturePicker grade={params.grade} />
    </main>
  );
}
