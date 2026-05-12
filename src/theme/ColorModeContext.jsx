import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const useColorMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "dark" ? "light" : "dark")),
      mode,
    }),
    [mode]
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return { colorMode, theme };
};
