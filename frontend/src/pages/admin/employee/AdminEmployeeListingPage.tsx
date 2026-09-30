import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/Icon';
import StatCard from '@/components/ui/StatCard';
import { useToast } from '@/context/ToastContext';

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

const initialEmployees: Employee[] = [
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
        name: 'Elena Rostova',
        role: 'Product Manager',
        email: 'elena@acmecorp.com',
        avatar: 'female/25-35/Eastern European/3',
        status: 'away',
        department: 'Product',
        departmentColor: 'bg-warning-bg text-warning',
        todayHours: '4h 45m',
        weekHours: 31.0,
        tasks: 12,
        utilization: 75,
        salary: 10200,
    },
    {
        id: 4,
        name: 'Marcus Chen',
        role: 'DevOps Lead',
        email: 'marcus@acmecorp.com',
        avatar: 'male/35-45/East Asian/4',
        status: 'offline',
        department: 'Infra',
        departmentColor: 'bg-info-bg text-info',
        todayHours: '0h 00m',
        weekHours: 40.0,
        tasks: 22,
        utilization: 96,
        salary: 11000,
    },
    {
        id: 5,
        name: 'Aisha Al-Mansoor',
        role: 'Frontend Dev',
        email: 'aisha@acmecorp.com',
        avatar: 'female/25-35/Middle Eastern/5',
        status: 'online',
        department: 'Engineering',
        departmentColor: 'bg-primary text-primary-foreground',
        todayHours: '5h 30m',
        weekHours: 34.5,
        tasks: 14,
        utilization: 82,
        salary: 7800,
    },
    {
        id: 6,
        name: 'Tom van Dijk',
        role: 'QA Engineer',
        email: 'tom@acmecorp.com',
        avatar: 'male/25-35/Western European/6',
        status: 'online',
        department: 'Engineering',
        departmentColor: 'bg-primary text-primary-foreground',
        todayHours: '6h 00m',
        weekHours: 35.0,
        tasks: 25,
        utilization: 84,
        salary: 6900,
    },
    {
        id: 7,
        name: 'Sara Lindqvist',
        role: 'Data Analyst',
        email: 'sara@acmecorp.com',
        avatar: 'female/25-35/Scandinavian/7',
        status: 'offline',
        department: 'Product',
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
    const navigate = useNavigate();
    const { success, info } = useToast();
    const [employeesList, setEmployeesList] = useState<Employee[]>(initialEmployees);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState<string>('All');
    const [selectedStatus, setSelectedStatus] = useState<string>('All');
    const [sortBy, setSortBy] = useState<string>('name');
    const [currentPage, setCurrentPage] = useState<number>(1);

    const [viewingEmployee, setViewingEmployee] = useState<Employee | null>(null);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
    const [deletingEmployee, setDeletingEmployee] = useState<Employee | null>(null);

    const departments = ['All', 'Engineering', 'Design', 'Product', 'Infra'];
    const statuses = ['All', 'online', 'busy', 'away', 'offline'];

    const filteredEmployees = employeesList.filter((emp) => {
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
        total: employeesList.length,
        activeNow: employeesList.filter(e => e.status === 'online').length,
        todayHours: '31h 47m',
        avgUtilization: employeesList.length > 0 ? Math.round(employeesList.reduce((sum, e) => sum + e.utilization, 0) / employeesList.length) : 0,
    };

    const handleAddEmployee = () => {
        navigate('/admin/add-employee');
    };

    const handleExportCSV = () => {
        const headers = ['ID,Name,Role,Email,Status,Department,Today Hours,Week Hours,Tasks,Utilization %,Salary'];
        const rows = employeesList.map(e => `"${e.id}","${e.name}","${e.role}","${e.email}","${e.status}","${e.department}","${e.todayHours}","${e.weekHours}","${e.tasks}","${e.utilization}","${e.salary}"`);
        const csvContent = [headers, ...rows].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `employees_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        success('Export Successful', `Exported ${employeesList.length} employee records as CSV.`);
    };

    const handleView = (name: string) => {
        const emp = employeesList.find(e => e.name === name);
        if (emp) setViewingEmployee(emp);
    };

    const handleEdit = (name: string) => {
        const emp = employeesList.find(e => e.name === name);
        if (emp) setEditingEmployee({ ...emp });
    };

    const handleDelete = (name: string) => {
        const emp = employeesList.find(e => e.name === name);
        if (emp) setDeletingEmployee(emp);
    };

    const handleConfirmDelete = () => {
        if (!deletingEmployee) return;
        setEmployeesList(prev => prev.filter(e => e.id !== deletingEmployee.id));
        success('Employee Deleted', `${deletingEmployee.name} has been removed.`);
        setDeletingEmployee(null);
    };

    const handleSaveEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingEmployee) return;
        setEmployeesList(prev => prev.map(emp => emp.id === editingEmployee.id ? editingEmployee : emp));
        success('Employee Updated', `Changes for ${editingEmployee.name} saved successfully.`);
        setEditingEmployee(null);
    };

    return (
        <div className="flex flex-col flex-1 w-full min-w-0 px-8 py-6 gap-6">
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
                    <button
                        onClick={() => setSortBy((prev) => (prev === 'name' ? 'hours' : prev === 'hours' ? 'tasks' : 'name'))}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border bg-surface text-xs font-semibold text-foreground-muted hover:bg-surface-2 transition"
                    >
                        <Icon name="arrow-up-down" size={13} /> Sort by {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={handleExportCSV} className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border bg-surface text-xs font-semibold text-foreground-muted hover:bg-surface-2 transition">
                        <Icon name="download" size={13} /> Export CSV
                    </button>
                    <button onClick={handleAddEmployee} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition shadow-sm">
                        <Icon name="user-plus" size={14} /> Add Employee
                    </button>
                </div>
            </div>

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
                {sortedEmployees.length === 0 && (
                    <div className="py-12 text-center text-sm text-foreground-muted">
                        No employees found matching current filters.
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between">
                <span className="text-xs text-foreground-muted">Showing {sortedEmployees.length} of {employeesList.length} employees</span>
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => {
                            if (currentPage > 1) {
                                setCurrentPage(p => p - 1);
                                info('Page', `Switched to page ${currentPage - 1}`);
                            }
                        }}
                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-foreground-muted hover:bg-surface-2 transition"
                    >
                        <Icon name="chevron-left" size={14} />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-bold">{currentPage}</button>
                    <button
                        onClick={() => {
                            setCurrentPage(p => p + 1);
                            info('Page', `Switched to page ${currentPage + 1}`);
                        }}
                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-foreground-muted hover:bg-surface-2 transition"
                    >
                        <Icon name="chevron-right" size={14} />
                    </button>
                </div>
            </div>

            {viewingEmployee && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
                    <div className="w-full max-w-lg bg-surface border border-border rounded-2xl shadow-2xl p-6 flex flex-col gap-5">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-bold text-foreground">Employee Profile</h3>
                            <button
                                onClick={() => setViewingEmployee(null)}
                                className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-foreground-muted hover:text-foreground hover:bg-surface-2 transition"
                            >
                                <Icon name="x" size={16} />
                            </button>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-background-2 border border-border">
                            <img
                                src={`https://storage.googleapis.com/banani-avatars/avatar/${viewingEmployee.avatar}`}
                                className="w-16 h-16 rounded-full"
                                alt={viewingEmployee.name}
                            />
                            <div className="flex flex-col">
                                <h4 className="text-base font-bold text-foreground">{viewingEmployee.name}</h4>
                                <span className="text-xs text-foreground-muted">{viewingEmployee.role} · {viewingEmployee.department}</span>
                                <span className="text-xs text-foreground-muted">{viewingEmployee.email}</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                            <div className="p-3 rounded-lg border border-border bg-background">
                                <span className="text-foreground-muted block mb-1">Status</span>
                                <span className="font-bold text-foreground capitalize">{viewingEmployee.status}</span>
                            </div>
                            <div className="p-3 rounded-lg border border-border bg-background">
                                <span className="text-foreground-muted block mb-1">Weekly Hours</span>
                                <span className="font-bold text-foreground">{viewingEmployee.weekHours}h</span>
                            </div>
                            <div className="p-3 rounded-lg border border-border bg-background">
                                <span className="text-foreground-muted block mb-1">Utilization</span>
                                <span className="font-bold text-primary">{viewingEmployee.utilization}%</span>
                            </div>
                            <div className="p-3 rounded-lg border border-border bg-background">
                                <span className="text-foreground-muted block mb-1">Base Salary</span>
                                <span className="font-bold text-foreground">${viewingEmployee.salary.toLocaleString()} / mo</span>
                            </div>
                        </div>
                        <div className="flex justify-end pt-2">
                            <button
                                onClick={() => setViewingEmployee(null)}
                                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {editingEmployee && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
                    <div className="w-full max-w-lg bg-surface border border-border rounded-2xl shadow-2xl p-6 flex flex-col gap-5">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-bold text-foreground">Edit Employee</h3>
                            <button
                                onClick={() => setEditingEmployee(null)}
                                className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-foreground-muted hover:text-foreground hover:bg-surface-2 transition"
                            >
                                <Icon name="x" size={16} />
                            </button>
                        </div>
                        <form onSubmit={handleSaveEdit} className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-foreground">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={editingEmployee.name}
                                    onChange={(e) => setEditingEmployee({ ...editingEmployee, name: e.target.value })}
                                    className="px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-foreground">Role</label>
                                    <input
                                        type="text"
                                        required
                                        value={editingEmployee.role}
                                        onChange={(e) => setEditingEmployee({ ...editingEmployee, role: e.target.value })}
                                        className="px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-foreground">Department</label>
                                    <select
                                        value={editingEmployee.department}
                                        onChange={(e) => setEditingEmployee({ ...editingEmployee, department: e.target.value })}
                                        className="px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary"
                                    >
                                        <option value="Engineering">Engineering</option>
                                        <option value="Design">Design</option>
                                        <option value="Product">Product</option>
                                        <option value="Infra">Infra</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-foreground">Email</label>
                                    <input
                                        type="email"
                                        required
                                        value={editingEmployee.email}
                                        onChange={(e) => setEditingEmployee({ ...editingEmployee, email: e.target.value })}
                                        className="px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-foreground">Status</label>
                                    <select
                                        value={editingEmployee.status}
                                        onChange={(e) => setEditingEmployee({ ...editingEmployee, status: e.target.value as Employee['status'] })}
                                        className="px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary"
                                    >
                                        <option value="online">Online</option>
                                        <option value="busy">Busy</option>
                                        <option value="away">Away</option>
                                        <option value="offline">Offline</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex items-center justify-end gap-2.5 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setEditingEmployee(null)}
                                    className="px-4 py-2 rounded-lg border border-border bg-surface text-xs font-semibold text-foreground-muted hover:bg-surface-2 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {deletingEmployee && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
                    <div className="w-full max-w-sm bg-surface border border-border rounded-2xl shadow-2xl p-6 flex flex-col gap-4">
                        <div className="flex items-center gap-3 text-danger">
                            <Icon name="alert-triangle" size={24} />
                            <h3 className="text-base font-bold text-foreground">Confirm Removal</h3>
                        </div>
                        <p className="text-sm text-foreground-muted">
                            Are you sure you want to remove <strong className="text-foreground">{deletingEmployee.name}</strong> from the team?
                        </p>
                        <div className="flex items-center justify-end gap-2.5 pt-2">
                            <button
                                type="button"
                                onClick={() => setDeletingEmployee(null)}
                                className="px-4 py-2 rounded-lg border border-border bg-surface text-xs font-semibold text-foreground-muted hover:bg-surface-2 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleConfirmDelete}
                                className="px-4 py-2 rounded-lg bg-danger text-white text-xs font-bold hover:bg-danger/90 transition shadow-sm"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

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