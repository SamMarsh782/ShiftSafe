import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useWarehouse } from './warehouseContext';

const lightTheme = {
  version: 'light',
  primaryColor: '#485A72',
  secondaryColor: '#A9936D',
  tertiaryColor: '#99A96D',
  quaternaryColor: '#694872',
  successColor: '#7C8435',
  neutralGray: '#DDE4E8',
  darkGray: '#7D8488',
  blankSpace: '#FFFFFF',
  inverseBlankSpace: '#000000',
  dangerColor: '#FF0000',
};

const darkTheme = {
  version: 'dark',
  primaryColor: '#A9936D',
  secondaryColor: '#485A72',
  tertiaryColor: '#694872',
  quaternaryColor: '#99A96D',
  successColor: '#33691E',
  neutralGray: '#B0BEC5',
  darkGray: '#263238',
  blankSpace: '#000000',
  inverseBlankSpace: '#FFFFFF',
  dangerColor: '#D32F2F',
};

const ThemeContext = createContext({
  theme: lightTheme,
  themeOption: 'auto',
  setThemeOption: (option: string) => {},
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {

  const { warehouse } = useWarehouse();

  const lightTheme = {
    version: 'light',
    primaryColor: warehouse?.lightPrimary || '#4CAF50',
    secondaryColor: warehouse?.lightSecondary || '#81C784',
    tertiaryColor: warehouse?.lightTertiary || '#A5D6A7',
    quaternaryColor: warehouse?.lightQuaternary || '#C8E6C9',
    successColor: '#7C8435',
    neutralGray: '#DDE4E8',
    darkGray: '#7D8488',
    blankSpace: '#FFFFFF',
    inverseBlankSpace: '#000000',
    dangerColor: '#FF0000',
  };

  const darkTheme = {
    version: 'dark',
    primaryColor: warehouse?.darkPrimary || '#388E3C',
    secondaryColor: warehouse?.darkSecondary || '#4CAF50',
    tertiaryColor: warehouse?.darkTertiary || '#66BB6A',
    quaternaryColor: warehouse?.darkQuaternary || '#81C784',
    successColor: '#33691E',
    neutralGray: '#B0BEC5',
    darkGray: '#263238',
    blankSpace: '#000000',
    inverseBlankSpace: '#FFFFFF',
    dangerColor: '#D32F2F',
  };
  const [theme, setTheme] = useState(lightTheme);
  const [themeOption, setThemeOption] = useState('auto');

  useEffect(() => {
    const loadThemeOption = async () => {
      const savedThemeOption = await AsyncStorage.getItem('themeOption');
      if (savedThemeOption) {
        setThemeOption(savedThemeOption);
        applyTheme(savedThemeOption);
      }
    };
    loadThemeOption();
  }, [warehouse]);

  useEffect(() => {
    const saveThemeOption = async () => {
      await AsyncStorage.setItem('themeOption', themeOption);
    };
    saveThemeOption();
  }, [themeOption]);

  const applyTheme = (option: string) => {
    if (option === 'auto') {
      const hour = new Date().getHours();
      if (hour >= 18 || hour < 6) {
        setTheme(darkTheme);
      } else {
        setTheme(lightTheme);
      }
    } else if (option === 'light') {
      setTheme(lightTheme);
    } else if (option === 'dark') {
      setTheme(darkTheme);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme.version === 'light' ? 'dark' : 'light';
    setThemeOption(newTheme);
    applyTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, themeOption, setThemeOption, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);