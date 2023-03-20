import { Box, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { StylesType } from "./types";

import TodoForm from "./components/TodoForm";
import TodoTabs from "./components/TodoTabs";
import store from "./redux/store";
import theme from "./theme";

const styles: StylesType = {
  container: {
    display: "flex",
    justifyContent: "center",
    maxWidth: "1600px",
    mx: "auto",
  },
};

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={styles.container}>
          <TodoForm />
        </Box>
        <TodoTabs />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
