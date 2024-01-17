import React from "react";
import * as S from "./Header.styled";
import { useUser } from "@/ui/hooks";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

function Header() {
  const { user, logout } = useUser();
  const isDashboard = usePathname() === "/dashboard";

  const handleLogout = () => {
    logout();
  };

  if (user?.username === "admin") {
    return (
      <S.Container>
        <S.Username>Pozdrav {user?.username}</S.Username>
        <S.RightWrapper>
          <S.LogoutButton onClick={handleLogout}>Odjavi se</S.LogoutButton>
        </S.RightWrapper>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Username>Sretno {user?.username}</S.Username>
      <S.RightWrapper>
        {isDashboard ? (
          <S.DashboardLink href="/grade-picker">Main menu</S.DashboardLink>
        ) : (
          <S.DashboardLink href="/dashboard">Dashboard</S.DashboardLink>
        )}
        <S.LogoutButton onClick={handleLogout}>Odjavi se</S.LogoutButton>
      </S.RightWrapper>
    </S.Container>
  );
}

export default dynamic(() => Promise.resolve(Header), {
  ssr: false,
});
