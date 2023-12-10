import React from "react";
import * as S from "./LecturePicker.styled";
import { LectureCard } from "../LectureCard/LectureCard";
import { useRouter } from "next/navigation";

const lectures = [
  "Zbrajanje i oduzimanje brojeva do 100",
  "Parni i neparni brojevi",
  "Jedinice i desetice",
  "Jednoznamenkasti i dvoznamenkasti brojevi",
  "Geometrijska tijela i likovi",
];

type LecturePickerProps = {
  grade: number;
};

export const LecturePicker = ({ grade }: LecturePickerProps) => {
  const { push, back } = useRouter();

  return (
    <S.Container>
      <S.Header>Odaberi željeno gradivo {grade} razreda osnovne škole</S.Header>
      <S.LecturesList>
        {lectures.map((lecture) => (
          <LectureCard onClick={() => {}} lecture={lecture} key={lecture} />
        ))}
      </S.LecturesList>
      <S.BackButton onClick={() => back()}>Nazad</S.BackButton>
    </S.Container>
  );
};
