"use client";

import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import type { User } from "../types/common";

export const useUser = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const router = useRouter();

  const login = (user: User) => {
    setCookie("user", user);
  };

  const logout = () => {
    removeCookie("user");
    router.push("/login");
  };

  useEffect(() => {
    if (!cookies.user) {
      router.push("/login");
    }
  }, [cookies.user, router]);

  return {
    user: cookies.user,
    login,
    logout,
  };
};
