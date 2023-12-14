import React from "react";
import * as S from "./Header.styled";
import { useUser } from "@/ui/hooks";
import dynamic from "next/dynamic";

function Header() {
  const { user, logout } = useUser();

  const handleLogout = () => {
    logout();
  };

  return (
    <S.Container>
      <S.Username>Sretno {user?.username}</S.Username>
      <S.LogoutButton onClick={handleLogout}>Odjavi se</S.LogoutButton>
    </S.Container>
  );
}

export default dynamic(() => Promise.resolve(Header), {
  ssr: false,
});
