import React, { createContext, useContext, useState, useEffect } from 'react';

export type LayoutDensity = 'compact' | 'default' | 'spacious';
export type SidebarStyle = 'full-labels' | 'icon-only' | 'floating-rail';

export interface Theme {
    primary: string;
    background: string;
    background2: string;
    surface: string;
    border: string;
    borderRadius: string;
    fontBody: string;
    fontHeadings: string;
    layoutDensity: LayoutDensity;
    sidebarStyle: SidebarStyle;
}

const defaultTheme: Theme = {
    primary: '#00c9a7',
    background: '#0f1117',
    background2: '#161b25',
    surface: '#1a2030',
    border: '#2a3347',
    borderRadius: '0.5rem',
    fontBody: 'Plus Jakarta Sans, sans-serif',
    fontHeadings: 'Plus Jakarta Sans, sans-serif',
    layoutDensity: 'default',
    sidebarStyle: 'full-labels',
};

interface ThemeContextType {
    theme: Theme;
    updateTheme: (newTheme: Partial<Theme>) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem('app-theme');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                return { ...defaultTheme, ...parsed };
            } catch {
                return defaultTheme;
            }
        }
        return defaultTheme;
    });

    useEffect(() => {
        localStorage.setItem('app-theme', JSON.stringify(theme));
        const root = document.documentElement;

        root.style.setProperty('--color-primary', theme.primary);
        root.style.setProperty('--color-background', theme.background);
        root.style.setProperty('--color-background-2', theme.background2);
        root.style.setProperty('--color-surface', theme.surface);
        root.style.setProperty('--color-border', theme.border);
        root.style.setProperty('--radius', theme.borderRadius);
        root.style.setProperty('--font-body', theme.fontBody);
        root.style.setProperty('--font-headings', theme.fontHeadings);

        const densityScale: Record<LayoutDensity, number> = {
            compact: 0.75,
            default: 1,
            spacious: 1.25,
        };
        const scale = densityScale[theme.layoutDensity] ?? 1;
        root.style.setProperty('--layout-density-scale', scale.toString());

        root.setAttribute('data-sidebar-style', theme.sidebarStyle);
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
