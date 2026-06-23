import React from 'react';

const KeyboardShortcutsTab: React.FC = () => {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-1">
                <h2 className="text-lg font-bold text-foreground">Keyboard Shortcuts</h2>
                <p className="text-sm text-foreground-muted">Speed up your workflow with these shortcuts</p>
            </div>
            <div className="rounded-xl border border-border bg-surface overflow-hidden">
                <table className="w-full">
                    <thead className="bg-background-3 border-b border-border">
                        <tr>
                            <th className="text-left px-6 py-3 text-xs font-bold text-foreground-muted">Action</th>
                            <th className="text-left px-6 py-3 text-xs font-bold text-foreground-muted">Shortcut</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-border"><td className="px-6 py-3 text-sm text-foreground">Start / Pause timer</td><td className="px-6 py-3 text-sm font-mono text-foreground-muted">Space</td></tr>
                        <tr className="border-b border-border"><td className="px-6 py-3 text-sm text-foreground">Stop timer</td><td className="px-6 py-3 text-sm font-mono text-foreground-muted">S</td></tr>
                        <tr className="border-b border-border"><td className="px-6 py-3 text-sm text-foreground">New task</td><td className="px-6 py-3 text-sm font-mono text-foreground-muted">N</td></tr>
                        <tr className="border-b border-border"><td className="px-6 py-3 text-sm text-foreground">Log time manually</td><td className="px-6 py-3 text-sm font-mono text-foreground-muted">L</td></tr>
                        <tr><td className="px-6 py-3 text-sm text-foreground">Open command palette</td><td className="px-6 py-3 text-sm font-mono text-foreground-muted">⌘K</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default KeyboardShortcutsTab;