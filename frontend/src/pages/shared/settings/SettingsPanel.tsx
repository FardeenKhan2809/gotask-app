import React from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { motion } from 'framer-motion';

const SettingsPanel: React.FC = () => {
    const { theme, updateTheme } = useTheme();

    return (
        <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed right-0 top-0 h-full w-80 bg-surface border-l border-border p-6 shadow-xl z-50"
        >
            <h2 className="text-xl font-bold mb-6">Appearance</h2>

            <div className="space-y-5">
                <div>
                    <label className="block text-sm font-medium mb-2">Primary Color</label>
                    <input
                        type="color"
                        value={theme.primary}
                        onChange={(e) => updateTheme({ primary: e.target.value })}
                        className="w-full h-10 rounded cursor-pointer"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Background Color</label>
                    <input
                        type="color"
                        value={theme.background}
                        onChange={(e) => updateTheme({ background: e.target.value })}
                        className="w-full h-10 rounded cursor-pointer"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Surface Color</label>
                    <input
                        type="color"
                        value={theme.surface}
                        onChange={(e) => updateTheme({ surface: e.target.value })}
                        className="w-full h-10 rounded cursor-pointer"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Border Radius: {parseInt(theme.borderRadius)}px
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="32"
                        value={parseInt(theme.borderRadius)}
                        onChange={(e) => updateTheme({ borderRadius: `${e.target.value}px` })}
                        className="w-full"
                    />
                </div>

                <button
                    onClick={() => updateTheme({ primary: '#00c9a7', background: '#0f1117', surface: '#1a2030', borderRadius: '0.5rem' })}
                    className="mt-4 w-full py-2 bg-primary text-primary-foreground rounded-lg font-semibold"
                >
                    Reset to Default
                </button>
            </div>
        </motion.div>
    );
};

export default SettingsPanel;