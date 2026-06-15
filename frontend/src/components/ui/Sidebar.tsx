import React from 'react';
import Icon from './Icon';
import { motion } from 'framer-motion';

interface NavItemProps {
    icon: any;
    label: string;
    badge?: string;
    dot?: boolean;
    active?: boolean;
    badgeColor?: 'muted' | 'danger';
    onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, badge, dot, active, badgeColor = 'muted', onClick }) => (
    <motion.a
        whileHover={{ x: 4 }}
        transition={{ type: 'spring', stiffness: 300 }}
        onClick={onClick}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg font-body text-sm font-medium cursor-pointer ${active ? 'bg-teal-bg text-primary' : 'text-foreground-muted hover:bg-surface/50'
            }`}
    >
        <Icon name={icon} size={16} />
        <span className="flex-1">{label}</span>
        {badge && (
            <span
                className={`text-xs rounded-full px-1.5 py-0.5 font-bold ${badgeColor === 'danger' ? 'bg-danger text-foreground' : 'bg-muted text-muted-foreground'
                    }`}
            >
                {badge}
            </span>
        )}
        {dot && <span className="w-2 h-2 rounded-full bg-success"></span>}
    </motion.a>
);

const Sidebar: React.FC = () => {
    return (
        <div className="flex flex-col bg-background-2 border-r border-border w-[220px] min-h-full">
            <div className="flex items-center gap-3 px-5 py-5 border-b border-border">
                <div className="flex items-center justify-center rounded-lg bg-primary w-8 h-8 text-primary-foreground">
                    <Icon name="zap" size={16} />
                </div>
                <span className="font-headings font-bold text-base text-foreground tracking-tight">FlowWork</span>
            </div>

            <div className="mx-3 mt-4 mb-2 flex items-center gap-2 rounded-lg bg-surface px-3 py-2 border border-border">
                <div className="rounded bg-secondary w-[18px] h-[18px] flex items-center justify-center text-white">
                    <Icon name="building-2" size={11} />
                </div>
                <span className="text-xs text-foreground-muted font-body flex-1">Acme Corp</span>
                <Icon name="chevrons-up-down" size={12} />
            </div>

            <nav className="flex flex-col gap-1 px-3 mt-2 flex-1">
                <NavItem icon="layout-dashboard" label="Dashboard" active />
                <NavItem icon="check-square" label="My Tasks" badge="12" />
                <NavItem icon="timer" label="Time Tracker" dot />
                <NavItem icon="calendar" label="Calendar" />
                <NavItem icon="bar-chart-2" label="Reports" />
                <NavItem icon="users" label="Team" />
                <NavItem icon="folder" label="Projects" />
            </nav>

            <div className="flex flex-col gap-1 px-3 mb-3">
                <NavItem icon="bell" label="Notifications" badge="3" badgeColor="danger" />
                <NavItem icon="settings" label="Settings" />
            </div>

            <div className="flex items-center gap-3 px-4 py-4 border-t border-border">
                <img
                    src="https://storage.googleapis.com/banani-avatars/avatar/male/25-35/South Asian/0"
                    className="w-8 h-8 rounded-full"
                    alt="avatar"
                />
                <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">Aryan Mehta</div>
                    <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
                        <span className="text-xs text-foreground-muted">Online</span>
                    </div>
                </div>
                <Icon name="log-out" size={14} />
            </div>
        </div>
    );
};

export default Sidebar;