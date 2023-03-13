import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            fontSize: "16px",
            height: "44px",
            paddingY: "11px",
            paddingX: "16px",
          },
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#F80000",
    },
    action: {
      disabled: "#777E90",
    },
  },
  typography: {
    fontFamily: [
      "Roboto",
      "Montserrat",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    fontSize: 16,
  },
});

export default theme;
