// src/components/admin/ActivitiesSidebar.tsx
import React from 'react';
import Icon from '../ui/Icon';

const ActivitiesSidebar: React.FC = () => {
    return (
        <div className="flex flex-col bg-background-2 border-l border-border w-[320px] min-h-full flex-shrink-0">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-teal-bg">
                        <Icon name="activity" size={14} />
                    </div>
                    <span className="text-base font-bold text-foreground">Activity</span>
                </div>
                <div className="flex items-center gap-2">
                    <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-border text-foreground-muted">
                        <Icon name="sliders-horizontal" size={13} />
                    </button>
                    <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-border text-foreground-muted">
                        <Icon name="x" size={13} />
                    </button>
                </div>
            </div>
            <div className="flex items-center gap-3 px-5 py-3 border-b border-border">
                <span className="text-xs font-semibold text-foreground-muted">Online</span>
                <div className="flex -space-x-2">
                    {[
                        'female/25-35/South Asian/1',
                        'male/25-35/South Asian/0',
                        'male/25-35/North American/2',
                        'female/25-35/East Asian/3',
                        'female/25-35/African/5'
                    ].map((path, i) => (
                        <div key={i} className="relative flex-shrink-0">
                            <img
                                src={`https://storage.googleapis.com/banani-avatars/avatar/${path}`}
                                className="w-7 h-7 rounded-full border-2 border-background-2"
                                alt="user"
                            />
                            <span className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border border-background-2 ${i === 2 ? 'bg-danger' : i === 4 ? 'bg-warning' : 'bg-success'}`} />
                        </div>
                    ))}
                </div>
                <span className="text-xs text-foreground-muted ml-1">4 online, 1 away</span>
            </div>
            <div className="flex gap-1 px-4 py-3 border-b border-border overflow-x-auto">
                {['All', 'Tasks', 'Timers', 'Comments', 'Mentions'].map((label, i) => (
                    <button
                        key={label}
                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold flex-shrink-0 ${i === 0 ? 'bg-teal-bg text-primary' : 'text-foreground-muted'
                            }`}
                    >
                        <Icon name={i === 0 ? 'activity' : i === 1 ? 'check-square' : i === 2 ? 'timer' : i === 3 ? 'message-circle' : 'at-sign'} size={11} />
                        {label}
                    </button>
                ))}
            </div>
            <div className="flex flex-col flex-1 px-4 py-3 gap-0 overflow-y-auto">
                <ActivityItem
                    avatar="female/25-35/South Asian/1"
                    badge="check-circle-2"
                    badgeBg="bg-success-bg"
                    badgeColor="text-success"
                    name="Priya Sharma"
                    action="completed task"
                    target="Design new onboarding flow"
                    time="2 min ago"
                    meta="+2h 34m tracked"
                    metaColor="text-success"
                />
                <ActivityItem
                    avatar="male/25-35/South Asian/0"
                    badge="play-circle"
                    badgeBg="bg-teal-bg"
                    badgeColor="text-primary"
                    name="Aryan Mehta"
                    action="started timer on"
                    target="Integrate payment API"
                    time="18 min ago"
                    meta="Active now"
                    metaColor="text-primary"
                />
                <ActivityItem
                    avatar="male/25-35/North American/2"
                    badge="message-circle"
                    badgeBg="bg-purple-bg"
                    badgeColor="text-purple"
                    name="James Carter"
                    action="commented on"
                    target="Write unit tests for auth"
                    time="35 min ago"
                    meta='"Looks good, +2 edge cases"'
                    metaColor="text-purple"
                />
                <ActivityItem
                    avatar="female/25-35/East Asian/3"
                    badge="user-plus"
                    badgeBg="bg-info-bg"
                    badgeColor="text-info"
                    name="Aiko Tanaka"
                    action="assigned task to Aryan"
                    target="Research competitor pricing"
                    time="1h ago"
                    meta="Due Mon Jul 22"
                    metaColor="text-info"
                />
                <ActivityItem
                    avatar="male/25-35/Hispanic/4"
                    badge="plus-circle"
                    badgeBg="bg-info-bg"
                    badgeColor="text-info"
                    name="Carlos Vega"
                    action="created task"
                    target="Fix mobile nav z-index bug"
                    time="1h 12m ago"
                    meta="High priority"
                    metaColor="text-info"
                />
                <ActivityItem
                    avatar="female/25-35/East Asian/3"
                    badge="shield-check"
                    badgeBg="bg-success-bg"
                    badgeColor="text-success"
                    name="Aiko Tanaka"
                    action="approved task"
                    target="Deploy staging environment"
                    time="2h ago"
                    meta="Task closed"
                    metaColor="text-success"
                />
                <ActivityItem
                    avatar="female/25-35/South Asian/1"
                    badge="paperclip"
                    badgeBg="bg-warning-bg"
                    badgeColor="text-warning"
                    name="Priya Sharma"
                    action="attached files to"
                    target="Design system tokens"
                    time="2h 30m ago"
                    meta="3 files added"
                    metaColor="text-foreground-muted"
                />
                <ActivityItem
                    avatar="female/25-35/African/5"
                    badge="at-sign"
                    badgeBg="bg-purple-bg"
                    badgeColor="text-purple"
                    name="Amara Osei"
                    action="mentioned you in"
                    target="#design channel"
                    time="3h ago"
                    meta='"@Aryan can you review?"'
                    metaColor="text-purple"
                />
                <ActivityItem
                    avatar="male/25-35/East Asian/6"
                    badge="check-circle-2"
                    badgeBg="bg-success-bg"
                    badgeColor="text-success"
                    name="Ryan Park"
                    action="completed task"
                    target="API documentation update"
                    time="4h ago"
                    meta="+1h 45m tracked"
                    metaColor="text-success"
                />
                <ActivityItem
                    avatar="male/25-35/North American/2"
                    badge="square"
                    badgeBg="bg-danger-bg"
                    badgeColor="text-danger"
                    name="James Carter"
                    action="stopped timer on"
                    target="Backend refactor"
                    time="5h ago"
                    meta="3h 20m logged"
                    metaColor="text-foreground-muted"
                />
            </div>
            <div className="px-5 py-3 border-t border-border">
                <a className="flex items-center justify-center gap-2 text-xs font-semibold text-primary py-2 rounded-lg bg-teal-bg w-full">
                    View full activity log <Icon name="arrow-right" size={12} />
                </a>
            </div>
        </div>
    );
};

