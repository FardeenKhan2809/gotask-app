import React, { useState, useEffect } from 'react';
import Icon from '../../../components/ui/Icon';
import { useTheme } from '../../../context/ThemeContext';

type ThemePreset = 'dark' | 'midnight' | 'light' | 'dim';
type AccentPreset = 'emerald-teal' | 'electric-indigo' | 'vivid-violet' | 'coral-flame' | 'amber-glow' | 'sky-blue' | 'rose-pink' | 'lime-zest';
type FontFamily = 'Inter' | 'DM Sans' | 'Geist' | 'IBM Plex Mono' | 'Plus Jakarta Sans';
type LayoutDensity = 'compact' | 'default' | 'spacious';
type CornerRadius = 'sharp' | 'subtle' | 'rounded' | 'pill';
type SidebarStyle = 'full-labels' | 'icon-only' | 'floating-rail';

const themePresets: Record<ThemePreset, {
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
}> = {
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
    },
    midnight: {
        background: '#000000',
        background2: '#050505',
        background3: '#0a0a0a',
        surface: '#0d0d0d',
        surface2: '#151515',
        foreground: '#e8e8e8',
        foregroundMuted: '#808080',
        border: '#1a1a1a',
        muted: '#1a1a1a',
        mutedForeground: '#808080',
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
    },
    light: {
        background: '#ffffff',
        background2: '#f4f6f9',
        background3: '#eef0f3',
        surface: '#ffffff',
        surface2: '#fafbfc',
        foreground: '#1e1e2f',
        foregroundMuted: '#6b7280',
        border: '#d1d5db',
        muted: '#e5e7eb',
        mutedForeground: '#6b7280',
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
    },
    dim: {
        background: '#1c1e26',
        background2: '#181a21',
        background3: '#14161c',
        surface: '#23262f',
        surface2: '#2b2e38',
        foreground: '#e2e4ea',
        foregroundMuted: '#8a8d99',
        border: '#2e3240',
        muted: '#2e3240',
        mutedForeground: '#8a8d99',
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
    },
};

