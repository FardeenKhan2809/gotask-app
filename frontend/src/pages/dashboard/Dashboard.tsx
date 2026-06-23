import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../../components/ui/Sidebar';
import Topbar from '../../components/ui/Topbar';
import Icon from '../../components/ui/Icon';
import SettingsPanel from '../shared/settings/SettingsPanel';

interface Task {
    id: string;
    title: string;
    description: string;
    category: string;
    priority: 'High' | 'Medium' | 'Low';
    priorityColor: 'danger' | 'warning' | 'info';
    progress: number;
    tags: string[];
    comments: number;
    attachments: number;
    dueDate: string;
    timeSpent: string;
    status: 'In Progress' | 'To Do' | 'Done';
    statusColor: 'primary' | 'muted' | 'success';
}

interface RightSidebarProps {
    quickNote: string;
    setQuickNote: (value: string) => void;
}

const initialTasks: Task[] = [
    {
        id: '1',
        title: 'Design new onboarding flow',
        description: 'Redesign the user onboarding with improved micro-interactions and clearer steps for new users.',
        category: 'Design',
        priority: 'High',
        priorityColor: 'danger',
        progress: 65,
        tags: ['UI', 'UX'],
        comments: 4,
        attachments: 2,
        dueDate: 'Today',
        timeSpent: '2h 34m',
        status: 'In Progress',
        statusColor: 'primary',
    },
    {
        id: '2',
        title: 'Integrate payment gateway API',
        description: 'Connect Stripe APIs to the checkout flow and add webhook listeners for payment events.',
        category: 'Development',
        priority: 'High',
        priorityColor: 'danger',
        progress: 40,
        tags: ['Backend', 'API'],
        comments: 2,
        attachments: 0,
        dueDate: 'Today',
        timeSpent: '1h 10m',
        status: 'In Progress',
        statusColor: 'primary',
    },
    {
        id: '3',
        title: 'Write unit tests for auth module',
        description: 'Cover edge cases and ensure 90%+ test coverage for the authentication service.',
        category: 'Development',
        priority: 'Medium',
        priorityColor: 'warning',
        progress: 0,
        tags: ['Testing'],
        comments: 0,
        attachments: 1,
        dueDate: 'Tomorrow',
        timeSpent: '0h 00m',
        status: 'To Do',
        statusColor: 'muted',
    },
    {
        id: '4',
        title: 'Weekly sprint retrospective',
        description: 'Prepare slides and talking points for the end-of-sprint team review session.',
        category: 'Meeting',
        priority: 'Low',
        priorityColor: 'info',
        progress: 100,
        tags: ['Team', 'Sprint'],
        comments: 6,
        attachments: 3,
        dueDate: 'Yesterday',
        timeSpent: '0h 45m',
        status: 'Done',
        statusColor: 'success',
    },
];

