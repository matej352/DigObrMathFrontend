"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/ui/hooks";

export default function Home() {
  const { user } = useUser();

  const { replace } = useRouter();

  if (user) {
    replace("/grade-picker");
  }

  return <main></main>;
}
