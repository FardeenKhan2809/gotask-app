import React, { createContext, useContext, useState, useEffect } from 'react';

export type LayoutDensity = 'compact' | 'default' | 'spacious';
export type SidebarStyle = 'full-labels' | 'icon-only' | 'floating-rail';

export interface Theme {
    preset?: string;
    accentPreset?: string;
    primary: string;
    primaryForeground?: string;
    primaryGlow?: string;
    background: string;
    background2: string;
    background3: string;
    surface: string;
    surface2: string;
    foreground: string;
    foregroundMuted: string;
    border: string;
    muted: string;
    mutedForeground: string;
    success: string;
    successBg: string;
    warning: string;
    warningBg: string;
    danger: string;
    dangerBg: string;
    info: string;
    infoBg: string;
    purple: string;
    purpleBg: string;
    tealBg: string;
    borderRadius: string;
    fontBody: string;
    fontHeadings: string;
    layoutDensity: LayoutDensity;
    sidebarStyle: SidebarStyle;
}

const getContrastForeground = (hex: string): string => {
    const clean = hex.replace('#', '');
    if (clean.length === 6) {
        const r = parseInt(clean.substring(0, 2), 16);
        const g = parseInt(clean.substring(2, 4), 16);
        const b = parseInt(clean.substring(4, 6), 16);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance > 0.6 ? '#000000' : '#ffffff';
    }
    return '#ffffff';
};

const defaultTheme: Theme = {
    preset: 'dark',
    accentPreset: 'emerald-teal',
    primary: '#00c9a7',
    primaryForeground: '#09090b',
    primaryGlow: '#00c9a733',
    background: '#0f1117',
    background2: '#161b25',
    background3: '#1e2535',
    surface: '#1a2030',
    surface2: '#222b3d',
    foreground: '#f0f4ff',
    foregroundMuted: '#8892a4',
    border: '#2a3347',
    muted: '#2a3347',
    mutedForeground: '#8892a4',
    success: '#10b981',
    successBg: '#10b98120',
    warning: '#f59e0b',
    warningBg: '#f59e0b20',
    danger: '#ef4444',
    dangerBg: '#ef444420',
    info: '#3b82f6',
    infoBg: '#3b82f620',
    purple: '#8b5cf6',
    purpleBg: '#8b5cf620',
    tealBg: '#00c9a715',
    borderRadius: '10px',
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

        const primaryFg = theme.primaryForeground || getContrastForeground(theme.primary);
        const primaryGlow = theme.primaryGlow || `${theme.primary}33`;

        root.style.setProperty('--color-primary', theme.primary);
        root.style.setProperty('--color-primary-foreground', primaryFg);
        root.style.setProperty('--color-primary-glow', primaryGlow);
        root.style.setProperty('--color-background', theme.background);
        root.style.setProperty('--color-background-2', theme.background2);
        root.style.setProperty('--color-background-3', theme.background3);
        root.style.setProperty('--color-surface', theme.surface);
        root.style.setProperty('--color-surface-2', theme.surface2);
        root.style.setProperty('--color-foreground', theme.foreground);
        root.style.setProperty('--color-foreground-muted', theme.foregroundMuted);
        root.style.setProperty('--color-border', theme.border);
        root.style.setProperty('--color-muted', theme.muted);
        root.style.setProperty('--color-muted-foreground', theme.mutedForeground);
        root.style.setProperty('--color-success', theme.success);
        root.style.setProperty('--color-success-bg', theme.successBg);
        root.style.setProperty('--color-warning', theme.warning);
        root.style.setProperty('--color-warning-bg', theme.warningBg);
        root.style.setProperty('--color-danger', theme.danger);
        root.style.setProperty('--color-danger-bg', theme.dangerBg);
        root.style.setProperty('--color-info', theme.info);
        root.style.setProperty('--color-info-bg', theme.infoBg);
        root.style.setProperty('--color-purple', theme.purple);
        root.style.setProperty('--color-purple-bg', theme.purpleBg);
        root.style.setProperty('--color-teal-bg', theme.tealBg);

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

        root.setAttribute('data-theme', theme.preset || 'dark');
        root.setAttribute('data-density', theme.layoutDensity);
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