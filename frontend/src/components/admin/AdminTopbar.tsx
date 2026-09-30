import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '@/components/ui/Icon';
import NotificationDropdown from '@/components/ui/NotificationDropdown';

interface AdminTopbarProps {
    title?: string;
    subtitle?: string;
    tag?: string;
    onToggleActivity?: () => void;
}

const routeHeaders: Record<string, { title: string; subtitle: string; tag: string }> = {
    '/admin': {
        title: 'Good morning, Aiko 👋',
        subtitle: "Here's your team overview for today",
        tag: 'Admin',
    },
    '/admin/salary': {
        title: 'Salary Management',
        subtitle: 'Manage payroll, allowances, bonuses and payment status',
        tag: 'Payroll',
    },
    '/salary': {
        title: 'Salary Management',
        subtitle: 'Manage payroll, allowances, bonuses and payment status',
        tag: 'Payroll',
    },
    '/employee': {
        title: 'Employee Directory',
        subtitle: 'Manage team members, roles and access control',
        tag: 'HR',
    },
    '/admin/employee': {
        title: 'Employee Directory',
        subtitle: 'Manage team members, roles and access control',
        tag: 'HR',
    },
    '/add-employee': {
        title: 'Add New Employee',
        subtitle: 'Onboard a new team member with compensation and credentials',
        tag: 'HR',
    },
    '/admin/add-employee': {
        title: 'Add New Employee',
        subtitle: 'Onboard a new team member with compensation and credentials',
        tag: 'HR',
    },
    '/approvals': {
        title: 'Approvals & Requests',
        subtitle: 'Review and approve pending team requests',
        tag: 'Approvals',
    },
    '/admin/approvals': {
        title: 'Approvals & Requests',
        subtitle: 'Review and approve pending team requests',
        tag: 'Approvals',
    },
};

const AdminTopbar: React.FC<AdminTopbarProps> = ({
    title,
    subtitle,
    tag,
    onToggleActivity,
}) => {
    const [showNotifications, setShowNotifications] = useState(false);
    const location = useLocation();

    const activeHeader = routeHeaders[location.pathname] || {
        title: title || 'Good morning, Aiko 👋',
        subtitle: subtitle || "Here's your team overview for today",
        tag: tag || 'Admin',
    };

    const displayTitle = title || activeHeader.title;
    const displaySubtitle = subtitle || activeHeader.subtitle;
    const displayTag = tag || activeHeader.tag;

    return (
        <div className="flex items-center gap-4 px-8 py-4 border-b border-border bg-background-2 min-h-[64px] relative">
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-foreground-muted uppercase tracking-widest">{displayTag}</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                </div>
                <h1 className="font-headings font-bold text-xl text-foreground">{displayTitle}</h1>
                <p className="text-xs text-foreground-muted">{displaySubtitle}</p>
            </div>
            <button className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground-muted font-body">
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
                        <NotificationDropdown onClose={() => setShowNotifications(false)} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminTopbar;