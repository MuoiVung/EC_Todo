import { TaskType } from "../../types";

export type PropsType = {
  open: boolean;
  onClose: () => void;
  defaultValue: TaskType;
};
