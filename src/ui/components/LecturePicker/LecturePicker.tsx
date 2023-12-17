import React, { useEffect } from "react";
import * as S from "./LecturePicker.styled";
import { LectureCard } from "../LectureCard/LectureCard";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useUser } from "@/ui/hooks";
import type { Lecture } from "@/ui/types";
import { LoadingSpinner } from "..";

const BACKEND_URL =
  process.env.BACKEND_URL || "https://dig-obr-backend-app.vercel.app";

type LecturePickerProps = {
  grade: number;
};

export const LecturePicker = ({ grade }: LecturePickerProps) => {
  const { push, back } = useRouter();
  const [lectures, setLectures] = React.useState<Lecture[]>([]);
  const { user } = useUser();
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    const fetchLectures = async () => {
      setIsLoading(true);
      const { data } = await axios.get(
        `${BACKEND_URL}/api/task-types?class=${grade}`,
        {
          headers: {
            accessToken: `${user?.accessToken}`,
          },
        }
      );
      setLectures(data.taskTypes);
      setIsLoading(false);
    };
    try {
      fetchLectures();
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  }, [grade, user?.accessToken]);

  const handleLectureClick = (lectureId: string) => {
    push(`/grade-picker/${grade}/${lectureId}`);
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <S.Container>
          <S.Header>
            Odaberi željeno gradivo {grade}. razreda osnovne škole
          </S.Header>
          {isLoading && <LoadingSpinner />}
          <S.LecturesList>
            {lectures.map((lecture) => (
              <LectureCard
                onClick={() => handleLectureClick(lecture._id)}
                lecture={lecture.name}
                key={lecture._id}
              />
            ))}
          </S.LecturesList>
          <S.BackButton onClick={() => back()}>Nazad</S.BackButton>
        </S.Container>
      )}
    </>
  );
};
