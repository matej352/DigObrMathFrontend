import React, { useEffect, useMemo } from "react";
import * as S from "./Dashboard.styled";
import { grades } from "../GradePicker/GradePicker";
import { Dropdown, LoadingSpinner } from "..";
import { useUser } from "@/ui/hooks";
import axios from "axios";
import { Lecture } from "@/ui/types";
import dynamic from "next/dynamic";

const BACKEND_URL =
  process.env.BACKEND_URL || "https://dig-obr-backend-app.vercel.app";

function UserDashboard() {
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

      setUserResults(data.userResults);
    };

    try {
      fetchLectures();
      fetchLeaderboard();
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  }, [grade, user?._id, user?.accessToken]);

  const lectureResults = useMemo(() => {
    if (!userResults) return [];
    return userResults.filter((res: any[]) => res[1]?.taskName === lecture);
  }, [userResults, lecture]);

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
            onChange={(grade) => {
              setGrade(parseInt(grade.value));
              setLecture(undefined);
            }}
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
      <S.Table>
        <tbody>
          <tr>
            <th>Zadatak</th>
            <th>Vrijeme</th>
            <th>Korištena pomoć</th>
            <th>Točno</th>
            <th>Bodovi</th>
          </tr>
          {lectureResults.map((res: any, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{res[1].timeSpent}</td>
                <td>{res[1].hintUsed ? "Da" : "Ne"}</td>
                <td>{res[1].correctAnsw ? "Da" : "Ne"}</td>
                <td>{res[1].totalScore}</td>
              </tr>
            );
          })}
        </tbody>
      </S.Table>
    </S.Container>
  );
}

export default dynamic(() => Promise.resolve(UserDashboard), {
  ssr: false,
});
