import React, { useState } from 'react';
import Icon from '../../components/ui/Icon';

type Category = 'Development' | 'Design' | 'Meeting' | 'Research' | 'Testing';
type Priority = 'High' | 'Medium' | 'Low';
type Status = 'To Do' | 'In Progress' | 'Done';

const TaskCreation: React.FC = () => {
    // Form state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState<Category>('Development');
    const [priority, setPriority] = useState<Priority>('Medium');
    const [status, setStatus] = useState<Status>('In Progress');
    const [startDate, setStartDate] = useState('2024-07-18');
    const [startTime, setStartTime] = useState('09:00 AM');
    const [endDate, setEndDate] = useState('2024-07-18');
    const [endTime, setEndTime] = useState('05:00 PM');
    const [manualHours, setManualHours] = useState(0);
    const [manualMinutes, setManualMinutes] = useState(0);
    const [tags, setTags] = useState<string[]>(['UI', 'Frontend']);
    const [newTag, setNewTag] = useState('');
    const [notes, setNotes] = useState('');
    const [assignee, setAssignee] = useState('Aryan Mehta');
    const [project, setProject] = useState('Product Redesign');
    const [timeTrackingMode, setTimeTrackingMode] = useState<'live' | 'manual'>('live');
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const [showProjectDropdown, setShowProjectDropdown] = useState(false);

    const categories: Category[] = ['Development', 'Design', 'Meeting', 'Research', 'Testing'];
    const statuses: Status[] = ['To Do', 'In Progress', 'Done'];
    const projects = ['Product Redesign', 'Payment Gateway Integration', 'Mobile App v2', 'Analytics Dashboard'];

    // Tag handlers
    const addTag = () => {
        if (newTag.trim() && !tags.includes(newTag.trim())) {
            setTags([...tags, newTag.trim()]);
            setNewTag('');
        }
    };

    const removeTag = (tag: string) => {
        setTags(tags.filter(t => t !== tag));
    };

    const handleCreateTask = () => {
        alert('Task created! (demo)');
    };

    const handleSaveDraft = () => {
        alert('Draft saved (demo)');
    };

    const handleDuplicate = () => {
        alert('Task duplicated (demo)');
    };

    return (
        <div className="flex flex-1 px-8 py-7 gap-8 min-w-0">
            {/* Main Form */}
            <div className="flex flex-col gap-6 flex-1 min-w-0">
                {/* Task Title */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-foreground">
                        Task Title <span className="text-danger">*</span>
                    </label>
                    <div className="flex items-center rounded-xl border border-border bg-surface px-4 py-3 gap-3">
                        <Icon name="pencil" size={16} className="text-foreground-muted" />
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Redesign the onboarding modal..."
                            className="flex-1 bg-transparent text-base text-foreground outline-none"
                        />
                    </div>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-foreground">Description</label>
                    <div className="flex flex-col rounded-xl border border-border bg-surface p-4 gap-3">
                        {/* Rich text toolbar (visual only) */}
                        <div className="flex items-center gap-1 pb-3 border-b border-border flex-wrap">
                            {['bold', 'italic', 'underline', 'list', 'list-ordered', 'link', 'image', 'code'].map((icon) => (
                                <button key={icon} className="w-7 h-7 flex items-center justify-center rounded text-foreground-muted hover:bg-surface-2 transition">
                                    <Icon name={icon as any} size={14} />
                                </button>
                            ))}
                        </div>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe what needs to be done, acceptance criteria, relevant links..."
                            className="w-full min-h-28 bg-transparent text-sm text-foreground outline-none resize-none"
                        />
                    </div>
                </div>

                {/* Category, Priority, Status */}
                <div className="grid grid-cols-3 gap-4">
                    {/* Category */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-foreground">Category</label>
                        <div
                            className="relative flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3 cursor-pointer"
                            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                        >
                            <span className="text-sm text-foreground">{category}</span>
                            <Icon name="chevron-down" size={15} />
                            {showCategoryDropdown && (
                                <div className="absolute top-full left-0 right-0 mt-1 rounded-xl border border-border bg-surface shadow-lg z-10 overflow-hidden">
                                    {categories.map((cat) => (
                                        <div
                                            key={cat}
                                            className="px-4 py-2 text-sm text-foreground hover:bg-teal-bg hover:text-primary cursor-pointer"
                                            onClick={() => { setCategory(cat); setShowCategoryDropdown(false); }}
                                        >
                                            {cat}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Priority */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-foreground">Priority</label>
                        <div className="flex gap-2">
                            {(['High', 'Medium', 'Low'] as Priority[]).map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setPriority(p)}
                                    className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg border py-2.5 text-xs font-bold transition ${priority === p
                                            ? p === 'High'
                                                ? 'bg-danger-bg border-danger text-danger'
                                                : p === 'Medium'
                                                    ? 'bg-warning-bg border-warning text-warning'
                                                    : 'bg-info-bg border-info text-info'
                                            : 'border-border bg-surface text-foreground-muted'
                                        }`}
                                >
                                    <Icon name={p === 'High' ? 'arrow-up' : p === 'Medium' ? 'minus' : 'arrow-down'} size={11} />
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Status */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-foreground">Status</label>
                        <div
                            className="relative flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3 cursor-pointer"
                            onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                        >
                            <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${status === 'In Progress' ? 'bg-primary' : status === 'To Do' ? 'bg-foreground-muted' : 'bg-success'}`} />
                                <span className="text-sm text-foreground">{status}</span>
                            </div>
                            <Icon name="chevron-down" size={15} />
                            {showStatusDropdown && (
                                <div className="absolute top-full left-0 right-0 mt-1 rounded-xl border border-border bg-surface shadow-lg z-10 overflow-hidden">
                                    {statuses.map((s) => (
                                        <div
                                            key={s}
                                            className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-teal-bg hover:text-primary cursor-pointer"
                                            onClick={() => { setStatus(s); setShowStatusDropdown(false); }}
                                        >
                                            <span className={`w-2 h-2 rounded-full ${s === 'In Progress' ? 'bg-primary' : s === 'To Do' ? 'bg-foreground-muted' : 'bg-success'}`} />
                                            {s}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Start & End Date/Time */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-foreground">Start Date &amp; Time</label>
                        <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3">
                            <Icon name="calendar" size={15} />
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="bg-transparent text-sm text-foreground outline-none"
                            />
                            <span className="text-foreground-muted">·</span>
                            <Icon name="clock" size={15} />
                            <input
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="bg-transparent text-sm text-foreground outline-none"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-foreground">End / Due Date &amp; Time</label>
                        <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3">
                            <Icon name="calendar" size={15} />
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="bg-transparent text-sm text-foreground outline-none"
                            />
                            <span className="text-foreground-muted">·</span>
                            <Icon name="clock" size={15} />
                            <input
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="bg-transparent text-sm text-foreground outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Manual Duration */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-foreground">Manual Duration (optional)</label>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 flex-1">
                            <Icon name="timer" size={15} />
                            <input
                                type="number"
                                value={manualHours}
                                onChange={(e) => setManualHours(Number(e.target.value))}
                                className="w-12 bg-transparent text-sm text-foreground outline-none"
                                placeholder="0"
                            />
                            <span className="text-foreground-muted">h</span>
                            <span className="text-foreground-muted">:</span>
                            <input
                                type="number"
                                value={manualMinutes}
                                onChange={(e) => setManualMinutes(Number(e.target.value))}
                                className="w-12 bg-transparent text-sm text-foreground outline-none"
                                placeholder="00"
                            />
                            <span className="text-foreground-muted">m</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-xl border border-dashed border-border px-4 py-3 flex-1 text-sm text-foreground-muted">
                            <Icon name="info" size={14} />
                            <span>For logging past or off-system work</span>
                        </div>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-foreground">Tags</label>
                    <div className="rounded-xl border border-border bg-surface p-4 flex flex-col gap-3">
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-teal-bg text-primary"
                                >
                                    {tag}
                                    <button onClick={() => removeTag(tag)} className="hover:text-danger transition">
                                        <Icon name="x" size={10} />
                                    </button>
                                </span>
                            ))}
                            <div className="flex items-center gap-2 rounded-full border border-dashed border-border px-3 py-1">
                                <Icon name="plus" size={12} />
                                <input
                                    type="text"
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && addTag()}
                                    placeholder="Add tag"
                                    className="bg-transparent text-xs text-foreground-muted outline-none w-20"
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                            {['UI', 'Backend', 'API', 'Sprint', 'Urgent', 'Review', 'Frontend', 'Infra'].map((suggestion) => (
                                <button
                                    key={suggestion}
                                    onClick={() => { if (!tags.includes(suggestion)) setTags([...tags, suggestion]); }}
                                    className="text-xs px-2 py-0.5 rounded-full border border-border text-foreground-muted hover:bg-surface-2 transition"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Notes */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-foreground">Notes / Context</label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Internal notes, blockers, references..."
                        className="rounded-xl border border-border bg-surface px-4 py-3 min-h-20 text-sm text-foreground-muted outline-none resize-none"
                    />
                </div>

                {/* Attachments */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-foreground">Attachments</label>
                    <div className="rounded-xl border border-dashed border-border bg-surface p-6 flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                            <Icon name="upload-cloud" size={22} />
                        </div>
                        <div className="text-sm text-foreground-muted text-center">
                            Drag &amp; drop files here, or{' '}
                            <button className="text-primary font-semibold hover:underline">browse</button>
                        </div>
                        <span className="text-xs text-foreground-muted">PNG, JPG, PDF, ZIP up to 25MB</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between rounded-xl border border-border bg-surface-2 px-6 py-4">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleSaveDraft}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-sm font-semibold text-foreground-muted hover:bg-surface-2 transition"
                        >
                            <Icon name="save" size={15} /> Save Draft
                        </button>
                        <button
                            onClick={handleDuplicate}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-sm font-semibold text-foreground-muted hover:bg-surface-2 transition"
                        >
                            Duplicate
                        </button>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="px-5 py-2.5 rounded-lg border border-border text-sm font-semibold text-foreground-muted hover:bg-surface-2 transition">
                            Cancel
                        </button>
                        <button
                            onClick={handleCreateTask}
                            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition"
                        >
                            <Icon name="plus" size={15} /> Create Task
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Sidebar */}
            <div className="flex flex-col gap-5 w-[280px] flex-shrink-0">
                {/* Assignee */}
                <div className="rounded-xl border border-border bg-surface p-5 flex flex-col gap-4">
                    <h3 className="text-sm font-bold text-foreground">Assignee</h3>
                    <div className="flex items-center gap-3 rounded-lg bg-background-2 border border-border px-3 py-2.5">
                        <img
                            src="https://storage.googleapis.com/banani-avatars/avatar/male/25-35/South Asian/0"
                            className="w-7 h-7 rounded-full"
                            alt="Avatar"
                        />
                        <span className="text-sm text-foreground">{assignee}</span>
                        <span className="ml-auto text-xs text-primary font-semibold">You</span>
                    </div>
                    <button className="flex items-center gap-2 text-sm text-foreground-muted hover:text-primary transition">
                        <Icon name="user-plus" size={14} /> Assign to someone else
                    </button>
                </div>

                {/* Project */}
                <div className="rounded-xl border border-border bg-surface p-5 flex flex-col gap-3">
                    <h3 className="text-sm font-bold text-foreground">Project</h3>
                    <div
                        className="relative flex items-center justify-between rounded-lg bg-background-2 border border-border px-3 py-2.5 cursor-pointer"
                        onClick={() => setShowProjectDropdown(!showProjectDropdown)}
                    >
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-sm bg-secondary" />
                            <span className="text-sm text-foreground">{project}</span>
                        </div>
                        <Icon name="chevron-down" size={14} />
                        {showProjectDropdown && (
                            <div className="absolute top-full left-0 right-0 mt-1 rounded-xl border border-border bg-surface shadow-lg z-10 overflow-hidden">
                                {projects.map((p) => (
                                    <div
                                        key={p}
                                        className="px-3 py-2 text-sm text-foreground hover:bg-teal-bg hover:text-primary cursor-pointer"
                                        onClick={() => { setProject(p); setShowProjectDropdown(false); }}
                                    >
                                        {p}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Time Tracking */}
                <div className="rounded-xl border border-border bg-surface p-5 flex flex-col gap-4">
                    <h3 className="text-sm font-bold text-foreground">Time Tracking</h3>
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={() => setTimeTrackingMode('live')}
                            className={`flex items-center gap-3 rounded-lg border-2 px-4 py-3 ${timeTrackingMode === 'live' ? 'border-primary bg-teal-bg' : 'border-border bg-background-2'}`}
                        >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${timeTrackingMode === 'live' ? 'bg-primary' : 'bg-muted'}`}>
                                <Icon name="timer" size={15} className={timeTrackingMode === 'live' ? 'text-primary-foreground' : 'text-foreground-muted'} />
                            </div>
                            <div className="flex flex-col text-left">
                                <span className={`text-sm font-bold ${timeTrackingMode === 'live' ? 'text-foreground' : 'text-foreground-muted'}`}>Live Tracking</span>
                                <span className="text-xs text-foreground-muted">Start timer when you begin</span>
                            </div>
                            {timeTrackingMode === 'live' && <Icon name="check-circle-2" size={16} className="text-primary ml-auto" />}
                        </button>
                        <button
                            onClick={() => setTimeTrackingMode('manual')}
                            className={`flex items-center gap-3 rounded-lg border-2 px-4 py-3 ${timeTrackingMode === 'manual' ? 'border-primary bg-teal-bg' : 'border-border bg-background-2'}`}
                        >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${timeTrackingMode === 'manual' ? 'bg-primary' : 'bg-muted'}`}>
                                <Icon name="pencil" size={15} className={timeTrackingMode === 'manual' ? 'text-primary-foreground' : 'text-foreground-muted'} />
                            </div>
                            <div className="flex flex-col text-left">
                                <span className={`text-sm font-bold ${timeTrackingMode === 'manual' ? 'text-foreground' : 'text-foreground-muted'}`}>Manual Entry</span>
                                <span className="text-xs text-foreground-muted">Log hours manually</span>
                            </div>
                            {timeTrackingMode === 'manual' && <Icon name="check-circle-2" size={16} className="text-primary ml-auto" />}
                        </button>
                    </div>
                </div>

                <div className="rounded-xl border border-dashed border-border p-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-foreground-muted">
                        <Icon name="keyboard" size={14} />
                        <span className="text-xs font-semibold">Keyboard Shortcuts</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-foreground-muted">Save draft</span>
                        <span className="text-xs font-mono bg-muted text-foreground-muted px-2 py-0.5 rounded">⌘ + S</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-foreground-muted">Create task</span>
                        <span className="text-xs font-mono bg-muted text-foreground-muted px-2 py-0.5 rounded">⌘ + Enter</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-foreground-muted">Cancel</span>
                        <span className="text-xs font-mono bg-muted text-foreground-muted px-2 py-0.5 rounded">Esc</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskCreation;