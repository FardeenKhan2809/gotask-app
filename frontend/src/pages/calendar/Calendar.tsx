import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../components/ui/Icon';

interface CalendarEvent {
    id: string;
    title: string;
    category: 'Development' | 'Design' | 'Meeting' | 'Research' | 'Testing';
    start: string;
    end: string;
    date: Date;
    durationMinutes: number;
}

const initialEvents: CalendarEvent[] = [
    { id: 'e1', title: 'Kickoff meeting', category: 'Meeting', start: '10:00', end: '11:30', date: new Date(2024, 6, 1), durationMinutes: 90 },
    { id: 'e2', title: 'Set up project board', category: 'Development', start: '13:00', end: '14:00', date: new Date(2024, 6, 1), durationMinutes: 60 },
    { id: 'e3', title: 'Sprint planning meeting', category: 'Meeting', start: '09:00', end: '10:30', date: new Date(2024, 6, 2), durationMinutes: 90 },
    { id: 'e4', title: 'Design new onboarding flow', category: 'Design', start: '11:00', end: '13:00', date: new Date(2024, 6, 2), durationMinutes: 120 },
    { id: 'e5', title: 'Integrate payment API', category: 'Development', start: '14:00', end: '16:30', date: new Date(2024, 6, 2), durationMinutes: 150 },
    { id: 'e6', title: 'Write unit tests', category: 'Testing', start: '16:30', end: '17:00', date: new Date(2024, 6, 2), durationMinutes: 30 },
    { id: 'e7', title: 'Competitor analysis review', category: 'Research', start: '09:30', end: '11:00', date: new Date(2024, 6, 3), durationMinutes: 90 },
    { id: 'e8', title: 'UI polish session', category: 'Design', start: '13:00', end: '15:00', date: new Date(2024, 6, 3), durationMinutes: 120 },
    { id: 'e9', title: 'Backend API review', category: 'Development', start: '10:00', end: '11:30', date: new Date(2024, 6, 4), durationMinutes: 90 },
    { id: 'e10', title: 'Content planning', category: 'Research', start: '14:00', end: '15:30', date: new Date(2024, 6, 4), durationMinutes: 90 },
    { id: 'e11', title: 'Team lunch', category: 'Meeting', start: '12:00', end: '13:00', date: new Date(2024, 6, 4), durationMinutes: 60 },
    { id: 'e12', title: 'Weekly sync with stakeholders', category: 'Meeting', start: '09:00', end: '10:00', date: new Date(2024, 6, 5), durationMinutes: 60 },
    { id: 'e13', title: 'Refactor navigation component', category: 'Development', start: '11:00', end: '13:00', date: new Date(2024, 6, 5), durationMinutes: 120 },
    { id: 'e14', title: 'Mobile responsiveness fixes', category: 'Development', start: '09:00', end: '12:00', date: new Date(2024, 6, 8), durationMinutes: 180 },
    { id: 'e15', title: 'Design system workshop', category: 'Design', start: '14:00', end: '16:00', date: new Date(2024, 6, 8), durationMinutes: 120 },
    { id: 'e16', title: 'API documentation', category: 'Development', start: '10:00', end: '12:00', date: new Date(2024, 6, 10), durationMinutes: 120 },
    { id: 'e17', title: 'User testing session', category: 'Research', start: '13:00', end: '15:00', date: new Date(2024, 6, 12), durationMinutes: 120 },
    { id: 'e18', title: 'Team sync call', category: 'Meeting', start: '14:00', end: '14:30', date: new Date(2024, 6, 15), durationMinutes: 30 },
    { id: 'e19', title: 'Backlog grooming', category: 'Meeting', start: '10:00', end: '11:30', date: new Date(2024, 6, 16), durationMinutes: 90 },
    { id: 'e20', title: 'Code review for PR #142', category: 'Development', start: '15:00', end: '16:00', date: new Date(2024, 6, 16), durationMinutes: 60 },
    { id: 'e21', title: 'Onboarding doc update', category: 'Design', start: '09:00', end: '10:30', date: new Date(2024, 6, 17), durationMinutes: 90 },
    { id: 'e22', title: 'Performance testing', category: 'Testing', start: '11:30', end: '13:00', date: new Date(2024, 6, 17), durationMinutes: 90 },
    { id: 'e23', title: 'Fix nav z-index bug', category: 'Development', start: '15:00', end: '18:00', date: new Date(2024, 6, 18), durationMinutes: 180 },
    { id: 'e24', title: 'Design system tokens', category: 'Design', start: '09:00', end: '12:30', date: new Date(2024, 6, 18), durationMinutes: 210 },
    { id: 'e25', title: 'Research competitor pricing', category: 'Research', start: '11:30', end: '13:15', date: new Date(2024, 6, 18), durationMinutes: 105 },
    { id: 'e26', title: 'Database migration planning', category: 'Development', start: '14:00', end: '15:30', date: new Date(2024, 6, 19), durationMinutes: 90 },
    { id: 'e27', title: 'Accessibility audit', category: 'Testing', start: '10:00', end: '12:00', date: new Date(2024, 6, 22), durationMinutes: 120 },
    { id: 'e28', title: 'Deploy to staging', category: 'Development', start: '16:00', end: '17:30', date: new Date(2024, 6, 24), durationMinutes: 90 },
    { id: 'e29', title: 'Customer feedback analysis', category: 'Research', start: '09:30', end: '11:00', date: new Date(2024, 6, 25), durationMinutes: 90 },
    { id: 'e30', title: 'Sprint retrospective', category: 'Meeting', start: '15:00', end: '16:00', date: new Date(2024, 6, 29), durationMinutes: 60 },
    { id: 'e31', title: 'End-of-month reporting', category: 'Research', start: '13:00', end: '14:30', date: new Date(2024, 6, 31), durationMinutes: 90 },
    { id: 'e32', title: 'New sprint kickoff', category: 'Meeting', start: '10:00', end: '11:30', date: new Date(2024, 7, 1), durationMinutes: 90 },
    { id: 'e33', title: 'Design review', category: 'Design', start: '14:00', end: '15:30', date: new Date(2024, 7, 1), durationMinutes: 90 },
];