const ActivityItem: React.FC<{
    avatar: string;
    badge: string;
    badgeBg: string;
    badgeColor: string;
    name: string;
    action: string;
    target: string;
    time: string;
    meta: string;
    metaColor: string;
}> = ({ avatar, badge, badgeBg, badgeColor, name, action, target, time, meta, metaColor }) => (
    <div className="relative flex gap-3 py-3.5 border-b border-border last:border-0">
        <div className="absolute left-5 top-12 bottom-0 w-px bg-border" style={{ left: '32px' }} />
        <div className="relative flex-shrink-0">
            <img src={`https://storage.googleapis.com/banani-avatars/avatar/${avatar}`} className="w-8 h-8 rounded-full" alt="avatar" />
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center border border-background-2 ${badgeBg} ${badgeColor}`}>
                <Icon name={badge} size={8} />
            </div>
        </div>
        <div className="flex flex-col gap-0.5 flex-1 min-w-0">
            <div className="flex items-start justify-between gap-1">
                <p className="text-xs leading-snug text-foreground">
                    <span className="font-bold">{name}</span>
                    <span className="text-foreground-muted"> {action} </span>
                    <span className="font-semibold text-foreground">{target}</span>
                </p>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-foreground-muted">{time}</span>
                <span className="text-xs text-foreground-muted opacity-40">·</span>
                <span className={`text-xs font-semibold ${metaColor}`}>{meta}</span>
            </div>
        </div>
    </div>
);

export default ActivitiesSidebar;