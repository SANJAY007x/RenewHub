import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("renewhub-theme");

    return savedTheme === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.setAttribute("data-theme", "dark");
      localStorage.setItem("renewhub-theme", "dark");
    } else {
      root.setAttribute("data-theme", "light");
      localStorage.setItem("renewhub-theme", "light");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((previous) => !previous);
  };

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}