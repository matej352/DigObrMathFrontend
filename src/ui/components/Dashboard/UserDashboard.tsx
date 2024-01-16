import React, { useEffect } from "react";
import * as S from "./Dashboard.styled";
import { grades } from "../GradePicker/GradePicker";
import { Dropdown, LoadingSpinner } from "..";
import { useUser } from "@/ui/hooks";
import axios from "axios";
import { Lecture } from "@/ui/types";

const BACKEND_URL =
  process.env.BACKEND_URL || "https://dig-obr-backend-app.vercel.app";

export function UserDashboard() {
  const [grade, setGrade] = React.useState(grades[0].grade);
  const [lecture, setLecture] = React.useState<string | undefined>(undefined);
  const [lectures, setLectures] = React.useState<Lecture[]>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [userResults, setUserResults] = React.useState([]);
  const { user } = useUser();

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

  console.log(user);
  useEffect(() => {
    const fetchLeaderboard = async () => {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/dashboard`,
        {
          username: user?._id,
        },
        {
          headers: {
            accessToken: `${user?.accessToken}`,
          },
        }
      );
      console.log(data);

      setUserResults(data.userResults);
    };
    try {
      if (lecture) {
        fetchLeaderboard();
      }
    } catch (e) {
      console.log(e);
    }
  }, [user?.accessToken, user?.username, grade, lecture]);

  return (
    <S.Container>
      <S.HeadingWrapper>
        <S.Title>Dashboard</S.Title>
        <S.DropdownWrapper>
          <Dropdown
            options={grades.map((grade) => {
              return {
                label: `${grade.grade.toString()}. razred`,
                value: grade.grade.toString(),
              };
            })}
            selectedOption={{
              label: `${grade.toString()}. razred`,
              value: grade.toString(),
            }}
            onChange={(grade) => setGrade(parseInt(grade.value))}
          />
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <Dropdown
              options={
                lectures?.map((lect) => {
                  return {
                    label: lect.name,
                    value: lect.name,
                  };
                }) || []
              }
              selectedOption={{
                label: lecture || "Odaberi gradivo",
                value: lecture || "Odaberi gradivo",
              }}
              onChange={(lecture) => setLecture(lecture.value)}
            />
          )}
        </S.DropdownWrapper>
      </S.HeadingWrapper>
      <p>{JSON.stringify(userResults)}</p>
    </S.Container>
  );
}
