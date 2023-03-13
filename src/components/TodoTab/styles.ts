import { StylesType } from "./../../types";

const styles: StylesType = {
  container: {
    height: 400,
  },
  dataGrid: {
    "& .MuiDataGrid-columnHeaderTitleContainer": {
      justifyContent: "center",
    },
    "& .MuiDataGrid-cell": {
      justifyContent: "center",
    },
  },
  iconContainer: {
    margin: "12px",
    background: "red",
  },
  iconEdit: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#09B530",
    borderRadius: "50%",
    width: 32,
    height: 32,
    "& svg": {
      fontSize: 18,
    },
    mr: "8px",
  },
  iconDelete: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F80000",
    borderRadius: "50%",
    width: 32,
    height: 32,
    "& svg": {
      fontSize: 18,
    },
    ml: "8px",
  },
  iconGroup: {
    display: "flex",
    alignItems: "center",
  },
};

export default styles;
