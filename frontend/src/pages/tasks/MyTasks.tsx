import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import StatCard from '@/components/ui/StatCard';
import { useToast } from '@/context/ToastContext';

interface Task {
    id: string;
    title: string;
    category: string;
    tags: string[];
    priority: 'high' | 'medium' | 'low';
    tracked: string;
    dueDate: string;
    status: 'in-progress' | 'todo' | 'done';
    isSelected?: boolean;
    notes?: string;
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
    const { success, warning, info } = useToast();
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [filter, setFilter] = useState<'All Tasks' | 'In Progress' | 'To Do' | 'Done'>('All Tasks');
    const [quickFilter, setQuickFilter] = useState<'none' | 'dueToday' | 'highPriority' | 'inProgress' | 'overdue' | 'noTag'>('none');
    const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
        'in-progress': true,
        todo: true,
        done: true,
    });
    const [activeTaskId, setActiveTaskId] = useState<string | null>('1');
    const [timerSeconds, setTimerSeconds] = useState(9237);
    const [timerRunning, setTimerRunning] = useState(true);
    const [quickNote, setQuickNote] = useState('');
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

    const [isTagModalOpen, setIsTagModalOpen] = useState(false);
    const [bulkTagInput, setBulkTagInput] = useState('');

    useEffect(() => {
        try {
            const custom = localStorage.getItem('custom_tasks');
            if (custom) {
                const parsed = JSON.parse(custom);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setTasks(prev => {
                        const existingIds = new Set(prev.map(p => p.id));
                        const formatted: Task[] = parsed.filter((p: any) => !existingIds.has(String(p.id))).map((p: any) => ({
                            id: String(p.id),
                            title: String(p.title || 'Task'),
                            category: String(p.category || 'General'),
                            tags: Array.isArray(p.tags) ? p.tags : [],
                            priority: (p.priority?.toLowerCase() === 'high' ? 'high' : p.priority?.toLowerCase() === 'low' ? 'low' : 'medium') as 'high' | 'medium' | 'low',
                            tracked: String(p.hoursLogged || '—'),
                            dueDate: String(p.dueDate || 'Today'),
                            status: (p.status === 'In Progress' ? 'in-progress' : p.status === 'Done' ? 'done' : 'todo') as 'in-progress' | 'todo' | 'done',
                        }));
                        return [...formatted, ...prev];
                    });
                }
            }
        } catch {}
    }, []);

    const totalTasks = tasks.length;
    const inProgressCount = tasks.filter(t => t.status === 'in-progress').length;
    const todoCount = tasks.filter(t => t.status === 'todo').length;
    const doneCount = tasks.filter(t => t.status === 'done').length;

    const filteredTasks = tasks.filter(task => {
        if (filter === 'In Progress' && task.status !== 'in-progress') return false;
        if (filter === 'To Do' && task.status !== 'todo') return false;
        if (filter === 'Done' && task.status !== 'done') return false;

        if (quickFilter === 'dueToday' && !task.dueDate.toLowerCase().includes('today')) return false;
        if (quickFilter === 'highPriority' && task.priority !== 'high') return false;
        if (quickFilter === 'inProgress' && task.status !== 'in-progress') return false;
        if (quickFilter === 'overdue' && !task.dueDate.toLowerCase().includes('yesterday') && !task.dueDate.toLowerCase().includes('jul')) return false;
        if (quickFilter === 'noTag' && task.tags.length > 0) return false;

        return true;
    });

    const groupedTasks = statusOrder.reduce((acc, status) => {
        acc[status] = filteredTasks.filter(t => t.status === status);
        return acc;
    }, {} as Record<string, Task[]>);

    useEffect(() => {
        let interval: any;
        if (timerRunning && activeTaskId) {
            interval = setInterval(() => {
                setTimerSeconds(prev => prev + 1);
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
        info('Timer Stopped', 'Timer has been reset.');
    };

    const handlePlayTask = (taskId: string) => {
        setActiveTaskId(taskId);
        setTimerRunning(true);
        const task = tasks.find(t => t.id === taskId);
        if (task && task.tracked !== '—') {
            const parts = task.tracked.split(':').map(Number);
            const secs = (parts[0] || 0) * 3600 + (parts[1] || 0) * 60 + (parts[2] || 0);
            setTimerSeconds(secs);
        } else {
            setTimerSeconds(0);
        }
    };

    const handlePauseTask = () => setTimerRunning(false);

    const selectedTasks = tasks.filter(t => t.isSelected);
    const allSelected = tasks.length > 0 && tasks.every(t => t.isSelected);

    const toggleSelectAll = () => {
        const newSelected = !allSelected;
        setTasks(prev =>
            prev.map(task => ({ ...task, isSelected: newSelected }))
        );
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
        if (selected.length === 0) {
            warning('No Selection', 'Please select tasks to duplicate.');
            return;
        }
        const newTasks = selected.map(task => ({
            ...task,
            id: Date.now() + Math.random().toString(),
            title: `${task.title} (copy)`,
            isSelected: false,
        }));
        setTasks(prev => [...prev, ...newTasks]);
        success('Tasks Duplicated', `Duplicated ${selected.length} task(s).`);
    };

    const handleBulkDelete = () => {
        const selected = tasks.filter(t => t.isSelected);
        if (selected.length === 0) {
            warning('No Selection', 'Please select tasks to delete.');
            return;
        }
        setTasks(prev => prev.filter(task => !task.isSelected));
        success('Tasks Deleted', `Deleted ${selected.length} task(s).`);
    };

    const handleOpenBulkTag = () => {
        const selected = tasks.filter(t => t.isSelected);
        if (selected.length === 0) {
            warning('No Selection', 'Please select tasks to tag.');
            return;
        }
        setIsTagModalOpen(true);
    };

    const handleConfirmBulkTag = (e: React.FormEvent) => {
        e.preventDefault();
        const tag = bulkTagInput.trim();
        if (!tag) return;
        setTasks(prev =>
            prev.map(task =>
                task.isSelected && !task.tags.includes(tag) ? { ...task, tags: [...task.tags, tag] } : task
            )
        );
        success('Tag Added', `Added tag "${tag}" to selected tasks.`);
        setBulkTagInput('');
        setIsTagModalOpen(false);
    };

    const handleAddTask = () => {
        const newTask: Task = {
            id: Date.now().toString(),
            title: 'New Untitled Task',
            category: 'General',
            tags: [],
            priority: 'medium',
            tracked: '—',
            dueDate: 'Today',
            status: 'todo',
            isSelected: false,
        };
        setTasks(prev => [newTask, ...prev]);
        setActiveTaskId(newTask.id);
        success('Task Added', 'New task added to list.');
    };

    const applyQuickFilter = (type: 'dueToday' | 'highPriority' | 'inProgress' | 'overdue' | 'noTag') => {
        setQuickFilter(prev => prev === type ? 'none' : type);
        info('Filter Updated', quickFilter === type ? 'Quick filter cleared.' : `Applied filter: ${type}`);
    };

    const activeTask = tasks.find(t => t.id === activeTaskId);

    const handleSaveNote = () => {
        if (!activeTask) return;
        if (!quickNote.trim()) {
            warning('Empty Note', 'Please type a note first.');
            return;
        }
        setTasks(prev => prev.map(t => t.id === activeTask.id ? { ...t, notes: quickNote.trim() } : t));
        success('Note Saved', `Saved note for "${activeTask.title}".`);
        setQuickNote('');
    };

    return (
        <div className="flex flex-1 min-w-0 overflow-hidden">
            <div className="flex flex-col flex-1 min-w-0 px-8 py-6 gap-6 overflow-y-auto">
                <div className="grid grid-cols-4 gap-4">
                    <StatCard icon="layers" iconBg="bg-info-bg" iconColor="text-info" value={totalTasks.toString()} label="Total Tasks" sublabel="Across all statuses" trend="This week" />
                    <StatCard icon="loader" iconBg="bg-teal-bg" iconColor="text-primary" value={inProgressCount.toString()} label="In Progress" sublabel="Active right now" trend="+1 today" />
                    <StatCard icon="list-todo" iconBg="bg-warning-bg" iconColor="text-warning" value={todoCount.toString()} label="To Do" sublabel="Unstarted tasks" trend="3 due today" trendColor="danger" />
                    <StatCard icon="check-circle-2" iconBg="bg-success-bg" iconColor="text-success" value={doneCount.toString()} label="Completed" sublabel="This week" trend="+3 this week" />
                </div>

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
                        {quickFilter !== 'none' && (
                            <button
                                onClick={() => setQuickFilter('none')}
                                className="px-3 py-1.5 rounded-lg bg-teal-bg text-primary text-xs font-semibold hover:bg-teal-bg/80 transition flex items-center gap-1"
                            >
                                <Icon name="x" size={12} /> Clear Filter ({quickFilter})
                            </button>
                        )}
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

                <div className="flex items-center justify-between rounded-xl border border-border bg-surface-2 px-5 py-3">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleSelectAll}
                            className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 hover:bg-surface-2 transition"
                        >
                            <Icon name="check-square" size={14} />
                            <span className="text-xs font-semibold text-foreground-muted">Select All</span>
                        </button>
                        <button
                            onClick={handleBulkDuplicate}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface text-xs font-semibold text-foreground-muted hover:bg-surface-2 transition"
                        >
                            <Icon name="copy" size={13} /> Duplicate
                        </button>
                        <button
                            onClick={handleOpenBulkTag}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface text-xs font-semibold text-foreground-muted hover:bg-surface-2 transition"
                        >
                            <Icon name="tag" size={13} /> Bulk Tag
                        </button>
                        <button
                            onClick={handleBulkDelete}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-danger-bg bg-danger-bg text-xs font-semibold text-danger hover:bg-danger-bg/80 transition"
                        >
                            <Icon name="trash-2" size={13} /> Delete
                        </button>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-foreground-muted">{selectedTasks.length} tasks selected</span>
                        <button
                            onClick={handleAddTask}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition shadow-sm"
                        >
                            <Icon name="plus" size={13} /> Add Task
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    {statusOrder.map(status => {
                        const tasksInGroup = groupedTasks[status];
                        if (!tasksInGroup.length && filter !== 'All Tasks') return null;
                        if (tasksInGroup.length === 0 && filter === 'All Tasks') return null;
                        return (
                            <div key={status} className="flex flex-col gap-0 rounded-xl border border-border overflow-hidden">
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
                    <button className="text-foreground-muted hover:text-foreground" onClick={() => setActiveTaskId(null)}>
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
                                <button onClick={handlePause} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-warning-bg text-warning text-xs font-bold hover:bg-warning-bg/80 transition">
                                    <Icon name="pause" size={12} /> Pause
                                </button>
                                <button onClick={handleStop} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-danger-bg text-danger text-xs font-bold hover:bg-danger-bg/80 transition">
                                    <Icon name="square" size={12} /> Stop
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <h4 className="text-xs font-bold text-foreground-muted uppercase tracking-wide">Today's Log</h4>
                            <div className="flex items-center justify-between text-xs py-2 border-b border-border">
                                <span className="text-foreground-muted">Total Active Time</span>
                                <span className="font-mono font-bold text-foreground">{formatTime(timerSeconds)}</span>
                            </div>
                            {activeTask.notes && (
                                <div className="p-2.5 rounded-lg border border-border bg-background-2 text-xs text-foreground">
                                    <span className="font-bold block mb-1">Notes:</span>
                                    {activeTask.notes}
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <h4 className="text-xs font-bold text-foreground-muted uppercase tracking-wide">Quick Note</h4>
                            <textarea
                                value={quickNote}
                                onChange={e => setQuickNote(e.target.value)}
                                placeholder="Add a note to the active task..."
                                className="rounded-xl border border-border bg-surface px-3 py-2.5 text-xs text-foreground min-h-16 resize-none focus:outline-none focus:border-primary"
                            />
                            <button
                                onClick={handleSaveNote}
                                className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-surface border border-border text-xs font-semibold text-foreground-muted hover:bg-surface-2 transition"
                            >
                                <Icon name="save" size={12} /> Save Note
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-center text-foreground-muted text-sm py-8">Select a task to view details</div>
                )}

                <div className="flex flex-col gap-3">
                    <h4 className="text-xs font-bold text-foreground-muted uppercase tracking-wide">Quick Filters</h4>
                    <div className="flex flex-wrap gap-2">
                        <QuickFilterChip label="Due Today" active={quickFilter === 'dueToday'} onClick={() => applyQuickFilter('dueToday')} />
                        <QuickFilterChip label="High Priority" active={quickFilter === 'highPriority'} onClick={() => applyQuickFilter('highPriority')} />
                        <QuickFilterChip label="In Progress" active={quickFilter === 'inProgress'} onClick={() => applyQuickFilter('inProgress')} />
                        <QuickFilterChip label="Overdue" active={quickFilter === 'overdue'} onClick={() => applyQuickFilter('overdue')} />
                        <QuickFilterChip label="No Tag" active={quickFilter === 'noTag'} onClick={() => applyQuickFilter('noTag')} />
                    </div>
                </div>
            </div>

            {isTagModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
                    <div className="w-full max-w-sm bg-surface border border-border rounded-2xl shadow-2xl p-6 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-bold text-foreground">Add Tag to Selected Tasks</h3>
                            <button
                                onClick={() => setIsTagModalOpen(false)}
                                className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-foreground-muted hover:bg-surface-2 transition"
                            >
                                <Icon name="x" size={16} />
                            </button>
                        </div>
                        <form onSubmit={handleConfirmBulkTag} className="flex flex-col gap-4">
                            <input
                                type="text"
                                required
                                value={bulkTagInput}
                                onChange={e => setBulkTagInput(e.target.value)}
                                placeholder="Enter tag name, e.g. Frontend, Urgent"
                                className="px-3.5 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary"
                            />
                            <div className="flex items-center justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsTagModalOpen(false)}
                                    className="px-4 py-2 rounded-lg border border-border bg-surface text-xs font-semibold text-foreground-muted hover:bg-surface-2 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition shadow-sm"
                                >
                                    Apply Tag
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

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
            </div>
        </div>
    );
};

const QuickFilterChip: React.FC<{ label: string; active?: boolean; onClick: () => void }> = ({ label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`text-xs px-2.5 py-1 rounded-full border transition font-medium ${active ? 'bg-primary border-primary text-primary-foreground' : 'border-border text-foreground-muted hover:border-primary hover:text-primary'}`}
    >
        {label}
    </button>
);

export default MyTasks;