export type User = {
  username: string;
  accessToken: string;
};

export type Lecture = {
  _id: string;
  name: string;
};

export type Task = {
  task: string;
  hardness: string;
};

export type Help = {
  help: string;
  logId: string;
};

export type Difficulty = "easy" | "medium" | "hard";
