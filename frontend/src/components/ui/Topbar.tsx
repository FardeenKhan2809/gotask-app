import React from 'react';
import Icon from './Icon';
import { motion } from 'framer-motion';

interface TopbarProps {
    onOpenSettings?: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onOpenSettings }) => {
    return (
        <div className="flex items-center gap-4 px-8 py-4 border-b border-border bg-background-2 min-h-[64px]">
            <div className="flex-1">
                <h1 className="font-headings font-bold text-xl text-foreground">Good morning, Aryan 👋</h1>
                <p className="text-xs text-foreground-muted">Here's what's on your plate today</p>
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
                className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground font-body"
            >
                <Icon name="plus" size={15} />
                <span>New Task</span>
            </motion.button>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenSettings}
                className="relative flex items-center justify-center w-9 h-9 rounded-lg border border-border bg-surface text-foreground-muted"
            >
                <Icon name="bell" size={16} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger"></span>
            </motion.button>
        </div>
    );
};

export default Topbar;