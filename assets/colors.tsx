import React, { createContext, useState, useContext, ReactNode } from 'react';

const defaultTheme = {
  primaryColor: '#654321',
  secondaryColor: '#F7DCB6',
  successColor: '#7C8435',
  neutralGray: '#DDE4E8',
  darkGray: '#7D8488',
  white: '#FFFFFF',
  dangerColor: '#FF0000',
};

const ThemeContext = createContext({
  theme: defaultTheme,
  setTheme: (theme: typeof defaultTheme) => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState(defaultTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);