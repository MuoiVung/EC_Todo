import { StylesType } from "./types";
import { Box, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import TodoTabs from "./components/TodoTabs";
import TodoForm from "./components/TodoForm";
import theme from "./theme";
import TasksProvider from "./providers/TasksProvider";

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
    <TasksProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={styles.container}>
          <TodoForm />
        </Box>
        <TodoTabs />
      </ThemeProvider>
    </TasksProvider>
  );
}

export default App;
