import React, { useState } from 'react';
import Icon from '../../components/ui/Icon';

type NotificationType = 'mention' | 'task' | 'comment' | 'system' | 'approval' | 'general';
type FilterType = 'All' | 'Unread' | 'Mentions' | 'Tasks' | 'Comments' | 'System';

interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    description: string;
    time: string;
    read: boolean;
    avatar?: string;
    icon?: string;
    iconBg?: string;
    iconColor?: string;
    badge?: string;
    badgeBg?: string;
    badgeColor?: string;
}

const initialNotifications: Notification[] = [
    {
        id: '1',
        type: 'mention',
        title: 'Priya mentioned you in #design',
        description: '"...@Aryan can you review the onboarding Figma file before EOD?"',
        time: '9:24 AM',
        read: false,
        avatar: 'https://storage.googleapis.com/banani-avatars/avatar/female/25-35/South Asian/1',
        badge: 'at-sign',
        badgeBg: 'bg-purple-bg',
        badgeColor: 'text-purple',
    },
    {
        id: '2',
        type: 'approval',
        title: 'Task approved by Admin',
        description: '"Deploy staging environment" was approved by Aiko Tanaka.',
        time: '8:51 AM',
        read: false,
        avatar: 'https://storage.googleapis.com/banani-avatars/avatar/female/25-35/East Asian/3',
        badge: 'check-circle-2',
        badgeBg: 'bg-success-bg',
        badgeColor: 'text-success',
    },
    {
        id: '3',
        type: 'general',
        title: 'Daily goal reached!',
        description: 'You hit your 8h daily target. Great work today 🎉',
        time: '6:42 PM',
        read: false,
        icon: 'timer',
        iconBg: 'bg-teal-bg',
        iconColor: 'text-primary',
    },
    {
        id: '4',
        type: 'comment',
        title: 'James commented on your task',
        description: '"Integrate payment API" — "Looks solid, merging to staging now."',
        time: '11:07 AM',
        read: false,
        avatar: 'https://storage.googleapis.com/banani-avatars/avatar/male/25-35/North American/2',
        badge: 'message-circle',
        badgeBg: 'bg-info-bg',
        badgeColor: 'text-info',
    },
    {
        id: '5',
        type: 'system',
        title: 'Task due in 2 hours',
        description: '"Write unit tests for auth module" is due at 5:00 PM today.',
        time: '3:02 PM',
        read: false,
        icon: 'alert-circle',
        iconBg: 'bg-warning-bg',
        iconColor: 'text-warning',
    },
    {
        id: '6',
        type: 'task',
        title: 'New task assigned to you',
        description: '"Research competitor pricing pages" assigned by Aiko Tanaka.',
        time: 'Jul 17, 2:30 PM',
        read: true,
        avatar: 'https://storage.googleapis.com/banani-avatars/avatar/female/25-35/East Asian/3',
        badge: 'user-plus',
        badgeBg: 'bg-purple-bg',
        badgeColor: 'text-purple',
    },
    {
        id: '7',
        type: 'comment',
        title: 'Priya replied to your comment',
        description: '"Great point on the A/B test idea — let\'s add it to the sprint."',
        time: 'Jul 17, 11:15 AM',
        read: true,
        avatar: 'https://storage.googleapis.com/banani-avatars/avatar/female/25-35/South Asian/1',
        badge: 'message-circle',
        badgeBg: 'bg-info-bg',
        badgeColor: 'text-info',
    },
    {
        id: '8',
        type: 'system',
        title: 'Weekly report is ready',
        description: 'Your productivity report for W28 is available in Reports.',
        time: 'Jul 17, 9:00 AM',
        read: true,
        icon: 'bar-chart-2',
        iconBg: 'bg-teal-bg',
        iconColor: 'text-primary',
    },
    {
        id: '9',
        type: 'approval',
        title: 'Account verified',
        description: 'Your work email aryan@acmecorp.com has been verified.',
        time: 'Jul 15',
        read: true,
        icon: 'shield-check',
        iconBg: 'bg-success-bg',
        iconColor: 'text-success',
    },
    {
        id: '10',
        type: 'task',
        title: 'Task duplicated',
        description: '"Design onboarding flow" was duplicated by you.',
        time: 'Jul 14',
        read: true,
        icon: 'copy',
        iconBg: 'bg-muted',
        iconColor: 'text-foreground-muted',
    },
];

