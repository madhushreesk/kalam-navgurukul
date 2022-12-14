import { createTheme } from "@mui/material/styles";

const defaultTheme = createTheme();
export default createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#f05f40", // customise your main color here
    },
    secondary: { main: "#673ab7" },
    error: { main: "#ca0909" },
    sand: { main: "#F4DECB" },
    shell: { main: "#F8EEE7" },
    status: {
      danger: "#b71c1c",
    },

    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
  overrides: {
    MuiTableCell: {
      root: {
        [defaultTheme.breakpoints.down("sm")]: {
          padding: 5,
        },
      },
    },
    MUIDataTableBodyCell: {
      root: {
        minHeight: 22,
      },
      stackedCommon: {
        height: "auto !important",
        whiteSpace: "normal !important",
        [defaultTheme.breakpoints.down("sm")]: {
          width: "calc(60% - 10px)",
        },
      },
      cellHide: {
        [defaultTheme.breakpoints.down("sm")]: {
          width: "calc(40% - 30px) !important",
        },
      },
    },
  },
});
