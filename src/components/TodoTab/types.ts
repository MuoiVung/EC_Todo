export type PropsType = {
  value: string;
  rowsData: TaskRowType[];
};

export type TaskRowType = {
  stt: number;
  id: string;
  name: string;
  description: string;
  done: boolean;
};
