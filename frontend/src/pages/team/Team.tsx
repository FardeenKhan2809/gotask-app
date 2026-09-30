import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/Icon';
import StatCard from '@/components/ui/StatCard';
import { useToast } from '@/context/ToastContext';

interface TeamMember {
    id: number;
    name: string;
    role: string;
    department: 'Engineering' | 'Design' | 'Product' | 'Infra';
    avatar: string;
    status: 'online' | 'busy' | 'away' | 'offline';
    todayHours: string;
    weekHours: number;
    tasks: number;
    utilization: number;
}

const initialTeamMembers: TeamMember[] = [
    { id: 1, name: 'Priya Sharma', role: 'Senior Designer', department: 'Design', avatar: 'https://storage.googleapis.com/banani-avatars/avatar/female/25-35/South Asian/1', status: 'online', todayHours: '6h 12m', weekHours: 42.1, tasks: 18, utilization: 92 },
    { id: 2, name: 'Aryan Mehta', role: 'Frontend Engineer', department: 'Engineering', avatar: 'https://storage.googleapis.com/banani-avatars/avatar/male/25-35/South Asian/0', status: 'online', todayHours: '5h 44m', weekHours: 38.6, tasks: 14, utilization: 72 },
    { id: 3, name: 'James Carter', role: 'Backend Engineer', department: 'Engineering', avatar: 'https://storage.googleapis.com/banani-avatars/avatar/male/25-35/North American/2', status: 'busy', todayHours: '7h 01m', weekHours: 36.2, tasks: 16, utilization: 88 },
    { id: 4, name: 'Aiko Tanaka', role: 'Product Manager', department: 'Product', avatar: 'https://storage.googleapis.com/banani-avatars/avatar/female/25-35/East Asian/3', status: 'online', todayHours: '4h 30m', weekHours: 34.8, tasks: 13, utilization: 85 },
    { id: 5, name: 'Carlos Vega', role: 'QA Engineer', department: 'Engineering', avatar: 'https://storage.googleapis.com/banani-avatars/avatar/male/25-35/Hispanic/4', status: 'away', todayHours: '3h 20m', weekHours: 32.0, tasks: 11, utilization: 63 },
    { id: 6, name: 'Amara Osei', role: 'UX Researcher', department: 'Design', avatar: 'https://storage.googleapis.com/banani-avatars/avatar/female/25-35/African/5', status: 'online', todayHours: '5h 00m', weekHours: 30.5, tasks: 9, utilization: 76 },
    { id: 7, name: 'Ryan Park', role: 'DevOps Engineer', department: 'Infra', avatar: 'https://storage.googleapis.com/banani-avatars/avatar/male/25-35/East Asian/6', status: 'offline', todayHours: '0h 00m', weekHours: 28.0, tasks: 7, utilization: 55 },
];

const statusConfig = {
    online: { color: 'bg-success', label: 'Online' },
    busy: { color: 'bg-danger', label: 'Busy' },
    away: { color: 'bg-warning', label: 'Away' },
    offline: { color: 'bg-muted-foreground', label: 'Offline' },
};

const departmentColors = {
    Engineering: 'bg-primary',
    Design: 'bg-purple',
    Product: 'bg-warning',
    Infra: 'bg-info',
};

