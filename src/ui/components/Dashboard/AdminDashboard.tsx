import React, { useEffect } from "react";
import * as S from "./Dashboard.styled";
import { grades } from "../GradePicker/GradePicker";
import { Dropdown, LoadingSpinner } from "..";
import { useUser } from "@/ui/hooks";
import axios from "axios";
import { Lecture } from "@/ui/types";

type TableEntry = {
  username: string;
  points: number;
};

const BACKEND_URL =
  process.env.BACKEND_URL || "https://dig-obr-backend-app.vercel.app";

export function AdminDashboard() {
  const [grade, setGrade] = React.useState(grades[0].grade);
  const [lecture, setLecture] = React.useState<string | undefined>(undefined);
  const [lectures, setLectures] = React.useState<Lecture[]>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [leaderboard, setLeaderboard] = React.useState<TableEntry[]>([]);
  const { user } = useUser();
  const sortedLeaderboard = React.useMemo(
    () => [...leaderboard].sort((a, b) => b.points - a.points),
    [leaderboard]
  );

  useEffect(() => {
    setLecture(undefined);
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

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setIsLoading(true);
      const { data } = await axios.post(
        `${BACKEND_URL}/api/dashboard`,
        {
          grade,
          taskType: lectures?.find((lect) => lect.name === lecture)?._id,
        },
        {
          headers: {
            accessToken: `${user?.accessToken}`,
          },
        }
      );

      setLeaderboard(
        data.userResults.map((userResult: any[]) => {
          return {
            username: userResult[0],
            points: userResult[1],
          };
        })
      );
      setIsLoading(false);
    };
    try {
      if (lecture) {
        fetchLeaderboard();
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
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
      {sortedLeaderboard.length ? (
        <S.TableWrapper>
          <S.Table>
            <thead>
              <tr>
                <th>RANG</th>
                <th>KORISNIČKO IME</th>
                <th>BODOVI</th>
              </tr>
            </thead>
            <tbody>
              {sortedLeaderboard.map((entry, index) => (
                <tr key={entry.username}>
                  <td>{index + 1}</td>
                  <td>{entry.username}</td>
                  <td>{entry.points}</td>
                </tr>
              ))}
            </tbody>
          </S.Table>
        </S.TableWrapper>
      ) : (
        <p>Nema rezultata.</p>
      )}
    </S.Container>
  );
}
