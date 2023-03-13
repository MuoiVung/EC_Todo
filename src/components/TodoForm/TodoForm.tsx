import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";

import { useTasksDispatchContext } from "../../providers/TasksProvider";
import { TaskType } from "../../providers/TasksProvider/types";
import styles from "./styles";
import { FormDataType } from "./types";

const defaultInputValues: FormDataType = {
  name: "",
  description: "",
};

const validationSchema = yup
  .object({
    name: yup.string().required("Task name is required"),
    description: yup.string(),
  })
  .required();

const TodoForm = () => {
  const tasksDispatch = useTasksDispatchContext();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormDataType>({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultInputValues,
  });

  const handleAddTask = (data: FormDataType) => {
    const newTask: TaskType = {
      id: uuidv4(),
      name: data.name,
      description: data.description,
      done: false,
    };

    tasksDispatch({ type: "added", newTask });
    reset();
  };

  const handleChangeValue = (name: keyof FormDataType, value: string) => {
    setValue(name, value);
  };

  return (
    <Box sx={styles.wrapper}>
      <Typography sx={styles.header}>Todo App</Typography>
      <Box sx={styles.form}>
        <Box sx={styles.inputContainer}>
          <TextField
            sx={styles.input}
            placeholder="Name"
            required
            {...register("name")}
            error={errors.name ? true : false}
            helperText={errors.name?.message}
            onChange={(event) => handleChangeValue("name", event.target.value)}
          />
          <TextField
            sx={styles.input}
            placeholder="Description..."
            {...register("description")}
            error={errors.description ? true : false}
            helperText={errors.description?.message}
            onChange={(event) =>
              handleChangeValue("description", event.target.value)
            }
          />
        </Box>
        <Button
          variant="contained"
          sx={styles.button}
          onClick={handleSubmit(handleAddTask)}
        >
          + Add new item
        </Button>
      </Box>
    </Box>
  );
};

export default memo(TodoForm);
