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
  if (difficulty === "easy") {
    return "&easy=yes";
  } else if (difficulty === "medium") {
    return "";
  } else {
    return "&hard=yes";
  }
};

export function Task({ grade, lectureId }: TaskProps) {
  const [difficulty, setDifficulty] = useState("medium" as Difficulty);
  const [isLoading, setIsLoading] = React.useState(true);
  const { user } = useUser();
  const [lectureName, setLectureName] = useState("");
  const [task, setTask] = useState({} as Task);
  const [showHelp, setShowHelp] = useState(false);
  const [showHelpButton, setShowHelpButton] = useState(true);
  const [help, setHelp] = useState({} as Help);
  const [taskCounter, setTaskCounter] = useState(0);
  const { back } = useRouter();
  const [answer, setAnswer] = useState("");
  const [isSaveDisabled, setIsSaveDisabled] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined);
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

  useEffect(() => {
    const fetchNewTask = async () => {
      setIsLoading(true);
      setShowHelp(false);
      setShowHelpButton(true);
      setAnswer("");
      setIsCorrect(undefined);

      try {
        const { data } = await axios.get(
          `${BACKEND_URL}/api/new-task?taskId=${lectureId}${getHardnessParam(
            difficulty
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
        console.log(error);
      }
    };

    fetchNewTask();
  }, [difficulty, lectureId, user?.accessToken, taskCounter]);

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

  const skipTask = () => {
    setTaskCounter(taskCounter + 1);
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
    }
  };

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
              <S.AnswerResult>
                {isCorrect ? "Točan odgovor :)" : "Pogrešan odgovor :("}
              </S.AnswerResult>
            )}
            <S.SendButtonWrapper>
              {
                <S.SendButton onClick={sendAnswer} isDisabled={isSaveDisabled}>
                  Pošalji
                </S.SendButton>
              }
            </S.SendButtonWrapper>
          </S.Answer>
        </S.InputContainer>
        <S.DifficultyContainer>
          <DifficultyPicker
            difficulty={difficulty}
            setDifficulty={setDifficulty}
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