const Dashboard: React.FC = () => {
    // Timer state
    const [timerSeconds, setTimerSeconds] = useState(9237);
    const [timerRunning, setTimerRunning] = useState(true);
    const [activeTaskId, setActiveTaskId] = useState<string | null>('1');
    const [taskFilter, setTaskFilter] = useState<'All Tasks' | 'In Progress' | 'To Do' | 'Done'>('All Tasks');
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [showSettings, setShowSettings] = useState(false);
    const [quickNote, setQuickNote] = useState('');


    useEffect(() => {
        let interval: number;
        if (timerRunning) {
            interval = setInterval(() => {
                setTimerSeconds((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timerRunning]);

    const formatTime = (secs: number) => {
        const hours = Math.floor(secs / 3600);
        const minutes = Math.floor((secs % 3600) / 60);
        const seconds = secs % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const handlePause = () => setTimerRunning(false);
    const handleStop = () => {
        setTimerRunning(false);
        setTimerSeconds(0);
    };
    const handleSave = () => {
        alert(`Saved ${formatTime(timerSeconds)} to log`);
    };

    const handlePlayTask = (taskId: string) => {
        setActiveTaskId(taskId);
        setTimerRunning(true);
    };

    const handlePauseTask = () => {
        setTimerRunning(false);
    };

    const filteredTasks = tasks.filter((task) => {
        if (taskFilter === 'All Tasks') return true;
        return task.status === taskFilter;
    });

    const stats = {
        todayHours: '5h 44m',
        tasksDone: `${tasks.filter((t) => t.status === 'Done').length} / ${tasks.length}`,
        streak: '14 days',
        productivity: '92%',
    };

    return (
        <div>
            <div className="flex flex-1 min-w-0 overflow-hidden">
                <div className="flex flex-col flex-1 min-w-0 px-8 py-6 gap-6 overflow-y-auto">
                    <div className="grid grid-cols-4 gap-4">
                        <StatCard icon="clock" iconBg="bg-teal-bg" iconColor="text-primary" value={stats.todayHours} label="Today's Hours" sublabel="Goal: 8h" trend="+18%" />
                        <StatCard icon="check-square" iconBg="bg-success-bg" iconColor="text-success" value={stats.tasksDone} label="Tasks Done" sublabel={`${tasks.filter((t) => t.status !== 'Done').length} remaining`} trend="+2 tasks" />
                        <StatCard icon="zap" iconBg="bg-warning-bg" iconColor="text-warning" value={stats.streak} label="Streak" sublabel="Personal best!" trend="+3 days" />
                        <StatCard icon="bar-chart-2" iconBg="bg-purple-bg" iconColor="text-purple" value={stats.productivity} label="Productivity" sublabel="vs 78% last week" trend="+14%" />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between rounded-xl border border-primary bg-surface p-4 shadow-[0_0_0_1px_#00c9a720,0_8px_32px_#00c9a15]"
                    >
                        <div className="flex items-center gap-4">
                            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-teal-bg">
                                <Icon name="timer" size={20} />
                                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary border-2 border-background"></span>
                            </div>
                            <div>
                                <div className="text-xs text-foreground-muted">Currently tracking</div>
                                <div className="text-base font-semibold text-foreground">
                                    {tasks.find((t) => t.id === activeTaskId)?.title || 'No active task'}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="font-mono text-3xl font-bold text-primary">{formatTime(timerSeconds)}</div>
                            <div className="flex items-center gap-2">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handlePause}
                                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-warning-bg text-warning text-sm font-semibold"
                                >
                                    <Icon name="pause" size={14} /> Pause
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleStop}
                                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-danger-bg text-danger text-sm font-semibold"
                                >
                                    <Icon name="square" size={14} /> Stop
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleSave}
                                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-teal-bg text-primary text-sm font-semibold"
                                >
                                    <Icon name="save" size={14} /> Save Log
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>

                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-foreground font-headings">Today's Tasks</h2>
                            <button className="flex items-center gap-1 text-sm text-primary font-semibold hover:underline">
                                View all <Icon name="arrow-right" size={14} />
                            </button>
                        </div>

                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-1 bg-surface rounded-lg p-1 border border-border">
                                {(['All Tasks', 'In Progress', 'To Do', 'Done'] as const).map((filter) => (
                                    <FilterButton
                                        key={filter}
                                        label={filter}
                                        count={filter === 'All Tasks' ? tasks.length : tasks.filter((t) => t.status === filter).length}
                                        active={taskFilter === filter}
                                        onClick={() => setTaskFilter(filter)}
                                    />
                                ))}
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface text-xs text-foreground-muted font-semibold hover:bg-surface-2 transition">
                                    <Icon name="sliders-horizontal" size={13} /> Filter
                                </button>
                                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface text-xs text-foreground-muted font-semibold hover:bg-surface-2 transition">
                                    <Icon name="arrow-up-down" size={13} /> Sort
                                </button>
                                <div className="flex items-center rounded-lg border border-border bg-surface overflow-hidden">
                                    <button className="px-2.5 py-1.5 text-foreground-muted border-r border-border hover:text-primary transition">
                                        <Icon name="layout-grid" size={14} />
                                    </button>
                                    <button className="px-2.5 py-1.5 text-primary">
                                        <Icon name="list" size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <AnimatePresence>
                            <div className="grid grid-cols-2 gap-4">
                                {filteredTasks.map((task) => (
                                    <TaskCard
                                        key={task.id}
                                        {...task}
                                        isActive={activeTaskId === task.id}
                                        onPlay={() => handlePlayTask(task.id)}
                                        onPause={handlePauseTask}
                                    />
                                ))}
                            </div>
                        </AnimatePresence>
                    </div>
                </div>

                <RightSidebar quickNote={quickNote} setQuickNote={setQuickNote} />
            </div>

            <AnimatePresence>{showSettings && <SettingsPanel />}</AnimatePresence>
            {showSettings && (
                <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowSettings(false)} />
            )}
        </div>
    );
};

// Helper components
const StatCard: React.FC<{ icon: any; iconBg: string; iconColor: string; value: string; label: string; sublabel: string; trend: string }> = ({
    icon,
    iconBg,
    iconColor,
    value,
    label,
    sublabel,
    trend,
}) => (
    <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300 }} className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-5">
        <div className="flex items-start justify-between">
            <div className={`flex items-center justify-center rounded-lg ${iconBg} ${iconColor} w-10 h-10`}>
                <Icon name={icon} size={18} />
            </div>
            <span className="flex items-center gap-1 text-xs font-semibold rounded-full px-2 py-1 bg-success-bg text-success">
                <Icon name="trending-up" size={11} /> {trend}
            </span>
        </div>
        <div>
            <div className="text-2xl font-bold text-foreground font-headings">{value}</div>
            <div className="text-sm text-foreground-muted mt-0.5">{label}</div>
            <div className="text-xs text-foreground-muted mt-1 opacity-70">{sublabel}</div>
        </div>
    </motion.div>
);

const FilterButton: React.FC<{ label: string; count: number; active: boolean; onClick: () => void }> = ({ label, count, active, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${active ? 'bg-primary text-primary-foreground' : 'text-foreground-muted hover:bg-surface-2'
            }`}
    >
        {label}
        <span className={`rounded-full px-1.5 text-[10px] ${active ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-muted text-foreground-muted'}`}>
            {count}
        </span>
    </button>
);

const TaskCard: React.FC<Task & { isActive: boolean; onPlay: () => void; onPause: () => void }> = ({
    title,
    description,
    category,
    priority,
    priorityColor,
    progress,
    tags,
    comments,
    attachments,
    dueDate,
    timeSpent,
    status,
    statusColor,
    isActive,
    onPlay,
    onPause,
}) => (
    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        whileHover={{ y: -2 }}
        className={`relative flex flex-col gap-3 rounded-xl border bg-surface p-5 ${isActive ? 'border-primary shadow-[0_0_0_1px_#00c9a740]' : 'border-border'}`}
    >
        <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-muted text-foreground-muted">{category}</span>
                <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-${priorityColor}-bg text-${priorityColor}`}>
                    <Icon name={priority === 'High' ? 'arrow-up' : priority === 'Medium' ? 'minus' : 'arrow-down'} size={10} />
                    {priority}
                </span>
            </div>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-border text-foreground-muted hover:bg-surface-2 transition">
                <Icon name="more-horizontal" size={14} />
            </button>
        </div>
        <div>
            <h3 className="font-semibold text-base text-foreground leading-snug">{title}</h3>
            <p className="text-sm text-foreground-muted mt-1 leading-relaxed line-clamp-2">{description}</p>
        </div>
        <div>
            <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-foreground-muted">Progress</span>
                <span className="text-xs font-semibold text-foreground">{progress}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className="h-full rounded-full bg-primary" />
            </div>
        </div>
        <div className="flex gap-1.5 flex-wrap">
            {tags.map((tag) => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-purple-bg text-purple font-medium">
                    {tag}
                </span>
            ))}
        </div>
        <div className="flex items-center justify-between pt-1 border-t border-border">
            <div className="flex items-center gap-3 text-foreground-muted">
                <span className="flex items-center gap-1 text-xs">
                    <Icon name="message-square" size={12} /> {comments}
                </span>
                <span className="flex items-center gap-1 text-xs">
                    <Icon name="paperclip" size={12} /> {attachments}
                </span>
                <span className="flex items-center gap-1 text-xs">
                    <Icon name="calendar" size={12} /> {dueDate}
                </span>
            </div>
            <div className="flex items-center gap-2">
                <div className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-mono font-bold ${timeSpent !== '0h 00m' ? 'bg-teal-bg text-primary' : 'bg-muted text-foreground-muted'}`}>
                    {timeSpent !== '0h 00m' && <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>}
                    {timeSpent}
                </div>
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={isActive ? onPause : onPlay}
                    className={`w-7 h-7 flex items-center justify-center rounded-lg text-sm font-bold transition ${isActive ? 'bg-warning-bg text-warning hover:bg-warning-bg/80' : 'bg-primary-glow text-primary hover:bg-primary-glow/80'
                        }`}
                >
                    <Icon name={isActive ? 'pause' : 'play'} size={12} />
                </motion.button>
            </div>
        </div>
        <div className="absolute top-4 right-12">
            <span
                className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${statusColor === 'primary'
                    ? 'bg-teal-bg text-primary'
                    : statusColor === 'success'
                        ? 'bg-success-bg text-success'
                        : 'bg-muted text-foreground-muted'
                    }`}
            >
                <span className={`w-1.5 h-1.5 rounded-full bg-${statusColor === 'primary' ? 'primary' : statusColor === 'success' ? 'success' : 'foreground-muted'}`}></span>
                {status}
            </span>
        </div>
    </motion.div>
);

const RightSidebar: React.FC<RightSidebarProps> = ({ quickNote, setQuickNote }) => (
    <div className="flex flex-col gap-6 border-l border-border px-6 py-6 w-[300px] flex-shrink-0 overflow-y-auto">
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-5">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-foreground">Weekly Hours</h3>
                <span className="text-xs text-foreground-muted">This week</span>
            </div>
            <div>
                <span className="text-2xl font-bold text-foreground font-headings">34.6h</span>
                <span className="text-xs text-success font-semibold ml-2">+8% vs last week</span>
            </div>
            <div className="flex items-end justify-between gap-2 h-20">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                    const heights = [75, 82, 68, 91, 54, 20, 0];
                    return (
                        <div key={day} className="flex flex-col items-center gap-1 flex-1">
                            <div className="w-full flex flex-col justify-end rounded-sm overflow-hidden h-14">
                                <div className={`w-full rounded-sm ${day === 'Fri' ? 'bg-primary' : 'bg-surface-2'}`} style={{ height: `${heights[i]}%`, minHeight: heights[i] > 0 ? '4px' : '0' }} />
                            </div>
                            <span className={`text-xs font-medium ${day === 'Fri' ? 'text-primary' : 'text-foreground-muted'}`}>{day}</span>
                        </div>
                    );
                })}
            </div>
        </div>

        {/* Category breakdown - similar to original but simplified */}

        <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-5">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-foreground">Time by Category</h3>
                <span className="text-xs text-foreground-muted">This week</span>
            </div>
            <div className="flex flex-col gap-3">
                <div className="flex rounded-full overflow-hidden h-2.5 gap-0.5">
                    <div className="bg-primary rounded-full" style={{ width: '42%' }}></div>
                    <div className="bg-purple rounded-full" style={{ width: '25%' }}></div>
                    <div className="bg-warning rounded-full" style={{ width: '15%' }}></div>
                    <div className="bg-info rounded-full" style={{ width: '12%' }}></div>
                    <div className="bg-muted rounded-full" style={{ width: '6%' }}></div>
                </div>
                <CategoryRow color="bg-primary" label="Development" hours="14.2h" percent="42" textColor="text-primary" />
                <CategoryRow color="bg-purple" label="Design" hours="8.5h" percent="25" textColor="text-purple" />
                <CategoryRow color="bg-warning" label="Meetings" hours="5.1h" percent="15" textColor="text-warning" />
                <CategoryRow color="bg-info" label="Research" hours="4h" percent="12" textColor="text-info" />
                <CategoryRow color="bg-muted" label="Other" hours="2h" percent="6" textColor="text-foreground-muted" />
            </div>
        </div>

        <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-5">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-foreground">Recent Activity</h3>
                <button className="text-xs text-primary font-semibold hover:underline">See all</button>
            </div>
            <ActivityItem icon="check-circle-2" bgColor="bg-success-bg" text="Completed API integration task" time="10 min ago" />
            <ActivityItem icon="play-circle" bgColor="bg-teal-bg" text="Started timer on Dashboard redesign" time="42 min ago" />
            <ActivityItem icon="message-circle" bgColor="bg-purple-bg" text="Added a comment on Sprint planning" time="1h ago" />
            <ActivityItem icon="plus-circle" bgColor="bg-info-bg" text="Created task 'Write unit tests'" time="2h ago" />
            <ActivityItem icon="paperclip" bgColor="bg-warning-bg" text="Attached 3 files to onboarding task" time="3h ago" />
        </div>

        <div className="flex flex-col gap-3 rounded-xl border border-dashed border-border p-4">
            <div className="flex items-center gap-2 text-foreground-muted">
                <Icon name="file-text" size={15} />
                <span className="text-sm font-medium">Quick Note</span>
            </div>
            <textarea
                value={quickNote}
                onChange={(e) => setQuickNote(e.target.value)}
                placeholder="Jot down something..."
                className="rounded-lg bg-surface border border-border px-3 py-2 text-sm text-foreground-muted min-h-16 resize-none focus:outline-none focus:border-primary"
            />
            <button
                onClick={() => alert(`Note saved: ${quickNote}`)}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 transition"
            >
                <Icon name="plus" size={13} />
                <span>Add Note</span>
            </button>
        </div>
    </div>
);

const CategoryRow: React.FC<{ color: string; label: string; hours: string; percent: string; textColor: string }> = ({ color, label, hours, percent, textColor }) => (
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${color}`}></span>
            <span className="text-sm text-foreground-muted">{label}</span>
        </div>
        <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground">{hours}</span>
            <span className={`text-xs font-bold ${textColor}`}>{percent}%</span>
        </div>
    </div>
);

const ActivityItem: React.FC<{ icon: any; bgColor: string; text: string; time: string }> = ({ icon, bgColor, text, time }) => (
    <div className="flex items-start gap-3 py-3 border-b border-border last:border-0">
        <div className={`flex items-center justify-center rounded-lg w-7 h-7 flex-shrink-0 mt-0.5 ${bgColor}`}>
            <Icon name={icon} size={13} />
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-sm text-foreground leading-snug">{text}</p>
            <span className="text-xs text-foreground-muted">{time}</span>
        </div>
    </div>
);

export default Dashboard;