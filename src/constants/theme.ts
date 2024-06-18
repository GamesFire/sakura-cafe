import { checkboxClasses, createTheme } from "@mui/material";
import { ukUA as coreUkUA } from "@mui/material/locale";
import { ukUA as dataUkUA } from "@mui/x-data-grid/locales";

declare module "@mui/system/createTheme/createBreakpoints" {
  interface BreakpointOverrides {
    xxl: true;
  }
}

export const THEME = createTheme(
  {
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
        xxl: 2560,
      },
    },
    typography: {
      fontFamily: ["Montserrat", "sans-serif"].join(","),
      button: {
        [`@media (min-width:2560px)`]: {
          fontSize: "1.25rem",
          lineHeight: "1.75rem",
        },
      },
      h1: {
        [`@media (min-width:2560px)`]: {
          fontSize: "8rem",
          lineHeight: "1rem",
        },
      },
      h4: {
        [`@media (min-width:2560px)`]: {
          fontSize: "4.5rem",
          lineHeight: "1rem",
        },
      },
      h5: {
        [`@media (min-width:2560px)`]: {
          fontSize: "2.25rem",
          lineHeight: "2.5rem",
        },
      },
      h6: {
        [`@media (min-width:2560px)`]: {
          fontSize: "1.875rem",
          lineHeight: "2.25rem",
        },
      },
      body1: {
        [`@media (min-width:2560px)`]: {
          fontSize: "1.25rem",
          lineHeight: "1.75rem",
        },
      },
      body2: {
        [`@media (min-width:2560px)`]: {
          fontSize: "1.125rem",
          lineHeight: "1.75rem",
        },
      },
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
