import React from "react";
import ReactDOM from "react-dom/client";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import PageWrapper from "./components/PageWrapper";
import NavBar from "./components/Navbar";
import { CssBaseline } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <React.StrictMode>
      <PageWrapper />
    </React.StrictMode>
  </ThemeProvider>
);
