import React, { useState } from 'react';
import Icon from '../ui/Icon';
import NotificationDropdown from '../ui/NotificationDropdown';

interface AdminTopbarProps {
    onToggleActivity: () => void;
}

const AdminTopbar: React.FC<AdminTopbarProps> = ({ onToggleActivity }) => {
    const [showNotifications, setShowNotifications] = useState(false);

    return (
        <div className="flex items-center gap-4 px-8 py-4 border-b border-border bg-background-2 min-h-[64px] relative">
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-foreground-muted uppercase tracking-widest">Admin</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                </div>
                <h1 className="font-headings font-bold text-xl text-foreground">Good morning, Aiko 👋</h1>
                <p className="text-xs text-foreground-muted">Here's your team overview for today</p>
            </div>
            <button className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground-muted font-body w-[220px]">
                <Icon name="search" size={14} />
                <span className="flex-1 text-left">Search employees, tasks...</span>
                <span className="flex items-center gap-1 rounded bg-muted px-1.5 py-0.5 text-xs text-foreground-muted">⌘K</span>
            </button>
            <button className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground-muted">
                <Icon name="calendar" size={14} />
                <span className="text-xs font-semibold">Jul 18, 2024</span>
                <Icon name="chevron-down" size={12} />
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-surface border border-border px-3 py-2 text-xs font-semibold text-foreground-muted">
                <Icon name="download" size={14} /> Export
            </button>
            <div className="relative">
                <button
                    onClick={onToggleActivity}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold border border-border bg-surface text-foreground-muted hover:bg-surface-2 transition"
                >
                    <Icon name="activity" size={14} /> Activity
                </button>
            </div>
            <div className="relative">
                <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative flex items-center justify-center w-9 h-9 rounded-lg border bg-teal-bg border-primary text-foreground-muted"
                >
                    <Icon name="bell" size={16} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger border border-background-2" />
                </button>
                {showNotifications && (
                    <div className="absolute right-0 top-12 z-50">
                        <NotificationDropdown />
                    </div>
                )}
            </div>
            <div className="flex items-center gap-2 pl-2 border-l border-border">
                <div className="relative">
                    <img
                        src="https://storage.googleapis.com/banani-avatars/avatar/female/35-50/East Asian/3"
                        className="w-8 h-8 rounded-full"
                        alt="admin"
                    />
                    <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-success border border-background-2" />
                </div>
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-foreground">Aiko Tanaka</span>
                    <span className="text-xs text-foreground-muted">Admin</span>
                </div>
                <Icon name="chevron-down" size={13} />
            </div>
        </div>
    );
};

export default AdminTopbar;