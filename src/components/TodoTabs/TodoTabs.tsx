import { TabContext, TabList } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React, { memo, useMemo, useState } from "react";
import { useTasksContext } from "../../providers/TasksProvider";
import TodoTab from "../TodoTab";
import { TaskRowType } from "../TodoTab/types";
import styles from "./styles";

const TodoTabs = () => {
  const [value, setValue] = useState("todo");
  const tasks = useTasksContext();

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
        <TodoTab value="todo" rowsData={todoTasks} />
        <TodoTab value="done" rowsData={doneTasks} />
      </TabContext>
    </Box>
  );
};

export default memo(TodoTabs);
