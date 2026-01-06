// context/ThemeContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeColors {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  primary: string;
  border: string;
  // Add other color properties as needed
}

interface ThemeContextType {
  colors: ThemeColors;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(false);

  const lightColors: ThemeColors = {
    background: '#f8f9fa',
    surface: '#ffffff',
    text: '#000000',
    textSecondary: '#666666',
    textMuted: '#999999',
    primary: '#ff85a2',
    border: '#eeeeee',
  };

  const darkColors: ThemeColors = {
    background: '#121212',
    surface: '#1e1e1e',
    text: '#ffffff',
    textSecondary: '#b0b0b0',
    textMuted: '#757575',
    primary: '#ff85a2',
    border: '#333333',
  };

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider
      value={{
        colors: isDark ? darkColors : lightColors,
        isDark,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Export the hook directly from this file
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Also export the context for components that need it
export { ThemeContext };