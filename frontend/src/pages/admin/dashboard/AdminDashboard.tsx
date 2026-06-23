// src/pages/admin/AdminDashboard.tsx
import React, { useState } from 'react';
import Icon from '../../../components/ui/Icon';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import AdminTopbar from '../../../components/admin/AdminTopbar';
import ActivitiesSidebar from '../../../components/ui/ActivitiesSidebar';

const AdminDashboard: React.FC = () => {
    const [showActivity, setShowActivity] = useState(false); // true by default to match HTML, but can be toggled

    return (
        <div className="flex bg-background font-body min-h-screen">
            <AdminSidebar />
            <div className="flex flex-col flex-1 min-w-0">
                <AdminTopbar onToggleActivity={() => setShowActivity(!showActivity)} />
                <div className="relative flex flex-1 min-w-0">
                    <div className="flex flex-col flex-1 min-w-0 px-8 py-6 gap-6">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-5 gap-4">
                            <StatCard
                                icon="clock"
                                iconBg="bg-teal-bg"
                                iconColor="text-primary"
                                value="247h"
                                label="Total Hours Today"
                                sublabel="Across all employees"
                                trend="+12%"
                                trendUp
                            />
                            <StatCard
                                icon="activity"
                                iconBg="bg-success-bg"
                                iconColor="text-success"
                                value="5 / 7"
                                label="Active Right Now"
                                sublabel="2 offline"
                                trend="+2"
                                trendUp
                            />
                            <StatCard
                                icon="check-circle-2"
                                iconBg="bg-info-bg"
                                iconColor="text-info"
                                value="38"
                                label="Tasks Completed"
                                sublabel="Today"
                                trend="+14%"
                                trendUp
                            />
                            <StatCard
                                icon="shield"
                                iconBg="bg-warning-bg"
                                iconColor="text-warning"
                                value="5"
                                label="Pending Approvals"
                                sublabel="Needs your review"
                                trend="+3"
                                trendDown
                            />
                            <StatCard
                                icon="bar-chart-2"
                                iconBg="bg-purple-bg"
                                iconColor="text-purple"
                                value="78%"
                                label="Avg Utilization"
                                sublabel="vs 71% last week"
                                trend="+7%"
                                trendUp
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-5">
                            <div className="col-span-2 rounded-xl border border-border bg-surface p-5 flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-base font-bold text-foreground">Team Productivity</h3>
                                        <p className="text-xs text-foreground-muted">Daily output score — this week</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-3 h-3 rounded-sm bg-primary" />
                                            <span className="text-xs text-foreground-muted">Team avg</span>
                                        </div>
                                        <button className="text-xs px-3 py-1.5 rounded-lg border border-border text-foreground-muted">Per employee</button>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3">
                                    {/* SVG chart */}
                                    <svg viewBox="0 0 520 120" style={{ width: '100%', height: '130px' }}>
                                        <defs>
                                            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#00c9a7" stopOpacity="0.3" />
                                                <stop offset="100%" stopColor="#00c9a7" stopOpacity="0.0" />
                                            </linearGradient>
                                        </defs>
                                        <line x1="0" y1="110" x2="520" y2="110" stroke="#2a3347" strokeWidth="1" />
                                        <line x1="0" y1="85" x2="520" y2="85" stroke="#2a3347" strokeWidth="1" />
                                        <line x1="0" y1="60" x2="520" y2="60" stroke="#2a3347" strokeWidth="1" />
                                        <line x1="0" y1="35" x2="520" y2="35" stroke="#2a3347" strokeWidth="1" />
                                        <line x1="0" y1="10" x2="520" y2="10" stroke="#2a3347" strokeWidth="1" />
                                        <path
                                            d="M0.0,60.0 L86.7,45.0 L173.3,32.0 L260.0,30.0 L346.7,18.0 L433.3,59.0 L520.0,82.0 L520.0,120 L0.0,120 Z"
                                            fill="url(#areaGrad)"
                                        />
                                        <path
                                            d="M0.0,60.0 L86.7,45.0 L173.3,32.0 L260.0,30.0 L346.7,18.0 L433.3,59.0 L520.0,82.0"
                                            fill="none"
                                            stroke="#00c9a7"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        {[0, 86.666, 173.333, 260, 346.666, 433.333, 520].map((cx, i) => (
                                            <circle key={i} cx={cx} cy={[60, 45, 32, 30, 18, 59, 82][i]} r="4" fill="#00c9a7" stroke="#0f1117" strokeWidth="2" />
                                        ))}
                                    </svg>
                                    <div className="flex justify-between">
                                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                                            <span key={day} className="text-xs text-foreground-muted text-center" style={{ width: '14.2857%' }}>{day}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-xl border border-border bg-surface p-5 flex flex-col gap-4">
                                <h3 className="text-base font-bold text-foreground">Hours by Dept</h3>
                                <div className="flex flex-col gap-3">
                                    {[
                                        { dept: 'Engineering', hours: 98.4, color: 'bg-primary', width: 96 },
                                        { dept: 'Design', hours: 62.1, color: 'bg-purple', width: 60 },
                                        { dept: 'Product', hours: 48.5, color: 'bg-warning', width: 48 },
                                        { dept: 'Infra', hours: 38.3, color: 'bg-info', width: 36 },
                                    ].map((item) => (
                                        <div key={item.dept} className="flex items-center gap-3">
                                            <span className="text-xs text-foreground-muted w-[80px]">{item.dept}</span>
                                            <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                                                <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.width}%` }} />
                                            </div>
                                            <span className="text-xs font-bold text-foreground w-[42px] text-right">{item.hours}h</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t border-border pt-4">
                                    <p className="text-xs text-foreground-muted mb-3">Daily total this week</p>
                                    <div className="flex items-end gap-2 h-16">
                                        {[
                                            { day: 'Mon', height: 36.55 },
                                            { day: 'Tue', height: 41.35 },
                                            { day: 'Wed', height: 34.52 },
                                            { day: 'Thu', height: 44.49 },
                                            { day: 'Fri', height: 37.48 },
                                            { day: 'Sat', height: 11.82 },
                                            { day: 'Sun', height: 2 },
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex flex-col items-center gap-1 flex-1">
                                                <div className="w-full flex flex-col justify-end" style={{ height: '48px' }}>
                                                    <div
                                                        className={`w-full rounded-sm ${idx === 3 ? 'bg-primary' : 'bg-surface-2'} border border-border`}
                                                        style={{ height: `${item.height}px` }}
                                                    />
                                                </div>
                                                <span className={`text-xs font-medium ${idx === 3 ? 'text-primary' : 'text-foreground-muted'}`}>{item.day}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Employee Overview & Pending Approvals */}
                        <div className="grid grid-cols-5 gap-5">
                            <div className="col-span-3 rounded-xl border border-border bg-surface overflow-hidden">
                                <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-background-3">
                                    <h3 className="text-base font-bold text-foreground">Employee Overview</h3>
                                    <a className="text-xs text-primary font-semibold flex items-center gap-1">
                                        Full team <Icon name="arrow-right" size={12} />
                                    </a>
                                </div>
                                <div className="flex items-center gap-4 px-5 py-2.5 border-b border-border bg-background-2">
                                    <div style={{ width: '36px' }} />
                                    <div className="flex-1 text-xs font-bold text-foreground-muted uppercase tracking-wide">Employee</div>
                                    <div className="text-xs font-bold text-foreground-muted uppercase tracking-wide text-center" style={{ width: '70px' }}>Hours</div>
                                    <div className="text-xs font-bold text-foreground-muted uppercase tracking-wide text-center" style={{ width: '50px' }}>Tasks</div>
                                    <div className="text-xs font-bold text-foreground-muted uppercase tracking-wide" style={{ width: '120px' }}>Utilization</div>
                                    <div style={{ width: '60px' }} />
                                </div>
                                <EmployeeRow
                                    name="Priya Sharma"
                                    role="Designer"
                                    avatar="female/25-35/South Asian/1"
                                    status="success"
                                    hours="8h 12m"
                                    tasks={7}
                                    utilization={92}
                                    color="bg-success"
                                />
                                <EmployeeRow
                                    name="James Carter"
                                    role="Engineer"
                                    avatar="male/25-35/North American/2"
                                    status="danger"
                                    hours="7h 01m"
                                    tasks={5}
                                    utilization={88}
                                    color="bg-success"
                                />
                                <EmployeeRow
                                    name="Aryan Mehta"
                                    role="Engineer"
                                    avatar="male/25-35/South Asian/0"
                                    status="success"
                                    hours="5h 44m"
                                    tasks={4}
                                    utilization={72}
                                    color="bg-primary"
                                />
                                <EmployeeRow
                                    name="Aiko Tanaka"
                                    role="PM"
                                    avatar="female/25-35/East Asian/3"
                                    status="success"
                                    hours="4h 30m"
                                    tasks={6}
                                    utilization={85}
                                    color="bg-success"
                                />
                                <EmployeeRow
                                    name="Carlos Vega"
                                    role="QA"
                                    avatar="male/25-35/Hispanic/4"
                                    status="warning"
                                    hours="3h 20m"
                                    tasks={3}
                                    utilization={63}
                                    color="bg-primary"
                                />
                            </div>

                            {/* Pending Approvals */}
                            <div className="col-span-2 rounded-xl border border-border bg-surface overflow-hidden">
                                <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-background-3">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-base font-bold text-foreground">Pending Approvals</h3>
                                        <span className="text-xs font-bold bg-warning-bg text-warning rounded-full px-2 py-0.5">5</span>
                                    </div>
                                    <button className="text-xs text-primary font-semibold">Approve all</button>
                                </div>
                                <div className="flex flex-col gap-0">
                                    <ApprovalItem
                                        avatar="male/25-35/South Asian/0"
                                        title="Overtime log — Jul 17"
                                        subtitle="Aryan Mehta"
                                        meta="+2h 30m"
                                    />
                                    <ApprovalItem
                                        avatar="male/25-35/Hispanic/4"
                                        title="Manual time entry — Jul 15"
                                        subtitle="Carlos Vega"
                                        meta="4h 00m"
                                    />
                                    <ApprovalItem
                                        avatar="female/25-35/South Asian/1"
                                        title="Task deletion request"
                                        subtitle="Priya Sharma"
                                        meta="—"
                                    />
                                    <ApprovalItem
                                        avatar="male/25-35/East Asian/6"
                                        title="Retroactive task edit"
                                        subtitle="Ryan Park"
                                        meta="+1h 15m"
                                    />
                                    <ApprovalItem
                                        avatar="male/25-35/North American/2"
                                        title="Expense — Software license"
                                        subtitle="James Carter"
                                        meta="$89"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Recent Task Activity */}
                        <div className="rounded-xl border border-border bg-surface overflow-hidden">
                            <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-background-3">
                                <h3 className="text-base font-bold text-foreground">Recent Task Activity</h3>
                                <div className="flex items-center gap-2">
                                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface text-xs font-semibold text-foreground-muted">
                                        <Icon name="filter" size={12} /> Filter
                                    </button>
                                    <a className="text-xs text-primary font-semibold flex items-center gap-1">
                                        All tasks <Icon name="arrow-right" size={12} />
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 px-5 py-2.5 border-b border-border bg-background-2">
                                <div className="flex-1 text-xs font-bold text-foreground-muted uppercase tracking-wide">Task</div>
                                <div className="text-xs font-bold text-foreground-muted uppercase tracking-wide" style={{ width: '130px' }}>Employee</div>
                                <div className="text-xs font-bold text-foreground-muted uppercase tracking-wide" style={{ width: '100px' }}>Category</div>
                                <div className="text-xs font-bold text-foreground-muted uppercase tracking-wide text-center" style={{ width: '90px' }}>Status</div>
                                <div className="text-xs font-bold text-foreground-muted uppercase tracking-wide text-center" style={{ width: '80px' }}>Duration</div>
                                <div style={{ width: '50px' }} />
                            </div>
                            <TaskRow
                                title="Design new onboarding flow"
                                employee="Priya Sharma"
                                category="Design"
                                status="in-progress"
                                duration="2h 34m"
                                color="bg-purple"
                            />
                            <TaskRow
                                title="Integrate payment gateway API"
                                employee="James Carter"
                                category="Development"
                                status="in-progress"
                                duration="1h 10m"
                                color="bg-primary"
                            />
                            <TaskRow
                                title="Deploy staging environment"
                                employee="Ryan Park"
                                category="DevOps"
                                status="done"
                                duration="1h 20m"
                                color="bg-success"
                            />
                            <TaskRow
                                title="Sprint planning meeting"
                                employee="Aiko Tanaka"
                                category="Meeting"
                                status="done"
                                duration="0h 45m"
                                color="bg-warning"
                            />
                            <TaskRow
                                title="Write unit tests for auth"
                                employee="Aryan Mehta"
                                category="Testing"
                                status="todo"
                                duration="—"
                                color="bg-info"
                            />
                        </div>
                    </div>

                    {showActivity && <ActivitiesSidebar />}
                </div>
            </div>
        </div>
    );
};

// Helper components
const StatCard: React.FC<{
    icon: string;
    iconBg: string;
    iconColor: string;
    value: string;
    label: string;
    sublabel: string;
    trend: string;
    trendUp?: boolean;
}> = ({ icon, iconBg, iconColor, value, label, sublabel, trend, trendUp = true }) => (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
        <div className="flex items-center justify-between">
            <div className={`w-9 h-9 flex items-center justify-center rounded-lg ${iconBg} ${iconColor}`}>
                <Icon name={icon} size={16} />
            </div>
            <span className={`flex items-center gap-1 text-xs font-bold rounded-full px-2 py-0.5 ${trendUp ? 'bg-success-bg text-success' : 'bg-danger-bg text-danger'}`}>
                <Icon name={trendUp ? 'trending-up' : 'trending-down'} size={10} />
                {trend}
            </span>
        </div>
        <div>
            <div className="text-2xl font-bold text-foreground font-headings">{value}</div>
            <div className="text-xs text-foreground-muted mt-0.5">{label}</div>
            <div className="text-xs text-foreground-muted opacity-60">{sublabel}</div>
        </div>
    </div>
);

const EmployeeRow: React.FC<{
    name: string;
    role: string;
    avatar: string;
    status: string;
    hours: string;
    tasks: number;
    utilization: number;
    color: string;
}> = ({ name, role, avatar, status, hours, tasks, utilization, color }) => (
    <div className="flex items-center gap-4 px-5 py-3.5 border-b border-border last:border-0">
        <div className="relative flex-shrink-0">
            <img src={`https://storage.googleapis.com/banani-avatars/avatar/${avatar}`} className="w-9 h-9 rounded-full" alt={name} />
            <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-surface bg-${status}`} />
        </div>
        <div className="flex flex-col flex-1 min-w-0">
            <span className="text-sm font-semibold text-foreground truncate">{name}</span>
            <span className="text-xs text-foreground-muted">{role}</span>
        </div>
        <span className="text-sm font-bold text-foreground text-center" style={{ width: '70px' }}>{hours}</span>
        <span className="text-sm font-bold text-foreground text-center" style={{ width: '50px' }}>{tasks}</span>
        <div className="flex items-center gap-2" style={{ width: '120px' }}>
            <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                <div className={`h-full rounded-full ${color}`} style={{ width: `${utilization}%` }} />
            </div>
            <span className="text-xs font-bold text-foreground-muted">{utilization}%</span>
        </div>
        <div className="flex gap-1" style={{ width: '60px' }}>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-border text-foreground-muted">
                <Icon name="eye" size={12} />
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-border text-foreground-muted">
                <Icon name="message-circle" size={12} />
            </button>
        </div>
    </div>
);

const ApprovalItem: React.FC<{ avatar: string; title: string; subtitle: string; meta: string }> = ({ avatar, title, subtitle, meta }) => (
    <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border last:border-0">
        <img src={`https://storage.googleapis.com/banani-avatars/avatar/${avatar}`} className="w-8 h-8 rounded-full flex-shrink-0" alt="user" />
        <div className="flex flex-col flex-1 min-w-0">
            <span className="text-xs font-semibold text-foreground truncate">{title}</span>
            <span className="text-xs text-foreground-muted">{subtitle}</span>
        </div>
        <span className="text-xs font-bold text-foreground-muted flex-shrink-0">{meta}</span>
        <div className="flex gap-1.5 flex-shrink-0">
            <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-success-bg text-success text-xs font-bold">
                <Icon name="check" size={11} /> OK
            </button>
            <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-danger-bg text-danger text-xs font-bold">
                <Icon name="x" size={11} />
            </button>
        </div>
    </div>
);

const TaskRow: React.FC<{
    title: string;
    employee: string;
    category: string;
    status: 'in-progress' | 'done' | 'todo';
    duration: string;
    color: string;
}> = ({ title, employee, category, status, duration, color }) => {
    const statusClasses = {
        'in-progress': 'bg-teal-bg text-primary',
        'done': 'bg-success-bg text-success',
        'todo': 'bg-muted text-foreground-muted',
    };
    return (
        <div className="flex items-center gap-4 px-5 py-3.5 border-b border-border last:border-0 bg-surface">
            <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className={`w-1 h-7 rounded-full ${color} flex-shrink-0`} />
                <span className="text-sm font-semibold text-foreground truncate">{title}</span>
            </div>
            <span className="text-xs text-foreground-muted truncate" style={{ width: '130px' }}>{employee}</span>
            <span className="text-xs px-2 py-1 rounded-full bg-muted text-foreground-muted font-medium text-center" style={{ width: '100px' }}>{category}</span>
            <div className="text-center" style={{ width: '90px' }}>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusClasses[status]}`}>{status}</span>
            </div>
            <span className="font-mono text-sm font-bold text-foreground text-center" style={{ width: '80px' }}>{duration}</span>
            <div className="flex gap-1" style={{ width: '50px' }}>
                <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-border text-foreground-muted">
                    <Icon name="more-horizontal" size={12} />
                </button>
            </div>
        </div>
    );
};

export default AdminDashboard;