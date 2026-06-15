import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../components/ui/Icon';

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

const teamMembers: TeamMember[] = [
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
    const [selectedDept, setSelectedDept] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredMembers = teamMembers.filter(member => {
        if (selectedDept && member.department !== selectedDept) return false;
        if (searchTerm && !member.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
        return true;
    });

    const handleInvite = () => alert('Invite member dialog (demo)');
    const handleFilter = () => alert('Filter panel (demo)');
    const handleViewMember = (name: string) => alert(`View details for ${name}`);
    const handleMessage = (name: string) => alert(`Start chat with ${name}`);

    const totalMembers = teamMembers.length;
    const onlineNow = teamMembers.filter(m => m.status === 'online').length;
    const totalHoursToday = teamMembers.reduce((sum, m) => {
        const match = m.todayHours.match(/(\d+)h\s*(\d+)m/);
        if (match) return sum + parseInt(match[1]) + parseInt(match[2]) / 60;
        return sum;
    }, 0);
    const avgUtilization = Math.round(teamMembers.reduce((sum, m) => sum + m.utilization, 0) / totalMembers);

    return (
        <div className="flex flex-col flex-1 min-w-0">
            <div className="flex flex-1 min-w-0">
                <div className="flex flex-col flex-1 min-w-0 px-8 py-6 gap-6">
                    {/* Stats Cards */}
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
                            sublabel="1 busy, 1 away"
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

                    {/* Filters + Actions */}
                    <div className="flex gap-3">
                        {Object.keys(departmentColors).map(dept => (
                            <button
                                key={dept}
                                onClick={() => setSelectedDept(selectedDept === dept ? null : dept as any)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-surface text-sm font-semibold transition ${selectedDept === dept ? 'ring-2 ring-primary' : 'text-foreground-muted'
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
                            <button onClick={handleFilter} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-surface text-xs font-semibold text-foreground-muted">
                                <Icon name="sliders-horizontal" size={13} /> Filter
                            </button>
                            <button onClick={handleInvite} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold">
                                <Icon name="user-plus" size={13} /> Invite Member
                            </button>
                        </div>
                    </div>

                    {/* Team Table */}
                    <div className="rounded-xl border border-border overflow-hidden">
                        <div className="flex items-center gap-4 px-5 py-3 bg-background-3 border-b border-border">
                            <div className="w-9 flex-shrink-0"></div>
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
                                    <button onClick={() => handleViewMember(member.name)} className="w-7 h-7 flex items-center justify-center rounded-lg border border-border text-foreground-muted hover:bg-surface-2 transition">
                                        <Icon name="eye" size={13} />
                                    </button>
                                    <button onClick={() => handleMessage(member.name)} className="w-7 h-7 flex items-center justify-center rounded-lg border border-border text-foreground-muted hover:bg-surface-2 transition">
                                        <Icon name="message-circle" size={13} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Sidebar – Live Activity & Workload */}
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
        </div>
    );
};

const StatCard: React.FC<{
    icon: any;
    iconBg: string;
    iconColor: string;
    value: string;
    label: string;
    sublabel: string;
}> = ({ icon, iconBg, iconColor, value, label, sublabel }) => (
    <motion.div whileHover={{ y: -4 }} className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
        <div className={`w-9 h-9 flex items-center justify-center rounded-lg ${iconBg} ${iconColor}`}>
            <Icon name={icon} size={16} />
        </div>
        <div>
            <div className="text-2xl font-bold text-foreground font-headings">{value}</div>
            <div className="text-xs text-foreground-muted mt-0.5">{label}</div>
            <div className="text-xs text-foreground-muted opacity-70 mt-0.5">{sublabel}</div>
        </div>
    </motion.div>
);

export default Team;