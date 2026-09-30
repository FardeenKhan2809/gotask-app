import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '@/components/ui/Icon';
import { useToast } from '@/context/ToastContext';

interface Project {
    id: number;
    name: string;
    description: string;
    status: 'active' | 'planning' | 'completed';
    priority: 'high' | 'medium';
    category: string[];
    tasksDone: number;
    tasksTotal: number;
    members: { avatar: string }[];
    hours: number;
    dueDate: string;
    image: string;
    gradientBorder?: string;
}

const initialProjects: Project[] = [
    {
        id: 1,
        name: 'Product Redesign 2.0',
        description: 'Full redesign of the core product UI with new design system, improved onboarding, and mobile-first approach.',
        status: 'active',
        priority: 'high',
        category: ['Design', 'Frontend'],
        tasksDone: 30,
        tasksTotal: 48,
        members: [
            { avatar: 'https://storage.googleapis.com/banani-avatars/avatar/female/25-35/South Asian/1' },
            { avatar: 'https://storage.googleapis.com/banani-avatars/avatar/male/25-35/South Asian/0' },
            { avatar: 'https://storage.googleapis.com/banani-avatars/avatar/female/25-35/East Asian/3' },
        ],
        hours: 142,
        dueDate: 'Aug 15, 2024',
        image: 'https://storage.googleapis.com/banani-generated-images/generated-images/b8be07fe-2862-4aca-8fba-24c9009be2ca.jpg',
        gradientBorder: 'border-border',
    },
    {
        id: 2,
        name: 'Payment Gateway Integration',
        description: 'Integrate Stripe & PayPal checkout flows, add webhook listeners, handle refund and dispute automation.',
        status: 'active',
        priority: 'high',
        category: ['Backend', 'API'],
        tasksDone: 9,
        tasksTotal: 22,
        members: [
            { avatar: 'https://storage.googleapis.com/banani-avatars/avatar/male/25-35/North American/2' },
            { avatar: 'https://storage.googleapis.com/banani-avatars/avatar/male/25-35/Hispanic/4' },
        ],
        hours: 68,
        dueDate: 'Jul 31, 2024',
        image: 'https://storage.googleapis.com/banani-generated-images/generated-images/25becccd-e737-44b3-8225-f44f4e9dce90.jpg',
        gradientBorder: 'border-primary/40',
    },
    {
        id: 3,
        name: 'Mobile App v2',
        description: 'React Native rebuild of the mobile client with offline support, push notifications and biometric auth.',
        status: 'planning',
        priority: 'medium',
        category: ['Mobile', 'React Native'],
        tasksDone: 4,
        tasksTotal: 35,
        members: [
            { avatar: 'https://storage.googleapis.com/banani-avatars/avatar/male/25-35/South Asian/0' },
            { avatar: 'https://storage.googleapis.com/banani-avatars/avatar/male/25-35/East Asian/6' },
        ],
        hours: 24,
        dueDate: 'Oct 1, 2024',
        image: 'https://storage.googleapis.com/banani-generated-images/generated-images/7e3a1490-5603-4dc9-9eed-3eecbd30434e.jpg',
        gradientBorder: 'border-border',
    },
    {
        id: 4,
        name: 'Analytics Dashboard',
        description: 'Build real-time analytics with heatmaps, productivity charts, exportable reports and custom date ranges.',
        status: 'completed',
        priority: 'medium',
        category: ['Data', 'Charts'],
        tasksDone: 18,
        tasksTotal: 18,
        members: [
            { avatar: 'https://storage.googleapis.com/banani-avatars/avatar/female/25-35/African/5' },
            { avatar: 'https://storage.googleapis.com/banani-avatars/avatar/female/25-35/East Asian/3' },
        ],
        hours: 95,
        dueDate: 'Jul 5, 2024',
        image: 'https://storage.googleapis.com/banani-generated-images/generated-images/8b569759-b487-41fd-948d-cca1ce3fbeb5.jpg',
        gradientBorder: 'border-border',
    },
];

