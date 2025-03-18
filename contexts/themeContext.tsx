import React, { createContext, useState, useContext, ReactNode } from 'react';

const lightTheme = {
  version: 'light',
  primaryColor: '#485A72',
  secondaryColor: '#A9936D',
  tertiaryColor: '#99A96D',
  qaternaryColor: '#694872',
  successColor: '#7C8435',
  neutralGray: '#DDE4E8',
  darkGray: '#7D8488',
  blankSpace: '#FFFFFF',
  inverseBlankSpace: '#000000',
  dangerColor: '#FF0000',
  textColor: '#000000',
};

const darkTheme = {
  version: 'dark',
  primaryColor: '#A9936D',
  secondaryColor: '#485A72',
  tertiaryColor: '#694872',
  qaternaryColor: '#99A96D',
  successColor: '#33691E',
  neutralGray: '#B0BEC5',
  darkGray: '#263238',
  blankSpace: '#000000',
  inverseBlankSpace: '#FFFFFF',
  dangerColor: '#D32F2F',
  textColor: '#FFFFFF',
};

const ThemeContext = createContext({
  theme: lightTheme,
  setTheme: (theme: typeof lightTheme) => {},
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === lightTheme ? darkTheme : lightTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);