import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/Icon';
import { motion } from 'framer-motion';

interface TopbarProps {
    onOpenSettings?: () => void;
}

const pageTitles: Record<string, { title: string; subtitle: string }> = {
    '/': { title: 'Good morning, Aryan 👋', subtitle: "Here's what's on your plate today" },
    '/my-tasks': { title: 'My Tasks', subtitle: 'Organize, track, and manage your daily deliverables' },
    '/time-tracker': { title: 'Time Tracker', subtitle: 'Record and analyze your active work sessions' },
    '/calendar': { title: 'Schedule & Calendar', subtitle: 'Plan upcoming deadlines and team meetings' },
    '/reports': { title: 'Productivity Reports', subtitle: 'View weekly hours, metrics, and team performance' },
    '/team': { title: 'Team Directory', subtitle: 'Connect and collaborate with your teammates' },
    '/projects': { title: 'Projects Overview', subtitle: 'Manage active initiatives, milestones, and progress' },
    '/chat': { title: 'Team Chat', subtitle: 'Real-time communication and channel discussions' },
    '/notifications': { title: 'Notifications', subtitle: 'Stay updated on mentions, approvals, and system alerts' },
    '/settings': { title: 'Settings & Preferences', subtitle: 'Configure your account, appearance, and themes' },
    '/create-task': { title: 'Create New Task', subtitle: 'Define parameters, assignments, and estimates' },
};

const Topbar: React.FC<TopbarProps> = ({ onOpenSettings }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const currentMeta = pageTitles[location.pathname] || {
        title: 'Good morning, Aryan 👋',
        subtitle: "Here's what's on your plate today",
    };

    return (
        <div className="flex items-center gap-4 px-8 py-4 border-b border-border bg-background-2 min-h-[64px]">
            <div className="flex-1">
                <h1 className="font-headings font-bold text-xl text-foreground">{currentMeta.title}</h1>
                <p className="text-xs text-foreground-muted">{currentMeta.subtitle}</p>
            </div>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground-muted font-body w-[220px]"
            >
                <Icon name="search" size={14} />
                <span className="flex-1 text-left">Search tasks...</span>
                <span className="flex items-center gap-1 rounded bg-muted px-1.5 py-0.5 text-xs text-foreground-muted">
                    ⌘K
                </span>
            </motion.button>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/create-task')}
                className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground font-body"
            >
                <Icon name="plus" size={15} />
                <span>New Task</span>
            </motion.button>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenSettings || (() => navigate('/notifications'))}
                className="relative flex items-center justify-center w-9 h-9 rounded-lg border border-border bg-surface text-foreground-muted"
            >
                <Icon name="bell" size={16} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger" />
            </motion.button>
        </div>
    );
};

export default Topbar;