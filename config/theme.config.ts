import { createTheme } from "@rneui/themed";

declare module "@rneui/themed" {
  export interface Colors {
    dark: string;
  }
}

const Theme = createTheme({
  lightColors: {
    primary: "#DE8667",
    secondary: "#EFB467",
    dark: "#322D38",
  },
  darkColors: {
    primary: "##DE8667",
    secondary: "#EFB467",
    dark: "#322D38",
  },
  mode: "light",
});

const customStyles = {
  h1: {
    fontSize: "98px",
    fontWeight: "light",
  },
  h2: {
    fontSize: "61px",
    fontWeight: "light",
  },
  h3: {
    fontSize: "49px",
    fontWeight: "regular",
  },
  h4: {
    fontSize: "35px",
    fontWeight: "regular",
  },
  h5: {
    fontSize: "16px",
    fontWeight: "regular",
  },
  caption: {
    fontSize: "12px",
    fontWeight: "normal",
  },
  body: {
    fontSize: "16px",
    fontWeight: "regular",
  },
  bodyBold: {
    fontSize: "16px",
    fontWeight: "bold",
  },
};

export { Theme, customStyles };
