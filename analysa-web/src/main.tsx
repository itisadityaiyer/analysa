import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import FormCreate from "./FormCreate";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <FormCreate />
    </React.StrictMode>
  </ThemeProvider>
);
