import React from 'react';

const WorkspaceTab: React.FC = () => {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-1">
                <h2 className="text-lg font-bold text-foreground">Workspace</h2>
                <p className="text-sm text-foreground-muted">Manage your team and workspace settings</p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-6">
                <div className="flex flex-col gap-4">
                    <div>
                        <label className="text-xs font-semibold text-foreground">Workspace Name</label>
                        <input type="text" defaultValue="Acme Corp" className="w-full mt-1 rounded-lg border border-border bg-background-2 px-4 py-2 text-foreground" />
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-foreground">Workspace URL</label>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-foreground-muted">https://app.flowwork.com/</span>
                            <input type="text" defaultValue="acme" className="flex-1 rounded-lg border border-border bg-background-2 px-4 py-2 text-foreground" />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-foreground">Default Timezone</label>
                        <select className="w-full mt-1 rounded-lg border border-border bg-background-2 px-4 py-2 text-foreground">
                            <option>America/New_York (EST)</option>
                            <option>America/Los_Angeles (PST)</option>
                            <option selected>Asia/Kolkata (IST)</option>
                            <option>Europe/London (GMT)</option>
                        </select>
                    </div>
                    <button className="w-fit px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold">Save Workspace Settings</button>
                </div>
            </div>
        </div>
    );
};

export default WorkspaceTab;