const Team: React.FC = () => {
    const navigate = useNavigate();
    const { success, info } = useToast();
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
    const [selectedDept, setSelectedDept] = useState<string | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilterPanel, setShowFilterPanel] = useState(false);

    const [isInviteOpen, setIsInviteOpen] = useState(false);
    const [inviteName, setInviteName] = useState('');
    const [inviteEmail, setInviteEmail] = useState('');
    const [inviteRole, setInviteRole] = useState('Frontend Engineer');
    const [inviteDept, setInviteDept] = useState<TeamMember['department']>('Engineering');

    const [viewingMember, setViewingMember] = useState<TeamMember | null>(null);

    const filteredMembers = teamMembers.filter(member => {
        if (selectedDept && member.department !== selectedDept) return false;
        if (selectedStatus !== 'all' && member.status !== selectedStatus) return false;
        if (searchTerm && !member.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
        return true;
    });

    const handleSendInvite = (e: React.FormEvent) => {
        e.preventDefault();
        const newMember: TeamMember = {
            id: Date.now(),
            name: inviteName.trim(),
            role: inviteRole.trim(),
            department: inviteDept,
            avatar: 'https://storage.googleapis.com/banani-avatars/avatar/male/25-35/North American/2',
            status: 'online',
            todayHours: '0h 00m',
            weekHours: 0,
            tasks: 0,
            utilization: 0,
        };
        setTeamMembers(prev => [...prev, newMember]);
        success('Invitation Sent', `Invitation emailed to ${inviteEmail}.`);
        setIsInviteOpen(false);
        setInviteName('');
        setInviteEmail('');
    };

    const handleMessage = (name: string) => {
        navigate('/chat');
        info('Open Chat', `Navigating to chat with ${name}`);
    };

    const totalMembers = teamMembers.length;
    const onlineNow = teamMembers.filter(m => m.status === 'online').length;
    const totalHoursToday = teamMembers.reduce((sum, m) => {
        const match = m.todayHours.match(/(\d+)h\s*(\d+)m/);
        if (match) return sum + parseInt(match[1]) + parseInt(match[2]) / 60;
        return sum;
    }, 0);
    const avgUtilization = totalMembers > 0 ? Math.round(teamMembers.reduce((sum, m) => sum + m.utilization, 0) / totalMembers) : 0;

    return (
        <div className="flex flex-col flex-1 min-w-0">
            <div className="flex flex-1 min-w-0">
                <div className="flex flex-col flex-1 min-w-0 px-8 py-6 gap-6">
                    <div className="grid grid-cols-4 gap-4">
                        <StatCard
                            icon="users"
                            iconBg="bg-info-bg"
                            iconColor="text-info"
                            value={totalMembers.toString()}
                            label="Total Members"
                            sublabel="Across 4 departments"
                        />
                        <StatCard
                            icon="activity"
                            iconBg="bg-success-bg"
                            iconColor="text-success"
                            value={onlineNow.toString()}
                            label="Online Now"
                            sublabel={`${teamMembers.filter(m => m.status === 'busy').length} busy, ${teamMembers.filter(m => m.status === 'away').length} away`}
                        />
                        <StatCard
                            icon="clock"
                            iconBg="bg-teal-bg"
                            iconColor="text-primary"
                            value={`${Math.floor(totalHoursToday)}h ${Math.round((totalHoursToday % 1) * 60)}m`}
                            label="Team Hours Today"
                            sublabel={`Avg ${(totalHoursToday / totalMembers).toFixed(1)}h / person`}
                        />
                        <StatCard
                            icon="bar-chart-2"
                            iconBg="bg-purple-bg"
                            iconColor="text-purple"
                            value={`${avgUtilization}%`}
                            label="Avg Utilization"
                            sublabel="+5% vs last week"
                        />
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="flex flex-wrap items-center gap-3">
                            {Object.keys(departmentColors).map(dept => (
                                <button
                                    key={dept}
                                    onClick={() => setSelectedDept(selectedDept === dept ? null : dept)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-surface text-sm font-semibold transition ${selectedDept === dept ? 'ring-2 ring-primary text-foreground' : 'text-foreground-muted hover:bg-surface-2'
                                        }`}
                                >
                                    <span className={`w-2.5 h-2.5 rounded-full ${departmentColors[dept as keyof typeof departmentColors]}`} />
                                    {dept}
                                    <span className="bg-muted text-foreground-muted text-xs font-bold px-1.5 py-0.5 rounded-full">
                                        {teamMembers.filter(m => m.department === dept).length}
                                    </span>
                                </button>
                            ))}
                            <div className="ml-auto flex items-center gap-2">
                                <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs text-foreground-muted w-48">
                                    <Icon name="search" size={13} />
                                    <input
                                        type="text"
                                        placeholder="Search team..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="bg-transparent text-xs text-foreground outline-none w-full"
                                    />
                                </div>
                                <button
                                    onClick={() => setShowFilterPanel(prev => !prev)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-xs font-semibold transition ${showFilterPanel ? 'bg-teal-bg text-primary' : 'bg-surface text-foreground-muted hover:bg-surface-2'}`}
                                >
                                    <Icon name="sliders-horizontal" size={13} /> Filter
                                </button>
                                <button
                                    onClick={() => setIsInviteOpen(true)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition shadow-sm"
                                >
                                    <Icon name="user-plus" size={13} /> Invite Member
                                </button>
                            </div>
                        </div>

                        {showFilterPanel && (
                            <div className="flex items-center gap-4 p-3 rounded-xl border border-border bg-surface text-xs">
                                <span className="font-semibold text-foreground">Filter Status:</span>
                                {(['all', 'online', 'busy', 'away', 'offline'] as const).map(status => (
                                    <button
                                        key={status}
                                        onClick={() => setSelectedStatus(status)}
                                        className={`px-3 py-1 rounded-lg capitalize font-medium transition ${selectedStatus === status ? 'bg-primary text-primary-foreground' : 'bg-background-2 text-foreground-muted hover:bg-surface-2'}`}
                                    >
                                        {status}
                                    </button>
                                ))}
                                <button
                                    onClick={() => { setSelectedStatus('all'); setSelectedDept(null); }}
                                    className="ml-auto text-xs text-primary hover:underline"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="rounded-xl border border-border overflow-hidden bg-surface">
                        <div className="flex items-center gap-4 px-5 py-3 bg-background-3 border-b border-border">
                            <div className="w-9 flex-shrink-0"></div>
                            <div className="flex-1 text-xs font-bold text-foreground-muted uppercase tracking-wide" style={{ minWidth: '180px' }}>Member</div>
                            <div className="text-xs font-bold text-foreground-muted uppercase tracking-wide" style={{ width: '110px' }}>Department</div>
                            <div className="text-xs font-bold text-foreground-muted uppercase tracking-wide" style={{ width: '80px' }}>Status</div>
                            <div className="text-xs font-bold text-foreground-muted uppercase tracking-wide text-center" style={{ width: '80px' }}>Today</div>
                            <div className="text-xs font-bold text-foreground-muted uppercase tracking-wide text-center" style={{ width: '80px' }}>This Week</div>
                            <div className="text-xs font-bold text-foreground-muted uppercase tracking-wide text-center" style={{ width: '60px' }}>Tasks</div>
                            <div className="text-xs font-bold text-foreground-muted uppercase tracking-wide" style={{ width: '100px' }}>Utilization</div>
                            <div style={{ width: '70px' }}></div>
                        </div>
                        {filteredMembers.map(member => (
                            <div key={member.id} className="flex items-center gap-4 px-5 py-4 border-b border-border bg-surface last:border-0">
                                <div className="relative flex-shrink-0">
                                    <img src={member.avatar} className="w-9 h-9 rounded-full" alt={member.name} />
                                    <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-background ${statusConfig[member.status].color}`} />
                                </div>
                                <div className="flex flex-col min-w-0" style={{ width: '180px' }}>
                                    <span className="text-sm font-semibold text-foreground truncate">{member.name}</span>
                                    <span className="text-xs text-foreground-muted truncate">{member.role}</span>
                                </div>
                                <span className="text-xs px-2.5 py-1 rounded-full bg-muted text-foreground-muted font-medium flex-shrink-0 text-center" style={{ width: '110px' }}>
                                    {member.department}
                                </span>
                                <div className="flex items-center gap-1.5 flex-shrink-0" style={{ width: '80px' }}>
                                    <span className={`w-2 h-2 rounded-full ${statusConfig[member.status].color}`} />
                                    <span className="text-xs text-foreground-muted">{statusConfig[member.status].label}</span>
                                </div>
                                <span className="text-sm font-bold text-foreground text-center flex-shrink-0" style={{ width: '80px' }}>{member.todayHours}</span>
                                <span className="text-sm font-bold text-foreground text-center flex-shrink-0" style={{ width: '80px' }}>{member.weekHours}h</span>
                                <span className="text-sm font-bold text-foreground text-center flex-shrink-0" style={{ width: '60px' }}>{member.tasks}</span>
                                <div className="flex items-center gap-2 flex-shrink-0" style={{ width: '100px' }}>
                                    <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                                        <div className={`h-full rounded-full ${member.utilization >= 80 ? 'bg-success' : 'bg-primary'}`} style={{ width: `${member.utilization}%` }} />
                                    </div>
                                    <span className="text-xs font-bold text-foreground-muted">{member.utilization}%</span>
                                </div>
                                <div className="flex items-center gap-1 ml-auto flex-shrink-0">
                                    <button
                                        onClick={() => setViewingMember(member)}
                                        title={`View ${member.name}`}
                                        className="w-7 h-7 flex items-center justify-center rounded-lg border border-border text-foreground-muted hover:bg-surface-2 transition"
                                    >
                                        <Icon name="eye" size={13} />
                                    </button>
                                    <button
                                        onClick={() => handleMessage(member.name)}
                                        title={`Message ${member.name}`}
                                        className="w-7 h-7 flex items-center justify-center rounded-lg border border-border text-foreground-muted hover:bg-surface-2 transition"
                                    >
                                        <Icon name="message-circle" size={13} />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {filteredMembers.length === 0 && (
                            <div className="py-12 text-center text-sm text-foreground-muted">
                                No team members match your criteria.
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-5 border-l border-border px-6 py-6 w-[280px] flex-shrink-0 overflow-y-auto">
                    <h3 className="text-sm font-bold text-foreground">Live Activity</h3>
                    {teamMembers.map(member => (
                        <div key={member.id} className="flex items-center gap-3 rounded-xl border border-border bg-surface p-3">
                            <div className="relative flex-shrink-0">
                                <img src={member.avatar} className="w-8 h-8 rounded-full" alt={member.name} />
                                <span className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border-2 border-background ${statusConfig[member.status].color}`} />
                            </div>
                            <div className="flex flex-col flex-1 min-w-0">
                                <span className="text-xs font-semibold text-foreground truncate">{member.name}</span>
                                <span className="text-xs text-foreground-muted">
                                    {member.status === 'busy' ? 'In a meeting' : member.status === 'away' ? 'Away' : 'Working on tasks'}
                                </span>
                            </div>
                            <span className={`text-xs font-mono font-bold ${member.status === 'online' ? 'text-primary' : 'text-foreground-muted'}`}>
                                {member.todayHours}
                            </span>
                        </div>
                    ))}
                    <div className="mt-2 rounded-xl border border-border bg-surface p-5 flex flex-col gap-4">
                        <h4 className="text-xs font-bold text-foreground-muted uppercase tracking-wide">Workload Distribution</h4>
                        {teamMembers.map(member => (
                            <div key={member.id} className="flex items-center gap-2">
                                <span className="text-xs text-foreground-muted truncate" style={{ width: '80px' }}>{member.name.split(' ')[0]}</span>
                                <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                                    <div className={`h-full rounded-full ${member.utilization >= 80 ? 'bg-success' : 'bg-primary'}`} style={{ width: `${member.utilization}%` }} />
                                </div>
                                <span className="text-xs font-bold text-foreground-muted">{member.utilization}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {isInviteOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
                    <div className="w-full max-w-md bg-surface border border-border rounded-2xl shadow-2xl p-6 flex flex-col gap-5">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-bold text-foreground">Invite Team Member</h3>
                            <button
                                onClick={() => setIsInviteOpen(false)}
                                className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-foreground-muted hover:text-foreground hover:bg-surface-2 transition"
                            >
                                <Icon name="x" size={16} />
                            </button>
                        </div>
                        <form onSubmit={handleSendInvite} className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-foreground">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={inviteName}
                                    onChange={(e) => setInviteName(e.target.value)}
                                    placeholder="e.g. Alex Morgan"
                                    className="px-3.5 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-foreground">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={inviteEmail}
                                    onChange={(e) => setInviteEmail(e.target.value)}
                                    placeholder="alex@company.com"
                                    className="px-3.5 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-foreground">Role</label>
                                    <input
                                        type="text"
                                        required
                                        value={inviteRole}
                                        onChange={(e) => setInviteRole(e.target.value)}
                                        className="px-3.5 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-foreground">Department</label>
                                    <select
                                        value={inviteDept}
                                        onChange={(e) => setInviteDept(e.target.value as TeamMember['department'])}
                                        className="px-3.5 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary"
                                    >
                                        <option value="Engineering">Engineering</option>
                                        <option value="Design">Design</option>
                                        <option value="Product">Product</option>
                                        <option value="Infra">Infra</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex items-center justify-end gap-2.5 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsInviteOpen(false)}
                                    className="px-4 py-2 rounded-lg border border-border bg-surface text-xs font-semibold text-foreground-muted hover:bg-surface-2 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition shadow-sm"
                                >
                                    Send Invite
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {viewingMember && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
                    <div className="w-full max-w-md bg-surface border border-border rounded-2xl shadow-2xl p-6 flex flex-col gap-5">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-bold text-foreground">Member Profile</h3>
                            <button
                                onClick={() => setViewingMember(null)}
                                className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-foreground-muted hover:text-foreground hover:bg-surface-2 transition"
                            >
                                <Icon name="x" size={16} />
                            </button>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-background-2 border border-border">
                            <img src={viewingMember.avatar} className="w-16 h-16 rounded-full" alt={viewingMember.name} />
                            <div className="flex flex-col">
                                <h4 className="text-base font-bold text-foreground">{viewingMember.name}</h4>
                                <span className="text-xs text-foreground-muted">{viewingMember.role} · {viewingMember.department}</span>
                                <span className="text-xs text-primary font-semibold capitalize mt-1">{viewingMember.status}</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                            <div className="p-3 rounded-lg border border-border bg-background">
                                <span className="text-foreground-muted block mb-1">Today</span>
                                <span className="font-bold text-foreground">{viewingMember.todayHours}</span>
                            </div>
                            <div className="p-3 rounded-lg border border-border bg-background">
                                <span className="text-foreground-muted block mb-1">This Week</span>
                                <span className="font-bold text-foreground">{viewingMember.weekHours}h</span>
                            </div>
                            <div className="p-3 rounded-lg border border-border bg-background">
                                <span className="text-foreground-muted block mb-1">Completed Tasks</span>
                                <span className="font-bold text-foreground">{viewingMember.tasks}</span>
                            </div>
                            <div className="p-3 rounded-lg border border-border bg-background">
                                <span className="text-foreground-muted block mb-1">Utilization</span>
                                <span className="font-bold text-primary">{viewingMember.utilization}%</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-2 pt-2">
                            <button
                                onClick={() => setViewingMember(null)}
                                className="px-4 py-2 rounded-lg border border-border bg-surface text-xs font-semibold text-foreground-muted hover:bg-surface-2 transition"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => {
                                    const name = viewingMember.name;
                                    setViewingMember(null);
                                    handleMessage(name);
                                }}
                                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition shadow-sm"
                            >
                                <Icon name="message-circle" size={13} />
                                Start Chat
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Team;