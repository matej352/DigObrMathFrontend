import React from "react";
import * as S from "./GradePicker.styled";
import { GradeCard } from "../GradeCard/GradeCard";
import { useRouter } from "next/navigation";

export const grades = [
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
    description: "Upotreba zagrada pri izvođenju više računskih operacija",
  },
  {
    grade: 4,
    description:
      "Opseg pravokutnika i kvadrata. Opseg trokuta. Površina pravokutnika i kvadrata.",
  },
  {
    grade: 5,
    description:
      "Zaokruživanje decimalnih brojeva. Dijeljivost prirodnih brojeva. Jednadžba pravca.",
  },
  {
    grade: 6,
    description:
      "Koordinatni sustav u ravnini. Zbrajanje i oduzimanje racionalnih brojeva. Skraćivanje razlomaka. Recipročni brojevi.",
  },
  {
    grade: 7,
    description: "Linearna funkcija. Množenje razlomaka. Dijeljenje razlomaka.",
  },
  {
    grade: 8,
    description:
      "Kvadriranje brojeva. Pitagorin poučak. Kvadratni korijen. Linearna jednadžba s jednom nepoznanicom. Primjena linearnih jednadžbi.",
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
