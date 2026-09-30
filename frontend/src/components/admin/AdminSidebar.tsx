import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon, { type IconName } from '@/components/ui/Icon';

const AdminSidebar: React.FC = () => {
    return (
        <div className="sidebar sticky top-0 flex flex-col bg-background-2 border-r border-border w-[220px] h-screen overflow-y-auto flex-shrink-0">
            <div className="flex items-center gap-3 px-5 py-5 border-b border-border">
                <div className="flex items-center justify-center rounded-lg bg-primary w-8 h-8 text-primary-foreground flex-shrink-0">
                    <Icon name="zap" size={16} />
                </div>
                <div className="flex flex-col sidebar-logo-text">
                    <span className="font-headings font-bold text-base text-foreground tracking-tight">FlowWork</span>
                    <span className="text-xs font-semibold text-primary">Admin Portal</span>
                </div>
            </div>

            <div className="mx-3 mt-4 mb-2 flex items-center gap-2 rounded-lg bg-surface px-3 py-2 border border-border sidebar-hide-compact">
                <div className="rounded bg-primary flex items-center justify-center w-[18px] h-[18px] text-primary-foreground flex-shrink-0">
                    <Icon name="building-2" size={11} />
                </div>
                <span className="text-xs text-foreground-muted font-body flex-1 truncate">Acme Corp</span>
                <Icon name="chevrons-up-down" size={12} />
            </div>

            <nav className="flex flex-col gap-1 px-3 mt-2 flex-1">
                <span className="text-xs font-bold text-foreground-muted uppercase tracking-widest px-3 py-1.5 mt-1">Management</span>
                <NavItem to="/admin" icon="layout-dashboard" label="Overview" end />
                <NavItem to="/admin/employee" icon="users" label="Employees" badge="7" />
                <NavItem to="/admin/salary" icon="banknote" label="Salary" />
                <NavItem to="/my-tasks" icon="check-square" label="All Tasks" badge="142" />
                <NavItem to="/time-tracker" icon="timer" label="Time Logs" />
                <NavItem to="/reports" icon="bar-chart-2" label="Reports" />
                <NavItem to="/projects" icon="folder" label="Projects" />
                <NavItem to="/calendar" icon="calendar" label="Schedule" />
                <span className="text-xs font-bold text-foreground-muted uppercase tracking-widest px-3 py-1.5 mt-3">Admin</span>
                <NavItem to="/admin/approvals" icon="shield" label="Approvals" badge="5" badgeColor="danger" />
                <NavItem to="/notifications" icon="bell" label="Notifications" badge="9" badgeColor="danger" />
                <NavItem to="/settings" icon="settings" label="Settings" />
            </nav>

            <div className="flex items-center gap-3 px-4 py-4 border-t border-border mt-auto">
                <div className="relative flex-shrink-0">
                    <img
                        src="https://storage.googleapis.com/banani-avatars/avatar/female/35-50/East Asian/3"
                        className="w-8 h-8 rounded-full"
                        alt="Admin"
                    />
                    <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-success border-2 border-background-2" />
                </div>
                <div className="flex-1 min-w-0 sidebar-hide-compact">
                    <div className="text-sm font-medium text-foreground truncate">Aiko Tanaka</div>
                    <div className="flex items-center gap-1">
                        <span className="text-xs text-primary font-semibold">Admin</span>
                    </div>
                </div>
                <div className="sidebar-hide-compact">
                    <Icon name="log-out" size={14} />
                </div>
            </div>
        </div>
    );
};

const NavItem: React.FC<{
    to: string;
    icon: IconName | (string & {});
    label: string;
    badge?: string;
    badgeColor?: 'muted' | 'danger';
    end?: boolean;
}> = ({ to, icon, label, badge, badgeColor = 'muted', end }) => (
    <NavLink
        to={to}
        end={end}
        className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg font-body text-sm font-medium transition-colors ${
                isActive ? 'bg-teal-bg text-primary' : 'text-foreground-muted hover:bg-surface/50'
            }`
        }
    >
        <Icon name={icon} size={15} />
        <span className="flex-1 nav-label">{label}</span>
        {badge && (
            <span
                className={`text-xs rounded-full px-1.5 py-0.5 font-bold sidebar-hide-compact ${
                    badgeColor === 'danger' ? 'bg-danger text-foreground' : 'bg-muted text-muted-foreground'
                }`}
            >
                {badge}
            </span>
        )}
    </NavLink>
);

export default AdminSidebar;