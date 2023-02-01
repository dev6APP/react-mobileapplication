import React from 'react';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from './colors';

export const ThemeContext = React.createContext();

const ThemeProvider = ({children}) => {
  const [isLightTheme, setLightTheme] = useState("0");

  const getTheme = async () => {
    try {
      const theme =  await AsyncStorage.getItem("theme");
      setLightTheme(theme);
    } catch (error){
      setLightTheme(theme);
    }
  } 
  getTheme();

  const toggleTheme = async () => {
    if(isLightTheme === "0"){
      AsyncStorage.setItem("theme", "1");
      setLightTheme("1");
    } else {
      AsyncStorage.setItem("theme", "0");
      setLightTheme("0");
    }
  }

  const theme = {
    colors: isLightTheme === "0" ? colors.light : colors.dark,
    toggleTheme,
    isLightTheme,
   };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;