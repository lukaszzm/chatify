import React, { useState, useEffect } from "react";

const isBrowserDefaultDark = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const ThemeContext = React.createContext({
  theme: "light",
  changeTheme: () => {},
});

export const ThemeContextProvider = ({ children }) => {
  let initTheme = "light";
  const preferredTheme = localStorage.getItem("theme");
  if (preferredTheme) {
    initTheme = preferredTheme;
  } else {
    initTheme = isBrowserDefaultDark ? "dark" : "light";
  }
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
