import React from "react";
import * as S from "./ProgressBar.styled";

type ProgressBarProps = {
  progress: number;
};
export const ProgressBar = ({ progress }: ProgressBarProps) => {
  return <S.ProgressBar progress={progress} />;
};
