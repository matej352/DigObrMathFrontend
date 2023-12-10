import React from "react";
import * as S from "./GradeCard.styled";

type GradeCardProps = {
  grade: number;
  description: string;
  onClick: () => void;
};

export const GradeCard = ({ grade, onClick, description }: GradeCardProps) => {
  return (
    <S.Card>
      <S.Top>{grade}</S.Top>
      <S.Bottom>
        <S.BottomTitle>{grade}. RAZRED</S.BottomTitle>
        <S.Divider />
        <S.Description>{description}</S.Description>
        <S.CTA onClick={onClick}>Odaberi</S.CTA>
      </S.Bottom>
    </S.Card>
  );
};
