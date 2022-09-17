import React, { useState, useEffect } from "react";


const ThemeContext = React.createContext({
    theme: 'light',
    changeTheme: () => {}
})

export const ThemeContextProvider = ( { children }) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        if(theme === 'light') {
            setTheme('dark');
            document.documentElement.setAttribute("data-theme", 'dark');
        } else {
            setTheme('light');
            document.documentElement.setAttribute("data-theme", 'light');
        }
    }

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            { children }
        </ThemeContext.Provider>
    )
};

export default ThemeContext;