const categoryColors = {
    Development: 'border-primary',
    Design: 'border-purple',
    Meeting: 'border-warning',
    Research: 'border-info',
    Testing: 'border-success',
};

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date(2024, 6, 18));
    const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
    const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
    const [selectedDate, setSelectedDate] = useState(new Date(2024, 6, 18));

    const toDateKey = (date: Date) => date.toISOString().split('T')[0];

    const eventsByDate = useMemo(() => {
        const map = new Map<string, CalendarEvent[]>();
        events.forEach(event => {
            const key = toDateKey(event.date);
            if (!map.has(key)) map.set(key, []);
            map.get(key)!.push(event);
        });
        return map;
    }, [events]);

    const monthDays = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startWeekday = firstDay.getDay();
        const daysArray: (Date | null)[] = [];
        for (let i = 0; i < startWeekday; i++) daysArray.push(null);
        for (let i = 1; i <= lastDay.getDate(); i++) daysArray.push(new Date(year, month, i));
        while (daysArray.length < 42) daysArray.push(null);
        return daysArray;
    }, [currentDate]);

    const weekDaysDates = useMemo(() => {
        const start = new Date(currentDate);
        const day = currentDate.getDay();
        start.setDate(currentDate.getDate() - day);
        const days: Date[] = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date(start);
            d.setDate(start.getDate() + i);
            days.push(d);
        }
        return days;
    }, [currentDate]);

    const selectedDayEvents = useMemo(() => {
        const key = toDateKey(selectedDate);
        return (eventsByDate.get(key) || []).sort((a, b) => a.start.localeCompare(b.start));
    }, [eventsByDate, selectedDate]);

    const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    const prevWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() - 7);
        setCurrentDate(newDate);
    };
    const nextWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + 7);
        setCurrentDate(newDate);
    };
    const prevDay = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(selectedDate.getDate() - 1);
        setCurrentDate(newDate);
        setSelectedDate(newDate);
    };
    const nextDay = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(selectedDate.getDate() + 1);
        setCurrentDate(newDate);
        setSelectedDate(newDate);
    };
    const goToday = () => {
        const today = new Date();
        setCurrentDate(today);
        setSelectedDate(today);
    };

    const addEvent = () => {
        const title = prompt('Event title:');
        if (!title) return;
        const category = prompt('Category (Development/Design/Meeting/Research/Testing):') as CalendarEvent['category'];
        if (!category) return;
        const start = prompt('Start time (HH:MM):', '10:00');
        const end = prompt('End time (HH:MM):', '11:00');
        if (!start || !end) return;
        const [startHour, startMin] = start.split(':').map(Number);
        const [endHour, endMin] = end.split(':').map(Number);
        const durationMinutes = (endHour * 60 + endMin) - (startHour * 60 + startMin);
        const newEvent: CalendarEvent = {
            id: Date.now().toString(),
            title,
            category,
            start,
            end,
            date: selectedDate,
            durationMinutes,
        };
        setEvents([...events, newEvent]);
    };

    const deleteEvent = (id: string) => {
        setEvents(events.filter(e => e.id !== id));
    };

    const currentMonthStats = useMemo(() => {
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        const monthEvents = events.filter(e => e.date.getMonth() === month && e.date.getFullYear() === year);
        const totalHours = monthEvents.reduce((sum, e) => sum + e.durationMinutes, 0) / 60;
        const tasksDone = monthEvents.length;
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const avgPerDay = totalHours / daysInMonth;
        const activeDays = new Set(monthEvents.map(e => toDateKey(e.date))).size;
        return { totalHours: totalHours.toFixed(1), tasksDone, avgPerDay: avgPerDay.toFixed(1), activeDays };
    }, [events, currentDate]);

    const heatmapIntensity = (day: number) => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const dayEvents = events.filter(e => toDateKey(e.date) === toDateKey(date));
        const totalMins = dayEvents.reduce((s, e) => s + e.durationMinutes, 0);
        if (totalMins === 0) return 'bg-border';
        if (totalMins < 60) return 'bg-primary opacity-25';
        if (totalMins < 120) return 'bg-primary opacity-50';
        if (totalMins < 180) return 'bg-primary opacity-75';
        return 'bg-primary';
    };

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    const renderEventBars = (date: Date) => {
        const key = toDateKey(date);
        const dayEvents = eventsByDate.get(key) || [];
        const bars = dayEvents.slice(0, 2).map(event => (
            <div key={event.id} className={`h-1.5 rounded-full bg-${event.category === 'Development' ? 'primary' : event.category === 'Design' ? 'purple' : event.category === 'Meeting' ? 'warning' : event.category === 'Research' ? 'info' : 'success'} opacity-80`} style={{ width: '60%' }} />
        ));
        if (dayEvents.length > 2) {
            bars.push(<span key="more" className="text-xs text-foreground-muted font-semibold">+{dayEvents.length - 2} more</span>);
        }
        return <div className="flex flex-col gap-1">{bars}</div>;
    };

    const formatHour = (hour: number) => {
        if (hour === 0) return '12AM';
        if (hour < 12) return `${hour}AM`;
        if (hour === 12) return '12PM';
        return `${hour - 12}PM`;
    };

    return (
        <div className="flex flex-col flex-1 min-w-0">
            <div className="flex flex-1 min-w-0">
                <div className="flex flex-col flex-1 min-w-0 gap-0">
                    {/* Toolbar */}
                    <div className="flex items-center justify-between px-8 py-4 border-b border-border">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={viewMode === 'month' ? prevMonth : viewMode === 'week' ? prevWeek : prevDay}
                                className="w-8 h-8 flex items-center justify-center rounded-lg border border-border bg-surface text-foreground-muted hover:bg-surface-2 transition"
                            >
                                <Icon name="chevron-left" size={16} />
                            </button>
                            <h2 className="text-lg font-bold text-foreground font-headings">
                                {viewMode === 'month' && currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                                {viewMode === 'week' && `Week of ${weekDaysDates[0].toLocaleDateString()}`}
                                {viewMode === 'day' && selectedDate.toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                            </h2>
                            <button
                                onClick={viewMode === 'month' ? nextMonth : viewMode === 'week' ? nextWeek : nextDay}
                                className="w-8 h-8 flex items-center justify-center rounded-lg border border-border bg-surface text-foreground-muted hover:bg-surface-2 transition"
                            >
                                <Icon name="chevron-right" size={16} />
                            </button>
                            <button onClick={goToday} className="px-3 py-1.5 rounded-lg border border-border bg-surface text-xs font-semibold text-foreground-muted hover:bg-surface-2 transition">
                                Today
                            </button>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-3 mr-4">
                                {Object.entries(categoryColors).map(([cat, color]) => (
                                    <div key={cat} className="flex items-center gap-1.5">
                                        <span className={`w-2.5 h-2.5 rounded-full bg-${cat === 'Development' ? 'primary' : cat === 'Design' ? 'purple' : cat === 'Meeting' ? 'warning' : cat === 'Research' ? 'info' : 'success'}`} />
                                        <span className="text-xs text-foreground-muted">{cat}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center rounded-lg border border-border bg-surface overflow-hidden">
                                <button
                                    onClick={() => setViewMode('month')}
                                    className={`px-3 py-1.5 text-xs font-semibold transition ${viewMode === 'month' ? 'bg-primary text-primary-foreground' : 'text-foreground-muted hover:bg-surface-2'}`}
                                >
                                    Month
                                </button>
                                <button
                                    onClick={() => setViewMode('week')}
                                    className={`px-3 py-1.5 text-xs font-semibold border-l border-border transition ${viewMode === 'week' ? 'bg-primary text-primary-foreground' : 'text-foreground-muted hover:bg-surface-2'}`}
                                >
                                    Week
                                </button>
                                <button
                                    onClick={() => setViewMode('day')}
                                    className={`px-3 py-1.5 text-xs font-semibold border-l border-border transition ${viewMode === 'day' ? 'bg-primary text-primary-foreground' : 'text-foreground-muted hover:bg-surface-2'}`}
                                >
                                    Day
                                </button>
                            </div>
                            <button onClick={addEvent} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition">
                                <Icon name="plus" size={13} /> New Task
                            </button>
                        </div>
                    </div>

                    {/* Month View */}
                    {viewMode === 'month' && (
                        <div className="flex-1 px-8 py-6 overflow-auto">
                            <div className="flex flex-col gap-0 rounded-xl border border-border bg-surface overflow-hidden">
                                <div className="grid border-b border-border" style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
                                    {weekDays.map(day => (
                                        <div key={day} className="text-center py-3 text-xs font-bold text-foreground-muted tracking-wide uppercase">{day}</div>
                                    ))}
                                </div>
                                <div className="grid" style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
                                    {monthDays.map((day, idx) => {
                                        if (!day) return <div key={`empty-${idx}`} className="border-r border-b border-border bg-background-2 min-h-24" />;
                                        const isSelected = toDateKey(selectedDate) === toDateKey(day);
                                        return (
                                            <div
                                                key={toDateKey(day)}
                                                onClick={() => setSelectedDate(day)}
                                                className={`flex flex-col gap-1.5 p-3 border-r border-b border-border min-h-24 cursor-pointer ${isSelected ? 'bg-teal-bg' : 'bg-surface'}`}
                                            >
                                                <span className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold self-start ${isSelected ? 'bg-primary text-primary-foreground' : 'text-foreground'}`}>
                                                    {day.getDate()}
                                                </span>
                                                {renderEventBars(day)}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Week View */}
                    {viewMode === 'week' && (
                        <div className="flex-1 px-8 py-6 overflow-auto">
                            <div className="flex flex-col gap-0 rounded-xl border border-border bg-surface overflow-hidden">
                                <div className="grid border-b border-border" style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
                                    {weekDays.map(day => (
                                        <div key={day} className="text-center py-3 text-xs font-bold text-foreground-muted tracking-wide uppercase">{day}</div>
                                    ))}
                                </div>
                                <div className="grid" style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
                                    {weekDaysDates.map((day, idx) => {
                                        const isSelected = toDateKey(selectedDate) === toDateKey(day);
                                        return (
                                            <div
                                                key={idx}
                                                onClick={() => setSelectedDate(day)}
                                                className={`flex flex-col gap-1.5 p-3 border-r border-b border-border min-h-32 cursor-pointer ${isSelected ? 'bg-teal-bg' : 'bg-surface'}`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className={`text-sm font-bold ${isSelected ? 'text-primary-foreground bg-primary rounded-full px-2 py-1' : 'text-foreground'}`}>
                                                        {day.getDate()}
                                                    </span>
                                                    <span className="text-xs text-foreground-muted">{day.toLocaleDateString('default', { weekday: 'short' })}</span>
                                                </div>
                                                {renderEventBars(day)}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Day View */}
                    {viewMode === 'day' && (
                        <div className="flex-1 px-8 py-6 overflow-auto">
                            <div className="rounded-xl border border-border bg-surface overflow-hidden">
                                <div className="p-4 border-b border-border">
                                    <h3 className="text-lg font-bold text-foreground">{selectedDate.toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</h3>
                                </div>
                                <div className="divide-y divide-border">
                                    {Array.from({ length: 24 }, (_, i) => i).map(hour => {
                                        const hourLabel = formatHour(hour);
                                        const eventsAtHour = selectedDayEvents.filter(e => parseInt(e.start.split(':')[0]) === hour);
                                        return (
                                            <div key={hour} className="flex min-h-[60px]">
                                                <div className="w-20 px-3 py-2 text-xs text-foreground-muted border-r border-border">{hourLabel}</div>
                                                <div className="flex-1 px-3 py-2">
                                                    {eventsAtHour.map(event => (
                                                        <div key={event.id} className={`mb-1 p-2 rounded border-l-4 ${categoryColors[event.category]} bg-background-2`}>
                                                            <div className="text-sm font-semibold text-foreground">{event.title}</div>
                                                            <div className="text-xs text-foreground-muted">{event.start} – {event.end}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-l border-border px-6 py-6 w-[320px] flex-shrink-0 overflow-y-auto"
                >
                    <div className="flex flex-col gap-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-xs text-foreground-muted uppercase tracking-wide font-semibold">Selected Day</div>
                                <div className="text-base font-bold text-foreground">
                                    {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                                </div>
                            </div>
                            <button onClick={addEvent} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition">
                                <Icon name="plus" size={13} /> Add
                            </button>
                        </div>

                        <div className="flex gap-2">
                            <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-teal-bg text-primary">
                                <Icon name="clock" size={11} /> {Math.round(selectedDayEvents.reduce((s, e) => s + e.durationMinutes, 0) / 60)}h
                            </span>
                            <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-success-bg text-success">
                                <Icon name="check" size={11} /> {selectedDayEvents.length} tasks
                            </span>
                        </div>

                        <div className="flex flex-col gap-2 relative">
                            <div className="absolute left-8 top-0 bottom-0 w-px bg-border"></div>
                            {selectedDayEvents.map(event => {
                                const borderColor = event.category === 'Development' ? 'border-primary' : event.category === 'Design' ? 'border-purple' : event.category === 'Meeting' ? 'border-warning' : event.category === 'Research' ? 'border-info' : 'border-success';
                                const dotColor = event.category === 'Development' ? 'bg-primary' : event.category === 'Design' ? 'bg-purple' : event.category === 'Meeting' ? 'bg-warning' : event.category === 'Research' ? 'bg-info' : 'bg-success';
                                const isLive = event.id === 'e8'; // example: design system tokens is live
                                return (
                                    <div key={event.id} className={`flex items-start gap-3 rounded-lg p-3 border-l-2 ${borderColor} bg-background-2`}>
                                        <div className="flex flex-col items-center w-10 flex-shrink-0">
                                            <span className="text-xs font-mono font-bold text-foreground-muted">{event.start}</span>
                                            <div className={`w-2 h-2 rounded-full mt-1 ${dotColor}`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-semibold text-foreground leading-snug">{event.title}</div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-xs text-foreground-muted">{event.category}</span>
                                                <span className="text-xs text-foreground-muted">·</span>
                                                <span className="text-xs text-foreground-muted">{event.durationMinutes}m</span>
                                                {isLive && <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse ml-1" />}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => deleteEvent(event.id)}
                                            className="text-foreground-muted hover:text-danger transition"
                                        >
                                            <Icon name="trash-2" size={13} />
                                        </button>
                                    </div>
                                );
                            })}
                            {selectedDayEvents.length === 0 && (
                                <div className="text-center text-foreground-muted py-8">No tasks for this day</div>
                            )}
                        </div>
                    </div>

                    <div className="mt-6 rounded-xl border border-border bg-surface p-5 flex flex-col gap-4">
                        <h3 className="text-sm font-bold text-foreground">{currentDate.toLocaleString('default', { month: 'long' })} Summary</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1 rounded-lg bg-background-2 border border-border p-3">
                                <Icon name="clock" size={15} />
                                <div className="text-lg font-bold text-primary">{currentMonthStats.totalHours}h</div>
                                <div className="text-xs text-foreground-muted">Total Hours</div>
                            </div>
                            <div className="flex flex-col gap-1 rounded-lg bg-background-2 border border-border p-3">
                                <Icon name="check-circle-2" size={15} />
                                <div className="text-lg font-bold text-success">{currentMonthStats.tasksDone}</div>
                                <div className="text-xs text-foreground-muted">Tasks Done</div>
                            </div>
                            <div className="flex flex-col gap-1 rounded-lg bg-background-2 border border-border p-3">
                                <Icon name="bar-chart-2" size={15} />
                                <div className="text-lg font-bold text-warning">{currentMonthStats.avgPerDay}h</div>
                                <div className="text-xs text-foreground-muted">Avg/Day</div>
                            </div>
                            <div className="flex flex-col gap-1 rounded-lg bg-background-2 border border-border p-3">
                                <Icon name="calendar-check" size={15} />
                                <div className="text-lg font-bold text-purple">{currentMonthStats.activeDays}</div>
                                <div className="text-xs text-foreground-muted">Active Days</div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 rounded-xl border border-border bg-surface p-5 flex flex-col gap-3">
                        <h3 className="text-sm font-bold text-foreground">Activity Heatmap</h3>
                        <div className="flex flex-wrap gap-1">
                            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => (
                                <div key={day} className={`w-6 h-6 rounded-sm ${heatmapIntensity(day)}`} title={`${currentDate.toLocaleString('default', { month: 'short' })} ${day}`} />
                            ))}
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-foreground-muted">Less</span>
                            <div className="w-3 h-3 rounded-sm bg-border"></div>
                            <div className="w-3 h-3 rounded-sm bg-primary opacity-25"></div>
                            <div className="w-3 h-3 rounded-sm bg-primary opacity-50"></div>
                            <div className="w-3 h-3 rounded-sm bg-primary opacity-75"></div>
                            <div className="w-3 h-3 rounded-sm bg-primary"></div>
                            <span className="text-xs text-foreground-muted">More</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Calendar;