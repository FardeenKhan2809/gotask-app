import React, { useState } from 'react';
import Icon from '../../../components/ui/Icon';

interface Achievement {
    icon: string;
    label: string;
    bg: string;
    textColor: string;
}

const ProfileTab: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);

    // Mock user data
    const user = {
        name: 'Aryan Mehta',
        role: 'Frontend Engineer',
        company: 'Acme Corp',
        location: 'Mumbai, India',
        joined: 'Jan 2024',
        bio: 'Frontend engineer with a passion for building fast, accessible, and beautiful UIs. 5 years in SaaS products. Currently focused on design systems and performance.',
        skills: ['React', 'TypeScript', 'Figma', 'Next.js', 'Tailwind', 'GraphQL'],
        email: 'aryan@acmecorp.com',
        github: 'github.com/aryanmehta',
        website: 'aryanmehta.dev',
    };

    const stats = [
        { icon: 'clock', value: '342h', label: 'Total Hours', color: 'text-primary' },
        { icon: 'check-circle-2', value: '214', label: 'Tasks Done', color: 'text-success' },
        { icon: 'zap', value: '14 days', label: 'Streak', color: 'text-warning' },
        { icon: 'bar-chart-2', value: '92%', label: 'Efficiency', color: 'text-purple' },
    ];

    const achievements: Achievement[] = [
        { icon: 'zap', label: '14-Day Streak', bg: 'bg-warning-bg', textColor: 'text-warning' },
        { icon: 'target', label: 'Goal Crusher', bg: 'bg-success-bg', textColor: 'text-success' },
        { icon: 'award', label: 'Top Performer', bg: 'bg-purple-bg', textColor: 'text-purple' },
        { icon: 'flame', label: 'First 100h', bg: 'bg-danger-bg', textColor: 'text-danger' },
    ];

    const recentTasks = [
        { title: 'Design new onboarding flow', category: 'Design', status: 'in-progress', time: '2h 34m', color: 'bg-purple' },
        { title: 'Integrate payment gateway API', category: 'Development', status: 'in-progress', time: '1h 10m', color: 'bg-primary' },
        { title: 'Sprint planning meeting', category: 'Meeting', status: 'done', time: '0h 45m', color: 'bg-warning' },
        { title: 'Deploy staging environment', category: 'Development', status: 'done', time: '1h 20m', color: 'bg-primary' },
    ];

    const weekData = [
        { day: 'Mon', height: 75 },
        { day: 'Tue', height: 82 },
        { day: 'Wed', height: 68 },
        { day: 'Thu', height: 91 },
        { day: 'Fri', height: 54 },
        { day: 'Sat', height: 20 },
        { day: 'Sun', height: 0 },
    ];

    const categoryData = [
        { label: 'Development', hours: '14.2h', percent: 42, color: 'bg-primary', textColor: 'text-primary' },
        { label: 'Design', hours: '8.5h', percent: 25, color: 'bg-purple', textColor: 'text-purple' },
        { label: 'Meetings', hours: '5.1h', percent: 15, color: 'bg-warning', textColor: 'text-warning' },
        { label: 'Research', hours: '4h', percent: 12, color: 'bg-info', textColor: 'text-info' },
        { label: 'Other', hours: '2h', percent: 6, color: 'bg-muted', textColor: 'text-foreground-muted' },
    ];

    return (
        <div className="flex flex-col gap-6">
            {/* Cover & Avatar */}
            <div className="relative rounded-2xl border border-border overflow-hidden">
                <div className="h-32 w-full bg-gradient-to-r from-primary/20 via-purple/20 to-background border-b border-border">
                    <div className="absolute top-4 right-4">
                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface text-xs font-semibold text-foreground-muted hover:bg-surface-2 transition">
                            <Icon name="image" size={13} /> Change cover
                        </button>
                    </div>
                </div>
                <div className="flex items-end gap-5 px-8 pb-6 -mt-10">
                    <div className="relative">
                        <img
                            src="https://storage.googleapis.com/banani-avatars/avatar/male/25-35/South Asian/0"
                            className="w-20 h-20 rounded-2xl border-4 border-background"
                            alt="Avatar"
                        />
                        <button className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                            <Icon name="camera" size={11} />
                        </button>
                    </div>
                    <div className="flex flex-col gap-1 pb-1 flex-1">
                        <div className="flex items-center gap-3">
                            <h2 className="text-xl font-bold text-foreground font-headings">{user.name}</h2>
                            <span className="flex items-center gap-1 text-xs font-semibold text-success bg-success-bg px-2.5 py-1 rounded-full">
                                <span className="w-1.5 h-1.5 rounded-full bg-success"></span> Online
                            </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-foreground-muted flex-wrap">
                            <span className="flex items-center gap-1"><Icon name="briefcase" size={13} /> {user.role}</span>
                            <span className="flex items-center gap-1"><Icon name="building-2" size={13} /> {user.company}</span>
                            <span className="flex items-center gap-1"><Icon name="map-pin" size={13} /> {user.location}</span>
                            <span className="flex items-center gap-1"><Icon name="calendar" size={13} /> Joined {user.joined}</span>
                        </div>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-surface text-sm font-semibold text-foreground-muted hover:bg-surface-2 transition mb-1">
                        <Icon name="pencil" size={14} /> Edit Profile
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                    <div key={idx} className="flex items-center gap-4 rounded-xl border border-border bg-surface p-4">
                        <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${stat.color === 'text-primary' ? 'bg-teal-bg' : stat.color === 'text-success' ? 'bg-success-bg' : stat.color === 'text-warning' ? 'bg-warning-bg' : 'bg-purple-bg'}`}>
                            <Icon name={stat.icon} size={18} className={stat.color} />
                        </div>
                        <div>
                            <div className={`text-2xl font-bold font-headings ${stat.color}`}>{stat.value}</div>
                            <div className="text-xs text-foreground-muted">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* About & Achievements */}
            <div className="grid grid-cols-2 gap-5">
                {/* About */}
                <div className="rounded-xl border border-border bg-surface p-5 flex flex-col gap-4">
                    <h3 className="text-sm font-bold text-foreground">About</h3>
                    <p className="text-sm text-foreground-muted leading-relaxed">{user.bio}</p>
                    <div className="flex flex-wrap gap-2">
                        {user.skills.map(skill => (
                            <span key={skill} className="text-xs px-2.5 py-1 rounded-full bg-muted text-foreground-muted font-medium">{skill}</span>
                        ))}
                    </div>
                    <div className="flex flex-col gap-2 pt-2 border-t border-border">
                        <div className="flex items-center gap-2 text-xs text-foreground-muted">
                            <Icon name="mail" size={13} /> <a href="#" className="text-primary hover:underline">{user.email}</a>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-foreground-muted">
                            <Icon name="github" size={13} /> <a href="#" className="text-primary hover:underline">{user.github}</a>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-foreground-muted">
                            <Icon name="link" size={13} /> <a href="#" className="text-primary hover:underline">{user.website}</a>
                        </div>
                    </div>
                </div>

                {/* Achievements */}
                <div className="rounded-xl border border-border bg-surface p-5 flex flex-col gap-4">
                    <h3 className="text-sm font-bold text-foreground">Achievements</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {achievements.map((ach, idx) => (
                            <div key={idx} className={`flex items-center gap-3 rounded-lg border border-border p-3 ${ach.bg} ${ach.textColor}`}>
                                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-background-2 flex-shrink-0">
                                    <Icon name={ach.icon} size={18} />
                                </div>
                                <span className="text-xs font-bold">{ach.label}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col gap-2 pt-2 border-t border-border">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-foreground-muted">Level progress</span>
                            <span className="text-xs font-bold text-primary">Level 7 · Expert</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                            <div className="h-full rounded-full bg-gradient-to-r from-primary to-purple" style={{ width: '68%' }} />
                        </div>
                        <span className="text-xs text-foreground-muted">680 / 1000 XP to Level 8</span>
                    </div>
                </div>
            </div>

            {/* Recent Tasks */}
            <div className="rounded-xl border border-border bg-surface overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-background-3">
                    <h3 className="text-sm font-bold text-foreground">Recent Tasks</h3>
                    <button className="text-xs text-primary font-semibold flex items-center gap-1 hover:underline">
                        View all <Icon name="arrow-right" size={12} />
                    </button>
                </div>
                {recentTasks.map((task, idx) => (
                    <div key={idx} className="flex items-center gap-4 px-5 py-3.5 border-b border-border last:border-0 bg-surface">
                        <div className={`w-1 h-8 rounded-full ${task.color} flex-shrink-0`} />
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-foreground truncate">{task.title}</div>
                            <div className="text-xs text-foreground-muted">{task.category}</div>
                        </div>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${task.status === 'in-progress' ? 'bg-teal-bg text-primary' : 'bg-success-bg text-success'}`}>
                            {task.status}
                        </span>
                        <span className="font-mono text-sm font-bold text-foreground">{task.time}</span>
                    </div>
                ))}
            </div>

            {/* Right sidebar content (would be separate in layout, but we include here for completeness) */}
            {/* Since this is a tab, we can include the right sidebar content inline */}
            <div className="grid grid-cols-2 gap-5">
                {/* Weekly Hours */}
                <div className="rounded-xl border border-border bg-surface p-5 flex flex-col gap-4">
                    <h3 className="text-sm font-bold text-foreground">This Week</h3>
                    <div className="flex items-end justify-between gap-2 h-20">
                        {weekData.map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-1 flex-1">
                                <div className="w-full flex flex-col justify-end rounded-sm overflow-hidden h-14">
                                    <div className={`w-full rounded-sm ${item.day === 'Fri' ? 'bg-primary' : 'bg-surface-2'}`} style={{ height: `${item.height}%`, minHeight: item.height > 0 ? '4px' : '0' }} />
                                </div>
                                <span className={`text-xs font-medium ${item.day === 'Fri' ? 'text-primary' : 'text-foreground-muted'}`}>{item.day}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Time by Category */}
                <div className="rounded-xl border border-border bg-surface p-5 flex flex-col gap-4">
                    <h3 className="text-sm font-bold text-foreground">Time by Category</h3>
                    <div className="flex flex-col gap-3">
                        <div className="flex rounded-full overflow-hidden h-2.5 gap-0.5">
                            {categoryData.map((cat, idx) => (
                                <div key={idx} className={`${cat.color} rounded-full`} style={{ width: `${cat.percent}%` }} />
                            ))}
                        </div>
                        {categoryData.map((cat, idx) => (
                            <div key={idx} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className={`w-2.5 h-2.5 rounded-full ${cat.color} flex-shrink-0`} />
                                    <span className="text-sm text-foreground-muted">{cat.label}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-foreground">{cat.hours}</span>
                                    <span className={`text-xs font-bold ${cat.textColor}`}>{cat.percent}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Role & Access */}
            <div className="rounded-xl border border-border bg-surface p-4 flex flex-col gap-3">
                <h3 className="text-xs font-bold text-foreground-muted uppercase tracking-wide">Role & Access</h3>
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-info-bg">
                        <Icon name="user" size={16} />
                    </div>
                    <div>
                        <div className="text-sm font-bold text-foreground">Employee</div>
                        <div className="text-xs text-foreground-muted">Standard access</div>
                    </div>
                </div>
                <button className="text-xs text-primary font-semibold flex items-center gap-1 hover:underline">
                    Request Admin access <Icon name="arrow-right" size={12} />
                </button>
            </div>
        </div>
    );
};

export default ProfileTab;