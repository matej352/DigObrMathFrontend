import React from "react";
import * as S from "./DifficultyPicker.styled";
import type { Difficulty } from "@/ui/types";
import { ProgressBar } from "..";

type DifficultyPickerProps = {
  difficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
};

const difficultyToProgress = {
  Lako: 30,
  Srednje: 60,
  Teško: 100,
};

export function DifficultyPicker({
  difficulty,
  setDifficulty,
}: DifficultyPickerProps) {
  const handleChange = (change: "easier" | "harder") => {
    if (change === "easier") {
      if (difficulty === "Srednje") {
        setDifficulty("Lako");
      } else if (difficulty === "Teško") {
        setDifficulty("Srednje");
      }
    } else if (change === "harder") {
      if (difficulty === "Srednje") {
        setDifficulty("Teško");
      } else if (difficulty === "Lako") {
        setDifficulty("Srednje");
      }
    }
  };

  return (
    <S.Container>
      <S.Title>Težina zadatka</S.Title>
      <S.Progress>
        {difficulty}
        <ProgressBar progress={difficultyToProgress[difficulty]} />
      </S.Progress>
      <S.Footer>
        <S.Button
          onClick={() => handleChange("easier")}
          disabled={difficulty === "Lako"}
        >
          Lakše
        </S.Button>
        <S.Button
          onClick={() => handleChange("harder")}
          disabled={difficulty === "Teško"}
        >
          Teže
        </S.Button>
      </S.Footer>
    </S.Container>
  );
}
