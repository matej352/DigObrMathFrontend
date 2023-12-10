import React from "react";
import * as S from "./LectureCard.styled";

type LectureCardProps = {
  lecture: string;
  onClick: () => void;
};

export const LectureCard = ({ lecture, onClick }: LectureCardProps) => {
  return (
    <S.Container onClick={onClick}>
      <S.Title>{lecture}</S.Title>
      <S.CTA>
        Kreni
        <S.ArrowRight />
      </S.CTA>
    </S.Container>
  );
};
