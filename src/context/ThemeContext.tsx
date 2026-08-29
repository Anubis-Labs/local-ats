import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('ats-theme') as Theme;
    return saved || 'dark';
  });

  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    localStorage.setItem('ats-theme', theme);

    const updateTheme = () => {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const shouldBeDark = theme === 'dark' || (theme === 'system' && systemDark);
      setIsDark(shouldBeDark);
      if (shouldBeDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    updateTheme();

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', updateTheme);
      return () => mediaQuery.removeEventListener('change', updateTheme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
