import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../components/ui/Icon';

interface Task {
    id: string;
    title: string;
    category: string;
    tags: string[];
    priority: 'high' | 'medium' | 'low';
    tracked: string; // formatted time
    dueDate: string;
    status: 'in-progress' | 'todo' | 'done';
    isSelected?: boolean;
}

const initialTasks: Task[] = [
    {
        id: '1',
        title: 'Design new onboarding flow',
        category: 'Design',
        tags: ['UI', 'UX'],
        priority: 'high',
        tracked: '2:34:17',
        dueDate: 'Today',
        status: 'in-progress',
    },
    {
        id: '2',
        title: 'Integrate payment gateway API',
        category: 'Development',
        tags: ['Backend'],
        priority: 'high',
        tracked: '1:10:05',
        dueDate: 'Today',
        status: 'in-progress',
    },
    {
        id: '3',
        title: 'Write unit tests for auth module',
        category: 'Testing',
        tags: ['Testing'],
        priority: 'medium',
        tracked: '—',
        dueDate: 'Tomorrow',
        status: 'todo',
    },
    {
        id: '4',
        title: 'Weekly sprint retrospective slides',
        category: 'Meeting',
        tags: ['Sprint'],
        priority: 'low',
        tracked: '—',
        dueDate: 'Fri Jul 19',
        status: 'todo',
    },
    {
        id: '5',
        title: 'Fix mobile nav z-index bug',
        category: 'Development',
        tags: ['Bug', 'Frontend'],
        priority: 'high',
        tracked: '—',
        dueDate: 'Today',
        status: 'todo',
    },
    {
        id: '6',
        title: 'Research competitor pricing pages',
        category: 'Research',
        tags: [],
        priority: 'medium',
        tracked: '—',
        dueDate: 'Mon Jul 22',
        status: 'todo',
    },
    {
        id: '7',
        title: 'Update API documentation',
        category: 'Documentation',
        tags: [],
        priority: 'low',
        tracked: '—',
        dueDate: 'Wed Jul 24',
        status: 'todo',
    },
    {
        id: '8',
        title: 'Sprint planning meeting',
        category: 'Meeting',
        tags: ['Team'],
        priority: 'medium',
        tracked: '0:45:00',
        dueDate: 'Yesterday',
        status: 'done',
    },
    {
        id: '9',
        title: 'Deploy staging environment',
        category: 'Development',
        tags: ['DevOps'],
        priority: 'high',
        tracked: '1:20:00',
        dueDate: 'Yesterday',
        status: 'done',
    },
    {
        id: '10',
        title: 'Review pull request #142',
        category: 'Development',
        tags: ['Review'],
        priority: 'medium',
        tracked: '0:30:00',
        dueDate: 'Jul 16',
        status: 'done',
    },
];

const statusOrder = ['in-progress', 'todo', 'done'] as const;
const statusLabels = {
    'in-progress': 'In Progress',
    todo: 'To Do',
    done: 'Done',
};
const statusColors = {
    'in-progress': 'bg-primary',
    todo: 'bg-foreground-muted',
    done: 'bg-success',
};

