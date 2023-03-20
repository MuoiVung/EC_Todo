import { SxProps, Theme } from "@mui/material";

export type StylesType = {
  [key: string]: SxProps<Theme>;
};

export type TaskType = {
  id: string;
  name: string;
  description: string;
  done: boolean;
};
