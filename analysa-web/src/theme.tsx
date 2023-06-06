import { blue, red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  typography: {
    fontFamily: [
      // "-apple-system",
      "BlinkMacSystemFont",
      // '"Segoe UI"',
      // "Roboto",
      // '"Helvetica Neue"',
      // "Arial",
      // "sans-serif",
      // '"Apple Color Emoji"',
      // '"Segoe UI Emoji"',
      // '"Segoe UI Symbol"',
    ].join(","),
    subtitle1: {
      color: "grey",
      lineHeight: "1.2",
    },
  },
  palette: {
    primary: {
      main: "#6941c6",
    },
    text: {
      primary: "#000000",
      secondary: "#626262",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#dedede",
    },
  },
  components: {
    MuiGrid: {
      styleOverrides: {
        // container: {
        //   border: `2px dashed ${red[500]}`,
        // },
        // item: {
        //   border: `2px dashed ${blue[500]}`,
        // },
      },
    },
  },
});

export default theme;
