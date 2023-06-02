import { red } from "@mui/material/colors";
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
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  palette: {
    primary: {
      main: "#27D507",
    },
    text: {
      primary: "#000000",
      secondary: "#626262",
    },
    custom: {
      main: "#FF8ECB",
      purple: "#B5ADFF",
      darkPurple: "#1E1C41",
      borderPurple: "#3F3C70",
      gamePurple: "#AD4DDA",
      white: "#FFFFFF",
      borderPink: "#FF8ECB",
      pink: "#E933BE",
      background: "#121126",
    },
    button: {
      primary: "#E933BE",
      text: "white",
      outline: "#FF8ECB",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#121126",
    },
  },
});

export default theme;
