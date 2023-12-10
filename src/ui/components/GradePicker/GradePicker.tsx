import React from "react";
import * as S from "./GradePicker.styled";
import { GradeCard } from "../GradeCard/GradeCard";
import { useRouter } from "next/navigation";

const grades = [
  {
    grade: 1,
    description:
      "Zbrajanje i oduzimanje brojeva do 100. Parni i neparni brojevi. Jedinice i desetice. Jednoznamenkasti i dvoznamenkasti brojevi. Geometrijska tijela i likovi.",
  },
  {
    grade: 2,
    description:
      "Množenje i dijeljenje brojeva do 100. Polovine, desetine, dvokratnici, trokratnici. Redoslijed množenja, dijeljenja, zbrajanja i oduzimanja.",
  },
  {
    grade: 3,
    description:
      "Zbrajanje i oduzimanje brojeva do 1000. Množenje i dijeljenje brojeva do 100. Polovine, desetine, dvokratnici, trokratnici. Redoslijed množenja, dijeljenja, zbrajanja i oduzimanja.",
  },
  {
    grade: 4,
    description:
      "Zbrajanje i oduzimanje brojeva do 1000. Množenje i dijeljenje brojeva do 100. Polovine, desetine, dvokratnici, trokratnici. Redoslijed množenja, dijeljenja, zbrajanja i oduzimanja.",
  },
  {
    grade: 5,
    description:
      "Zbrajanje i oduzimanje brojeva do 1000. Množenje i dijeljenje brojeva do 100. Polovine, desetine, dvokratnici, trokratnici. Redoslijed množenja, dijeljenja, zbrajanja i oduzimanja.",
  },
  {
    grade: 6,
    description:
      "Zbrajanje i oduzimanje brojeva do 1000. Množenje i dijeljenje brojeva do 100. Polovine, desetine, dvokratnici, trokratnici. Redoslijed množenja, dijeljenja, zbrajanja i oduzimanja.",
  },
  {
    grade: 7,
    description:
      "Zbrajanje i oduzimanje brojeva do 1000. Množenje i dijeljenje brojeva do 100. Polovine, desetine, dvokratnici, trokratnici. Redoslijed množenja, dijeljenja, zbrajanja i oduzimanja.",
  },
  {
    grade: 8,
    description:
      "Zbrajanje i oduzimanje brojeva do 1000. Množenje i dijeljenje brojeva do 100. Polovine, desetine, dvokratnici, trokratnici. Redoslijed množenja, dijeljenja, zbrajanja i oduzimanja.",
  },
];

export function GradePicker() {
  const { push } = useRouter();

  return (
    <S.Container>
      <S.Header>Odaberi željeni razred osnovne škole</S.Header>
      <S.GradeList>
        {grades.map((grade) => (
          <GradeCard
            key={grade.grade}
            grade={grade.grade}
            description={grade.description}
            onClick={() => {
              push(`grade-picker/${grade.grade}`);
            }}
          />
        ))}
      </S.GradeList>
    </S.Container>
  );
}
