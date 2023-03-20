import { RootState } from "./../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskType } from "../../types";

const initialState: TaskType[] = [];

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setData: (tasks, action: PayloadAction<TaskType[]>) => {
      return (tasks = action.payload);
    },
    add: (tasks, action: PayloadAction<TaskType>) => {
      return (tasks = [...tasks, action.payload]);
    },
    toggle: (
      tasks,
      { payload: { id, done } }: PayloadAction<{ id: string; done: boolean }>
    ) => {
      const foundedTaskIndex = tasks.findIndex((task) => task.id === id);

      if (foundedTaskIndex < 0) {
        return tasks;
      }

      tasks[foundedTaskIndex] = {
        ...tasks[foundedTaskIndex],
        done,
      };
      return tasks;
    },
    update: (tasks, { payload: updatedTask }: PayloadAction<TaskType>) => {
      const updatedTaskIndex = tasks.findIndex(
        (task) => task.id === updatedTask.id
      );

      if (updatedTaskIndex < 0) {
        return tasks;
      }

      tasks[updatedTaskIndex] = updatedTask;

      return tasks;
    },
    delete: (tasks, { payload: deletedTaskId }: PayloadAction<string>) => {
      tasks = tasks.filter((task) => task.id !== deletedTaskId);

      return tasks;
    },
  },
});

export const tasksSliceActions = tasksSlice.actions;

// selector
export const selectTasks = (state: RootState) => state.tasks;

export default tasksSlice.reducer;
