import React from "react";
import * as S from "./Input.styled";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
}

export const Input = ({ value, ...rest }: InputProps) => (
  <S.Input value={value} {...rest} />
);
