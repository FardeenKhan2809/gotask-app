import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../components/ui/Icon';

type DateRange = 'this-week' | 'this-month' | 'last-month' | 'custom';

interface Performer {
    id: number;
    name: string;
    avatar: string;
    hours: number;
    tasks: number;
    score: number;
}

const Reports: React.FC = () => {
    const [selectedRange, setSelectedRange] = useState<DateRange>('this-month');
    const [filterEmployee, setFilterEmployee] = useState(false);

    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const topPerformers: Performer[] = [
        { id: 1, name: 'Priya Sharma', avatar: 'https://storage.googleapis.com/banani-avatars/avatar/female/25-35/South Asian/1', hours: 42.1, tasks: 18, score: 98 },
        { id: 2, name: 'Aryan Mehta', avatar: 'https://storage.googleapis.com/banani-avatars/avatar/male/25-35/South Asian/0', hours: 38.6, tasks: 14, score: 92 },
        { id: 3, name: 'James Carter', avatar: 'https://storage.googleapis.com/banani-avatars/avatar/male/25-35/North American/2', hours: 36.2, tasks: 16, score: 88 },
        { id: 4, name: 'Aiko Tanaka', avatar: 'https://storage.googleapis.com/banani-avatars/avatar/female/25-35/East Asian/3', hours: 34.8, tasks: 13, score: 85 },
        { id: 5, name: 'Carlos Vega', avatar: 'https://storage.googleapis.com/banani-avatars/avatar/male/25-35/Hispanic/4', hours: 32.0, tasks: 11, score: 79 },
    ];

    const handleExportPDF = () => alert('Export PDF clicked');
    const handleExportExcel = () => alert('Export Excel clicked');
    const handleFilterEmployee = () => setFilterEmployee(!filterEmployee);

    // Bar chart monthly hours
    const monthlyHours = [
        { month: 'Jan', hours: 148 },
        { month: 'Feb', hours: 162 },
        { month: 'Mar', hours: 155 },
        { month: 'Apr', hours: 178 },
        { month: 'May', hours: 165 },
        { month: 'Jun', hours: 190 },
        { month: 'Jul', hours: 183 },
    ];
    const maxMonthHours = Math.max(...monthlyHours.map(m => m.hours));
    const barHeight = 80; // px
    const getBarHeight = (hours: number) => (hours / maxMonthHours) * barHeight;

    // For the heatmap data (5 weeks x 7 days) – static from HTML
    const heatmapRows = [
        [0, 20, 40, 70, 40, 20, 0],
        [20, 70, 100, 100, 70, 40, 0],
        [40, 100, 70, 100, 100, 20, 0],
        [70, 100, 100, 70, 40, 20, 0],
        [20, 40, 70, 100, 70, 0, 0],
    ];
    const getHeatmapClass = (value: number) => {
        if (value === 0) return 'bg-border';
        if (value <= 20) return 'bg-primary opacity-20';
        if (value <= 40) return 'bg-primary opacity-40';
        if (value <= 70) return 'bg-primary opacity-70';
        return 'bg-primary';
    };

    // Category hours data
    const categories = [
        { name: 'Development', hours: 128.4, color: 'bg-primary', textColor: 'text-primary' },
        { name: 'Design', hours: 74.2, color: 'bg-purple', textColor: 'text-purple' },
        { name: 'Meetings', hours: 47.8, color: 'bg-warning', textColor: 'text-warning' },
        { name: 'Research', hours: 40.6, color: 'bg-info', textColor: 'text-info' },
        { name: 'Testing', hours: 27.1, color: 'bg-success', textColor: 'text-success' },
        { name: 'Other', hours: 20.2, color: 'bg-muted', textColor: 'text-foreground-muted' },
    ];
    const totalCategoryHours = categories.reduce((sum, c) => sum + c.hours, 0);
    const getPercent = (hours: number) => (hours / totalCategoryHours) * 100;

    return (
        <div className="flex flex-col flex-1 min-w-0">
            <div className="flex flex-col gap-6 px-8 py-6">
                {/* Date range selector + action buttons */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-surface rounded-lg p-1 border border-border">
                        <button
                            onClick={() => setSelectedRange('this-week')}
                            className={`px-4 py-2 rounded-md text-xs font-semibold transition ${selectedRange === 'this-week' ? 'bg-primary text-primary-foreground' : 'text-foreground-muted hover:bg-surface-2'}`}
                        >
                            This Week
                        </button>
                        <button
                            onClick={() => setSelectedRange('this-month')}
                            className={`px-4 py-2 rounded-md text-xs font-semibold transition ${selectedRange === 'this-month' ? 'bg-primary text-primary-foreground' : 'text-foreground-muted hover:bg-surface-2'}`}
                        >
                            This Month
                        </button>
                        <button
                            onClick={() => setSelectedRange('last-month')}
                            className={`px-4 py-2 rounded-md text-xs font-semibold transition ${selectedRange === 'last-month' ? 'bg-primary text-primary-foreground' : 'text-foreground-muted hover:bg-surface-2'}`}
                        >
                            Last Month
                        </button>
                        <button
                            onClick={() => setSelectedRange('custom')}
                            className={`px-4 py-2 rounded-md text-xs font-semibold transition ${selectedRange === 'custom' ? 'bg-primary text-primary-foreground' : 'text-foreground-muted hover:bg-surface-2'}`}
                        >
                            Custom
                        </button>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleFilterEmployee}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-surface text-xs font-semibold text-foreground-muted hover:bg-surface-2 transition"
                        >
                            <Icon name="filter" size={13} />
                            <span>Filter by Employee</span>
                        </button>
                        <button
                            onClick={handleExportPDF}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-surface text-xs font-semibold text-foreground-muted hover:bg-surface-2 transition"
                        >
                            <Icon name="download" size={13} />
                            <span>Export PDF</span>
                        </button>
                        <button
                            onClick={handleExportExcel}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition"
                        >
                            <Icon name="file-spreadsheet" size={13} />
                            <span>Export Excel</span>
                        </button>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-5 gap-4">
                    <StatCard
                        icon="clock"
                        iconBg="bg-teal-bg"
                        iconColor="text-primary"
                        value="338.3h"
                        label="Total Hours"
                        trend="+12%"
                        trendUp
                    />
                    <StatCard
                        icon="user"
                        iconBg="bg-info-bg"
                        iconColor="text-info"
                        value="67.7h"
                        label="Avg per Employee"
                        trend="+8%"
                        trendUp
                    />
                    <StatCard
                        icon="check-square"
                        iconBg="bg-success-bg"
                        iconColor="text-success"
                        value="147"
                        label="Tasks Completed"
                        trend="+23%"
                        trendUp
                    />
                    <StatCard
                        icon="bar-chart-2"
                        iconBg="bg-purple-bg"
                        iconColor="text-purple"
                        value="81%"
                        label="Team Utilization"
                        trend="+5%"
                        trendUp
                    />
                    <StatCard
                        icon="alert-circle"
                        iconBg="bg-warning-bg"
                        iconColor="text-warning"
                        value="12.4h"
                        label="Overtime Hours"
                        trend="+2.1h"
                        trendDown
                    />
                </div>

                {/* Charts row */}
                <div className="grid grid-cols-3 gap-6">
                    {/* Productivity Trend Chart */}
                    <div className="col-span-2 rounded-xl border border-border bg-surface p-6 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-base font-bold text-foreground">Team Productivity Trend</h3>
                                <p className="text-xs text-foreground-muted mt-0.5">Average daily output score this week</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1.5">
                                    <span className="w-3 h-3 rounded-sm bg-primary"></span>
                                    <span className="text-xs text-foreground-muted">This week</span>
                                </div>
                                <button className="text-xs px-3 py-1.5 rounded-lg border border-border text-foreground-muted hover:bg-surface-2 transition">
                                    Compare
                                </button>
                            </div>
                        </div>

                        {/* SVG Chart */}
                        <div className="flex flex-col gap-3">
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
                                    d="M0.0,29.0 L86.7,36.0 L173.3,21.0 L260.0,38.0 L346.7,24.0 L433.3,65.0 L520.0,91.0 L520.0,120 L0.0,120 Z"
                                    fill="url(#areaGrad)"
                                />
                                <path
                                    d="M0.0,29.0 L86.7,36.0 L173.3,21.0 L260.0,38.0 L346.7,24.0 L433.3,65.0 L520.0,91.0"
                                    fill="none"
                                    stroke="#00c9a7"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                {[0, 86.666, 173.333, 260, 346.666, 433.333, 520].map((cx, i) => (
                                    <circle key={i} cx={cx} cy={[29, 36, 21, 38, 24, 65, 91][i]} r="4" fill="#00c9a7" stroke="#0f1117" strokeWidth="2" />
                                ))}
                            </svg>
                            <div className="flex justify-between">
                                {weekDays.map(day => (
                                    <span key={day} className="text-xs text-foreground-muted text-center" style={{ width: '14.2857%' }}>{day}</span>
                                ))}
                            </div>
                        </div>

                        {/* Insights */}
                        <div className="flex items-center gap-6 pt-2 border-t border-border">
                            <div className="flex items-center gap-2">
                                <Icon name="trending-up" size={14} />
                                <span className="text-xs text-foreground-muted">Peak Day:</span>
                                <span className="text-xs font-bold text-success">Thursday</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Icon name="bar-chart-2" size={14} />
                                <span className="text-xs text-foreground-muted">Avg Score:</span>
                                <span className="text-xs font-bold text-primary">8.1 / 10</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Icon name="award" size={14} />
                                <span className="text-xs text-foreground-muted">Best Week:</span>
                                <span className="text-xs font-bold text-warning">W30 · 9.2</span>
                            </div>
                        </div>
                    </div>

                    {/* Hours by Category */}
                    <div className="rounded-xl border border-border bg-surface p-6 flex flex-col gap-4">
                        <h3 className="text-base font-bold text-foreground">Hours by Category</h3>
                        <div className="flex flex-col gap-3">
                            {categories.map((cat) => (
                                <div key={cat.name} className="flex items-center gap-3">
                                    <span className="text-xs text-foreground-muted w-[90px]">{cat.name}</span>
                                    <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                                        <div className={`h-full rounded-full ${cat.color}`} style={{ width: `${(cat.hours / totalCategoryHours) * 100}%` }} />
                                    </div>
                                    <span className={`text-xs font-bold ${cat.textColor} w-[38px] text-right`}>{cat.hours}h</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex rounded-full overflow-hidden h-3 gap-0.5 mt-1">
                            {categories.map((cat) => (
                                <div key={cat.name} className={`${cat.color} rounded-full`} style={{ width: `${getPercent(cat.hours)}%` }} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Second row: Monthly Hours and Heatmap */}
                <div className="grid grid-cols-2 gap-6">
                    {/* Monthly Hours Overview */}
                    <div className="rounded-xl border border-border bg-surface p-6 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-bold text-foreground">Monthly Hours Overview</h3>
                            <span className="text-xs text-foreground-muted">Jan – Jul 2024</span>
                        </div>
                        <div className="flex items-end gap-3 h-28">
                            {monthlyHours.map((month, idx) => (
                                <div key={month.month} className="flex flex-col items-center gap-1 flex-1">
                                    <span className="text-xs font-bold text-foreground-muted">{month.hours}</span>
                                    <div className="w-full rounded-md overflow-hidden" style={{ height: `${barHeight}px`, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                                        <div
                                            className={`w-full rounded-md ${idx === 6 ? 'bg-primary' : 'bg-surface-2'} border border-border`}
                                            style={{ height: `${getBarHeight(month.hours)}px` }}
                                        />
                                    </div>
                                    <span className={`text-xs font-semibold ${idx === 6 ? 'text-primary' : 'text-foreground-muted'}`}>{month.month}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Activity Heatmap */}
                    <div className="rounded-xl border border-border bg-surface p-6 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-bold text-foreground">Activity Heatmap</h3>
                            <span className="text-xs text-foreground-muted">Last 5 weeks · Team avg</span>
                        </div>
                        <div className="flex gap-3 items-start">
                            <div className="flex flex-col gap-2 pt-6">
                                {['W28', 'W29', 'W30', 'W31', 'W32'].map(week => (
                                    <span key={week} className="text-xs text-foreground-muted h-8 flex items-center">{week}</span>
                                ))}
                            </div>
                            <div className="flex flex-col gap-2 flex-1">
                                {/* Day labels */}
                                <div className="flex gap-2">
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                                        <span key={day} className="text-xs text-foreground-muted flex-1 text-center">{day}</span>
                                    ))}
                                </div>
                                {/* Heatmap rows */}
                                {heatmapRows.map((row, i) => (
                                    <div key={i} className="flex gap-2">
                                        {row.map((value, j) => (
                                            <div key={j} className={`flex-1 h-8 rounded-md ${getHeatmapClass(value)}`} />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-2 justify-end">
                            <span className="text-xs text-foreground-muted">Less</span>
                            <div className="w-4 h-4 rounded-sm bg-border"></div>
                            <div className="w-4 h-4 rounded-sm bg-primary opacity-20"></div>
                            <div className="w-4 h-4 rounded-sm bg-primary opacity-40"></div>
                            <div className="w-4 h-4 rounded-sm bg-primary opacity-70"></div>
                            <div className="w-4 h-4 rounded-sm bg-primary"></div>
                            <span className="text-xs text-foreground-muted">More</span>
                        </div>
                    </div>
                </div>

                {/* Top Performers Table */}
                <div className="rounded-xl border border-border bg-surface overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                        <h3 className="text-base font-bold text-foreground">Top Performers</h3>
                        <button className="text-xs text-primary font-semibold flex items-center gap-1 hover:underline">
                            <span>View all employees</span>
                            <Icon name="arrow-right" size={13} />
                        </button>
                    </div>
                    <div className="flex flex-col gap-0">
                        {topPerformers.map((performer, index) => (
                            <div key={performer.id} className="flex items-center gap-5 px-6 py-4 border-b border-border last:border-0">
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${index === 0 ? 'bg-warning text-background' : 'bg-muted text-foreground-muted'}`}>
                                    {performer.id}
                                </div>
                                <img src={performer.avatar} className="w-9 h-9 rounded-full flex-shrink-0" alt={performer.name} />
                                <div className="flex flex-col flex-1 min-w-0">
                                    <span className="text-sm font-bold text-foreground">{performer.name}</span>
                                    <span className="text-xs text-foreground-muted">{performer.hours}h · {performer.tasks} tasks</span>
                                </div>
                                <div className="flex items-center gap-3" style={{ width: '200px' }}>
                                    <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                                        <div className="h-full rounded-full bg-primary" style={{ width: `${performer.score}%` }} />
                                    </div>
                                    <span className="text-sm font-bold text-primary">{performer.score}</span>
                                </div>
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-foreground-muted hover:bg-surface-2 transition flex-shrink-0">
                                    <Icon name="eye" size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper component for stat cards
const StatCard: React.FC<{
    icon: any;
    iconBg: string;
    iconColor: string;
    value: string;
    label: string;
    trend: string;
    trendUp?: boolean;
}> = ({ icon, iconBg, iconColor, value, label, trend, trendUp = true }) => (
    <motion.div whileHover={{ y: -4 }} className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
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
        </div>
    </motion.div>
);

export default Reports;