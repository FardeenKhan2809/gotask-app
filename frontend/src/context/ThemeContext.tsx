import React, { createContext, useContext, useState, useEffect } from 'react';

interface Theme {
    primary: string;
    background: string;
    surface: string;
    borderRadius: string;
}

const defaultTheme: Theme = {
    primary: '#00c9a7',
    background: '#0f1117',
    surface: '#1a2030',
    borderRadius: '0.5rem',
};

interface ThemeContextType {
    theme: Theme;
    updateTheme: (newTheme: Partial<Theme>) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem('app-theme');
        return saved ? JSON.parse(saved) : defaultTheme;
    });

    useEffect(() => {
        localStorage.setItem('app-theme', JSON.stringify(theme));
        const root = document.documentElement;
        root.style.setProperty('--color-primary', theme.primary);
        root.style.setProperty('--color-background', theme.background);
        root.style.setProperty('--color-surface', theme.surface);
        root.style.setProperty('--radius', theme.borderRadius);
    }, [theme]);

    const updateTheme = (newTheme: Partial<Theme>) => {
        setTheme((prev) => ({ ...prev, ...newTheme }));
    };

    return <ThemeContext.Provider value={{ theme, updateTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
    return ctx;
};