const Notifications: React.FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
    const [filter, setFilter] = useState<FilterType>('All');

    // Channel toggles
    const [channels, setChannels] = useState({
        inApp: true,
        email: true,
        browser: false,
        mobile: true,
        dnd: false,
    });

    const toggleChannel = (key: keyof typeof channels) => {
        setChannels(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const unreadCount = notifications.filter(n => !n.read).length;
    const mentionCount = notifications.filter(n => n.type === 'mention' && !n.read).length;
    const dueToday = notifications.filter(n => n.type === 'system' && !n.read).length;
    const approvals = notifications.filter(n => n.type === 'approval' && !n.read).length;

    const filteredNotifications = notifications.filter(n => {
        if (filter === 'All') return true;
        if (filter === 'Unread') return !n.read;
        if (filter === 'Mentions') return n.type === 'mention';
        if (filter === 'Tasks') return n.type === 'task';
        if (filter === 'Comments') return n.type === 'comment';
        if (filter === 'System') return n.type === 'system';
        return true;
    });

    const markAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const dismissNotification = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const markAsRead = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    // Group notifications by date
    const today = notifications.filter(n => n.time.includes('AM') || n.time.includes('PM') || n.time === '6:42 PM' || n.time === '3:02 PM' || n.time === '11:07 AM' || n.time === '8:51 AM' || n.time === '9:24 AM');
    const yesterday = notifications.filter(n => n.time.includes('Jul 17'));
    const earlier = notifications.filter(n => n.time.includes('Jul 15') || n.time.includes('Jul 14'));

    const renderNotificationItem = (notification: Notification) => {
        const isRead = notification.read;
        const bgClass = isRead ? 'bg-background-2 opacity-80' : 'bg-surface';

        return (
            <div
                key={notification.id}
                className={`flex items-start gap-4 px-5 py-4 border-b border-border last:border-0 ${bgClass}`}
                onClick={() => markAsRead(notification.id)}
            >
                {/* Read indicator dot */}
                <div className="flex-shrink-0 mt-2">
                    <div className={`w-2 h-2 rounded-full ${notification.read ? 'bg-transparent' : 'bg-primary'}`} />
                </div>

                {/* Avatar or icon */}
                <div className="flex-shrink-0">
                    <div className="relative">
                        {notification.avatar ? (
                            <img src={notification.avatar} className="w-10 h-10 rounded-full" alt="avatar" />
                        ) : (
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${notification.iconBg} ${notification.iconColor}`}>
                                <Icon name={notification.icon as any} size={18} />
                            </div>
                        )}
                        {notification.badge && (
                            <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border-2 border-background ${notification.badgeBg} ${notification.badgeColor}`}>
                                <Icon name={notification.badge as any} size={10} />
                            </div>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <span className={`text-sm font-semibold leading-snug ${isRead ? 'text-foreground-muted' : 'text-foreground'}`}>
                            {notification.title}
                        </span>
                        <span className="text-xs text-foreground-muted flex-shrink-0">{notification.time}</span>
                    </div>
                    <p className={`text-xs leading-relaxed ${isRead ? 'text-foreground-muted' : 'text-foreground-muted'}`}>
                        {notification.description}
                    </p>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-1.5 flex-shrink-0 mt-1">
                    <button
                        className="w-7 h-7 flex items-center justify-center rounded-lg border border-border text-foreground-muted hover:bg-surface-2 transition"
                        onClick={(e) => { e.stopPropagation(); alert('Open detail'); }}
                    >
                        <Icon name="external-link" size={12} />
                    </button>
                    <button
                        className="w-7 h-7 flex items-center justify-center rounded-lg border border-border text-foreground-muted hover:bg-danger-bg hover:text-danger transition"
                        onClick={(e) => { e.stopPropagation(); dismissNotification(notification.id); }}
                    >
                        <Icon name="x" size={12} />
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-1 min-w-0">
            {/* Main content */}
            <div className="flex flex-col flex-1 min-w-0 px-8 py-6 gap-5">
                {/* Filter bar */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-surface rounded-lg p-1 border border-border">
                        {(['All', 'Unread', 'Mentions', 'Tasks', 'Comments', 'System'] as FilterType[]).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition ${filter === f ? 'bg-primary text-primary-foreground' : 'text-foreground-muted hover:bg-surface-2'
                                    }`}
                            >
                                <span>{f}</span>
                                <span className={`text-xs rounded-full px-1.5 ${filter === f ? 'bg-primary-foreground text-primary-foreground opacity-60' : 'bg-muted text-foreground-muted'
                                    }`}>
                                    {f === 'All' ? notifications.length : f === 'Unread' ? unreadCount : f === 'Mentions' ? mentionCount : f === 'Tasks' ? notifications.filter(n => n.type === 'task').length : f === 'Comments' ? notifications.filter(n => n.type === 'comment').length : notifications.filter(n => n.type === 'system').length}
                                </span>
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={markAllRead}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border bg-surface text-xs font-semibold text-foreground-muted hover:bg-surface-2 transition"
                        >
                            <Icon name="check-check" size={13} /> Mark all read
                        </button>
                        <button
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border bg-surface text-xs font-semibold text-foreground-muted hover:bg-surface-2 transition"
                        >
                            <Icon name="settings-2" size={13} /> Preferences
                        </button>
                    </div>
                </div>

                {/* Notification groups */}
                <div className="flex flex-col gap-2">
                    {/* Today */}
                    {today.length > 0 && (
                        <>
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-bold text-foreground-muted uppercase tracking-widest">Today</span>
                                <div className="flex-1 h-px bg-border" />
                            </div>
                            <div className="flex flex-col gap-1 rounded-xl border border-border overflow-hidden">
                                {today.map(renderNotificationItem)}
                            </div>
                        </>
                    )}

                    {/* Yesterday */}
                    {yesterday.length > 0 && (
                        <>
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-bold text-foreground-muted uppercase tracking-widest">Yesterday</span>
                                <div className="flex-1 h-px bg-border" />
                            </div>
                            <div className="flex flex-col gap-1 rounded-xl border border-border overflow-hidden">
                                {yesterday.map(renderNotificationItem)}
                            </div>
                        </>
                    )}

                    {/* Earlier */}
                    {earlier.length > 0 && (
                        <>
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-bold text-foreground-muted uppercase tracking-widest">Earlier</span>
                                <div className="flex-1 h-px bg-border" />
                            </div>
                            <div className="flex flex-col gap-1 rounded-xl border border-border overflow-hidden">
                                {earlier.map(renderNotificationItem)}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Right sidebar: Summary & Channels */}
            <div className="flex flex-col gap-5 border-l border-border px-6 py-6 w-[280px] flex-shrink-0">
                {/* Summary stats */}
                <div className="rounded-xl border border-border bg-surface p-5 flex flex-col gap-4">
                    <h3 className="text-sm font-bold text-foreground">Summary</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1 rounded-lg bg-background-2 border border-border p-3">
                            <Icon name="bell" size={14} />
                            <div className="text-xl font-bold text-primary">{unreadCount}</div>
                            <div className="text-xs text-foreground-muted">Unread</div>
                        </div>
                        <div className="flex flex-col gap-1 rounded-lg bg-background-2 border border-border p-3">
                            <Icon name="at-sign" size={14} />
                            <div className="text-xl font-bold text-purple">{mentionCount}</div>
                            <div className="text-xs text-foreground-muted">Mentions</div>
                        </div>
                        <div className="flex flex-col gap-1 rounded-lg bg-background-2 border border-border p-3">
                            <Icon name="alert-circle" size={14} />
                            <div className="text-xl font-bold text-warning">{dueToday}</div>
                            <div className="text-xs text-foreground-muted">Due Today</div>
                        </div>
                        <div className="flex flex-col gap-1 rounded-lg bg-background-2 border border-border p-3">
                            <Icon name="check-circle-2" size={14} />
                            <div className="text-xl font-bold text-success">{approvals}</div>
                            <div className="text-xs text-foreground-muted">Approvals</div>
                        </div>
                    </div>
                </div>

                {/* Notification Channels */}
                <div className="rounded-xl border border-border bg-surface p-5 flex flex-col gap-4">
                    <h3 className="text-sm font-bold text-foreground">Notification Channels</h3>
                    <div className="flex flex-col gap-3">
                        <ChannelToggle
                            label="In-app alerts"
                            icon="bell"
                            checked={channels.inApp}
                            onChange={() => toggleChannel('inApp')}
                        />
                        <ChannelToggle
                            label="Email digest"
                            icon="mail"
                            checked={channels.email}
                            onChange={() => toggleChannel('email')}
                        />
                        <ChannelToggle
                            label="Browser push"
                            icon="monitor"
                            checked={channels.browser}
                            onChange={() => toggleChannel('browser')}
                        />
                        <ChannelToggle
                            label="Mobile push"
                            icon="smartphone"
                            checked={channels.mobile}
                            onChange={() => toggleChannel('mobile')}
                        />
                    </div>
                </div>

                {/* Do Not Disturb */}
                <div className="rounded-xl border border-dashed border-border p-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Icon name="moon" size={14} />
                            <span className="text-xs font-semibold text-foreground">Do Not Disturb</span>
                        </div>
                        <ChannelToggle
                            checked={channels.dnd}
                            onChange={() => toggleChannel('dnd')}
                        />
                    </div>
                    <p className="text-xs text-foreground-muted">
                        Pause all notifications until 9:00 AM tomorrow.
                    </p>
                </div>
            </div>
        </div>
    );
};

const ChannelToggle: React.FC<{
    label?: string;
    icon?: string;
    checked: boolean;
    onChange: () => void;
}> = ({ label, icon, checked, onChange }) => {
    return (
        <div className="flex items-center justify-between">
            {label && (
                <div className="flex items-center gap-2">
                    {icon && <Icon name={icon as any} size={14} />}
                    <span className="text-xs text-foreground">{label}</span>
                </div>
            )}
            <button
                onClick={onChange}
                className={`flex items-center w-9 h-5 rounded-full px-0.5 transition-colors ${checked ? 'bg-primary' : 'bg-muted'}`}
            >
                <div className={`w-4 h-4 rounded-full bg-white transition-all shadow-sm ${checked ? 'ml-auto' : ''}`} />
            </button>
        </div>
    );
};

export default Notifications;