// src/pages/admin/AdminEmployeeListing.tsx
import React, { useState } from 'react';
import Icon from '../../../components/ui/Icon';

interface Employee {
    id: number;
    name: string;
    role: string;
    email: string;
    avatar: string;
    status: 'online' | 'busy' | 'away' | 'offline';
    department: string;
    departmentColor: string;
    todayHours: string;
    weekHours: number;
    tasks: number;
    utilization: number;
    salary: number;
}

const employees: Employee[] = [
    {
        id: 1,
        name: 'Priya Sharma',
        role: 'Senior Designer',
        email: 'priya@acmecorp.com',
        avatar: 'female/25-35/South Asian/1',
        status: 'online',
        department: 'Design',
        departmentColor: 'bg-purple-bg text-purple',
        todayHours: '6h 12m',
        weekHours: 38.4,
        tasks: 18,
        utilization: 92,
        salary: 8200,
    },
    {
        id: 2,
        name: 'James Carter',
        role: 'Backend Engineer',
        email: 'james@acmecorp.com',
        avatar: 'male/25-35/North American/2',
        status: 'busy',
        department: 'Engineering',
        departmentColor: 'bg-primary text-primary-foreground',
        todayHours: '7h 01m',
        weekHours: 36.2,
        tasks: 16,
        utilization: 88,
        salary: 9500,
    },
    {
        id: 3,
        name: 'Aryan Mehta',
        role: 'Frontend Engineer',
        email: 'aryan@acmecorp.com',
        avatar: 'male/25-35/South Asian/0',
        status: 'online',
        department: 'Engineering',
        departmentColor: 'bg-primary text-primary-foreground',
        todayHours: '5h 44m',
        weekHours: 34.6,
        tasks: 14,
        utilization: 72,
        salary: 8800,
    },
    {
        id: 4,
        name: 'Aiko Tanaka',
        role: 'Product Manager',
        email: 'aiko@acmecorp.com',
        avatar: 'female/25-35/East Asian/3',
        status: 'online',
        department: 'Product',
        departmentColor: 'bg-warning-bg text-warning',
        todayHours: '4h 30m',
        weekHours: 34.8,
        tasks: 13,
        utilization: 85,
        salary: 11000,
    },
    {
        id: 5,
        name: 'Carlos Vega',
        role: 'QA Engineer',
        email: 'carlos@acmecorp.com',
        avatar: 'male/25-35/Hispanic/4',
        status: 'away',
        department: 'Engineering',
        departmentColor: 'bg-primary text-primary-foreground',
        todayHours: '3h 20m',
        weekHours: 32.0,
        tasks: 11,
        utilization: 63,
        salary: 7400,
    },
    {
        id: 6,
        name: 'Amara Osei',
        role: 'UX Researcher',
        email: 'amara@acmecorp.com',
        avatar: 'female/25-35/African/5',
        status: 'online',
        department: 'Design',
        departmentColor: 'bg-purple-bg text-purple',
        todayHours: '5h 00m',
        weekHours: 30.5,
        tasks: 9,
        utilization: 76,
        salary: 7900,
    },
    {
        id: 7,
        name: 'Ryan Park',
        role: 'DevOps Engineer',
        email: 'ryan@acmecorp.com',
        avatar: 'male/25-35/East Asian/6',
        status: 'offline',
        department: 'Infra',
        departmentColor: 'bg-info-bg text-info',
        todayHours: '0h 00m',
        weekHours: 28.0,
        tasks: 7,
        utilization: 55,
        salary: 9100,
    },
];

const statusConfig = {
    online: { color: 'bg-success', label: 'Online' },
    busy: { color: 'bg-danger', label: 'Busy' },
    away: { color: 'bg-warning', label: 'Away' },
    offline: { color: 'bg-muted-foreground', label: 'Offline' },
};

