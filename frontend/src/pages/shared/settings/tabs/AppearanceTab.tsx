import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import { useTheme, type LayoutDensity, type SidebarStyle } from '@/context/ThemeContext';

export type ThemePreset = 'dark' | 'midnight' | 'monochrome' | 'paper' | 'light' | 'dim' | 'cyberpunk' | 'forest';
export type AccentPreset = 'stark-black' | 'monochrome-white' | 'emerald-teal' | 'electric-indigo' | 'vivid-violet' | 'coral-flame' | 'amber-glow' | 'sky-blue' | 'rose-pink' | 'lime-zest' | 'neon-cyan';
export type FontFamily = 'Plus Jakarta Sans' | 'Inter' | 'DM Sans' | 'Geist' | 'IBM Plex Mono' | 'Outfit' | 'Space Grotesk';
export type CornerRadius = 'sharp' | 'subtle' | 'rounded' | 'pill';

interface ThemePresetColors {
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
    primaryForeground: string;
    defaultAccent: AccentPreset;
    description: string;
}

const themePresets: Record<ThemePreset, ThemePresetColors> = {
    dark: {
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
        primaryForeground: '#09090b',
        defaultAccent: 'emerald-teal',
        description: 'Deep navy obsidian default',
    },
    midnight: {
        background: '#000000',
        background2: '#070709',
        background3: '#0f0f14',
        surface: '#111116',
        surface2: '#191920',
        foreground: '#f1f1f6',
        foregroundMuted: '#8b8e9b',
        border: '#21212c',
        muted: '#1d1d27',
        mutedForeground: '#8b8e9b',
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
        primaryForeground: '#09090b',
        defaultAccent: 'emerald-teal',
        description: 'Pure OLED black pitch',
    },
    monochrome: {
        background: '#000000',
        background2: '#080808',
        background3: '#101010',
        surface: '#121212',
        surface2: '#1a1a1a',
        foreground: '#ffffff',
        foregroundMuted: '#a1a1aa',
        border: '#262626',
        muted: '#181818',
        mutedForeground: '#737373',
        success: '#ffffff',
        successBg: '#ffffff18',
        warning: '#f4f4f5',
        warningBg: '#ffffff14',
        danger: '#ef4444',
        dangerBg: '#ef444420',
        info: '#e5e5e5',
        infoBg: '#ffffff14',
        purple: '#d4d4d8',
        purpleBg: '#ffffff14',
        tealBg: '#ffffff18',
        primaryForeground: '#ffffff',
        defaultAccent: 'monochrome-white',
        description: 'Stark black & white contrast',
    },
    paper: {
        background: '#ffffff',
        background2: '#f8f9fa',
        background3: '#f1f3f5',
        surface: '#ffffff',
        surface2: '#f4f4f6',
        foreground: '#000000',
        foregroundMuted: '#52525b',
        border: '#000000',
        muted: '#e4e4e7',
        mutedForeground: '#71717a',
        success: '#16a34a',
        successBg: '#16a34a18',
        warning: '#d97706',
        warningBg: '#d9770618',
        danger: '#dc2626',
        dangerBg: '#dc262618',
        info: '#2563eb',
        infoBg: '#2563eb18',
        purple: '#7c3aed',
        purpleBg: '#7c3aed18',
        tealBg: '#00000012',
        primaryForeground: '#ffffff',
        defaultAccent: 'stark-black',
        description: 'White background & black borders',
    },
    light: {
        background: '#f8fafc',
        background2: '#ffffff',
        background3: '#f1f5f9',
        surface: '#ffffff',
        surface2: '#f8fafc',
        foreground: '#0f172a',
        foregroundMuted: '#64748b',
        border: '#e2e8f0',
        muted: '#e2e8f0',
        mutedForeground: '#64748b',
        success: '#10b981',
        successBg: '#10b98118',
        warning: '#f59e0b',
        warningBg: '#f59e0b18',
        danger: '#ef4444',
        dangerBg: '#ef444418',
        info: '#3b82f6',
        infoBg: '#3b82f618',
        purple: '#8b5cf6',
        purpleBg: '#8b5cf618',
        tealBg: '#00c9a715',
        primaryForeground: '#ffffff',
        defaultAccent: 'sky-blue',
        description: 'Crisp & clean daylight',
    },
    dim: {
        background: '#15171e',
        background2: '#1b1e27',
        background3: '#222632',
        surface: '#202430',
        surface2: '#292e3d',
        foreground: '#e2e8f0',
        foregroundMuted: '#94a3b8',
        border: '#2f3545',
        muted: '#2f3545',
        mutedForeground: '#94a3b8',
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
        primaryForeground: '#ffffff',
        defaultAccent: 'electric-indigo',
        description: 'Warm soothing charcoal',
    },
    cyberpunk: {
        background: '#0c071e',
        background2: '#150b33',
        background3: '#1f1047',
        surface: '#1b0d3b',
        surface2: '#291357',
        foreground: '#f5e6ff',
        foregroundMuted: '#b39ddb',
        border: '#401d73',
        muted: '#32145a',
        mutedForeground: '#b39ddb',
        success: '#00e676',
        successBg: '#00e67625',
        warning: '#ffea00',
        warningBg: '#ffea0025',
        danger: '#ff1744',
        dangerBg: '#ff174425',
        info: '#00e5ff',
        infoBg: '#00e5ff25',
        purple: '#d500f9',
        purpleBg: '#d500f925',
        tealBg: '#00e5ff20',
        primaryForeground: '#ffffff',
        defaultAccent: 'vivid-violet',
        description: 'Synthwave electric neon',
    },
    forest: {
        background: '#06120e',
        background2: '#0b1a15',
        background3: '#11241e',
        surface: '#142922',
        surface2: '#1c382f',
        foreground: '#ecfdf5',
        foregroundMuted: '#86efac',
        border: '#204337',
        muted: '#1d3b31',
        mutedForeground: '#86efac',
        success: '#34d399',
        successBg: '#34d39925',
        warning: '#fbbf24',
        warningBg: '#fbbf2425',
        danger: '#f87171',
        dangerBg: '#f8717125',
        info: '#38bdf8',
        infoBg: '#38bdf825',
        purple: '#a78bfa',
        purpleBg: '#a78bfa25',
        tealBg: '#34d39920',
        primaryForeground: '#ffffff',
        defaultAccent: 'lime-zest',
        description: 'Deep emerald evergreen',
    },
};

