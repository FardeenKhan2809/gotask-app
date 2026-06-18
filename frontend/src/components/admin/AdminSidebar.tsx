// src/components/admin/AdminSidebar.tsx
import React from 'react';
import Icon from '../ui/Icon';

const AdminSidebar: React.FC = () => {
    return (
        <div className="flex flex-col bg-background-2 border-r border-border w-[220px] min-h-full flex-shrink-0">
            <div className="flex items-center gap-3 px-5 py-5 border-b border-border">
                <div className="flex items-center justify-center rounded-lg bg-primary w-8 h-8">
                    <Icon name="zap" size={16} className="text-primary-foreground" />
                </div>
                <div className="flex flex-col">
                    <span className="font-headings font-bold text-base text-foreground tracking-tight">FlowWork</span>
                    <span className="text-xs font-semibold text-primary">Admin Portal</span>
                </div>
            </div>

            <div className="mx-3 mt-4 mb-2 flex items-center gap-2 rounded-lg bg-surface px-3 py-2 border border-border">
                <div className="rounded bg-primary flex items-center justify-center w-[18px] h-[18px]">
                    <Icon name="building-2" size={11} />
                </div>
                <span className="text-xs text-foreground-muted font-body flex-1">Acme Corp</span>
                <Icon name="chevrons-up-down" size={12} />
            </div>

            <nav className="flex flex-col gap-1 px-3 mt-2 flex-1">
                <span className="text-xs font-bold text-foreground-muted uppercase tracking-widest px-3 py-1.5 mt-1">Management</span>
                <NavItem to="/admin" icon="layout-dashboard" label="Overview" active />
                <NavItem to="/admin/employees" icon="users" label="Employees" badge="7" />
                <NavItem to="/admin/tasks" icon="check-square" label="All Tasks" badge="142" />
                <NavItem to="/admin/time-logs" icon="timer" label="Time Logs" />
                <NavItem to="/admin/reports" icon="bar-chart-2" label="Reports" />
                <NavItem to="/admin/projects" icon="folder" label="Projects" />
                <NavItem to="/admin/schedule" icon="calendar" label="Schedule" />
                <span className="text-xs font-bold text-foreground-muted uppercase tracking-widest px-3 py-1.5 mt-3">Admin</span>
                <NavItem to="/admin/approvals" icon="shield" label="Approvals" badge="5" badgeColor="danger" />
                <NavItem to="/admin/notifications" icon="bell" label="Notifications" badge="9" badgeColor="danger" />
                <NavItem to="/admin/settings" icon="settings" label="Settings" />
            </nav>

            <div className="flex items-center gap-3 px-4 py-4 border-t border-border">
                <div className="relative">
                    <img
                        src="https://storage.googleapis.com/banani-avatars/avatar/female/35-50/East Asian/3"
                        className="w-8 h-8 rounded-full"
                        alt="Admin"
                    />
                    <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-success border-2 border-background-2" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">Aiko Tanaka</div>
                    <div className="flex items-center gap-1">
                        <span className="text-xs text-primary font-semibold">Admin</span>
                    </div>
                </div>
                <Icon name="log-out" size={14} />
            </div>
        </div>
    );
};

const NavItem: React.FC<{
    to: string;
    icon: string;
    label: string;
    badge?: string;
    badgeColor?: 'muted' | 'danger';
    active?: boolean;
}> = ({ to, icon, label, badge, badgeColor = 'muted', active }) => (
    <a
        href={to}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg font-body text-sm font-medium ${active ? 'bg-teal-bg text-primary' : 'text-foreground-muted hover:bg-surface/50'
            }`}
    >
        <Icon name={icon} size={15} />
        <span className="flex-1">{label}</span>
        {badge && (
            <span
                className={`text-xs rounded-full px-1.5 py-0.5 font-bold ${badgeColor === 'danger' ? 'bg-danger text-foreground' : 'bg-muted text-muted-foreground'
                    }`}
            >
                {badge}
            </span>
        )}
    </a>
);

export default AdminSidebar;