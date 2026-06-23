import React from 'react';

const NotificationsTab: React.FC = () => {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-1">
                <h2 className="text-lg font-bold text-foreground">Notifications</h2>
                <p className="text-sm text-foreground-muted">Configure how you receive alerts</p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-6">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-semibold text-foreground">Email notifications</p>
                            <p className="text-xs text-foreground-muted">Receive updates about your tasks and team activity</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-semibold text-foreground">Push notifications</p>
                            <p className="text-xs text-foreground-muted">Real-time alerts on desktop</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-semibold text-foreground">Slack integration</p>
                            <p className="text-xs text-foreground-muted">Send notifications to your Slack workspace</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                        </label>
                    </div>
                    <button className="w-fit px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold mt-2">Save Preferences</button>
                </div>
            </div>
        </div>
    );
};

export default NotificationsTab;