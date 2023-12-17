import React from "react";
import * as S from "./DifficultyPicker.styled";
import type { Difficulty } from "@/ui/types";
import { ProgressBar } from "..";

type DifficultyPickerProps = {
  difficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
};

const difficultyToProgress = {
  easy: 30,
  medium: 60,
  hard: 100,
};

export function DifficultyPicker({
  difficulty,
  setDifficulty,
}: DifficultyPickerProps) {
  const handleChange = (change: "easier" | "harder") => {
    if (change === "easier") {
      if (difficulty === "medium") {
        setDifficulty("easy");
      } else if (difficulty === "hard") {
        setDifficulty("medium");
      }
    } else if (change === "harder") {
      if (difficulty === "medium") {
        setDifficulty("hard");
      } else if (difficulty === "easy") {
        setDifficulty("medium");
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
          disabled={difficulty === "easy"}
        >
          Lakše
        </S.Button>
        <S.Button
          onClick={() => handleChange("harder")}
          disabled={difficulty === "hard"}
        >
          Teže
        </S.Button>
      </S.Footer>
    </S.Container>
  );
}
