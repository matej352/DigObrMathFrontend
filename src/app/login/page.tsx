"use client";
import React from "react";
import { useUser } from "@/ui/hooks";
import { useRouter } from "next/navigation";
import { LoginOrRegister } from "@/ui/components";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  justify-content: center;
`;

export default function Login() {
  return (
    <Container>
      <LoginOrRegister />
    </Container>
  );
}
