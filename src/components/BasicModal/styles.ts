import { StylesType } from "./../../types/index";

const styles: StylesType = {
  wrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  },
  title: {
    textAlign: "center",
    fontSize: "28px",
    fontWeight: 500,
    textTransform: "capitalize",
    mb: "24px",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
  },
  form: {
    display: "flex",
    alignItems: "flex-start",
  },
  inputContainer: {
    mr: "48px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  input: {
    mb: "12px",
  },
};

export default styles;
