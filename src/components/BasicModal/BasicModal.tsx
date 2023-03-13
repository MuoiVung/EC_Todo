import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import * as yup from "yup";

import { useForm } from "react-hook-form";
import { useTasksDispatchContext } from "../../providers/TasksProvider";
import { FormDataType } from "../TodoForm/types";
import styles from "./styles";
import { PropsType } from "./types";

const validationSchema = yup
  .object({
    name: yup.string().required("Task name is required"),
    description: yup.string(),
  })
  .required();

const BasicModal = ({ open, onClose, defaultValue }: PropsType) => {
  const tasksDispatch = useTasksDispatchContext();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormDataType>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: defaultValue.name,
      description: defaultValue.description,
    },
  });

  const handleUpdateTask = (data: FormDataType) => {
    tasksDispatch({
      type: "updated",
      task: {
        id: defaultValue.id,
        done: defaultValue.done,
        name: data.name,
        description: data.description,
      },
    });
    reset();
    onClose();
  };

  const handleChangeValue = (name: keyof FormDataType, value: string) => {
    setValue(name, value);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles.wrapper}>
        <Typography sx={styles.title}>update task</Typography>
        <Box sx={styles.form}>
          <Box sx={styles.inputContainer}>
            <TextField
              sx={styles.input}
              placeholder="Name"
              required
              {...register("name")}
              error={errors.name ? true : false}
              helperText={errors.name?.message}
              onChange={(event) =>
                handleChangeValue("name", event.target.value)
              }
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
        </Box>
        <Box sx={styles.buttons}>
          <Button variant="contained" onClick={handleSubmit(handleUpdateTask)}>
            Update
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default BasicModal;
