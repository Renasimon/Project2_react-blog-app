import React, { createContext, useState, useEffect } from 'react';
//I decided to use a manual toggle with preference stored in localStorage 
export const ThemeContext = createContext();
export function ThemeProvider({children}) {
  const [theme, setTheme] = useState(()=> {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(()=> {
    document.body.className= theme;
    localStorage.setItem('theme', theme);
    }, [theme]);

  const toggleTheme= ()=>{
    setTheme((prevTheme) =>(prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}