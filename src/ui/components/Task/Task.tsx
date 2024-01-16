import React, { useEffect, useState } from "react";
import * as S from "./Task.styled";
import { DifficultyPicker, LoadingSpinner } from "..";
import type { Difficulty, Lecture, Task, Help } from "@/ui/types";
import axios from "axios";
import { useUser } from "@/ui/hooks";
import { useRouter } from "next/navigation";
import { useStopwatch } from "@/ui/hooks/stopwatch";

type TaskProps = {
  grade: number;
  lectureId: string;
};

const BACKEND_URL =
  process.env.BACKEND_URL || "https://dig-obr-backend-app.vercel.app";

const getHardnessParam = (difficulty: Difficulty) => {
  if (difficulty === "Lako") {
    return "&easy=yes";
  } else if (difficulty === "Srednje") {
    return "";
  } else {
    return "&hard=yes";
  }
};

export function Task({ grade, lectureId }: TaskProps) {
  const [difficulty, setDifficulty] = useState("Srednje" as Difficulty);
  const [isLoading, setIsLoading] = React.useState(true);
  const { user } = useUser();
  const [lectureName, setLectureName] = useState("");
  const [task, setTask] = useState({} as Task);
  const [showHelp, setShowHelp] = useState(false);
  const [showHelpButton, setShowHelpButton] = useState(true);
  const [help, setHelp] = useState({} as Help);
  const { back } = useRouter();
  const [answer, setAnswer] = useState("");
  const [isSaveDisabled, setIsSaveDisabled] = useState(false);
  const [isCorrect, setIsCorrect] = useState<string | undefined>(undefined);
  const { time, start } = useStopwatch();

  useEffect(() => {
    if (user) {
      start();
    }
  }, [start, user]);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const { data } = await axios.get(
          `${BACKEND_URL}/api/task-types?class=${grade}`,
          {
            headers: {
              accessToken: `${user?.accessToken}`,
            },
          }
        );

        const lecture = data.taskTypes.find(
          (l: Lecture) => l._id === lectureId
        ) as Lecture;

        setLectureName(lecture.name);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLectures();
  }, [grade, lectureId, user?.accessToken]);

  const fetchNewTask = async (newDifficulty: Difficulty) => {
    setIsLoading(true);
    setShowHelp(false);
    setShowHelpButton(true);
    setAnswer("");
    setIsCorrect(undefined);

    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/new-task?taskId=${lectureId}${getHardnessParam(
          newDifficulty
        )}`,
        {
          headers: {
            accessToken: `${user?.accessToken}`,
          },
        }
      );
      setIsLoading(false);
      setTask(data);
    } catch (error) {
      setIsLoading(false);
      setDifficulty(task.hardness as Difficulty);
      console.log(error);
      alert("AI zagušen, pokušajte ponovno za nekoliko sekundi.");
    }
  };

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    fetchNewTask(newDifficulty);
  };

  const getHelp = async () => {
    setShowHelpButton(false);
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/help?task=${encodeURIComponent(
          task.task
        )}&taskType=${lectureId}`,
        {
          headers: {
            accessToken: `${user?.accessToken}`,
          },
        }
      );

      setHelp(data);
      setShowHelp(true);
    } catch (error) {
      console.log(error);
    }
  };

  const skipTask = async () => {
    await fetchNewTask("Srednje");
  };

  const sendAnswer = async () => {
    if (!answer || isSaveDisabled) {
      return;
    }
    setIsSaveDisabled(true);
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/task-correctness`,
        {
          task: task.task,
          answer,
          taskType: lectureId,
          logId: help.logId,
          timeSpent: time,
        },
        {
          headers: {
            accessToken: `${user?.accessToken}`,
          },
        }
      );

      console.log(data);
      setIsCorrect(data.correctness);
      setIsSaveDisabled(false);
    } catch (error) {
      setIsSaveDisabled(false);
      console.log(error);
      alert("AI zagušen, pokušajte ponovno za nekoliko sekundi.");
    }
  };

  useEffect(() => {
    fetchNewTask("Srednje");
  }, []);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <S.Container>
      <S.HeadingWrapper>
        <S.Title>{lectureName}</S.Title>
        <S.Divider />
        <S.Subtitle>{grade}. razred osnovne škole</S.Subtitle>
      </S.HeadingWrapper>
      <S.MainGrid>
        <S.TaskContainer>
          <S.Task>
            <S.BoxTitle>Zadatak</S.BoxTitle>
            <S.Text>{task.task}</S.Text>
            <S.TaskFooter>
              <S.ClickableText color="#FF5978" onClick={skipTask}>
                Preskoči zadatak
              </S.ClickableText>
              {showHelpButton && (
                <S.ClickableText
                  color="#4E7B79"
                  onClick={async () => await getHelp()}
                >
                  Pomoć?
                </S.ClickableText>
              )}
            </S.TaskFooter>
          </S.Task>
        </S.TaskContainer>
        <S.InputContainer>
          <S.Answer>
            <S.BoxTitle>Odgovor</S.BoxTitle>
            <S.TextAnswer
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={8}
            />
            {isCorrect !== undefined && (
              <S.AnswerResult
                color={isCorrect === "true" ? "#4E7B79" : "#FF5978"}
              >
                {isCorrect === "true"
                  ? "Točan odgovor :)"
                  : "Pogrešan odgovor :("}
              </S.AnswerResult>
            )}
            <S.SendButtonWrapper>
              {isCorrect !== "true" ? (
                <S.SendButton onClick={sendAnswer} isDisabled={isSaveDisabled}>
                  Pošalji
                </S.SendButton>
              ) : (
                <S.SendButton
                  onClick={async () => await fetchNewTask(difficulty)}
                  isDisabled={false}
                >
                  Sljedeći
                </S.SendButton>
              )}
            </S.SendButtonWrapper>
          </S.Answer>
        </S.InputContainer>
        <S.DifficultyContainer>
          <DifficultyPicker
            difficulty={task.hardness as Difficulty}
            setDifficulty={handleDifficultyChange}
          />
        </S.DifficultyContainer>
        {showHelp && (
          <S.HelpContainer>
            <S.Help>
              <S.BoxTitle>Pomoć</S.BoxTitle>
              <S.Text>{help.help}</S.Text>
            </S.Help>
          </S.HelpContainer>
        )}
      </S.MainGrid>
      <S.BackButton onClick={() => back()}>Nazad</S.BackButton>
    </S.Container>
  );
}
