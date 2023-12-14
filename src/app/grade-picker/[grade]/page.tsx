"use client";
import React from "react";
import { LecturePicker } from "@/ui/components";
import Header from "@/ui/components/Header/Header";

type LecturePickerPageProps = {
  params: {
    grade: number;
  };
};

export default function LecturePickerPage({ params }: LecturePickerPageProps) {
  return (
    <main>
      <Header />
      <LecturePicker grade={params.grade} />
    </main>
  );
}
