import { checkboxClasses, createTheme } from "@mui/material";
import { ukUA as coreUkUA } from "@mui/material/locale";
import { ukUA as dataUkUA } from "@mui/x-data-grid/locales";

export const THEME = createTheme(
  {
    typography: {
      fontFamily: ["Montserrat", "sans-serif"].join(","),
    },
    components: {
      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: "#F4929F",
            [`&.${checkboxClasses.checked}`]: {
              color: "#F4929F",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: "#FDB3BD",
          },
        },
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            borderColor: "#FDB3BD",
            ":focus": {
              borderColor: "#FDB3BD",
            },
            ":active": {
              borderColor: "#FDB3BD",
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            color: "#77374F",
            backgroundColor: "#FDB3BD",
            ":hover": {
              backgroundColor: "#F4929F",
            },
            ":active": {
              backgroundColor: "#F4929F",
            },
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            color: "#77374F !important",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#C2B3B5",
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .Mui-focused": {
              color: "#77374F",
            },
            "& .MuiFilledInput-underline:after": {
              borderBottomColor: "#77374F",
            },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#FDB3BD",
              },
            },
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            backgroundColor: "#FDB3BD",
            "&:hover": {
              backgroundColor: "#F4929F",
            },
            "&.Mui-selected": {
              backgroundColor: "#F4929F",
              "&:hover": {
                backgroundColor: "#F4929F",
              },
            },
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            color: "rgba(0, 0, 0, 0.6)",
            textDecorationColor: "rgba(0, 0, 0, 0.6)",
            textUnderlineOffset: "0.13rem",
            cursor: "pointer",
            ":hover": {
              color: "#77374F",
              textDecorationColor: "#77374F",
            },
          },
        },
      },
    },
  },
  coreUkUA,
  dataUkUA
);