const AdminEmployeeListing: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState<string>('All');
    const [selectedStatus, setSelectedStatus] = useState<string>('All');
    const [sortBy, setSortBy] = useState<string>('name');

    const departments = ['All', 'Engineering', 'Design', 'Product', 'Infra'];
    const statuses = ['All', 'online', 'busy', 'away', 'offline'];

    const filteredEmployees = employees.filter((emp) => {
        const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.role.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDepartment = selectedDepartment === 'All' || emp.department === selectedDepartment;
        const matchesStatus = selectedStatus === 'All' || emp.status === selectedStatus;
        return matchesSearch && matchesDepartment && matchesStatus;
    });

    const sortedEmployees = [...filteredEmployees].sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'hours') return a.weekHours - b.weekHours;
        if (sortBy === 'tasks') return a.tasks - b.tasks;
        if (sortBy === 'utilization') return a.utilization - b.utilization;
        return 0;
    });

    const stats = {
        total: employees.length,
        activeNow: employees.filter(e => e.status === 'online').length,
        todayHours: '31h 47m',
        avgUtilization: Math.round(employees.reduce((sum, e) => sum + e.utilization, 0) / employees.length),
    };

    const handleAddEmployee = () => alert('Add Employee (demo)');
    const handleExportCSV = () => alert('Export CSV (demo)');
    const handleView = (name: string) => alert(`View ${name}`);
    const handleEdit = (name: string) => alert(`Edit ${name}`);
    const handleDelete = (name: string) => alert(`Delete ${name}`);

    return (
        <div className="flex bg-background font-body min-h-screen">
            <div className="flex flex-col flex-1 min-w-0">
                <div className="flex flex-1 min-w-0">
                    <div className="flex flex-col flex-1 min-w-0 px-8 py-6 gap-6">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-4 gap-4">
                            <StatCard
                                icon="users"
                                iconBg="bg-info-bg"
                                iconColor="text-info"
                                value={stats.total.toString()}
                                label="Total Employees"
                                sublabel="4 departments"
                                trend="+1 this month"
                                trendUp
                            />
                            <StatCard
                                icon="activity"
                                iconBg="bg-success-bg"
                                iconColor="text-success"
                                value={`${stats.activeNow} / ${stats.total}`}
                                label="Active Now"
                                sublabel="1 busy, 1 away, 1 offline"
                                trend="57% online"
                                trendUp
                            />
                            <StatCard
                                icon="clock"
                                iconBg="bg-teal-bg"
                                iconColor="text-primary"
                                value={stats.todayHours}
                                label="Today's Hours"
                                sublabel="Avg 4.5h / person"
                                trend="+14%"
                                trendUp
                            />
                            <StatCard
                                icon="bar-chart-2"
                                iconBg="bg-purple-bg"
                                iconColor="text-purple"
                                value={`${stats.avgUtilization}%`}
                                label="Avg Utilization"
                                sublabel="vs 71% last week"
                                trend="+5%"
                                trendUp
                            />
                        </div>

                        {/* Search, Filters, Actions */}
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 w-[280px]">
                                <Icon name="search" size={14} />
                                <input
                                    type="text"
                                    placeholder="Search employees..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="flex-1 bg-transparent text-sm text-foreground outline-none"
                                />
                            </div>
                            <div className="flex items-center gap-2 flex-1">
                                <div className="flex items-center gap-1 bg-surface border border-border rounded-lg p-1">
                                    {departments.map((dept) => (
                                        <button
                                            key={dept}
                                            onClick={() => setSelectedDepartment(dept)}
                                            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${selectedDepartment === dept ? 'bg-teal-bg text-primary' : 'text-foreground-muted hover:bg-surface-2'
                                                }`}
                                        >
                                            {dept}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border bg-surface text-xs font-semibold text-foreground-muted">
                                    <span className={`w-2 h-2 rounded-full ${selectedStatus !== 'All' ? statusConfig[selectedStatus as keyof typeof statusConfig]?.color : 'bg-border'}`} />
                                    <select
                                        value={selectedStatus}
                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                        className="bg-transparent outline-none text-foreground-muted"
                                    >
                                        {statuses.map((s) => (
                                            <option key={s} value={s}>
                                                {s === 'All' ? 'Status' : s.charAt(0).toUpperCase() + s.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                    <Icon name="chevron-down" size={12} />
                                </div>
                                <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border bg-surface text-xs font-semibold text-foreground-muted">
                                    <Icon name="arrow-up-down" size={13} /> Sort by Name
                                </button>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={handleExportCSV} className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border bg-surface text-xs font-semibold text-foreground-muted">
                                    <Icon name="download" size={13} /> Export CSV
                                </button>
                                <button onClick={handleAddEmployee} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold">
                                    <Icon name="user-plus" size={14} /> Add Employee
                                </button>
                            </div>
                        </div>

                        {/* Employee Table */}
                        <div className="rounded-xl border border-border bg-surface overflow-hidden">
                            <div className="flex items-center gap-4 px-5 py-3 border-b border-border bg-background-3">
                                <div className="w-4 flex-shrink-0">
                                    <div className="w-4 h-4 rounded border border-border bg-surface-2" />
                                </div>
                                <div className="flex-1 text-xs font-bold text-foreground-muted uppercase tracking-wide">Employee</div>
                                <div className="text-xs font-bold text-foreground-muted uppercase tracking-wide w-[100px]">Department</div>
                                <div className="text-xs font-bold text-foreground-muted uppercase tracking-wide w-[80px]">Status</div>
                                <div className="text-xs font-bold text-foreground-muted uppercase tracking-wide text-center w-[90px]">Today</div>
                                <div className="text-xs font-bold text-foreground-muted uppercase tracking-wide text-center w-[90px]">This Week</div>
                                <div className="text-xs font-bold text-foreground-muted uppercase tracking-wide text-center w-[60px]">Tasks</div>
                                <div className="text-xs font-bold text-foreground-muted uppercase tracking-wide w-[130px]">Utilization</div>
                                <div className="text-xs font-bold text-foreground-muted uppercase tracking-wide text-right w-[80px]">Salary</div>
                                <div className="w-[72px]" />
                            </div>
                            {sortedEmployees.map((emp) => (
                                <EmployeeRow
                                    key={emp.id}
                                    employee={emp}
                                    onView={handleView}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-foreground-muted">Showing {sortedEmployees.length} of {employees.length} employees</span>
                            <div className="flex items-center gap-1">
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-foreground-muted">
                                    <Icon name="chevron-left" size={14} />
                                </button>
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-bold">1</button>
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-foreground-muted">
                                    <Icon name="chevron-right" size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper Components
const StatCard: React.FC<{
    icon: string;
    iconBg: string;
    iconColor: string;
    value: string;
    label: string;
    sublabel: string;
    trend: string;
    trendUp?: boolean;
}> = ({ icon, iconBg, iconColor, value, label, sublabel, trend, trendUp = true }) => (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
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
            <div className="text-xs text-foreground-muted opacity-60">{sublabel}</div>
        </div>
    </div>
);

const EmployeeRow: React.FC<{
    employee: Employee;
    onView: (name: string) => void;
    onEdit: (name: string) => void;
    onDelete: (name: string) => void;
}> = ({ employee, onView, onEdit, onDelete }) => {
    const status = statusConfig[employee.status];
    return (
        <div className="flex items-center gap-4 px-5 py-3.5 border-b border-border last:border-0 bg-surface">
            <div className="w-4 flex-shrink-0">
                <div className="w-4 h-4 rounded border border-border bg-surface-2" />
            </div>
            <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="relative flex-shrink-0">
                    <img
                        src={`https://storage.googleapis.com/banani-avatars/avatar/${employee.avatar}`}
                        className="w-9 h-9 rounded-full"
                        alt={employee.name}
                    />
                    <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-surface ${status.color}`} />
                </div>
                <div className="flex flex-col min-w-0">
                    <span className="text-sm font-semibold text-foreground truncate">{employee.name}</span>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-foreground-muted truncate">{employee.role}</span>
                        <span className="text-xs text-foreground-muted opacity-40">·</span>
                        <span className="text-xs text-foreground-muted">{employee.email}</span>
                    </div>
                </div>
            </div>
            <div className="w-[100px] flex-shrink-0">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${employee.departmentColor}`}>
                    {employee.department}
                </span>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0 w-[80px]">
                <span className={`w-2 h-2 rounded-full ${status.color}`} />
                <span className="text-xs text-foreground-muted">{status.label}</span>
            </div>
            <span className="text-sm font-bold text-center flex-shrink-0 text-foreground w-[90px]">{employee.todayHours}</span>
            <span className="text-sm font-bold text-foreground text-center flex-shrink-0 w-[90px]">{employee.weekHours}h</span>
            <span className="text-sm font-bold text-foreground text-center flex-shrink-0 w-[60px]">{employee.tasks}</span>
            <div className="flex items-center gap-2 flex-shrink-0 w-[130px]">
                <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className={`h-full rounded-full ${employee.utilization >= 80 ? 'bg-success' : 'bg-primary'}`} style={{ width: `${employee.utilization}%` }} />
                </div>
                <span className="text-xs font-bold text-foreground-muted">{employee.utilization}%</span>
            </div>
            <span className="text-sm font-bold text-foreground text-right flex-shrink-0 w-[80px]">${employee.salary.toLocaleString()}</span>
            <div className="flex items-center gap-1 flex-shrink-0 w-[72px]">
                <button onClick={() => onView(employee.name)} className="w-7 h-7 flex items-center justify-center rounded-lg border border-border text-foreground-muted hover:bg-surface-2 transition">
                    <Icon name="eye" size={12} />
                </button>
                <button onClick={() => onEdit(employee.name)} className="w-7 h-7 flex items-center justify-center rounded-lg border border-border text-foreground-muted hover:bg-surface-2 transition">
                    <Icon name="pencil" size={12} />
                </button>
                <button onClick={() => onDelete(employee.name)} className="w-7 h-7 flex items-center justify-center rounded-lg border border-danger-bg bg-danger-bg text-danger hover:bg-danger-bg/80 transition">
                    <Icon name="trash-2" size={12} />
                </button>
            </div>
        </div>
    );
};

export default AdminEmployeeListing;