const accentPresets: Record<AccentPreset, { label: string; primary: string; gradient: string }> = {
    'stark-black': { label: 'Stark Black', primary: '#000000', gradient: 'linear-gradient(135deg, #000000, #3f3f46)' },
    'monochrome-white': { label: 'Titanium White', primary: '#ffffff', gradient: 'linear-gradient(135deg, #ffffff, #71717a)' },
    'emerald-teal': { label: 'Emerald Teal', primary: '#00c9a7', gradient: 'linear-gradient(135deg, #00c9a7, #6366f1)' },
    'electric-indigo': { label: 'Electric Indigo', primary: '#6366f1', gradient: 'linear-gradient(135deg, #6366f1, #00c9a7)' },
    'vivid-violet': { label: 'Vivid Violet', primary: '#8b5cf6', gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)' },
    'coral-flame': { label: 'Coral Flame', primary: '#ef4444', gradient: 'linear-gradient(135deg, #ef4444, #f59e0b)' },
    'amber-glow': { label: 'Amber Glow', primary: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b, #10b981)' },
    'sky-blue': { label: 'Sky Blue', primary: '#3b82f6', gradient: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' },
    'rose-pink': { label: 'Rose Pink', primary: '#ec4899', gradient: 'linear-gradient(135deg, #ec4899, #6366f1)' },
    'lime-zest': { label: 'Lime Zest', primary: '#84cc16', gradient: 'linear-gradient(135deg, #84cc16, #06b6d4)' },
    'neon-cyan': { label: 'Neon Cyan', primary: '#06b6d4', gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)' },
};

const cornerRadiusValues: Record<CornerRadius, string> = {
    sharp: '0px',
    subtle: '6px',
    rounded: '12px',
    pill: '24px',
};

const fontFamilies: Record<FontFamily, string> = {
    'Plus Jakarta Sans': 'Plus Jakarta Sans',
    Inter: 'Inter',
    'DM Sans': 'DM Sans',
    Geist: 'Geist',
    'IBM Plex Mono': 'IBM Plex Mono',
    Outfit: 'Outfit',
    'Space Grotesk': 'Space Grotesk',
};

const fontUrls: Record<FontFamily, string> = {
    'Plus Jakarta Sans': 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap',
    Inter: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
    'DM Sans': 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap',
    Geist: 'https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap',
    'IBM Plex Mono': 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&display=swap',
    Outfit: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap',
    'Space Grotesk': 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap',
};

const AppearanceTab: React.FC = () => {
    const { theme, updateTheme } = useTheme();

    const [themePreset, setThemePreset] = useState<ThemePreset>(() => (theme.preset as ThemePreset) || 'dark');
    const [accentPreset, setAccentPreset] = useState<AccentPreset | 'custom'>(() => (theme.accentPreset as AccentPreset) || 'emerald-teal');
    const [customAccentColor, setCustomAccentColor] = useState<string>(() => theme.primary || '#00c9a7');
    const [fontFamily, setFontFamily] = useState<FontFamily>('Plus Jakarta Sans');
    const [layoutDensity, setLayoutDensity] = useState<LayoutDensity>(() => theme.layoutDensity || 'default');
    const [cornerRadius, setCornerRadius] = useState<CornerRadius>('rounded');
    const [sidebarStyle, setSidebarStyle] = useState<SidebarStyle>(() => theme.sidebarStyle || 'full-labels');
    const [showSavedToast, setShowSavedToast] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('appearance-settings');
        if (saved) {
            try {
                const s = JSON.parse(saved);
                if (s.themePreset) {
                    if (s.themePreset === 'nord') {
                        setThemePreset('paper');
                    } else {
                        setThemePreset(s.themePreset);
                    }
                }
                if (s.accentPreset) setAccentPreset(s.accentPreset);
                if (s.customAccentColor) setCustomAccentColor(s.customAccentColor);
                if (s.fontFamily) {
                    setFontFamily(s.fontFamily);
                    loadFont(s.fontFamily);
                }
                if (s.layoutDensity) setLayoutDensity(s.layoutDensity);
                if (s.cornerRadius) setCornerRadius(s.cornerRadius);
                if (s.sidebarStyle) setSidebarStyle(s.sidebarStyle);
            } catch {
                loadFont('Plus Jakarta Sans');
            }
        } else {
            loadFont('Plus Jakarta Sans');
        }
    }, []);

    const loadFont = (font: FontFamily) => {
        const linkId = 'dynamic-font-link';
        let link = document.getElementById(linkId) as HTMLLinkElement;
        if (!link) {
            link = document.createElement('link');
            link.id = linkId;
            link.rel = 'stylesheet';
            document.head.appendChild(link);
        }
        link.href = fontUrls[font];
    };

    const applyThemeSettings = (settings: {
        preset: ThemePreset;
        accent: AccentPreset | 'custom';
        customColor: string;
        font: FontFamily;
        density: LayoutDensity;
        radius: CornerRadius;
        sidebar: SidebarStyle;
    }) => {
        const colors = themePresets[settings.preset];
        const primaryColor = settings.accent === 'custom'
            ? settings.customColor
            : accentPresets[settings.accent as AccentPreset].primary;
        const primaryFg = settings.accent === 'custom'
            ? undefined
            : colors.primaryForeground;

        updateTheme({
            preset: settings.preset,
            accentPreset: settings.accent,
            primary: primaryColor,
            primaryForeground: primaryFg,
            background: colors.background,
            background2: colors.background2,
            background3: colors.background3,
            surface: colors.surface,
            surface2: colors.surface2,
            foreground: colors.foreground,
            foregroundMuted: colors.foregroundMuted,
            border: colors.border,
            muted: colors.muted,
            mutedForeground: colors.mutedForeground,
            success: colors.success,
            successBg: colors.successBg,
            warning: colors.warning,
            warningBg: colors.warningBg,
            danger: colors.danger,
            dangerBg: colors.dangerBg,
            info: colors.info,
            infoBg: colors.infoBg,
            purple: colors.purple,
            purpleBg: colors.purpleBg,
            tealBg: colors.tealBg,
            borderRadius: cornerRadiusValues[settings.radius],
            fontBody: `"${fontFamilies[settings.font]}", sans-serif`,
            fontHeadings: `"${fontFamilies[settings.font]}", sans-serif`,
            layoutDensity: settings.density,
            sidebarStyle: settings.sidebar,
        });

        localStorage.setItem('appearance-settings', JSON.stringify({
            themePreset: settings.preset,
            accentPreset: settings.accent,
            customAccentColor: settings.customColor,
            fontFamily: settings.font,
            layoutDensity: settings.density,
            cornerRadius: settings.radius,
            sidebarStyle: settings.sidebar,
        }));
    };

    const handleThemePresetChange = (preset: ThemePreset) => {
        setThemePreset(preset);
        let nextAccent = accentPreset;
        if (preset === 'monochrome' && accentPreset !== 'custom') {
            nextAccent = 'monochrome-white';
            setAccentPreset('monochrome-white');
        } else if (preset === 'paper' && accentPreset !== 'custom') {
            nextAccent = 'stark-black';
            setAccentPreset('stark-black');
        } else if ((accentPreset === 'monochrome-white' || accentPreset === 'stark-black') && preset !== 'monochrome' && preset !== 'paper') {
            nextAccent = themePresets[preset].defaultAccent;
            setAccentPreset(nextAccent);
        }
        applyThemeSettings({
            preset,
            accent: nextAccent,
            customColor: customAccentColor,
            font: fontFamily,
            density: layoutDensity,
            radius: cornerRadius,
            sidebar: sidebarStyle,
        });
    };

    const handleAccentChange = (preset: AccentPreset) => {
        setAccentPreset(preset);
        applyThemeSettings({
            preset: themePreset,
            accent: preset,
            customColor: customAccentColor,
            font: fontFamily,
            density: layoutDensity,
            radius: cornerRadius,
            sidebar: sidebarStyle,
        });
    };

    const handleCustomColorInput = (color: string) => {
        setCustomAccentColor(color);
        setAccentPreset('custom');
        applyThemeSettings({
            preset: themePreset,
            accent: 'custom',
            customColor: color,
            font: fontFamily,
            density: layoutDensity,
            radius: cornerRadius,
            sidebar: sidebarStyle,
        });
    };

    const handleFontChange = (font: FontFamily) => {
        setFontFamily(font);
        loadFont(font);
        applyThemeSettings({
            preset: themePreset,
            accent: accentPreset,
            customColor: customAccentColor,
            font,
            density: layoutDensity,
            radius: cornerRadius,
            sidebar: sidebarStyle,
        });
    };

    const handleCornerRadiusChange = (radius: CornerRadius) => {
        setCornerRadius(radius);
        applyThemeSettings({
            preset: themePreset,
            accent: accentPreset,
            customColor: customAccentColor,
            font: fontFamily,
            density: layoutDensity,
            radius,
            sidebar: sidebarStyle,
        });
    };

    const handleLayoutDensityChange = (density: LayoutDensity) => {
        setLayoutDensity(density);
        applyThemeSettings({
            preset: themePreset,
            accent: accentPreset,
            customColor: customAccentColor,
            font: fontFamily,
            density,
            radius: cornerRadius,
            sidebar: sidebarStyle,
        });
    };

    const handleSidebarStyleChange = (sidebar: SidebarStyle) => {
        setSidebarStyle(sidebar);
        applyThemeSettings({
            preset: themePreset,
            accent: accentPreset,
            customColor: customAccentColor,
            font: fontFamily,
            density: layoutDensity,
            radius: cornerRadius,
            sidebar,
        });
    };

    const handleReset = () => {
        setThemePreset('dark');
        setAccentPreset('emerald-teal');
        setCustomAccentColor('#00c9a7');
        setFontFamily('Plus Jakarta Sans');
        loadFont('Plus Jakarta Sans');
        setLayoutDensity('default');
        setCornerRadius('rounded');
        setSidebarStyle('full-labels');

        applyThemeSettings({
            preset: 'dark',
            accent: 'emerald-teal',
            customColor: '#00c9a7',
            font: 'Plus Jakarta Sans',
            density: 'default',
            radius: 'rounded',
            sidebar: 'full-labels',
        });
    };

    const handleApply = () => {
        applyThemeSettings({
            preset: themePreset,
            accent: accentPreset,
            customColor: customAccentColor,
            font: fontFamily,
            density: layoutDensity,
            radius: cornerRadius,
            sidebar: sidebarStyle,
        });
        setShowSavedToast(true);
        setTimeout(() => setShowSavedToast(false), 3000);
    };

    const currentColors = themePresets[themePreset];

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-foreground tracking-tight">Appearance & Themes</h2>
                    <p className="text-sm text-foreground-muted mt-1">
                        Customize FlowWork with tailored color palettes, black & white monochrome styling, custom accents, and dynamic layout scaling.
                    </p>
                </div>
                {showSavedToast && (
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-success-bg border border-success text-success text-sm font-semibold animate-pulse">
                        <Icon name="check-circle-2" size={16} />
                        <span>Settings saved and applied!</span>
                    </div>
                )}
            </div>

            <div className="rounded-xl border border-border bg-surface overflow-hidden">
                <div className="px-6 py-4 border-b border-border bg-background-3 flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-bold text-foreground">Theme Presets</h3>
                        <p className="text-xs text-foreground-muted mt-0.5">Select a master color scheme for all dashboards and interfaces</p>
                    </div>
                    <span className="text-xs font-semibold text-primary bg-teal-bg px-3 py-1 rounded-full uppercase tracking-wider">
                        {themePreset === 'paper' ? 'White & Black Borders' : themePreset} — Active
                    </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
                    {(Object.keys(themePresets) as ThemePreset[]).map((preset) => {
                        const p = themePresets[preset];
                        const isSelected = themePreset === preset;
                        const isMonochrome = preset === 'monochrome';
                        const isPaper = preset === 'paper';

                        return (
                            <button
                                key={preset}
                                onClick={() => handleThemePresetChange(preset)}
                                className={`flex flex-col gap-3 rounded-xl border-2 p-3.5 transition-all text-left group ${
                                    isSelected
                                        ? 'border-primary ring-2 ring-primary/20 bg-background-2'
                                        : 'border-border hover:border-foreground-muted/40 bg-surface'
                                }`}
                            >
                                <div
                                    className="w-full rounded-lg overflow-hidden border flex flex-col justify-between p-2.5 transition-transform group-hover:scale-[1.02]"
                                    style={{
                                        height: 86,
                                        background: p.background,
                                        borderColor: isPaper ? '#000000' : p.border,
                                        boxShadow: isPaper ? 'inset 0 0 0 1px #000000' : isMonochrome ? 'inset 0 0 0 1px rgba(255,255,255,0.1)' : undefined,
                                    }}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-2.5 h-2.5 rounded-full" style={{ background: isPaper ? '#000000' : isMonochrome ? '#ffffff' : '#ef4444' }} />
                                            <div className="w-2.5 h-2.5 rounded-full" style={{ background: isPaper ? '#52525b' : isMonochrome ? '#a1a1aa' : '#f59e0b' }} />
                                            <div className="w-2.5 h-2.5 rounded-full" style={{ background: isPaper ? '#a1a1aa' : isMonochrome ? '#52525b' : '#10b981' }} />
                                        </div>
                                        <div
                                            className="px-1.5 py-0.5 rounded text-[9px] font-bold"
                                            style={{
                                                background: isPaper ? '#000000' : isMonochrome ? '#ffffff' : p.surface2,
                                                color: isPaper ? '#ffffff' : isMonochrome ? '#000000' : p.foreground,
                                                border: `1px solid ${isPaper ? '#000000' : p.border}`,
                                            }}
                                        >
                                            {isPaper ? 'INK B&W' : isMonochrome ? 'B&W DARK' : preset.toUpperCase()}
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <div
                                            className="w-1/3 rounded p-1 flex flex-col gap-1"
                                            style={{ background: p.surface, border: `1px solid ${isPaper ? '#000000' : p.border}` }}
                                        >
                                            <div className="h-1 rounded" style={{ background: isPaper ? '#000000' : isMonochrome ? '#ffffff' : '#00c9a7', width: '70%' }} />
                                            <div className="h-1 rounded" style={{ background: isPaper ? '#000000' : p.border, width: '90%' }} />
                                            <div className="h-1 rounded" style={{ background: isPaper ? '#71717a' : p.border, width: '50%' }} />
                                        </div>
                                        <div className="flex-1 flex flex-col gap-1.5 justify-center">
                                            <div
                                                className="h-3.5 rounded px-1.5 flex items-center gap-1"
                                                style={{ background: p.surface2, border: `1px solid ${p.border}` }}
                                            >
                                                <div className="w-1.5 h-1.5 rounded-full" style={{ background: isPaper ? '#000000' : isMonochrome ? '#ffffff' : '#00c9a7' }} />
                                                <div className="h-1 rounded flex-1" style={{ background: isPaper ? '#000000' : p.border }} />
                                            </div>
                                            <div
                                                className="h-3.5 rounded px-1.5 flex items-center gap-1"
                                                style={{ background: p.surface2, border: `1px solid ${p.border}` }}
                                            >
                                                <div className="w-1.5 h-1.5 rounded-full" style={{ background: isPaper ? '#71717a' : isMonochrome ? '#a1a1aa' : '#8b5cf6' }} />
                                                <div className="h-1 rounded flex-1" style={{ background: isPaper ? '#71717a' : p.border }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col min-w-0 pr-2">
                                        <span className="text-xs font-bold text-foreground capitalize flex items-center gap-1.5">
                                            {preset === 'monochrome' ? 'Black & White (Dark)' : preset === 'paper' ? 'White & Black' : preset}
                                            {isPaper && (
                                                <span className="px-1.5 py-0.2 rounded text-[9px] bg-black text-white font-extrabold uppercase">
                                                    Ink
                                                </span>
                                            )}
                                            {preset === 'monochrome' && (
                                                <span className="px-1.5 py-0.2 rounded text-[9px] bg-white text-black font-extrabold uppercase">
                                                    Pro
                                                </span>
                                            )}
                                        </span>
                                        <span className="text-xs text-foreground-muted truncate">
                                            {p.description}
                                        </span>
                                    </div>
                                    <div
                                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                            isSelected ? 'border-primary bg-primary text-primary-foreground' : 'border-border'
                                        }`}
                                    >
                                        {isSelected && <Icon name="check" size={9} />}
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="rounded-xl border border-border bg-surface overflow-hidden">
                <div className="px-6 py-4 border-b border-border bg-background-3 flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-bold text-foreground">Accent Color</h3>
                        <p className="text-xs text-foreground-muted mt-0.5">Defines buttons, interactive highlights, active tabs, and chart indicators</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 rounded-full border border-border" style={{ background: theme.primary }} />
                        <span className="text-xs font-mono font-semibold text-foreground uppercase">{theme.primary}</span>
                    </div>
                </div>
                <div className="p-6 flex flex-col gap-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                        {(Object.keys(accentPresets) as AccentPreset[]).map((preset) => {
                            const ap = accentPresets[preset];
                            const isSelected = accentPreset === preset;

                            return (
                                <button
                                    key={preset}
                                    onClick={() => handleAccentChange(preset)}
                                    className={`flex flex-col gap-2.5 rounded-xl border-2 p-3 text-left transition-all group ${
                                        isSelected
                                            ? 'border-primary ring-2 ring-primary/20 bg-background-2'
                                            : 'border-border hover:border-foreground-muted/40 bg-surface'
                                    }`}
                                >
                                    <div
                                        className="w-full h-8 rounded-lg shadow-sm transition-transform group-hover:scale-[1.02] border border-black/10"
                                        style={{ background: ap.gradient }}
                                    />
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-semibold text-foreground truncate">{ap.label}</span>
                                        <div
                                            className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                                isSelected ? 'border-primary bg-primary text-primary-foreground' : 'border-border'
                                            }`}
                                        >
                                            {isSelected && <Icon name="check" size={8} />}
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-dashed border-border p-4 bg-background-2/60">
                        <div className="flex items-center gap-3.5 w-full sm:w-auto">
                            <div
                                className="w-10 h-10 rounded-xl border-2 border-border shadow-inner flex-shrink-0"
                                style={{ background: customAccentColor }}
                            />
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-foreground">Custom Color Hex</span>
                                <span className="text-xs text-foreground-muted">Type any hex code or pick from the palette</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                            <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-1.5 focus-within:border-primary">
                                <input
                                    type="color"
                                    value={customAccentColor}
                                    onChange={(e) => handleCustomColorInput(e.target.value)}
                                    className="w-6 h-6 p-0 border-0 bg-transparent cursor-pointer rounded overflow-hidden"
                                />
                                <input
                                    type="text"
                                    value={customAccentColor}
                                    onChange={(e) => handleCustomColorInput(e.target.value)}
                                    placeholder="#000000"
                                    className="text-xs font-mono text-foreground uppercase bg-transparent outline-none w-20"
                                />
                            </div>
                            <button
                                onClick={() => handleCustomColorInput(customAccentColor)}
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
                                    accentPreset === 'custom'
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-surface border border-border text-foreground hover:bg-surface-2'
                                }`}
                            >
                                <Icon name="check" size={13} />
                                <span>{accentPreset === 'custom' ? 'Active' : 'Apply'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="rounded-xl border border-border bg-surface overflow-hidden">
                <div className="px-6 py-4 border-b border-border bg-background-3 flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-bold text-foreground">Typography</h3>
                        <p className="text-xs text-foreground-muted mt-0.5">Select font family applied to interface headings, buttons, and content</p>
                    </div>
                    <span className="text-xs font-mono font-semibold text-primary bg-teal-bg px-2.5 py-1 rounded-full">
                        {fontFamily}
                    </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 p-6">
                    {(Object.keys(fontFamilies) as FontFamily[]).map((font) => {
                        const isSelected = fontFamily === font;
                        return (
                            <button
                                key={font}
                                onClick={() => handleFontChange(font)}
                                className={`flex flex-col gap-2 rounded-xl border-2 p-4 text-left transition-all ${
                                    isSelected
                                        ? 'border-primary ring-2 ring-primary/20 bg-background-2'
                                        : 'border-border hover:border-foreground-muted/40 bg-surface'
                                }`}
                            >
                                <span className="text-2xl font-bold text-foreground tracking-tight" style={{ fontFamily: fontFamilies[font] }}>
                                    Aa
                                </span>
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-xs font-bold text-foreground">{font}</span>
                                    <span className="text-[11px] text-foreground-muted truncate" style={{ fontFamily: fontFamilies[font] }}>
                                        Modern readable UI text
                                    </span>
                                </div>
                                <div
                                    className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center self-end mt-1 ${
                                        isSelected ? 'border-primary bg-primary text-primary-foreground' : 'border-border'
                                    }`}
                                >
                                    {isSelected && <Icon name="check" size={8} />}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-xl border border-border bg-surface overflow-hidden">
                    <div className="px-6 py-4 border-b border-border bg-background-3">
                        <h3 className="text-sm font-bold text-foreground">Layout Density</h3>
                        <p className="text-xs text-foreground-muted mt-0.5">Adjust padding and vertical breathing space</p>
                    </div>
                    <div className="flex flex-col gap-2.5 p-5">
                        {(['compact', 'default', 'spacious'] as LayoutDensity[]).map((density) => {
                            const isSelected = layoutDensity === density;
                            return (
                                <button
                                    key={density}
                                    onClick={() => handleLayoutDensityChange(density)}
                                    className={`flex items-center gap-3.5 rounded-xl border-2 px-4 py-3 text-left transition ${
                                        isSelected
                                            ? 'border-primary bg-background-2 ring-2 ring-primary/20'
                                            : 'border-border hover:border-foreground-muted/40 bg-surface'
                                    }`}
                                >
                                    <div
                                        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                            isSelected ? 'bg-primary text-primary-foreground' : 'bg-background-3 text-foreground-muted'
                                        }`}
                                    >
                                        <Icon name={density === 'compact' ? 'align-justify' : density === 'default' ? 'menu' : 'layout-list'} size={15} />
                                    </div>
                                    <div className="flex flex-col flex-1 min-w-0">
                                        <span className="text-xs font-bold text-foreground capitalize">{density}</span>
                                        <span className="text-[11px] text-foreground-muted truncate">
                                            {density === 'compact' ? 'Tight rows, higher information density' : density === 'default' ? 'Balanced modern UI proportion' : 'Airy comfort with roomy padding'}
                                        </span>
                                    </div>
                                    <div
                                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                            isSelected ? 'border-primary bg-primary text-primary-foreground' : 'border-border'
                                        }`}
                                    >
                                        {isSelected && <Icon name="check" size={9} />}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="rounded-xl border border-border bg-surface overflow-hidden">
                    <div className="px-6 py-4 border-b border-border bg-background-3">
                        <h3 className="text-sm font-bold text-foreground">Corner Radius</h3>
                        <p className="text-xs text-foreground-muted mt-0.5">Controls curves across cards, inputs, and buttons</p>
                    </div>
                    <div className="flex flex-col gap-2.5 p-5">
                        {(['sharp', 'subtle', 'rounded', 'pill'] as CornerRadius[]).map((radius) => {
                            const isSelected = cornerRadius === radius;
                            return (
                                <button
                                    key={radius}
                                    onClick={() => handleCornerRadiusChange(radius)}
                                    className={`flex items-center gap-3.5 rounded-xl border-2 px-4 py-3 text-left transition ${
                                        isSelected
                                            ? 'border-primary bg-background-2 ring-2 ring-primary/20'
                                            : 'border-border hover:border-foreground-muted/40 bg-surface'
                                    }`}
                                >
                                    <div
                                        className="w-7 h-7 flex-shrink-0 border-2 border-foreground-muted/60"
                                        style={{ borderRadius: cornerRadiusValues[radius] }}
                                    />
                                    <div className="flex flex-col flex-1 min-w-0">
                                        <span className="text-xs font-bold text-foreground capitalize">{radius}</span>
                                        <span className="text-[11px] text-foreground-muted font-mono">{cornerRadiusValues[radius]} radius</span>
                                    </div>
                                    <div className="flex gap-1.5 items-center mr-2">
                                        <div className="w-6 h-2.5 bg-primary/40" style={{ borderRadius: cornerRadiusValues[radius] }} />
                                        <div className="w-4 h-2.5 bg-primary/70" style={{ borderRadius: cornerRadiusValues[radius] }} />
                                    </div>
                                    <div
                                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                            isSelected ? 'border-primary bg-primary text-primary-foreground' : 'border-border'
                                        }`}
                                    >
                                        {isSelected && <Icon name="check" size={9} />}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="rounded-xl border border-border bg-surface overflow-hidden">
                <div className="px-6 py-4 border-b border-border bg-background-3">
                    <h3 className="text-sm font-bold text-foreground">Navigation Sidebar Style</h3>
                    <p className="text-xs text-foreground-muted mt-0.5">Choose how the primary navigation behaves across the app</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6">
                    {(['full-labels', 'icon-only', 'floating-rail'] as SidebarStyle[]).map((style) => {
                        const isSelected = sidebarStyle === style;
                        return (
                            <button
                                key={style}
                                onClick={() => handleSidebarStyleChange(style)}
                                className={`flex flex-col items-center gap-3 rounded-xl border-2 p-5 text-center transition ${
                                    isSelected
                                        ? 'border-primary bg-background-2 ring-2 ring-primary/20'
                                        : 'border-border hover:border-foreground-muted/40 bg-surface'
                                }`}
                            >
                                <div
                                    className="flex rounded-lg overflow-hidden border border-border"
                                    style={{ height: 64, width: 90, background: currentColors.background2 }}
                                >
                                    <div
                                        className="flex flex-col gap-1.5 p-2 transition-all"
                                        style={{
                                            width: style === 'icon-only' ? 26 : '48%',
                                            background: currentColors.surface,
                                            borderRight: `1px solid ${currentColors.border}`,
                                        }}
                                    >
                                        <div className="flex items-center gap-1">
                                            <div className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: theme.primary }} />
                                            {style !== 'icon-only' && <div className="h-1 rounded flex-1" style={{ background: theme.primary }} />}
                                        </div>
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="flex items-center gap-1">
                                                <div className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: currentColors.border }} />
                                                {style !== 'icon-only' && <div className="h-1 rounded flex-1" style={{ background: currentColors.border }} />}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex-1 p-2 flex flex-col gap-1.5">
                                        <div className="h-2 rounded" style={{ background: currentColors.surface2 }} />
                                        <div className="h-2 rounded" style={{ background: currentColors.surface2, width: '70%' }} />
                                    </div>
                                </div>
                                <div className="flex flex-col items-center gap-0.5">
                                    <span className="text-xs font-bold text-foreground">
                                        {style === 'full-labels' ? 'Full Expanded' : style === 'icon-only' ? 'Compact Icons' : 'Hover Expand Rail'}
                                    </span>
                                    <span className="text-[11px] text-foreground-muted">
                                        {style === 'full-labels' ? 'Standard 220px width' : style === 'icon-only' ? 'Space-efficient 68px rail' : 'Slides out on hover'}
                                    </span>
                                </div>
                                <div
                                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                        isSelected ? 'border-primary bg-primary text-primary-foreground' : 'border-border'
                                    }`}
                                >
                                    {isSelected && <Icon name="check" size={9} />}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="rounded-xl border border-border bg-surface overflow-hidden">
                <div className="px-6 py-4 border-b border-border bg-background-3 flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-bold text-foreground">Live Application Preview</h3>
                        <p className="text-xs text-foreground-muted mt-0.5">Interactive simulation reflecting active theme, accent, and radius</p>
                    </div>
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-success bg-success-bg px-3 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-success"></span> Live Sync
                    </span>
                </div>
                <div className="p-6 flex flex-col gap-6">
                    <div
                        className="rounded-xl border border-border overflow-hidden transition-all shadow-xl"
                        style={{ background: theme.background }}
                    >
                        <div
                            className="flex items-center gap-3 px-4 py-3 border-b border-border"
                            style={{ background: theme.surface }}
                        >
                            <div className="flex items-center gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-danger/80" />
                                <div className="w-2.5 h-2.5 rounded-full bg-warning/80" />
                                <div className="w-2.5 h-2.5 rounded-full bg-success/80" />
                            </div>
                            <div className="flex items-center gap-2 ml-2">
                                <div
                                    className="w-5 h-5 rounded flex items-center justify-center font-bold text-[10px]"
                                    style={{ background: theme.primary, color: theme.primaryForeground }}
                                >
                                    <Icon name="zap" size={11} />
                                </div>
                                <span className="text-xs font-bold text-foreground">FlowWork</span>
                            </div>
                            <div className="ml-auto flex items-center gap-2">
                                <div
                                    className="h-6 rounded-lg px-2.5 flex items-center text-xs text-foreground-muted border border-border"
                                    style={{ background: theme.background2 }}
                                >
                                    Search tasks...
                                </div>
                                <div
                                    className="h-6 rounded-lg px-3 flex items-center text-xs font-bold shadow-sm"
                                    style={{ background: theme.primary, color: theme.primaryForeground }}
                                >
                                    + New Task
                                </div>
                            </div>
                        </div>

                        <div className="flex" style={{ minHeight: 180 }}>
                            <div
                                className="flex flex-col gap-1 p-2 border-r border-border"
                                style={{ width: sidebarStyle === 'icon-only' ? 56 : 110, background: theme.surface }}
                            >
                                {['Overview', 'Tasks', 'Tracker', 'Reports'].map((item, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex items-center gap-2 px-2 py-1.5 rounded text-xs font-medium ${
                                            idx === 1
                                                ? 'bg-teal-bg text-primary font-bold'
                                                : 'text-foreground-muted'
                                        }`}
                                    >
                                        <Icon name={idx === 0 ? 'layout-dashboard' : idx === 1 ? 'check-square' : idx === 2 ? 'timer' : 'bar-chart-2'} size={12} />
                                        {sidebarStyle !== 'icon-only' && <span className="text-[11px] truncate">{item}</span>}
                                    </div>
                                ))}
                            </div>

                            <div className="flex-1 p-4 flex flex-col gap-3">
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { label: 'Completed', val: '24', color: theme.primary },
                                        { label: 'In Progress', val: '8', color: '#8b5cf6' },
                                        { label: 'Pending', val: '3', color: '#f59e0b' },
                                    ].map((stat, i) => (
                                        <div
                                            key={i}
                                            className="rounded-lg p-2.5 border border-border flex flex-col gap-1"
                                            style={{ background: theme.surface }}
                                        >
                                            <span className="text-[10px] text-foreground-muted uppercase tracking-wider">{stat.label}</span>
                                            <div className="flex items-baseline justify-between">
                                                <span className="text-base font-bold text-foreground">{stat.val}</span>
                                                <div className="w-2 h-2 rounded-full" style={{ background: stat.color }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div
                                    className="rounded-lg p-3 border border-border flex items-center justify-between"
                                    style={{ background: theme.surface2 }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-8 rounded-full" style={{ background: theme.primary }} />
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-xs font-bold text-foreground">Launch Design System</span>
                                            <span className="text-[10px] text-foreground-muted">Frontend • Due Today</span>
                                        </div>
                                    </div>
                                    <span
                                        className="text-[10px] font-bold px-2.5 py-1 rounded-full border border-primary/20"
                                        style={{ background: 'var(--color-teal-bg)', color: theme.primary }}
                                    >
                                        Active
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 pt-2 border-t border-border">
                        <span className="text-xs font-bold text-foreground-muted uppercase tracking-wider">Button & Badge Samples</span>
                        <div className="flex flex-wrap items-center gap-3">
                            <button
                                className="px-4 py-2 rounded-lg text-xs font-bold transition shadow-sm"
                                style={{ background: theme.primary, color: theme.primaryForeground }}
                            >
                                Primary Action
                            </button>
                            <button className="px-4 py-2 rounded-lg border border-border bg-surface text-xs font-semibold text-foreground hover:bg-surface-2 transition">
                                Secondary Button
                            </button>
                            <button className="px-4 py-2 rounded-lg bg-danger-bg text-danger border border-danger/30 text-xs font-semibold">
                                Danger
                            </button>
                            <span className="flex items-center gap-1.5 text-xs font-semibold bg-teal-bg text-primary px-3 py-1.5 rounded-full border border-primary/20">
                                <span className="w-1.5 h-1.5 rounded-full" style={{ background: theme.primary }}></span>
                                In Progress
                            </span>
                            <span className="text-xs font-semibold bg-success-bg text-success px-3 py-1.5 rounded-full border border-success/30">
                                Completed
                            </span>
                            <span className="text-xs font-semibold bg-warning-bg text-warning px-3 py-1.5 rounded-full border border-warning/30">
                                Pending Review
                            </span>
                            <div className="flex items-center gap-1.5 rounded-lg border border-primary bg-teal-bg px-3 py-1.5 text-xs font-mono font-bold text-primary">
                                <Icon name="timer" size={13} />
                                <span>03:42:19</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-border bg-surface-2 px-6 py-4 sticky bottom-4 shadow-lg backdrop-blur-md">
                <div className="flex items-center gap-2 text-xs text-foreground-muted">
                    <Icon name="sparkles" size={15} className="text-primary" />
                    <span>Every change takes effect in real-time across your workspace.</span>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleReset}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-surface text-xs font-semibold text-foreground-muted hover:text-foreground hover:bg-background-3 transition"
                    >
                        <Icon name="rotate-ccw" size={13} />
                        <span>Reset Defaults</span>
                    </button>
                    <button
                        onClick={handleApply}
                        className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold shadow-md transition"
                        style={{ background: theme.primary, color: theme.primaryForeground }}
                    >
                        <Icon name="check" size={14} />
                        <span>Save Preferences</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AppearanceTab;