const Projects: React.FC = () => {
    const { success, warning } = useToast();
    const [projects, setProjects] = useState<Project[]>(initialProjects);
    const [filter, setFilter] = useState<'All' | 'Active' | 'Planning' | 'Completed'>('All');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [showFilterPanel, setShowFilterPanel] = useState<boolean>(false);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<Project['status']>('active');
    const [priority, setPriority] = useState<Project['priority']>('medium');
    const [categoryInput, setCategoryInput] = useState('Design, Frontend');
    const [dueDate, setDueDate] = useState('Aug 30, 2024');

    const allCategories = ['All', ...Array.from(new Set(projects.flatMap(p => p.category)))];

    const filteredProjects = projects.filter(project => {
        if (filter === 'Active' && project.status !== 'active') return false;
        if (filter === 'Planning' && project.status !== 'planning') return false;
        if (filter === 'Completed' && project.status !== 'completed') return false;
        if (selectedCategory !== 'All' && !project.category.includes(selectedCategory)) return false;
        return true;
    });

    const totalProjects = projects.length;
    const activeProjects = projects.filter(p => p.status === 'active').length;
    const totalHours = projects.reduce((sum, p) => sum + p.hours, 0);
    const completedProjects = projects.filter(p => p.status === 'completed').length;

    const handleCreateProject = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            warning('Project Name Required', 'Please enter a name for the project.');
            return;
        }
        const newProj: Project = {
            id: Date.now(),
            name: name.trim(),
            description: description.trim() || 'No description provided.',
            status,
            priority,
            category: categoryInput.split(',').map(c => c.trim()).filter(Boolean),
            tasksDone: 0,
            tasksTotal: 10,
            members: [
                { avatar: 'https://storage.googleapis.com/banani-avatars/avatar/female/25-35/South Asian/1' },
            ],
            hours: 0,
            dueDate: dueDate || 'TBD',
            image: 'https://storage.googleapis.com/banani-generated-images/generated-images/b8be07fe-2862-4aca-8fba-24c9009be2ca.jpg',
            gradientBorder: 'border-border',
        };
        setProjects(prev => [newProj, ...prev]);
        success('Project Created', `"${name.trim()}" has been successfully added.`);
        setIsCreateModalOpen(false);
        setName('');
        setDescription('');
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'active': return { label: 'Active', color: 'bg-teal-bg text-primary', dot: 'bg-primary' };
            case 'planning': return { label: 'Planning', color: 'bg-warning-bg text-warning', dot: 'bg-warning' };
            case 'completed': return { label: 'Completed', color: 'bg-success-bg text-success', dot: 'bg-success' };
            default: return { label: status, color: 'bg-muted text-foreground-muted', dot: 'bg-muted' };
        }
    };

    const getPriorityBadge = (priority: string) => {
        if (priority === 'high') return { label: 'high', color: 'bg-background text-danger', icon: 'arrow-up' };
        return { label: 'medium', color: 'bg-background text-warning', icon: 'minus' };
    };

    return (
        <div className="flex flex-col flex-1 min-w-0">
            <div className="flex flex-col gap-6 px-8 py-6">
                <div className="grid grid-cols-4 gap-4">
                    <StatCard icon="folder" iconBg="bg-info-bg" iconColor="text-info" value={totalProjects.toString()} label="Total Projects" />
                    <StatCard icon="activity" iconBg="bg-teal-bg" iconColor="text-primary" value={activeProjects.toString()} label="Active" />
                    <StatCard icon="clock" iconBg="bg-purple-bg" iconColor="text-purple" value={`${totalHours}h`} label="Total Hours" />
                    <StatCard icon="check-circle-2" iconBg="bg-success-bg" iconColor="text-success" value={completedProjects.toString()} label="Completed" />
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-surface rounded-lg p-1 border border-border">
                        {(['All', 'Active', 'Planning', 'Completed'] as const).map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${filter === f ? 'bg-primary text-primary-foreground' : 'text-foreground-muted hover:bg-surface-2'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowFilterPanel(prev => !prev)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-xs font-semibold transition ${showFilterPanel ? 'bg-teal-bg text-primary' : 'bg-surface text-foreground-muted hover:bg-surface-2'}`}
                        >
                            <Icon name="sliders-horizontal" size={13} /> Filter
                        </button>
                        <div className="flex rounded-lg border border-border bg-surface overflow-hidden">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`px-3 py-2 ${viewMode === 'grid' ? 'text-primary' : 'text-foreground-muted'} border-r border-border hover:text-primary transition`}
                            >
                                <Icon name="layout-grid" size={14} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`px-3 py-2 ${viewMode === 'list' ? 'text-primary' : 'text-foreground-muted'} hover:text-primary transition`}
                            >
                                <Icon name="list" size={14} />
                            </button>
                        </div>
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition shadow-sm"
                        >
                            <Icon name="plus" size={13} /> New Project
                        </button>
                    </div>
                </div>

                {showFilterPanel && (
                    <div className="flex items-center gap-3 p-3 rounded-xl border border-border bg-surface text-xs">
                        <span className="font-semibold text-foreground">Category:</span>
                        <div className="flex flex-wrap gap-1.5">
                            {allCategories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-2.5 py-1 rounded-lg font-medium transition ${selectedCategory === cat ? 'bg-primary text-primary-foreground' : 'bg-background-2 text-foreground-muted hover:bg-surface-2'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => { setSelectedCategory('All'); setFilter('All'); }}
                            className="ml-auto text-xs text-primary hover:underline"
                        >
                            Reset
                        </button>
                    </div>
                )}

                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-2 gap-5">
                        {filteredProjects.map(project => {
                            const progress = project.tasksTotal > 0 ? Math.round((project.tasksDone / project.tasksTotal) * 100) : 0;
                            const statusBadge = getStatusBadge(project.status);
                            const priorityBadge = getPriorityBadge(project.priority);
                            return (
                                <div key={project.id} className={`flex flex-col gap-0 rounded-xl border overflow-hidden ${project.gradientBorder} bg-surface`}>
                                    <div className="relative overflow-hidden" style={{ height: '120px' }}>
                                        <img src={project.image} className="w-full h-full object-cover" alt={project.name} />
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface" />
                                        <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${statusBadge.color}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${statusBadge.dot}`} />
                                            {statusBadge.label}
                                        </div>
                                        <div className={`absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${priorityBadge.color}`}>
                                            <Icon name={priorityBadge.icon as any} size={11} />
                                            {priorityBadge.label}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-4 p-5">
                                        <div>
                                            <h3 className="text-base font-bold text-foreground">{project.name}</h3>
                                            <p className="text-xs text-foreground-muted mt-1 leading-relaxed line-clamp-2">{project.description}</p>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {project.category.map(cat => (
                                                <span key={cat} className="text-xs px-2.5 py-1 rounded-full bg-muted text-foreground-muted font-medium">{cat}</span>
                                            ))}
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-foreground-muted">{project.tasksDone} / {project.tasksTotal} tasks</span>
                                                <span className="text-xs font-bold text-foreground">{progress}%</span>
                                            </div>
                                            <div className="h-2 rounded-full bg-muted overflow-hidden">
                                                <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between pt-2 border-t border-border">
                                            <div className="flex items-center gap-2">
                                                <div className="flex -space-x-2">
                                                    {project.members.slice(0, 3).map((member, idx) => (
                                                        <img key={idx} src={member.avatar} className="w-7 h-7 rounded-full border-2 border-surface" alt="member" />
                                                    ))}
                                                </div>
                                                <span className="text-xs text-foreground-muted">{project.members.length} members</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-xs text-foreground-muted">
                                                <span className="flex items-center gap-1"><Icon name="clock" size={12} /> {project.hours}h</span>
                                                <span className="flex items-center gap-1"><Icon name="calendar" size={12} /> {project.dueDate}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex flex-col rounded-xl border border-border bg-surface overflow-hidden">
                        {filteredProjects.map(project => {
                            const progress = project.tasksTotal > 0 ? Math.round((project.tasksDone / project.tasksTotal) * 100) : 0;
                            const statusBadge = getStatusBadge(project.status);
                            return (
                                <div key={project.id} className="flex items-center justify-between gap-4 p-4 border-b border-border last:border-0 hover:bg-surface-2 transition">
                                    <div className="flex items-center gap-3 min-w-0 flex-1">
                                        <img src={project.image} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" alt={project.name} />
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-sm font-bold text-foreground truncate">{project.name}</span>
                                            <span className="text-xs text-foreground-muted truncate">{project.description}</span>
                                        </div>
                                    </div>
                                    <div className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusBadge.color}`}>
                                        {statusBadge.label}
                                    </div>
                                    <div className="flex items-center gap-2 w-32">
                                        <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                                            <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
                                        </div>
                                        <span className="text-xs font-bold text-foreground-muted">{progress}%</span>
                                    </div>
                                    <span className="text-xs text-foreground-muted w-24 text-right flex items-center justify-end gap-1">
                                        <Icon name="calendar" size={12} /> {project.dueDate}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                )}

                <div className="rounded-xl border border-border bg-surface p-6 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold text-foreground">Project Timeline</h3>
                        <div className="text-xs text-primary font-semibold flex items-center gap-1 cursor-pointer hover:underline">
                            <span>Full timeline</span> <Icon name="arrow-right" size={13} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex ml-36">
                            {['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'].map(month => (
                                <div key={month} className="flex-1 text-xs text-foreground-muted text-center border-l border-border first:border-0 py-1">{month}</div>
                            ))}
                        </div>
                        <TimelineRow name="Analytics Dashboard" color="bg-success" left="0%" width="28%" icon="check" />
                        <TimelineRow name="Product Redesign 2.0" color="bg-purple" left="14%" width="52%" />
                        <TimelineRow name="Payment Integration" color="bg-primary" left="28%" width="28%" />
                        <TimelineRow name="Mobile App v2" color="bg-warning" left="56%" width="70%" />
                    </div>
                </div>
            </div>

            {isCreateModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
                    <div className="w-full max-w-lg bg-surface border border-border rounded-2xl shadow-2xl p-6 flex flex-col gap-5">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-bold text-foreground">Create New Project</h3>
                            <button
                                onClick={() => setIsCreateModalOpen(false)}
                                className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-foreground-muted hover:text-foreground hover:bg-surface-2 transition"
                            >
                                <Icon name="x" size={16} />
                            </button>
                        </div>
                        <form onSubmit={handleCreateProject} className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-foreground">Project Name</label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. Cloud Infrastructure Migration"
                                    className="px-3.5 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-foreground">Description</label>
                                <textarea
                                    rows={3}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Provide brief details about this project..."
                                    className="px-3.5 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-foreground">Status</label>
                                    <select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value as Project['status'])}
                                        className="px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary"
                                    >
                                        <option value="active">Active</option>
                                        <option value="planning">Planning</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-foreground">Priority</label>
                                    <select
                                        value={priority}
                                        onChange={(e) => setPriority(e.target.value as Project['priority'])}
                                        className="px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary"
                                    >
                                        <option value="high">High</option>
                                        <option value="medium">Medium</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-foreground">Categories (comma-separated)</label>
                                    <input
                                        type="text"
                                        value={categoryInput}
                                        onChange={(e) => setCategoryInput(e.target.value)}
                                        className="px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-foreground">Due Date</label>
                                    <input
                                        type="text"
                                        value={dueDate}
                                        onChange={(e) => setDueDate(e.target.value)}
                                        className="px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-end gap-2.5 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsCreateModalOpen(false)}
                                    className="px-4 py-2 rounded-lg border border-border bg-surface text-xs font-semibold text-foreground-muted hover:bg-surface-2 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition shadow-sm"
                                >
                                    Create Project
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const StatCard: React.FC<{ icon: any; iconBg: string; iconColor: string; value: string; label: string }> = ({ icon, iconBg, iconColor, value, label }) => (
    <motion.div whileHover={{ y: -4 }} className="flex items-center gap-4 rounded-xl border border-border bg-surface p-4">
        <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${iconBg} ${iconColor}`}>
            <Icon name={icon} size={18} />
        </div>
        <div>
            <div className="text-2xl font-bold text-foreground font-headings">{value}</div>
            <div className="text-xs text-foreground-muted">{label}</div>
        </div>
    </motion.div>
);

const TimelineRow: React.FC<{ name: string; color: string; left: string; width: string; icon?: string }> = ({ name, color, left, width, icon }) => (
    <div className="flex items-center gap-4">
        <span className="text-xs text-foreground-muted truncate" style={{ width: '140px', flexShrink: 0 }}>{name}</span>
        <div className="flex-1 relative h-6">
            <div className={`absolute h-full rounded-lg ${color} opacity-90 flex items-center px-3`} style={{ left, width }}>
                {icon && <Icon name={icon} size={11} />}
            </div>
        </div>
    </div>
);

export default Projects;