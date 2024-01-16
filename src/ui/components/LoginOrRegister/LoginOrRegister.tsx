import React from "react";
import * as S from "./LoginOrRegister.styled";
import { Icon } from "./Icon";
import { Input, LoadingSpinner } from "..";
import { useFormik } from "formik";
import { loginSchema, registerSchema } from "./LoginOrRegister.validation";
import axios from "axios";
import type { User } from "../../types";
import { useUser } from "@/ui/hooks";
import { useRouter } from "next/navigation";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://dig-obr-backend-app.vercel.app";

export function LoginOrRegister() {
  const [isLogin, setIsLogin] = React.useState(false);
  const [isRegister, setIsRegister] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const { login } = useUser();
  const { replace } = useRouter();

  const { values, setFieldValue, isValid, resetForm } = useFormik({
    initialValues: {
      username: "",
      password: "",
      repeatPassword: "",
    },
    onSubmit: () => {},
    validationSchema: isLogin ? loginSchema : registerSchema,
    validateOnChange: true,
    validateOnMount: true,
  });

  const shouldShowWelcome = !isLogin && !isRegister;

  const handleLogin = async () => {
    if (!isValid) return;
    try {
      setIsLoading(true);
      const loginResponse = await axios.post(`${BACKEND_URL}/api/login`, {
        username: values.username,
        password: values.password,
      });
      setIsLoading(false);

      console.log(loginResponse.data);

      const accessToken = loginResponse.data.accessToken;
      login({
        username: values.username,
        accessToken,
        _id: loginResponse.data._id,
      });

      replace("/grade-picker");
    } catch (e) {
      setIsLoading(false);
      console.log(e);
      alert("Pogrešno korisničko ime ili lozinka");
    }
  };
  const handleRegister = async () => {
    if (!isValid) return;
    try {
      setIsLoading(true);
      const response = await axios.post(`${BACKEND_URL}/api/register`, {
        ...values,
      });

      const loginResponse = await axios.post(`${BACKEND_URL}/api/login`, {
        username: values.username,
        password: values.password,
      });

      setIsLoading(false);
      const accessToken = loginResponse.data.accessToken;
      login({
        username: values.username,
        accessToken,
        _id: loginResponse.data._id,
      });

      replace("/grade-picker");
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  return (
    <S.Container>
      {shouldShowWelcome && (
        <>
          <S.Title>MathAI</S.Title>
          <S.SVGWrapper>
            <Icon />
          </S.SVGWrapper>
          <S.Description>
            Aplikacija za ponavljanje matematike osnovne škole. <br /> Bilo
            kada, bilo gdje.
          </S.Description>
          <S.Button
            isFilled={false}
            onClick={() => {
              setIsLogin(true);
            }}
          >
            Prijava
          </S.Button>
          <S.Button
            isFilled={true}
            onClick={() => {
              setIsRegister(true);
            }}
          >
            Registracija
          </S.Button>
        </>
      )}
      {isLogin && (
        <>
          <S.Subtitle>Dobrodošao nazad!</S.Subtitle>

          <S.Description>
            Unesite svoje korisničko ime i lozinku postavljenu prilikom
            registracije.
          </S.Description>
          <Input
            value={values.username}
            onChange={(e) => {
              setFieldValue("username", e.target.value);
            }}
            placeholder="Korisničko ime"
          />
          <Input
            value={values.password}
            onChange={(e) => {
              setFieldValue("password", e.target.value);
            }}
            placeholder="Lozinka"
            type="password"
          />

          <S.Button isFilled={isValid} onClick={handleLogin}>
            Prijavi se
          </S.Button>
          <S.BackButton
            onClick={() => {
              resetForm();
              setIsLogin(false);
            }}
          >
            Nazad
          </S.BackButton>
        </>
      )}

      {isRegister && (
        <>
          <S.Subtitle>Dobrodošao u svijet matematike!</S.Subtitle>
          <S.Description>
            Registrirajte se pomoću proizvoljnog korisničkog imena i lozinke
          </S.Description>
          <Input
            value={values.username}
            onChange={(e) => {
              setFieldValue("username", e.target.value);
            }}
            placeholder="Korisničko ime"
          />
          <Input
            value={values.password}
            onChange={(e) => {
              setFieldValue("password", e.target.value);
            }}
            placeholder="Lozinka"
            type="password"
          />
          <Input
            value={values.repeatPassword}
            onChange={(e) => {
              setFieldValue("repeatPassword", e.target.value);
            }}
            placeholder="Ponovite lozinku"
            type="password"
          />
          <S.Button isFilled={isValid} onClick={handleRegister}>
            Registriraj se
          </S.Button>
          <S.BackButton
            onClick={() => {
              resetForm();
              setIsRegister(false);
            }}
          >
            Nazad
          </S.BackButton>
        </>
      )}
      {isLoading && <LoadingSpinner />}
    </S.Container>
  );
}
