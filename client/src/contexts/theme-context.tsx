import React, { useState, useEffect } from "react";

const isBrowserDefaultDark = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const ThemeContext = React.createContext({
  theme: "light",
  toggleTheme: () => { /* do nothing */ },
});

interface ThemeContextProviderProps {
  children: React.ReactNode;
}

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({
  children,
}) => {
  let initTheme = "light";
  const preferredTheme = localStorage.getItem("theme");
  preferredTheme
    ? (initTheme = preferredTheme)
    : (initTheme = isBrowserDefaultDark() ? "dark" : "light");
  const [theme, setTheme] = useState(initTheme);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
