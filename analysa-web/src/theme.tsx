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
      light: "#D3D3D3",
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
