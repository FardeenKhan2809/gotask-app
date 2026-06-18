// src/components/admin/NotificationDropdown.tsx
import React from 'react';
import Icon from '../ui/Icon';

const NotificationDropdown: React.FC = () => {
    return (
        <div className="flex flex-col bg-surface border border-border overflow-hidden w-[380px] rounded-2xl shadow-[0_20px_64px_rgba(0,0,0,0.56),0_0_0_1px_rgba(255,255,255,0.04)]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <div className="flex items-center gap-2.5">
                    <span className="text-base font-bold text-foreground">Notifications</span>
                    <span className="text-xs font-bold bg-primary text-primary-foreground rounded-full px-2 py-0.5">3</span>
                </div>
                <div className="flex items-center gap-2">
                    <button className="text-xs font-semibold text-primary">Mark all read</button>
                    <div className="w-px h-4 bg-border" />
                    <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-border text-foreground-muted">
                        <Icon name="settings-2" size={13} />
                    </button>
                </div>
            </div>
            <div className="flex items-center gap-1 px-4 pt-3 pb-0">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-teal-bg text-primary">
                    All <span className="text-xs rounded-full px-1.5 bg-primary text-primary-foreground">3</span>
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-foreground-muted">
                    Mentions <span className="text-xs rounded-full px-1.5 bg-muted text-foreground-muted">1</span>
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-foreground-muted">
                    Tasks <span className="text-xs rounded-full px-1.5 bg-muted text-foreground-muted">2</span>
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-foreground-muted">
                    System
                </button>
            </div>
            <div className="mx-4 mt-3 h-px bg-border" />
            <div className="flex flex-col py-1">
                <NotificationItem
                    avatar="https://storage.googleapis.com/banani-avatars/avatar/female/25-35/South Asian/1"
                    badge="at-sign"
                    badgeBg="bg-purple-bg"
                    badgeColor="text-purple"
                    title="Priya mentioned you in #design"
                    description="...@Aryan can you review the Figma before EOD?"
                    time="9:24 AM"
                    unread
                />
                <NotificationItem
                    avatar="https://storage.googleapis.com/banani-avatars/avatar/female/25-35/East Asian/3"
                    badge="check-circle-2"
                    badgeBg="bg-success-bg"
                    badgeColor="text-success"
                    title="Task approved by Aiko"
                    description='"Deploy staging environment" was approved.'
                    time="8:51 AM"
                    unread
                />
                <NotificationItem
                    icon="timer"
                    iconBg="bg-teal-bg"
                    iconColor="text-primary"
                    title="Daily goal reached! 🎉"
                    description="You hit your 8h daily target. Great work!"
                    time="6:42 PM"
                    unread
                />
                <NotificationItem
                    avatar="https://storage.googleapis.com/banani-avatars/avatar/female/25-35/East Asian/3"
                    badge="user-plus"
                    badgeBg="bg-info-bg"
                    badgeColor="text-info"
                    title="New task assigned to you"
                    description='"Research competitor pricing" assigned by Aiko.'
                    time="2:30 PM"
                    read
                />
                <NotificationItem
                    avatar="https://storage.googleapis.com/banani-avatars/avatar/male/25-35/North American/2"
                    badge="message-circle"
                    badgeBg="bg-purple-bg"
                    badgeColor="text-purple"
                    title="James commented on your task"
                    description='"Integrate payment API" — "Merging to staging now."'
                    time="11:07 AM"
                    read
                />
            </div>
            <a className="flex items-center justify-center gap-2 px-5 py-3 border-t border-border bg-background-2 text-xs font-semibold text-primary">
                View all notifications <Icon name="arrow-right" size={12} />
            </a>
        </div>
    );
};

const NotificationItem: React.FC<{
    avatar?: string;
    icon?: string;
    iconBg?: string;
    iconColor?: string;
    badge?: string;
    badgeBg?: string;
    badgeColor?: string;
    title: string;
    description: string;
    time: string;
    unread?: boolean;
    read?: boolean;
}> = ({ avatar, icon, iconBg, iconColor, badge, badgeBg, badgeColor, title, description, time, unread, read }) => {
    const isRead = read || (!unread);
    const bgClass = isRead ? 'opacity-60' : 'bg-surface';

    return (
        <a className={`flex items-start gap-3 px-4 py-3.5 border-b border-border last:border-0 ${bgClass}`}>
            <div className="flex-shrink-0 mt-2">
                <div className={`w-1.5 h-1.5 rounded-full ${unread ? 'bg-primary' : 'bg-transparent'}`} />
            </div>
            <div className="relative flex-shrink-0">
                {avatar ? (
                    <>
                        <img src={avatar} className="w-9 h-9 rounded-full" alt="avatar" />
                        {badge && (
                            <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border-2 border-surface ${badgeBg} ${badgeColor}`}>
                                <Icon name={badge} size={10} />
                            </div>
                        )}
                    </>
                ) : (
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center ${iconBg} ${iconColor}`}>
                        <Icon name={icon!} size={16} />
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                    <span className={`text-xs font-semibold leading-snug ${isRead ? 'text-foreground-muted' : 'text-foreground'}`}>{title}</span>
                    <span className="text-xs text-foreground-muted flex-shrink-0 mt-0.5">{time}</span>
                </div>
                <p className="text-xs text-foreground-muted leading-relaxed">{description}</p>
            </div>
        </a>
    );
};

export default NotificationDropdown;