const accentPresets: Record<AccentPreset, { primary: string; gradient: string }> = {
    'emerald-teal': { primary: '#00c9a7', gradient: 'linear-gradient(135deg, #00c9a7, #6366f1)' },
    'electric-indigo': { primary: '#6366f1', gradient: 'linear-gradient(135deg, #6366f1, #00c9a7)' },
    'vivid-violet': { primary: '#8b5cf6', gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)' },
    'coral-flame': { primary: '#ef4444', gradient: 'linear-gradient(135deg, #ef4444, #f59e0b)' },
    'amber-glow': { primary: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b, #10b981)' },
    'sky-blue': { primary: '#3b82f6', gradient: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' },
    'rose-pink': { primary: '#ec4899', gradient: 'linear-gradient(135deg, #ec4899, #6366f1)' },
    'lime-zest': { primary: '#84cc16', gradient: 'linear-gradient(135deg, #84cc16, #06b6d4)' },
};

const cornerRadiusValues: Record<CornerRadius, string> = {
    sharp: '2px',
    subtle: '6px',
    rounded: '10px',
    pill: '20px',
};

const fontFamilies: Record<FontFamily, string> = {
    Inter: 'Inter',
    'DM Sans': 'DM Sans',
    Geist: 'Geist',
    'IBM Plex Mono': 'IBM Plex Mono',
    'Plus Jakarta Sans': 'Plus Jakarta Sans',
};

const fontUrls: Record<FontFamily, string> = {
    Inter: 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap',
    'DM Sans': 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@100;200;300;400;500;600;700;800;900&display=swap',
    Geist: 'https://fonts.googleapis.com/css2?family=Geist:wght@100;200;300;400;500;600;700;800;900&display=swap',
    'IBM Plex Mono': 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@100;200;300;400;500;600;700&display=swap',
    'Plus Jakarta Sans': 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap',
};

const layoutDensityStyles: Record<LayoutDensity, string> = {
    compact: '0.75',
    default: '1',
    spacious: '1.25',
};

const AppearanceTab: React.FC = () => {
    const { theme, updateTheme } = useTheme();

    const [themePreset, setThemePreset] = useState<ThemePreset>('dark');
    const [accentPreset, setAccentPreset] = useState<AccentPreset>('emerald-teal');
    const [customAccentColor, setCustomAccentColor] = useState('#00c9a7');
    const [fontFamily, setFontFamily] = useState<FontFamily>('Plus Jakarta Sans');
    const [layoutDensity, setLayoutDensity] = useState<LayoutDensity>('default');
    const [cornerRadius, setCornerRadius] = useState<CornerRadius>('rounded');
    const [sidebarStyle, setSidebarStyle] = useState<SidebarStyle>('full-labels');

    useEffect(() => {
        const saved = localStorage.getItem('appearance-settings');
        if (saved) {
            const settings = JSON.parse(saved);
            setThemePreset(settings.themePreset || 'dark');
            setAccentPreset(settings.accentPreset || 'emerald-teal');
            setCustomAccentColor(settings.customAccentColor || '#00c9a7');
            setFontFamily(settings.fontFamily || 'Plus Jakarta Sans');
            setLayoutDensity(settings.layoutDensity || 'default');
            setCornerRadius(settings.cornerRadius || 'rounded');
            setSidebarStyle(settings.sidebarStyle || 'full-labels');
            applyTheme(settings);
        } else {
            applyTheme({
                themePreset: 'dark',
                accentPreset: 'emerald-teal',
                customAccentColor: '#00c9a7',
                cornerRadius: 'rounded',
                fontFamily: 'Plus Jakarta Sans',
                layoutDensity: 'default',
                sidebarStyle: 'full-labels',
            });
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

    const applyTheme = (settings: {
        themePreset: ThemePreset;
        accentPreset: AccentPreset | 'custom';
        customAccentColor: string;
        fontFamily: FontFamily;
        layoutDensity: LayoutDensity;
        cornerRadius: CornerRadius;
        sidebarStyle: SidebarStyle;
    }) => {
        const accentColor = settings.accentPreset === 'custom'
            ? settings.customAccentColor
            : accentPresets[settings.accentPreset as AccentPreset].primary;
        const colors = themePresets[settings.themePreset as ThemePreset];

        updateTheme({
            // Base colors
            primary: accentColor,
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
            borderRadius: cornerRadiusValues[settings.cornerRadius as CornerRadius],
            fontBody: `${fontFamilies[settings.fontFamily as FontFamily]}, sans-serif`,
            fontHeadings: `${fontFamilies[settings.fontFamily as FontFamily]}, sans-serif`,
            layoutDensity: settings.layoutDensity,
            sidebarStyle: settings.sidebarStyle,
        });
    };

    const handleThemePresetChange = (preset: ThemePreset) => {
        setThemePreset(preset);
        const colors = themePresets[preset];
        const newSettings = { themePreset: preset, accentPreset, customAccentColor, fontFamily, layoutDensity, cornerRadius, sidebarStyle };
        applyTheme(newSettings);
    };

    const handleAccentChange = (preset: AccentPreset) => {
        setAccentPreset(preset);
        const newSettings = { themePreset, accentPreset: preset, customAccentColor, fontFamily, layoutDensity, cornerRadius, sidebarStyle };
        applyTheme(newSettings);
    };

    const handleCustomAccent = () => {
        const newSettings = { themePreset, accentPreset: 'custom' as any, customAccentColor, fontFamily, layoutDensity, cornerRadius, sidebarStyle };
        applyTheme(newSettings);
    };

    const handleFontChange = (font: FontFamily) => {
        setFontFamily(font);
        loadFont(font);
        const newSettings = { themePreset, accentPreset, customAccentColor, fontFamily: font, layoutDensity, cornerRadius, sidebarStyle };
        applyTheme(newSettings);
    };

    const handleCornerRadiusChange = (radius: CornerRadius) => {
        setCornerRadius(radius);
        const newSettings = { themePreset, accentPreset, customAccentColor, fontFamily, layoutDensity, cornerRadius: radius, sidebarStyle };
        applyTheme(newSettings);
    };

    const handleLayoutDensityChange = (density: LayoutDensity) => {
        setLayoutDensity(density);
        const newSettings = { themePreset, accentPreset, customAccentColor, fontFamily, layoutDensity: density, cornerRadius, sidebarStyle };
        applyTheme(newSettings);
    };

    const handleSidebarStyleChange = (style: SidebarStyle) => {
        setSidebarStyle(style);
        const newSettings = { themePreset, accentPreset, customAccentColor, fontFamily, layoutDensity, cornerRadius, sidebarStyle: style };
        applyTheme(newSettings);
    };

    const handleReset = () => {
        const defaultSettings = {
            themePreset: 'dark' as ThemePreset,
            accentPreset: 'emerald-teal' as AccentPreset,
            customAccentColor: '#00c9a7',
            fontFamily: 'Plus Jakarta Sans' as FontFamily,
            layoutDensity: 'default' as LayoutDensity,
            cornerRadius: 'rounded' as CornerRadius,
            sidebarStyle: 'full-labels' as SidebarStyle,
        };
        setThemePreset('dark');
        setAccentPreset('emerald-teal');
        setCustomAccentColor('#00c9a7');
        setFontFamily('Plus Jakarta Sans');
        setLayoutDensity('default');
        setCornerRadius('rounded');
        setSidebarStyle('full-labels');
        applyTheme(defaultSettings);
    };

    const handleApply = () => {
        const settings = { themePreset, accentPreset, customAccentColor, fontFamily, layoutDensity, cornerRadius, sidebarStyle };
        localStorage.setItem('appearance-settings', JSON.stringify(settings));
        applyTheme(settings);
        alert('Settings applied and saved');
    };

    return (
        <div className="flex flex-1 min-w-0">
            {/* Main content - no duplicate sidebar */}
            <div className="flex flex-col flex-1 min-w-0 px-10 py-8 gap-8 overflow-y-auto">
                <div>
                    <h2 className="text-lg font-bold text-foreground">Appearance</h2>
                    <p className="text-sm text-foreground-muted">Customize how FlowWork looks and feels — changes apply instantly across the app.</p>
                </div>

                {/* Theme Section */}
                <div className="rounded-xl border border-border bg-surface overflow-hidden">
                    <div className="px-6 py-4 border-b border-border bg-background-3 flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-bold text-foreground">Theme</h3>
                            <p className="text-xs text-foreground-muted mt-0.5">Choose your base color scheme</p>
                        </div>
                        <span className="text-xs font-semibold text-primary bg-teal-bg px-2.5 py-1 rounded-full">
                            {themePreset === 'dark' ? 'Dark — Active' : themePreset === 'midnight' ? 'Midnight' : themePreset === 'light' ? 'Light' : 'Dim'}
                        </span>
                    </div>
                    <div className="grid grid-cols-4 gap-4 p-6">
                        {(['dark', 'midnight', 'light', 'dim'] as ThemePreset[]).map((preset) => (
                            <button
                                key={preset}
                                onClick={() => handleThemePresetChange(preset)}
                                className={`flex flex-col gap-3 rounded-xl border-2 p-3 ${themePreset === preset ? 'border-primary' : 'border-border'}`}
                            >
                                <div className="w-full rounded-lg overflow-hidden border border-border" style={{ height: 64, background: themePresets[preset].background }}>
                                    <div className="flex h-full">
                                        <div className="flex flex-col gap-1 p-1.5" style={{ width: '30%', background: themePresets[preset].surface }}>
                                            <div className="h-1.5 rounded-full" style={{ background: themePresets[preset].border }} />
                                            <div className="h-1.5 rounded-full" style={{ background: themePresets[preset].border }} />
                                            <div className="h-1.5 rounded-full" style={{ background: themePresets[preset].border }} />
                                        </div>
                                        <div className="flex flex-col gap-1.5 p-2 flex-1">
                                            <div className="rounded p-1 flex gap-1" style={{ background: themePresets[preset].surface }}>
                                                <div className="w-1 h-4 rounded-full" style={{ background: '#00c9a7' }} />
                                                <div className="flex flex-col gap-0.5 justify-center">
                                                    <div className="h-1 rounded" style={{ background: themePresets[preset].border, width: 32 }} />
                                                    <div className="h-1 rounded" style={{ background: themePresets[preset].border, width: 20 }} />
                                                </div>
                                            </div>
                                            <div className="rounded p-1 flex gap-1" style={{ background: themePresets[preset].surface }}>
                                                <div className="w-1 h-4 rounded-full" style={{ background: '#00c9a7' }} />
                                                <div className="flex flex-col gap-0.5 justify-center">
                                                    <div className="h-1 rounded" style={{ background: themePresets[preset].border, width: 32 }} />
                                                    <div className="h-1 rounded" style={{ background: themePresets[preset].border, width: 20 }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-foreground capitalize">{preset}</span>
                                        <span className="text-xs text-foreground-muted">
                                            {preset === 'dark' ? 'Deep navy — default' : preset === 'midnight' ? 'Pure black OLED' : preset === 'light' ? 'Clean & bright' : 'Easy on eyes'}
                                        </span>
                                    </div>
                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${themePreset === preset ? 'border-primary bg-primary' : 'border-border'}`}>
                                        {themePreset === preset && <Icon name="check" size={9} />}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Accent Color */}
                <div className="rounded-xl border border-border bg-surface overflow-hidden">
                    <div className="px-6 py-4 border-b border-border bg-background-3">
                        <h3 className="text-sm font-bold text-foreground">Accent Color</h3>
                        <p className="text-xs text-foreground-muted mt-0.5">Sets the primary interactive color — buttons, links, active states, charts</p>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-4 gap-3">
                            {(Object.keys(accentPresets) as AccentPreset[]).map((preset) => (
                                <button
                                    key={preset}
                                    onClick={() => handleAccentChange(preset)}
                                    className={`flex flex-col gap-2.5 rounded-xl border-2 p-3.5 ${accentPreset === preset ? 'border-primary' : 'border-border'}`}
                                >
                                    <div className="w-full h-10 rounded-lg" style={{ background: accentPresets[preset].gradient }} />
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-semibold text-foreground capitalize">{preset.replace('-', ' ')}</span>
                                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${accentPreset === preset ? 'border-primary bg-primary' : 'border-border'}`}>
                                            {accentPreset === preset && <Icon name="check" size={9} />}
                                        </div>
                                    </div>
                                    <div className="flex gap-1">
                                        <div className="flex-1 h-1.5 rounded-full" style={{ background: accentPresets[preset].gradient.split(',')[0].split('(')[1] }} />
                                        <div className="flex-1 h-1.5 rounded-full" style={{ background: accentPresets[preset].gradient.split(',')[1].split(')')[0] }} />
                                    </div>
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-4 rounded-xl border border-dashed border-border p-4 mt-4">
                            <div className="w-10 h-10 rounded-lg" style={{ background: customAccentColor }} />
                            <div className="flex flex-col gap-1 flex-1">
                                <span className="text-xs font-bold text-foreground">Custom Color</span>
                                <span className="text-xs text-foreground-muted">Enter a custom hex value for the primary accent</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-2 rounded-lg border border-border bg-input px-3 py-2">
                                    <input type="color" value={customAccentColor} onChange={(e) => setCustomAccentColor(e.target.value)} className="w-4 h-4 p-0 border-0 bg-transparent cursor-pointer" />
                                    <span className="text-sm font-mono text-foreground">{customAccentColor}</span>
                                </div>
                                <button onClick={handleCustomAccent} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold">
                                    <Icon name="check" size={13} /> Apply
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Font Family */}
                <div className="rounded-xl border border-border bg-surface overflow-hidden">
                    <div className="px-6 py-4 border-b border-border bg-background-3">
                        <h3 className="text-sm font-bold text-foreground">Font Family</h3>
                        <p className="text-xs text-foreground-muted mt-0.5">Sets the typeface for all UI text</p>
                    </div>
                    <div className="grid grid-cols-4 gap-4 p-6">
                        {(Object.keys(fontFamilies) as FontFamily[]).map((font) => (
                            <button
                                key={font}
                                onClick={() => handleFontChange(font)}
                                className={`flex flex-col gap-3 rounded-xl border-2 p-4 ${fontFamily === font ? 'border-primary bg-teal-bg' : 'border-border'}`}
                            >
                                <span className="text-2xl font-bold text-foreground" style={{ fontFamily: fontFamilies[font] }}>Aa</span>
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-sm font-bold text-foreground">{font}</span>
                                    <span className="text-xs text-foreground-muted" style={{ fontFamily: fontFamilies[font] }}>The quick brown fox</span>
                                </div>
                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center self-end ${fontFamily === font ? 'border-primary bg-primary' : 'border-border'}`}>
                                    {fontFamily === font && <Icon name="check" size={9} />}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Layout Density & Corner Radius (grid) */}
                <div className="grid grid-cols-2 gap-6">
                    <div className="rounded-xl border border-border bg-surface overflow-hidden">
                        <div className="px-6 py-4 border-b border-border bg-background-3">
                            <h3 className="text-sm font-bold text-foreground">Layout Density</h3>
                            <p className="text-xs text-foreground-muted mt-0.5">Controls padding and spacing throughout the UI</p>
                        </div>
                        <div className="flex flex-col gap-2 p-4">
                            {(['compact', 'default', 'spacious'] as LayoutDensity[]).map((density) => (
                                <button
                                    key={density}
                                    onClick={() => handleLayoutDensityChange(density)}
                                    className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 ${layoutDensity === density ? 'border-primary bg-teal-bg' : 'border-border'}`}
                                >
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${layoutDensity === density ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground-muted'}`}>
                                        <Icon name={density === 'compact' ? 'align-justify' : density === 'default' ? 'menu' : 'layout-list'} size={15} />
                                    </div>
                                    <div className="flex flex-col text-left flex-1">
                                        <span className="text-sm font-bold text-foreground capitalize">{density}</span>
                                        <span className="text-xs text-foreground-muted">
                                            {density === 'compact' ? 'More content, less whitespace' : density === 'default' ? 'Balanced spacing' : 'Relaxed, airy layout'}
                                        </span>
                                    </div>
                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${layoutDensity === density ? 'border-primary bg-primary' : 'border-border'}`}>
                                        {layoutDensity === density && <Icon name="check" size={9} />}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-xl border border-border bg-surface overflow-hidden">
                        <div className="px-6 py-4 border-b border-border bg-background-3">
                            <h3 className="text-sm font-bold text-foreground">Corner Radius</h3>
                            <p className="text-xs text-foreground-muted mt-0.5">Applies to cards, buttons, inputs and modals</p>
                        </div>
                        <div className="flex flex-col gap-2 p-4">
                            {(['sharp', 'subtle', 'rounded', 'pill'] as CornerRadius[]).map((radius) => (
                                <button
                                    key={radius}
                                    onClick={() => handleCornerRadiusChange(radius)}
                                    className={`flex items-center gap-4 rounded-xl border-2 px-4 py-3 ${cornerRadius === radius ? 'border-primary bg-teal-bg' : 'border-border'}`}
                                >
                                    <div className="w-8 h-8 flex-shrink-0 border-2 border-foreground-muted" style={{ borderRadius: cornerRadiusValues[radius] }} />
                                    <div className="flex flex-col text-left flex-1">
                                        <span className="text-sm font-bold text-foreground capitalize">{radius}</span>
                                        <span className="text-xs text-foreground-muted font-mono">{cornerRadiusValues[radius]}</span>
                                    </div>
                                    <div className="flex gap-1.5 items-center">
                                        <div className="w-10 h-3 bg-primary opacity-50" style={{ borderRadius: cornerRadiusValues[radius] }} />
                                        <div className="w-6 h-3 bg-primary opacity-50" style={{ borderRadius: cornerRadiusValues[radius] }} />
                                        <div className="w-8 h-3 bg-primary opacity-50" style={{ borderRadius: cornerRadiusValues[radius] }} />
                                    </div>
                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${cornerRadius === radius ? 'border-primary bg-primary' : 'border-border'}`}>
                                        {cornerRadius === radius && <Icon name="check" size={9} />}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Style */}
                <div className="rounded-xl border border-border bg-surface overflow-hidden">
                    <div className="px-6 py-4 border-b border-border bg-background-3">
                        <h3 className="text-sm font-bold text-foreground">Sidebar Style</h3>
                        <p className="text-xs text-foreground-muted mt-0.5">Choose how the navigation sidebar is displayed</p>
                    </div>
                    <div className="flex gap-4 p-6">
                        {(['full-labels', 'icon-only', 'floating-rail'] as SidebarStyle[]).map((style) => (
                            <button
                                key={style}
                                onClick={() => handleSidebarStyleChange(style)}
                                className={`flex flex-col items-center gap-3 rounded-xl border-2 px-6 py-5 flex-1 ${sidebarStyle === style ? 'border-primary bg-teal-bg' : 'border-border'}`}
                            >
                                <div className="flex rounded-lg overflow-hidden border border-border" style={{ height: 60, width: 80, background: themePresets[themePreset].background2 }}>
                                    <div className="flex flex-col gap-1.5 p-2" style={{ width: style === 'icon-only' ? 24 : '50%', background: themePresets[themePreset].surface }}>
                                        <div className="flex items-center gap-1">
                                            <div className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: theme.primary }} />
                                            {(style === 'full-labels' || style === 'floating-rail') && <div className="h-1 rounded flex-1" style={{ background: theme.primary }} />}
                                        </div>
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="flex items-center gap-1">
                                                <div className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: '#2a3347' }} />
                                                {(style === 'full-labels' || style === 'floating-rail') && <div className="h-1 rounded flex-1" style={{ background: '#2a3347' }} />}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex-1 p-1.5 flex flex-col gap-1">
                                        <div className="h-1.5 rounded" style={{ background: '#2a3347' }} />
                                        <div className="h-1.5 rounded" style={{ background: '#2a3347' }} />
                                        <div className="h-1.5 rounded" style={{ background: '#2a3347' }} />
                                    </div>
                                </div>
                                <div className="flex flex-col items-center gap-0.5">
                                    <span className="text-xs font-bold text-foreground">{style === 'full-labels' ? 'Full Labels' : style === 'icon-only' ? 'Icon Only' : 'Floating Rail'}</span>
                                    <span className="text-xs text-foreground-muted">
                                        {style === 'full-labels' ? 'Icon + text' : style === 'icon-only' ? 'Compact sidebar' : 'Minimal hover bar'}
                                    </span>
                                </div>
                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${sidebarStyle === style ? 'border-primary bg-primary' : 'border-border'}`}>
                                    {sidebarStyle === style && <Icon name="check" size={9} />}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Live Preview */}
                <div className="rounded-xl border border-border bg-surface overflow-hidden">
                    <div className="px-6 py-4 border-b border-border bg-background-3 flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-bold text-foreground">Live Preview</h3>
                            <p className="text-xs text-foreground-muted mt-0.5">See how your theme looks before saving</p>
                        </div>
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-success bg-success-bg px-2.5 py-1 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-success"></span> Auto-updating
                        </span>
                    </div>
                    <div className="p-6">
                        <div className="rounded-xl border border-border overflow-hidden" style={{ background: theme.background }}>
                            {/* Preview header */}
                            <div className="flex items-center gap-3 px-4 py-3 border-b border-border" style={{ background: themePresets[themePreset].surface }}>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-danger opacity-70" />
                                    <div className="w-3 h-3 rounded-full bg-warning opacity-70" />
                                    <div className="w-3 h-3 rounded-full bg-success opacity-70" />
                                </div>
                                <div className="flex items-center gap-2 ml-2">
                                    <div className="w-4 h-4 rounded flex items-center justify-center" style={{ background: theme.primary }}>
                                        <Icon name="zap" size={9} className="text-primary-foreground" />
                                    </div>
                                    <span className="text-xs font-bold text-foreground">FlowWork</span>
                                </div>
                                <div className="ml-auto flex items-center gap-2">
                                    <div className="h-5 rounded-lg px-3 flex items-center text-xs text-foreground-muted" style={{ background: theme.surface, border: `1px solid ${themePresets[themePreset].border}` }}>
                                        Search...
                                    </div>
                                    <div className="h-6 rounded-lg px-2 flex items-center text-xs font-bold" style={{ background: theme.primary, color: '#0f1117' }}>
                                        + Task
                                    </div>
                                </div>
                            </div>
                            {/* Preview body */}
                            <div className="flex" style={{ height: 200 }}>
                                <div className="flex flex-col gap-1.5 p-2 border-r border-border" style={{ width: sidebarStyle === 'icon-only' ? 60 : 100, background: themePresets[themePreset].surface }}>
                                    {['Dashboard', 'My Tasks', 'Tracker', 'Calendar'].map((item, idx) => (
                                        <div key={idx} className={`flex items-center gap-1.5 px-2 py-1.5 rounded text-xs ${idx === 2 ? 'bg-teal-bg text-primary' : 'text-foreground-muted'}`}>
                                            <Icon name={idx === 0 ? 'layout-dashboard' : idx === 1 ? 'check-square' : idx === 2 ? 'timer' : 'calendar'} size={10} />
                                            {(sidebarStyle !== 'icon-only') && <span style={{ fontSize: 9 }}>{item}</span>}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex-1 p-3 flex flex-col gap-2">
                                    <div className="flex gap-2">
                                        {[theme.primary, '#8b5cf6', '#f59e0b'].map((color, i) => (
                                            <div key={i} className="flex-1 rounded-lg p-2" style={{ background: theme.surface, border: `1px solid ${themePresets[themePreset].border}` }}>
                                                <div className="w-5 h-5 rounded mb-1" style={{ background: `${color}20` }} />
                                                <div className="h-3 rounded" style={{ background: color, width: '60%' }} />
                                                <div className="h-2 rounded mt-1" style={{ background: themePresets[themePreset].border, width: '40%' }} />
                                            </div>
                                        ))}
                                    </div>
                                    {[1, 2].map((i) => (
                                        <div key={i} className="flex items-center gap-2 rounded-lg p-2" style={{ background: theme.surface, border: `1px solid ${themePresets[themePreset].border}` }}>
                                            <div className="w-1 h-8 rounded-full" style={{ background: i === 1 ? theme.primary : '#8b5cf6' }} />
                                            <div className="flex flex-col gap-1 flex-1">
                                                <div className="h-2 rounded" style={{ background: themePresets[themePreset].border, width: '70%' }} />
                                                <div className="h-1.5 rounded" style={{ background: themePresets[themePreset].border, width: '40%' }} />
                                            </div>
                                            <div className="h-5 w-12 rounded-full" style={{ background: `${theme.primary}30` }} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-6 pb-6 flex flex-col gap-4">
                        <h4 className="text-xs font-bold text-foreground-muted uppercase tracking-wide">Component Samples</h4>
                        <div className="flex flex-wrap gap-3 items-center">
                            <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold">Primary Button</button>
                            <button className="px-4 py-2 rounded-lg border border-border bg-surface text-sm font-semibold text-foreground">Secondary</button>
                            <button className="px-4 py-2 rounded-lg bg-danger-bg text-danger text-sm font-semibold">Danger</button>
                            <span className="flex items-center gap-1.5 text-xs font-semibold bg-teal-bg text-primary px-3 py-1.5 rounded-full">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> In Progress
                            </span>
                            <span className="text-xs font-semibold bg-success-bg text-success px-3 py-1.5 rounded-full">Done</span>
                            <span className="text-xs font-semibold bg-warning-bg text-warning px-3 py-1.5 rounded-full">Paused</span>
                            <div className="flex items-center gap-2 rounded-lg border border-primary bg-teal-bg px-3 py-2">
                                <Icon name="timer" size={14} /> <span className="font-mono text-sm font-bold text-primary">02:34:17</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 rounded-xl border border-border bg-background-2 px-5 py-4">
                            <div className="w-1 h-10 rounded-full bg-purple flex-shrink-0" />
                            <div className="flex flex-col gap-1 flex-1">
                                <span className="text-sm font-bold text-foreground">Design new onboarding flow</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-foreground-muted">Design</span>
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-purple-bg text-purple font-semibold">UI/UX</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-1.5 w-24 rounded-full bg-muted overflow-hidden">
                                    <div className="h-full rounded-full bg-primary" style={{ width: '65%' }} />
                                </div>
                                <span className="text-xs font-bold text-primary">65%</span>
                                <div className="flex items-center gap-1 bg-teal-bg text-primary rounded-lg px-2 py-1 font-mono text-xs font-bold">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>02:34
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sticky footer action buttons */}
                <div className="flex items-center justify-between rounded-xl border border-border bg-surface-2 px-6 py-4 sticky bottom-0">
                    <div className="flex items-center gap-2 text-sm text-foreground-muted">
                        <Icon name="info" size={15} />
                        <span>Changes are previewed live and saved when you click "Apply".</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-sm font-semibold text-foreground-muted">
                            <Icon name="rotate-ccw" size={14} /> Reset to Default
                        </button>
                        <button onClick={handleApply} className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-bold">
                            <Icon name="check" size={15} /> Apply Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppearanceTab;
