import { TabPanel } from "@mui/lab";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { Box, IconButton, Switch } from "@mui/material";

import styles from "./styles";
import { PropsType, TaskRowType } from "./types";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { useTasksDispatchContext } from "../../providers/TasksProvider";
import BasicModal from "../BasicModal";
import { TaskType } from "../../providers/TasksProvider/types";

const TodoTab = ({ value, rowsData }: PropsType) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalValueDefault, setModalValueDefault] = useState<TaskType>({
    name: "",
    description: "",
    id: "",
    done: false,
  });

  const tasksDispatch = useTasksDispatchContext();

  const handleSwitchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, id: string) => {
      tasksDispatch({ type: "toggled", id, done: event.target.checked });
    },
    [tasksDispatch]
  );

  const handleOpenModal = (row: TaskRowType) => {
    setModalValueDefault({
      id: row.id,
      name: row.name,
      description: row.description,
      done: row.done,
    });
    setModalIsOpen(true);
  };

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "stt", headerName: "ID", width: 54 },
      { field: "name", headerName: "Name", width: 300 },
      { field: "description", headerName: "Description", width: 720 },
      {
        field: "done",
        headerName: "Checked",
        width: 140,
        sortable: false,
        filterable: false,
        renderCell: (params: GridCellParams) => {
          return (
            <Switch
              checked={params.value as boolean}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleSwitchChange(event, params.id as string)
              }
            />
          );
        },
      },
      {
        field: "action",
        headerName: "Action",
        sortable: false,
        width: 170,
        renderCell: (params: GridCellParams) => (
          <Box sx={styles.iconGroup}>
            <Box sx={styles.iconEdit}>
              <IconButton onClick={() => handleOpenModal(params?.row)}>
                <ModeEditOutlineOutlinedIcon />
              </IconButton>
            </Box>
            <Box sx={styles.iconDelete}>
              <IconButton
                onClick={() =>
                  tasksDispatch({ type: "deleted", id: params.id as string })
                }
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Box>
          </Box>
        ),
      },
    ],
    [handleSwitchChange, tasksDispatch]
  );

  return (
    <TabPanel sx={styles.container} value={value}>
      <DataGrid
        sx={styles.dataGrid}
        rows={rowsData}
        columns={columns}
        autoPageSize
      />
      {modalIsOpen && (
        <BasicModal
          open={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
          defaultValue={modalValueDefault}
        />
      )}
    </TabPanel>
  );
};

export default TodoTab;
