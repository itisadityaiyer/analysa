import React from "react";
import ReactDOM from "react-dom/client";
import MainPage from "./components/MainPage";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <Container sx={{ width: "lg" }}>
        <MainPage />
      </Container>
    </React.StrictMode>
  </ThemeProvider>
);
