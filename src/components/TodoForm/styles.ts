import { StylesType } from "../../types";

const styles: StylesType = {
  wrapper: {
    maxWidth: "1000px",
    flex: 1,
  },
  header: {
    fontSize: "28px",
    fontWeight: 700,
    textAlign: "center",
    lineHeight: "39.2px",
    my: "24px",
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
  button: {
    height: "48px",
    minWidth: "221px",
    textTransform: "capitalize",
  },
};

export default styles;
