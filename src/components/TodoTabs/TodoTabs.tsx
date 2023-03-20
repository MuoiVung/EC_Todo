import { TabContext, TabList } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React, { memo, useEffect, useMemo, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/redux.hooks";
import { selectTasks, tasksSliceActions } from "../../redux/slices/tasksSlice";
import { TaskType } from "../../types";
import { cryptoJS } from "../../utils";
import TodoTab from "../TodoTab";
import { TaskRowType } from "../TodoTab/types";
import styles from "./styles";

const TodoTabs = () => {
  const [value, setValue] = useState("todo");
  const tasks = useAppSelector(selectTasks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const savedTasks: TaskType[] | null = cryptoJS.decryptData("tasks");

    if (!savedTasks) {
      return;
    }

    dispatch(tasksSliceActions.setData(savedTasks));
  }, [dispatch]);

  useEffect(() => {
    const handleUnload = () => {
      if (tasks.length === 0) {
        return localStorage.removeItem("tasks");
      }
      cryptoJS.encryptData("tasks", tasks);
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [tasks]);

  const todoTasks: TaskRowType[] = useMemo(
    () =>
      tasks
        .filter((task) => task.done === false)
        .map((task, index) => ({
          stt: index + 1,
          id: task.id,
          name: task.name,
          description: task.description,
          done: task.done,
        })),
    [tasks]
  );

  const doneTasks: TaskRowType[] = useMemo(
    () =>
      tasks
        .filter((task) => task.done === true)
        .map((task, index) => ({
          stt: index + 1,
          id: task.id,
          name: task.name,
          description: task.description,
          done: task.done,
        })),
    [tasks]
  );

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={styles.container}>
      <TabContext value={value}>
        <Box sx={styles.innerContainer}>
          <TabList
            sx={styles.tabList}
            onChange={handleChange}
            aria-label="tasks tab"
            centered
          >
            <Tab sx={styles.tab} label="Todo" value="todo" />
            <Tab sx={styles.tab} label="Done" value="done" />
          </TabList>
        </Box>
        <TodoTab key="todo" value="todo" rowsData={todoTasks} />
        <TodoTab key="done" value="done" rowsData={doneTasks} />
      </TabContext>
    </Box>
  );
};

export default memo(TodoTabs);
