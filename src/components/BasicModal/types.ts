import { TaskType } from "../../providers/TasksProvider/types";

export type PropsType = {
  open: boolean;
  onClose: () => void;
  defaultValue: TaskType;
};
