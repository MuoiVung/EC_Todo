import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { cryptoJS } from "../../utils";

import { PropsType, TasksActionType, TaskType } from "./types";
const initalTasks: TaskType[] = [];

export const TasksContext = createContext<TaskType[]>([]);
export const TasksDispatchContext = createContext<Dispatch<TasksActionType>>(
  () => {}
);

const tasksReducer = (
  tasks: TaskType[],
  action: TasksActionType
): TaskType[] => {
  switch (action.type) {
    case "setData":
      return action.savedTasks;
    case "added":
      return [...tasks, action.newTask];
    case "toggled":
      const newTasks = [...tasks];
      const foundedTaskIndex = newTasks.findIndex(
        (task) => task.id === action.id
      );

      if (foundedTaskIndex < 0) return newTasks;

      newTasks[foundedTaskIndex] = {
        ...tasks[foundedTaskIndex],
        done: action.done,
      };

      return newTasks;
    case "updated":
      const updatedTasks: TaskType[] = JSON.parse(JSON.stringify(tasks));
      const updatedTaskIndex = updatedTasks.findIndex(
        (task) => task.id === action.task.id
      );

      if (updatedTaskIndex < 0) return updatedTasks;

      updatedTasks[updatedTaskIndex] = action.task;

      return updatedTasks;
    case "deleted":
      return tasks.filter((task) => task.id !== action.id);
  }
};

const TasksProvider = ({ children }: PropsType) => {
  const [tasks, dispatch] = useReducer(tasksReducer, initalTasks);

  useEffect(() => {
    const savedTasks: TaskType[] | null = cryptoJS.decryptData("tasks");

    if (!savedTasks) {
      return;
    }

    dispatch({ type: "setData", savedTasks });
  }, []);

  useEffect(() => {
    const handleUnload = () => {
      cryptoJS.encryptData("tasks", tasks);
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [tasks]);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
};

export default TasksProvider;

export const useTasksContext = () => useContext(TasksContext);
export const useTasksDispatchContext = () => useContext(TasksDispatchContext);