const MyTasks: React.FC = () => {
    // ----- State -----
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [filter, setFilter] = useState<'All Tasks' | 'In Progress' | 'To Do' | 'Done'>('All Tasks');
    const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
        'in-progress': true,
        todo: true,
        done: true,
    });
    const [activeTaskId, setActiveTaskId] = useState<string | null>('1');
    const [timerSeconds, setTimerSeconds] = useState(9237); // 2:34:17
    const [timerRunning, setTimerRunning] = useState(true);
    const [quickNote, setQuickNote] = useState('');
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list'); // list is default

    // Derived: total tasks, counts per status
    const totalTasks = tasks.length;
    const inProgressCount = tasks.filter(t => t.status === 'in-progress').length;
    const todoCount = tasks.filter(t => t.status === 'todo').length;
    const doneCount = tasks.filter(t => t.status === 'done').length;

    // Filtered tasks based on top filter
    const filteredTasks = tasks.filter(task => {
        if (filter === 'All Tasks') return true;
        if (filter === 'In Progress') return task.status === 'in-progress';
        if (filter === 'To Do') return task.status === 'todo';
        if (filter === 'Done') return task.status === 'done';
        return true;
    });

    // Group filtered tasks by status
    const groupedTasks = statusOrder.reduce((acc, status) => {
        acc[status] = filteredTasks.filter(t => t.status === status);
        return acc;
    }, {} as Record<string, Task[]>);

    // ----- Timer logic -----
    useEffect(() => {
        let interval: number;
        if (timerRunning && activeTaskId) {
            interval = setInterval(() => {
                setTimerSeconds(prev => prev + 1);
                // Also update the tracked time for the active task in tasks state
                setTasks(prevTasks =>
                    prevTasks.map(task =>
                        task.id === activeTaskId
                            ? { ...task, tracked: formatTime(timerSeconds + 1) }
                            : task
                    )
                );
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timerRunning, activeTaskId, timerSeconds]);

    const formatTime = (secs: number) => {
        const h = Math.floor(secs / 3600);
        const m = Math.floor((secs % 3600) / 60);
        const s = secs % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const formatSeconds = (secs: number): string => {
        const h = Math.floor(secs / 3600);
        const m = Math.floor((secs % 3600) / 60);
        const s = secs % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handlePause = () => setTimerRunning(false);
    const handleStop = () => {
        setTimerRunning(false);
        setTimerSeconds(0);
        if (activeTaskId) {
            setTasks(prev =>
                prev.map(task =>
                    task.id === activeTaskId ? { ...task, tracked: '0:00:00' } : task
                )
            );
        }
    };

    const handlePlayTask = (taskId: string) => {
        setActiveTaskId(taskId);
        setTimerRunning(true);
        // Reset timer seconds to the task's current tracked time (parse hh:mm:ss)
        const task = tasks.find(t => t.id === taskId);
        if (task && task.tracked !== '—') {
            const parts = task.tracked.split(':').map(Number);
            const secs = parts[0] * 3600 + parts[1] * 60 + (parts[2] || 0);
            setTimerSeconds(secs);
        } else {
            setTimerSeconds(0);
        }
    };

    const handlePauseTask = () => setTimerRunning(false);

    const [selectAll, setSelectAll] = useState(false);
    const selectedTasks = tasks.filter(t => t.isSelected);
    const allSelected = tasks.length > 0 && tasks.every(t => t.isSelected);

    const toggleSelectAll = () => {
        const newSelected = !allSelected;
        setTasks(prev =>
            prev.map(task => ({ ...task, isSelected: newSelected }))
        );
        setSelectAll(newSelected);
    };

    const toggleSelectTask = (taskId: string) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === taskId ? { ...task, isSelected: !task.isSelected } : task
            )
        );
    };

    const handleBulkDuplicate = () => {
        const selected = tasks.filter(t => t.isSelected);
        const newTasks = selected.map(task => ({
            ...task,
            id: Date.now() + Math.random().toString(),
            title: `${task.title} (copy)`,
            isSelected: false,
        }));
        setTasks([...tasks, ...newTasks]);
    };

    const handleBulkDelete = () => {
        setTasks(prev => prev.filter(task => !task.isSelected));
    };

    const handleBulkTag = () => {
        const tag = prompt('Enter tag name:');
        if (tag) {
            setTasks(prev =>
                prev.map(task =>
                    task.isSelected ? { ...task, tags: [...task.tags, tag] } : task
                )
            );
        }
    };

    const handleAddTask = () => {
        const newTask: Task = {
            id: Date.now().toString(),
            title: 'New task',
            category: 'General',
            tags: [],
            priority: 'medium',
            tracked: '—',
            dueDate: 'Today',
            status: 'todo',
            isSelected: false,
        };
        setTasks([newTask, ...tasks]);
    };

    // ----- Quick filters (client‑side) -----
    const applyQuickFilter = (type: string) => {
        let filtered: Task[] = [];
        switch (type) {
            case 'dueToday':
                filtered = tasks.filter(t => t.dueDate === 'Today');
                break;
            case 'highPriority':
                filtered = tasks.filter(t => t.priority === 'high');
                break;
            case 'inProgress':
                filtered = tasks.filter(t => t.status === 'in-progress');
                break;
            case 'overdue':
                filtered = tasks.filter(t => t.dueDate === 'Yesterday');
                break;
            case 'noTag':
                filtered = tasks.filter(t => t.tags.length === 0);
                break;
            default:
                filtered = tasks;
        }
        // Replace tasks with filtered? Or just set a temporary view? For simplicity, we'll set filter state.
        if (type === 'inProgress') setFilter('In Progress');
        else if (type === 'dueToday') setFilter('All Tasks'); // but you'd need a custom filter. For demo, we'll just set a message.
        alert(`Quick filter "${type}" applied (demo) – implement full filtering later.`);
    };

    const activeTask = tasks.find(t => t.id === activeTaskId);

    return (
        <div className="flex flex-1 min-w-0 overflow-hidden">
            <div className="flex flex-col flex-1 min-w-0 px-8 py-6 gap-6 overflow-y-auto">
                <div className="grid grid-cols-4 gap-4">
                    <StatCard icon="layers" iconBg="bg-info-bg" iconColor="text-info" value={totalTasks.toString()} label="Total Tasks" sublabel="Across all statuses" trend="This week" />
                    <StatCard icon="loader" iconBg="bg-teal-bg" iconColor="text-primary" value={inProgressCount.toString()} label="In Progress" sublabel="Active right now" trend="+1 today" />
                    <StatCard icon="list-todo" iconBg="bg-warning-bg" iconColor="text-warning" value={todoCount.toString()} label="To Do" sublabel="Unstarted tasks" trend="3 due today" trendColor="danger" />
                    <StatCard icon="check-circle-2" iconBg="bg-success-bg" iconColor="text-success" value={doneCount.toString()} label="Completed" sublabel="This week" trend="+3 this week" />
                </div>

                {/* Filter bar & view toggle */}
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-1 bg-surface rounded-lg p-1 border border-border">
                        {(['All Tasks', 'In Progress', 'To Do', 'Done'] as const).map((f) => (
                            <FilterButton
                                key={f}
                                label={f}
                                count={
                                    f === 'All Tasks'
                                        ? totalTasks
                                        : f === 'In Progress'
                                            ? inProgressCount
                                            : f === 'To Do'
                                                ? todoCount
                                                : doneCount
                                }
                                active={filter === f}
                                onClick={() => setFilter(f)}
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
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`px-2.5 py-1.5 ${viewMode === 'grid' ? 'text-primary' : 'text-foreground-muted'} border-r border-border hover:text-primary transition`}
                            >
                                <Icon name="layout-grid" size={14} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`px-2.5 py-1.5 ${viewMode === 'list' ? 'text-primary' : 'text-foreground-muted'} hover:text-primary transition`}
                            >
                                <Icon name="list" size={14} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bulk actions bar */}
                <div className="flex items-center justify-between rounded-xl border border-border bg-surface-2 px-5 py-3">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleSelectAll}
                            className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5"
                        >
                            <Icon name="check-square" size={14} />
                            <span className="text-xs font-semibold text-foreground-muted">Select All</span>
                        </button>
                        <button
                            onClick={handleBulkDuplicate}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface text-xs font-semibold text-foreground-muted hover:bg-surface-2"
                        >
                            <Icon name="copy" size={13} /> Duplicate
                        </button>
                        <button
                            onClick={handleBulkTag}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface text-xs font-semibold text-foreground-muted hover:bg-surface-2"
                        >
                            <Icon name="tag" size={13} /> Bulk Tag
                        </button>
                        <button
                            onClick={handleBulkDelete}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-danger-bg bg-danger-bg text-xs font-semibold text-danger hover:bg-danger-bg/80"
                        >
                            <Icon name="trash-2" size={13} /> Delete
                        </button>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-foreground-muted">{selectedTasks.length} tasks selected</span>
                        <button
                            onClick={handleAddTask}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold"
                        >
                            <Icon name="plus" size={13} /> Add Task
                        </button>
                    </div>
                </div>

                {/* Task groups */}
                <div className="flex flex-col gap-6">
                    {statusOrder.map(status => {
                        const tasksInGroup = groupedTasks[status];
                        if (!tasksInGroup.length && filter !== 'All Tasks') return null;
                        if (tasksInGroup.length === 0 && filter === 'All Tasks') return null;
                        return (
                            <div key={status} className="flex flex-col gap-0 rounded-xl border border-border overflow-hidden">
                                {/* Group header */}
                                <div className="flex items-center gap-3 px-5 py-3 bg-background-3 border-b border-border">
                                    <span className={`w-2.5 h-2.5 rounded-full ${statusColors[status]}`}></span>
                                    <span className="text-sm font-bold text-foreground">{statusLabels[status]}</span>
                                    <span className="text-xs font-bold text-foreground-muted bg-muted rounded-full px-2 py-0.5">
                                        {tasksInGroup.length}
                                    </span>
                                    <button
                                        onClick={() => setExpandedGroups(prev => ({ ...prev, [status]: !prev[status] }))}
                                        className="ml-auto flex items-center gap-1 text-xs text-foreground-muted"
                                    >
                                        <Icon name="chevron-down" size={13} className={`transition-transform ${expandedGroups[status] ? '' : 'rotate-180'}`} />
                                    </button>
                                </div>
                                {expandedGroups[status] && (
                                    <>
                                        {/* Table header */}
                                        <div className="flex items-center gap-4 px-5 py-2 bg-background-2 border-b border-border">
                                            <div className="w-4 flex-shrink-0"></div>
                                            <div className="flex-1 text-xs font-semibold text-foreground-muted uppercase tracking-wide">Task</div>
                                            <div className="w-24 text-xs font-semibold text-foreground-muted uppercase tracking-wide text-center">Category</div>
                                            <div className="w-20 text-xs font-semibold text-foreground-muted uppercase tracking-wide text-center">Tags</div>
                                            <div className="w-20 text-xs font-semibold text-foreground-muted uppercase tracking-wide text-center">Priority</div>
                                            <div className="w-24 text-xs font-semibold text-foreground-muted uppercase tracking-wide text-center">Tracked</div>
                                            <div className="w-24 text-xs font-semibold text-foreground-muted uppercase tracking-wide text-center">Due</div>
                                            <div className="w-14"></div>
                                        </div>
                                        {/* Rows */}
                                        {tasksInGroup.map(task => (
                                            <TaskRow
                                                key={task.id}
                                                task={task}
                                                isSelected={task.isSelected || false}
                                                isActive={activeTaskId === task.id}
                                                onSelect={() => toggleSelectTask(task.id)}
                                                onPlay={() => handlePlayTask(task.id)}
                                                onPause={handlePauseTask}
                                                onRowClick={() => setActiveTaskId(task.id)}
                                            />
                                        ))}
                                        {/* Add task row */}
                                        <button
                                            onClick={handleAddTask}
                                            className="flex items-center gap-2 px-5 py-3 text-xs text-foreground-muted border-t border-border bg-surface hover:bg-surface-2 transition"
                                        >
                                            <Icon name="plus" size={13} /> Add a task
                                        </button>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="task-side-details flex flex-col gap-5 border-l border-border px-6 py-6 flex-shrink-0 overflow-y-auto" style={{ maxWidth: '300px' }}>
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-foreground">Task Detail</h3>
                    <button className="text-foreground-muted" onClick={() => setActiveTaskId(null)}>
                        <Icon name="x" size={15} />
                    </button>
                </div>
                {activeTask ? (
                    <>
                        <div className="rounded-xl border border-primary bg-teal-bg p-4 flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-primary"></span>
                                <span className="text-xs font-bold text-primary">Currently Active</span>
                            </div>
                            <div className="text-sm font-bold text-foreground">{activeTask.title}</div>
                            <div className="font-mono text-2xl font-bold text-primary">{formatTime(timerSeconds)}</div>
                            <div className="flex gap-2">
                                <button onClick={handlePause} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-warning-bg text-warning text-xs font-bold">
                                    <Icon name="pause" size={12} /> Pause
                                </button>
                                <button onClick={handleStop} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-danger-bg text-danger text-xs font-bold">
                                    <Icon name="square" size={12} /> Stop
                                </button>
                            </div>
                        </div>
                        {/* Today's Log */}
                        <div className="flex flex-col gap-3">
                            <h4 className="text-xs font-bold text-foreground-muted uppercase tracking-wide">Today's Log</h4>
                            {tasks.filter(t => t.status === 'done' && t.tracked !== '—').slice(0, 3).map(task => (
                                <div key={task.id} className="flex items-center gap-3 rounded-lg bg-surface border border-border px-3 py-2.5">
                                    <div className="flex-1 min-w-0">
                                        <div className="text-xs font-semibold text-foreground truncate">{task.title}</div>
                                        <div className="text-xs text-foreground-muted">{task.category}</div>
                                    </div>
                                    <span className="text-xs font-mono font-bold text-warning">{task.tracked}</span>
                                </div>
                            ))}
                            <div className="flex items-center justify-between rounded-lg bg-background-2 border border-border px-3 py-2.5">
                                <span className="text-xs font-bold text-foreground">Total Today</span>
                                <span className="text-xs font-mono font-bold text-primary">
                                    {formatSeconds(
                                        tasks.reduce((total, task) => {
                                            if (task.tracked !== '—') {
                                                const parts = task.tracked.split(':').map(Number);
                                                return total + (parts[0] * 3600 + parts[1] * 60 + (parts[2] || 0));
                                            }
                                            return total;
                                        }, 0)
                                    )}
                                </span>
                            </div>
                        </div>
                        {/* Quick Note */}
                        <div className="flex flex-col gap-2">
                            <h4 className="text-xs font-bold text-foreground-muted uppercase tracking-wide">Quick Note</h4>
                            <textarea
                                value={quickNote}
                                onChange={e => setQuickNote(e.target.value)}
                                placeholder="Add a note to the active task..."
                                className="rounded-xl border border-border bg-surface px-3 py-2.5 text-xs text-foreground-muted min-h-16 resize-none focus:outline-none focus:border-primary"
                            />
                            <button
                                onClick={() => alert(`Note saved for ${activeTask.title}: ${quickNote}`)}
                                className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-surface border border-border text-xs font-semibold text-foreground-muted hover:bg-surface-2"
                            >
                                <Icon name="save" size={12} /> Save Note
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-center text-foreground-muted text-sm py-8">Select a task to view details</div>
                )}
                {/* Quick Filters */}
                <div className="flex flex-col gap-3">
                    <h4 className="text-xs font-bold text-foreground-muted uppercase tracking-wide">Quick Filters</h4>
                    <div className="flex flex-wrap gap-2">
                        <QuickFilterChip label="Due Today" onClick={() => applyQuickFilter('dueToday')} />
                        <QuickFilterChip label="High Priority" onClick={() => applyQuickFilter('highPriority')} />
                        <QuickFilterChip label="In Progress" onClick={() => applyQuickFilter('inProgress')} />
                        <QuickFilterChip label="Overdue" onClick={() => applyQuickFilter('overdue')} />
                        <QuickFilterChip label="No Tag" onClick={() => applyQuickFilter('noTag')} />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper components
const StatCard: React.FC<{ icon: any; iconBg: string; iconColor: string; value: string; label: string; sublabel: string; trend: string; trendColor?: string }> = ({
    icon, iconBg, iconColor, value, label, sublabel, trend, trendColor = 'success'
}) => (
    <motion.div whileHover={{ y: -4 }} className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-5">
        <div className="flex items-start justify-between">
            <div className={`flex items-center justify-center rounded-lg ${iconBg} ${iconColor} w-10 h-10`}>
                <Icon name={icon} size={18} />
            </div>
            <span className={`flex items-center gap-1 text-xs font-semibold rounded-full px-2 py-1 bg-${trendColor}-bg text-${trendColor}`}>
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

const TaskRow: React.FC<{
    task: Task;
    isSelected: boolean;
    isActive: boolean;
    onSelect: () => void;
    onPlay: () => void;
    onPause: () => void;
    onRowClick: () => void;
}> = ({ task, isSelected, isActive, onSelect, onPlay, onPause, onRowClick }) => {
    const priorityColor = task.priority === 'high' ? 'bg-danger' : task.priority === 'medium' ? 'bg-warning' : 'bg-info';
    const priorityLabel = task.priority === 'high' ? 'high' : task.priority === 'medium' ? 'medium' : 'low';

    return (
        <div
            className={`flex items-center gap-4 px-5 py-3.5 border-b border-border cursor-pointer transition-colors ${isActive ? 'bg-teal-bg' : 'bg-surface hover:bg-surface-2'
                }`}
            onClick={onRowClick}
        >
            <div className="w-4 flex-shrink-0" onClick={e => { e.stopPropagation(); onSelect(); }}>
                <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${isSelected ? 'bg-primary border-primary' : 'border-foreground-muted'}`} />
            </div>
            <div className="flex-1 min-w-0">
                <div className={`text-sm font-semibold truncate ${isActive ? 'text-primary' : 'text-foreground'}`}>{task.title}</div>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-muted text-foreground-muted font-medium flex-shrink-0">{task.category}</span>
            <div className="flex gap-1 flex-shrink-0">
                {task.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-purple-bg text-purple font-medium">{tag}</span>
                ))}
                {task.tags.length > 2 && <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-foreground-muted">+{task.tags.length - 2}</span>}
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
                <span className={`w-2 h-2 rounded-full ${priorityColor}`}></span>
                <span className="text-xs text-foreground-muted capitalize">{priorityLabel}</span>
            </div>
            <div className={`flex items-center gap-1.5 text-xs font-mono font-bold rounded-lg px-2.5 py-1 flex-shrink-0 ${task.tracked !== '—' ? (isActive ? 'bg-primary text-primary-foreground' : 'bg-teal-bg text-primary') : 'bg-muted text-foreground-muted'
                }`}>
                {task.tracked !== '—' && <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>}
                {task.tracked}
            </div>
            <div className="flex items-center gap-1 text-xs text-foreground-muted flex-shrink-0">
                <Icon name="calendar" size={12} /> {task.dueDate}
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
                <button
                    onClick={e => { e.stopPropagation(); isActive ? onPause() : onPlay(); }}
                    className="w-6 h-6 flex items-center justify-center rounded text-foreground-muted hover:text-primary transition"
                >
                    <Icon name={isActive ? 'pause' : 'play'} size={13} />
                </button>
                <button className="w-6 h-6 flex items-center justify-center rounded text-foreground-muted hover:text-primary transition">
                    <Icon name="more-horizontal" size={13} />
                </button>
            </div>
        </div>
    );
};

const QuickFilterChip: React.FC<{ label: string; onClick: () => void }> = ({ label, onClick }) => (
    <button onClick={onClick} className="text-xs px-2.5 py-1 rounded-full border border-border text-foreground-muted hover:border-primary hover:text-primary transition">
        {label}
    </button>
);

export default MyTasks;