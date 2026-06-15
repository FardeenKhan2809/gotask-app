import React, { useState, useEffect } from 'react';
import Icon from '../../components/ui/Icon';

interface Session {
    id: string;
    taskName: string;
    category: string;
    startTime: string;
    endTime?: string;
    durationMinutes: number;
    color: string;
    progressWidth?: number;
    isLive?: boolean;
}

interface LogEntry {
    id: string;
    taskName: string;
    category: string;
    start: string;
    end: string;
    durationMinutes: number;
    date: string;
    color: string;
}

const formatDurationShort = (minutes: number): string => {
    const rounded = Math.round(minutes);
    const h = Math.floor(rounded / 60);
    const m = rounded % 60;
    if (h === 0) return `${m}m`;
    if (m === 0) return `${h}h`;
    return `${h}h ${m}m`;
};

const TimeTracker: React.FC = () => {
    const [activeTask, setActiveTask] = useState({
        name: 'Design new onboarding flow',
        category: 'Design',
        startTime: '09:12 AM',
        userId: 'Aryan Mehta',
    });
    const [timerSeconds, setTimerSeconds] = useState(9237);
    const [timerRunning, setTimerRunning] = useState(true);
    const [goalSeconds, setGoalSeconds] = useState(14400);

    const [sessions, setSessions] = useState<Session[]>([
        {
            id: '1',
            taskName: 'Design new onboarding flow',
            category: 'Design',
            startTime: '09:12 AM',
            durationMinutes: 154,
            color: 'bg-purple',
            progressWidth: 65,
            isLive: true,
        },
        {
            id: '2',
            taskName: 'Sprint planning meeting',
            category: 'Meeting',
            startTime: '08:00 AM',
            endTime: '08:45 AM',
            durationMinutes: 45,
            color: 'bg-warning',
            progressWidth: 19,
        },
        {
            id: '3',
            taskName: 'Integrate payment API',
            category: 'Development',
            startTime: '07:30 AM',
            endTime: '08:00 AM',
            durationMinutes: 30,
            color: 'bg-primary',
            progressWidth: 13,
        },
    ]);

    const [logHistory, setLogHistory] = useState<LogEntry[]>([
        { id: '101', taskName: 'Write unit tests', category: 'Testing', start: '09:00', end: '11:10', durationMinutes: 130, date: 'Jul 17', color: 'bg-info' },
        { id: '102', taskName: 'Research competitor pricing', category: 'Research', start: '11:30', end: '13:15', durationMinutes: 105, date: 'Jul 17', color: 'bg-success' },
        { id: '103', taskName: 'Team sync call', category: 'Meeting', start: '14:00', end: '14:30', durationMinutes: 30, date: 'Jul 17', color: 'bg-warning' },
        { id: '104', taskName: 'Fix nav z-index bug', category: 'Development', start: '15:00', end: '18:00', durationMinutes: 180, date: 'Jul 17', color: 'bg-primary' },
        { id: '105', taskName: 'Design system tokens', category: 'Design', start: '09:00', end: '12:30', durationMinutes: 210, date: 'Jul 16', color: 'bg-purple' },
        { id: '106', taskName: 'API documentation', category: 'Docs', start: '13:30', end: '15:50', durationMinutes: 140, date: 'Jul 16', color: 'bg-success' },
        { id: '107', taskName: 'Deploy staging env', category: 'Development', start: '16:00', end: '18:15', durationMinutes: 135, date: 'Jul 16', color: 'bg-primary' },
    ]);

    useEffect(() => {
        let interval: number;
        if (timerRunning) {
            interval = setInterval(() => {
                setTimerSeconds(prev => prev + 1);
                setSessions(prevSessions =>
                    prevSessions.map(s =>
                        s.isLive ? { ...s, durationMinutes: s.durationMinutes + 1 / 60 } : s
                    )
                );
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timerRunning]);

    const formatTime = (secs: number) => {
        const h = Math.floor(secs / 3600);
        const m = Math.floor((secs % 3600) / 60);
        const s = secs % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const percentOfGoal = (timerSeconds / goalSeconds) * 100;

    const handlePause = () => setTimerRunning(false);
    const handleStop = () => {
        setTimerRunning(false);
        setTimerSeconds(0);
        setSessions(prev =>
            prev.map(s =>
                s.isLive ? { ...s, endTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), isLive: false } : s
            )
        );
    };
    const handleSave = () => {
        alert(`Saved ${formatTime(timerSeconds)} for "${activeTask.name}"`);
    };

    const quickStart = (taskName: string) => {
        setActiveTask(prev => ({ ...prev, name: taskName }));
        setTimerSeconds(0);
        setTimerRunning(true);
        const newSession: Session = {
            id: Date.now().toString(),
            taskName,
            category: taskName.includes('API') ? 'Development' : taskName.includes('tests') ? 'Testing' : 'General',
            startTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            durationMinutes: 0,
            color: 'bg-primary',
            isLive: true,
        };
        setSessions(prev => [newSession, ...prev]);
    };

    const [manualDate, setManualDate] = useState('Jul 18');
    const [manualTimeRange, setManualTimeRange] = useState('09:00 – 10:30');
    const [manualTaskName, setManualTaskName] = useState('');

    const handleManualLog = () => {
        if (!manualTaskName) return;
        const [start, end] = manualTimeRange.split(' – ');
        const durationMinutes = 90;
        const newEntry: LogEntry = {
            id: Date.now().toString(),
            taskName: manualTaskName,
            category: 'Manual',
            start,
            end,
            durationMinutes,
            date: manualDate,
            color: 'bg-muted',
        };
        setLogHistory(prev => [newEntry, ...prev]);
        alert(`Logged ${manualTaskName} for ${durationMinutes} minutes`);
        setManualTaskName('');
    };

    const groupedLogs = logHistory.reduce((acc, entry) => {
        if (!acc[entry.date]) acc[entry.date] = [];
        acc[entry.date].push(entry);
        return acc;
    }, {} as Record<string, LogEntry[]>);

    const totalMinutesToday = sessions.reduce((sum, s) => sum + (s.durationMinutes || 0), 0);
    const goalMinutes = 480;

    return (
        <div className="flex flex-col flex-1 min-w-0">
            <div className="flex flex-1 min-w-0">
                <div className="flex flex-col flex-1 min-w-0 px-8 py-6 gap-7 overflow-y-auto">
                    <div className="relative rounded-2xl border border-primary overflow-hidden"
                        style={{
                            background: 'linear-gradient(135deg, #0f1117 0%, #1a2030 60%, #00c9a710 100%)',
                            boxShadow: '0 0 64px #00c9a720, 0 0 0 1px #00c9a730',
                        }}>
                        <div className="absolute top-0 right-0 w-64 h-64 rounded-full"
                            style={{ background: 'radial-gradient(circle, #00c9a720 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
                        <div className="relative flex items-center justify-between px-8 py-7 z-10">
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                                    <span className="text-xs font-bold text-primary uppercase tracking-widest">Live Tracking</span>
                                </div>
                                <h2 className="font-headings font-bold text-foreground text-[22px] max-w-[400px]">
                                    {activeTask.name}
                                </h2>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs px-2.5 py-1 rounded-full bg-purple-bg text-purple font-semibold">
                                        {activeTask.category}
                                    </span>
                                    <span className="flex items-center gap-1 text-xs text-foreground-muted">
                                        <Icon name="calendar" size={12} /> Started {activeTask.startTime}
                                    </span>
                                    <span className="flex items-center gap-1 text-xs text-foreground-muted">
                                        <Icon name="user" size={12} /> {activeTask.userId}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-5">
                                <div className="relative flex items-center justify-center">
                                    <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
                                        <circle cx="60" cy="60" r="52" fill="none" stroke="#2a3347" strokeWidth="6" />
                                        <circle cx="60" cy="60" r="52" fill="none" stroke="#00c9a7" strokeWidth="6"
                                            strokeLinecap="round" strokeDasharray="326.7" strokeDashoffset={326.7 * (1 - percentOfGoal / 100)} />
                                    </svg>
                                    <div className="absolute flex flex-col items-center">
                                        <span className="font-mono font-bold text-primary text-[26px] tracking-[-1px]">
                                            {formatTime(timerSeconds)}
                                        </span>
                                        <span className="text-xs text-foreground-muted">{Math.round(percentOfGoal)}% of goal</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button onClick={handlePause}
                                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-warning-bg border border-warning text-warning text-sm font-bold">
                                        <Icon name="pause" size={15} /> Pause
                                    </button>
                                    <button onClick={handleStop}
                                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-danger-bg border border-danger text-danger text-sm font-bold">
                                        <Icon name="square" size={15} /> Stop
                                    </button>
                                    <button onClick={handleSave}
                                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-bg border border-primary text-primary text-sm font-bold">
                                        <Icon name="save" size={15} /> Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-bold text-foreground">Today's Sessions <span className="text-foreground-muted font-normal text-sm">— Jul 18</span></h3>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold text-foreground-muted">Total:</span>
                                <span className="text-sm font-bold text-primary">{formatDurationShort(totalMinutesToday)}</span>
                                <span className="text-xs text-foreground-muted">/ {formatDurationShort(goalMinutes)} goal</span>
                                <div className="w-24 h-2 rounded-full bg-muted overflow-hidden ml-2">
                                    <div className="h-full rounded-full bg-primary" style={{ width: `${(totalMinutesToday / goalMinutes) * 100}%` }} />
                                </div>
                                <span className="text-xs font-bold text-foreground-muted">{Math.round((totalMinutesToday / goalMinutes) * 100)}%</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 rounded-xl border border-border bg-surface p-5">
                            <div className="flex items-center gap-1 text-xs text-foreground-muted mb-2">
                                {['6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM'].map(h => (
                                    <div key={h} className="flex-1 text-center text-[10px]">{h}</div>
                                ))}
                            </div>
                            <div className="relative h-10 rounded-lg bg-background-2 border border-border overflow-hidden">
                                <div className="absolute h-full bg-primary opacity-80 rounded" style={{ left: '12.5%', width: '4.2%' }}>
                                    <div className="h-full flex items-center justify-center"><span className="text-xs font-bold text-primary-foreground text-[9px]">API</span></div>
                                </div>
                                <div className="absolute h-full bg-warning opacity-80 rounded" style={{ left: '16.7%', width: '6.25%' }}>
                                    <div className="h-full flex items-center justify-center"><span className="text-xs font-bold text-primary-foreground text-[9px]">Mtg</span></div>
                                </div>
                                <div className="absolute h-full rounded" style={{ left: '25.8%', width: '36%', background: 'linear-gradient(90deg, #8b5cf6, #00c9a7)' }}>
                                    <div className="h-full flex items-center justify-center"><span className="text-xs font-bold text-white">Design · 2h 34m</span></div>
                                </div>
                                <div className="absolute top-0 bottom-0 w-0.5 bg-primary" style={{ left: '61.8%' }}>
                                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary" />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            {sessions.map(session => (
                                <div key={session.id} className={`flex items-center gap-4 rounded-xl border px-5 py-4 ${session.isLive ? 'border-primary bg-teal-bg' : 'border-border bg-surface'}`}>
                                    <div className={`w-1 h-10 rounded-full ${session.color} flex-shrink-0`} />
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-semibold text-foreground truncate">{session.taskName}</div>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-muted text-purple">{session.category}</span>
                                            <span className="text-xs text-foreground-muted">{session.startTime} → {session.endTime || 'Now'}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-1.5 w-[120px]">
                                        <span className="font-mono text-sm font-bold text-foreground">{formatDurationShort(session.durationMinutes)}</span>
                                        {session.progressWidth && (
                                            <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                                                <div className="h-full rounded-full bg-purple" style={{ width: `${session.progressWidth}%` }} />
                                            </div>
                                        )}
                                    </div>
                                    {session.isLive && (
                                        <div className="flex items-center gap-1 text-xs font-bold text-primary px-2.5 py-1 rounded-full bg-primary border border-primary text-primary-foreground">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground" /> Live
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className="text-base font-bold text-foreground">Log History</h3>
                        {Object.entries(groupedLogs).map(([date, entries]) => (
                            <div key={date} className="flex flex-col gap-0 rounded-xl border border-border overflow-hidden">
                                <div className="flex items-center justify-between px-5 py-3 bg-background-3 border-b border-border">
                                    <div className="flex items-center gap-3">
                                        <Icon name="calendar" size={14} />
                                        <span className="text-sm font-bold text-foreground">{date}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-foreground-muted">Total:</span>
                                        <span className="text-sm font-bold text-foreground">{formatDurationShort(entries.reduce((sum, e) => sum + e.durationMinutes, 0))}</span>
                                    </div>
                                </div>
                                {entries.map(entry => (
                                    <div key={entry.id} className="flex items-center gap-4 px-5 py-3.5 border-b border-border last:border-0 bg-surface">
                                        <div className={`w-1 h-8 rounded-full ${entry.color} flex-shrink-0`} />
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-semibold text-foreground">{entry.taskName}</div>
                                            <div className="text-xs text-foreground-muted">{entry.category} · {entry.start} → {entry.end}</div>
                                        </div>
                                        <span className="font-mono text-sm font-bold text-foreground">{formatDurationShort(entry.durationMinutes)}</span>
                                        <button className="text-foreground-muted hover:text-primary" onClick={() => alert(`Edit ${entry.taskName}`)}><Icon name="pencil" size={13} /></button>
                                        <button className="text-foreground-muted hover:text-danger" onClick={() => setLogHistory(prev => prev.filter(e => e.id !== entry.id))}><Icon name="trash-2" size={13} /></button>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    <div className="rounded-xl border border-dashed border-border bg-surface p-5 flex items-center gap-5 flex-wrap md:flex-nowrap">
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-muted flex-shrink-0">
                            <Icon name="plus" size={18} />
                        </div>
                        <div className="flex-1">
                            <div className="text-sm font-bold text-foreground">Log time manually</div>
                            <div className="text-xs text-foreground-muted">Add past or off-system work sessions</div>
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                            <div className="flex items-center gap-2 rounded-lg border border-border bg-background-2 px-3 py-2 text-sm text-foreground-muted">
                                <Icon name="calendar" size={13} />
                                <input type="text" value={manualDate} onChange={e => setManualDate(e.target.value)} className="bg-transparent outline-none w-20" />
                            </div>
                            <div className="flex items-center gap-2 rounded-lg border border-border bg-background-2 px-3 py-2 text-sm text-foreground-muted">
                                <Icon name="clock" size={13} />
                                <input type="text" value={manualTimeRange} onChange={e => setManualTimeRange(e.target.value)} className="bg-transparent outline-none w-28" />
                            </div>
                            <div className="flex items-center gap-2 rounded-lg border border-border bg-background-2 px-3 py-2 text-sm text-foreground-muted w-40">
                                <Icon name="pencil" size={13} />
                                <input type="text" placeholder="Task name..." value={manualTaskName} onChange={e => setManualTaskName(e.target.value)} className="bg-transparent outline-none w-full" />
                            </div>
                            <button onClick={handleManualLog} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold">
                                <Icon name="save" size={14} /> Log
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-5 border-l border-border px-6 py-6 w-[280px] flex-shrink-0 overflow-y-auto">
                    <div className="rounded-xl border border-border bg-surface p-5 flex flex-col gap-4">
                        <h3 className="text-sm font-bold text-foreground">Today at a Glance</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <StatTile icon="clock" value={formatDurationShort(totalMinutesToday)} label="Tracked" color="text-primary" />
                            <StatTile icon="target" value={formatDurationShort(goalMinutes)} label="Goal" color="text-foreground-muted" />
                            <StatTile icon="layers" value={sessions.length.toString()} label="Sessions" color="text-purple" />
                            <StatTile icon="coffee" value="27m" label="Breaks" color="text-warning" />
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden">
                                <div className="h-full rounded-full bg-primary" style={{ width: `${(totalMinutesToday / goalMinutes) * 100}%` }} />
                            </div>
                            <span className="text-xs font-bold text-primary">{Math.round((totalMinutesToday / goalMinutes) * 100)}%</span>
                        </div>
                        <p className="text-xs text-foreground-muted">{goalMinutes - Math.round(totalMinutesToday)}m remaining to hit your daily goal</p>
                    </div>

                    <div className="rounded-xl border border-border bg-surface p-5 flex flex-col gap-4">
                        <h3 className="text-sm font-bold text-foreground">This Week</h3>
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
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-foreground-muted">Week total</span>
                            <span className="text-sm font-bold text-foreground">34.6h</span>
                        </div>
                    </div>

                    <div className="rounded-xl border border-border bg-surface p-5 flex flex-col gap-3">
                        <h3 className="text-sm font-bold text-foreground">Quick Start</h3>
                        <p className="text-xs text-foreground-muted">Instantly start a timer for a recent task</p>
                        <div className="flex flex-col gap-2">
                            {['Integrate payment API', 'Write unit tests', 'Research competitor pricing'].map(task => (
                                <button key={task} onClick={() => quickStart(task)} className="flex items-center gap-3 rounded-lg bg-background-2 border border-border px-3 py-2.5">
                                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                                    <span className="text-xs text-foreground flex-1 text-left truncate">{task}</span>
                                    <Icon name="play" size={12} />
                                </button>
                            ))}
                        </div>
                        <button className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold mt-1">
                            <Icon name="plus" size={13} /> Start new timer
                        </button>
                    </div>

                    <div className="rounded-xl border border-dashed border-border p-4 flex flex-col gap-3">
                        <div className="flex items-center gap-2 text-foreground-muted">
                            <Icon name="keyboard" size={14} /><span className="text-xs font-semibold">Shortcuts</span>
                        </div>
                        <div className="flex items-center justify-between"><span className="text-xs text-foreground-muted">Start / Pause</span><span className="text-xs font-mono bg-muted px-2 py-0.5 rounded">Space</span></div>
                        <div className="flex items-center justify-between"><span className="text-xs text-foreground-muted">Stop timer</span><span className="text-xs font-mono bg-muted px-2 py-0.5 rounded">S</span></div>
                        <div className="flex items-center justify-between"><span className="text-xs text-foreground-muted">New task</span><span className="text-xs font-mono bg-muted px-2 py-0.5 rounded">N</span></div>
                        <div className="flex items-center justify-between"><span className="text-xs text-foreground-muted">Log manual</span><span className="text-xs font-mono bg-muted px-2 py-0.5 rounded">L</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatTile: React.FC<{ icon: any; value: string; label: string; color: string }> = ({ icon, value, label, color }) => (
    <div className="flex flex-col gap-1 rounded-lg bg-background-2 border border-border p-3">
        <Icon name={icon} size={14} />
        <div className={`text-lg font-bold font-headings ${color}`}>{value}</div>
        <div className="text-xs text-foreground-muted">{label}</div>
    </div>
);

export default TimeTracker;