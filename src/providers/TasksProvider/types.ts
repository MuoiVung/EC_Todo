import { ReactNode } from "react";
export type PropsType = {
  children: ReactNode;
};

export type TaskType = {
  id: string;
  name: string;
  description: string;
  done: boolean;
};

export type TasksActionType =
  | {
      type: "setData";
      savedTasks: TaskType[];
    }
  | {
      type: "added";
      newTask: TaskType;
    }
  | {
      type: "updated";
      task: TaskType;
    }
  | {
      type: "deleted";
      id: string;
    }
  | {
      type: "toggled";
      id: string;
      done: boolean;
    };
