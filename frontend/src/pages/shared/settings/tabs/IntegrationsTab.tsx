import React from 'react';

const IntegrationsTab: React.FC = () => {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-1">
                <h2 className="text-lg font-bold text-foreground">Integrations</h2>
                <p className="text-sm text-foreground-muted">Connect your favorite tools</p>
            </div>
            <div className="rounded-xl border border-border bg-surface overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">⚡</div>
                        <div>
                            <p className="font-semibold text-foreground">Slack</p>
                            <p className="text-xs text-foreground-muted">Send notifications to your Slack workspace</p>
                        </div>
                    </div>
                    <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold">Connect</button>
                </div>
                <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">📊</div>
                        <div>
                            <p className="font-semibold text-foreground">Google Calendar</p>
                            <p className="text-xs text-foreground-muted">Sync your tasks with calendar events</p>
                        </div>
                    </div>
                    <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold">Connect</button>
                </div>
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">💾</div>
                        <div>
                            <p className="font-semibold text-foreground">GitHub</p>
                            <p className="text-xs text-foreground-muted">Link commits and PRs to tasks</p>
                        </div>
                    </div>
                    <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold">Connect</button>
                </div>
            </div>
        </div>
    );
};

export default IntegrationsTab;