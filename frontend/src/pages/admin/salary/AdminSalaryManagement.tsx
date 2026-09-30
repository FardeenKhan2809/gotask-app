import React, { useState, useMemo } from 'react';
import Icon from '@/components/ui/Icon';

export interface SalaryRecord {
    id: number;
    name: string;
    role: string;
    avatar: string;
    dept: 'Design' | 'Engineering' | 'Product' | 'Infra';
    base: number;
    hra: number;
    transport: number;
    medical: number;
    bonus: number;
    status: 'Paid' | 'Pending' | 'Overdue';
}

interface ActivityItem {
    id: number;
    title: string;
    description: string;
    date: string;
    admin: string;
    icon: string;
    iconBg: string;
    iconColor: string;
}

const INITIAL_SALARY_DATA: SalaryRecord[] = [
    {
        id: 1,
        name: 'Priya Sharma',
        role: 'Senior Designer',
        avatar: 'https://storage.googleapis.com/banani-avatars/avatar/female/25-35/South Asian/1',
        dept: 'Design',
        base: 8200,
        hra: 820,
        transport: 200,
        medical: 300,
        bonus: 1200,
        status: 'Paid'
    },
    {
        id: 2,
        name: 'James Carter',
        role: 'Backend Engineer',
        avatar: 'https://storage.googleapis.com/banani-avatars/avatar/male/25-35/North American/2',
        dept: 'Engineering',
        base: 9500,
        hra: 950,
        transport: 200,
        medical: 300,
        bonus: 1500,
        status: 'Paid'
    },
    {
        id: 3,
        name: 'Aryan Mehta',
        role: 'Frontend Engineer',
        avatar: 'https://storage.googleapis.com/banani-avatars/avatar/male/25-35/South Asian/0',
        dept: 'Engineering',
        base: 8800,
        hra: 880,
        transport: 200,
        medical: 300,
        bonus: 1000,
        status: 'Paid'
    },
    {
        id: 4,
        name: 'Aiko Tanaka',
        role: 'Product Manager',
        avatar: 'https://storage.googleapis.com/banani-avatars/avatar/female/25-35/East Asian/3',
        dept: 'Product',
        base: 11000,
        hra: 1100,
        transport: 200,
        medical: 300,
        bonus: 1000,
        status: 'Pending'
    },
    {
        id: 5,
        name: 'Carlos Vega',
        role: 'QA Engineer',
        avatar: 'https://storage.googleapis.com/banani-avatars/avatar/male/25-35/Hispanic/4',
        dept: 'Engineering',
        base: 7400,
        hra: 740,
        transport: 200,
        medical: 300,
        bonus: 500,
        status: 'Pending'
    },
    {
        id: 6,
        name: 'Amara Osei',
        role: 'UX Researcher',
        avatar: 'https://storage.googleapis.com/banani-avatars/avatar/female/25-35/African/5',
        dept: 'Design',
        base: 7900,
        hra: 790,
        transport: 200,
        medical: 300,
        bonus: 0,
        status: 'Overdue'
    },
    {
        id: 7,
        name: 'Ryan Park',
        role: 'DevOps Engineer',
        avatar: 'https://storage.googleapis.com/banani-avatars/avatar/male/25-35/East Asian/6',
        dept: 'Infra',
        base: 9100,
        hra: 910,
        transport: 200,
        medical: 300,
        bonus: 800,
        status: 'Paid'
    }
];

const INITIAL_ACTIVITIES: ActivityItem[] = [
    {
        id: 1,
        title: 'Payroll processed for July 2024',
        description: '4 employees paid — $54,880 disbursed',
        date: 'Jul 1, 2024 · 9:00 AM',
        admin: 'Aiko Tanaka',
        icon: 'send',
        iconBg: 'bg-success-bg',
        iconColor: 'text-success'
    },
    {
        id: 2,
        title: 'Bonus added for James Carter',
        description: 'Performance bonus $1,500 for Q2 results',
        date: 'Jun 28, 2024',
        admin: 'Aiko Tanaka',
        icon: 'plus-circle',
        iconBg: 'bg-teal-bg',
        iconColor: 'text-primary'
    },
    {
        id: 3,
        title: 'Salary revision — Priya Sharma',
        description: 'Base updated from $7,800 → $8,200 (+5.1%)',
        date: 'Jun 15, 2024',
        admin: 'Aiko Tanaka',
        icon: 'arrow-up-right',
        iconBg: 'bg-purple-bg',
        iconColor: 'text-purple'
    },
    {
        id: 4,
        title: 'Payroll processed for June 2024',
        description: '7 employees paid — $74,230 disbursed',
        date: 'Jun 1, 2024 · 9:00 AM',
        admin: 'Aiko Tanaka',
        icon: 'check-circle-2',
        iconBg: 'bg-surface-2',
        iconColor: 'text-foreground-muted'
    }
];

const MONTHLY_TREND = [
    { label: 'Feb', amount: '$68.4k', height: 72 },
    { label: 'Mar', amount: '$71.2k', height: 75 },
    { label: 'Apr', amount: '$72.5k', height: 76 },
    { label: 'May', amount: '$73.1k', height: 77 },
    { label: 'Jun', amount: '$74.2k', height: 78 },
    { label: 'Jul', amount: '$77.4k', height: 80, active: true }
];

const QUARTERLY_TREND = [
    { label: 'Q3 2023', amount: '$198.5k', height: 65 },
    { label: 'Q4 2023', amount: '$208.2k', height: 70 },
    { label: 'Q1 2024', amount: '$212.1k', height: 73 },
    { label: 'Q2 2024', amount: '$219.8k', height: 78 },
    { label: 'Q3 2024', amount: '$232.1k', height: 82, active: true }
];

const AdminSalaryManagement: React.FC = () => {
    const [employees, setEmployees] = useState<SalaryRecord[]>(INITIAL_SALARY_DATA);
    const [activities, setActivities] = useState<ActivityItem[]>(INITIAL_ACTIVITIES);
    const [statusFilter, setStatusFilter] = useState<'All' | 'Paid' | 'Pending' | 'Overdue'>('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('July 2024');
    const [trendView, setTrendView] = useState<'Monthly' | 'Quarterly'>('Monthly');
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const [viewingPayslip, setViewingPayslip] = useState<SalaryRecord | null>(null);
    const [editingSalary, setEditingSalary] = useState<SalaryRecord | null>(null);
    const [editForm, setEditForm] = useState<{ base: number; bonus: number; hra: number; transport: number; medical: number }>({
        base: 0,
        bonus: 0,
        hra: 0,
        transport: 200,
        medical: 300
    });
    const [showRunPayrollModal, setShowRunPayrollModal] = useState(false);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3500);
    };

    const filteredEmployees = useMemo(() => {
        return employees.filter(emp => {
            const matchesStatus = statusFilter === 'All' ? true : emp.status === statusFilter;
            const matchesSearch =
                emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                emp.dept.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesStatus && matchesSearch;
        });
    }, [employees, statusFilter, searchTerm]);

    const totals = useMemo(() => {
        const base = employees.reduce((sum, e) => sum + e.base, 0);
        const hra = employees.reduce((sum, e) => sum + e.hra, 0);
        const transport = employees.reduce((sum, e) => sum + e.transport, 0);
        const medical = employees.reduce((sum, e) => sum + e.medical, 0);
        const bonus = employees.reduce((sum, e) => sum + e.bonus, 0);
        const gross = base + hra + transport + medical + bonus;

        const paidCount = employees.filter(e => e.status === 'Paid').length;
        const pendingCount = employees.filter(e => e.status === 'Pending').length;
        const overdueCount = employees.filter(e => e.status === 'Overdue').length;

        const paidDisbursed = employees
            .filter(e => e.status === 'Paid')
            .reduce((sum, e) => sum + e.base + e.hra + e.transport + e.medical + e.bonus, 0);

        const pendingAmount = employees
            .filter(e => e.status !== 'Paid')
            .reduce((sum, e) => sum + e.base + e.hra + e.transport + e.medical + e.bonus, 0);

        return {
            base,
            hra,
            transport,
            medical,
            bonus,
            gross,
            paidCount,
            pendingCount,
            overdueCount,
            paidDisbursed,
            pendingAmount
        };
    }, [employees]);

    const deptBreakdown = useMemo(() => {
        const depts: Record<string, { total: number; color: string; bgBadge: string; textColor: string }> = {
            Engineering: { total: 0, color: 'bg-primary', bgBadge: 'bg-teal-bg', textColor: 'text-primary' },
            Design: { total: 0, color: 'bg-purple', bgBadge: 'bg-purple-bg', textColor: 'text-purple' },
            Product: { total: 0, color: 'bg-warning', bgBadge: 'bg-warning-bg', textColor: 'text-warning' },
            Infra: { total: 0, color: 'bg-info', bgBadge: 'bg-info-bg', textColor: 'text-info' }
        };

        employees.forEach(emp => {
            const empGross = emp.base + emp.hra + emp.transport + emp.medical + emp.bonus;
            if (depts[emp.dept]) {
                depts[emp.dept].total += empGross;
            }
        });

        const grossTotal = totals.gross || 1;
        return Object.entries(depts).map(([dept, data]) => ({
            dept,
            total: data.total,
            percent: Math.round((data.total / grossTotal) * 100),
            color: data.color,
            bgBadge: data.bgBadge,
            textColor: data.textColor
        }));
    }, [employees, totals.gross]);

    const handleSelectAll = () => {
        if (selectedIds.length === filteredEmployees.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(filteredEmployees.map(e => e.id));
        }
    };

    const handleSelectRow = (id: number) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const handleDisburse = (emp: SalaryRecord) => {
        setEmployees(prev =>
            prev.map(e => (e.id === emp.id ? { ...e, status: 'Paid' as const } : e))
        );
        const gross = emp.base + emp.hra + emp.transport + emp.medical + emp.bonus;
        const newAct: ActivityItem = {
            id: Date.now(),
            title: `Salary disbursed for ${emp.name}`,
            description: `$${gross.toLocaleString()} paid via direct bank transfer`,
            date: 'Just now',
            admin: 'Aiko Tanaka',
            icon: 'send',
            iconBg: 'bg-success-bg',
            iconColor: 'text-success'
        };
        setActivities(prev => [newAct, ...prev]);
        showToast(`Disbursed $${gross.toLocaleString()} to ${emp.name}`);
    };

    const handleOpenEdit = (emp: SalaryRecord) => {
        setEditingSalary(emp);
        setEditForm({
            base: emp.base,
            bonus: emp.bonus,
            hra: emp.hra,
            transport: emp.transport,
            medical: emp.medical
        });
    };

    const handleSaveEdit = () => {
        if (!editingSalary) return;
        setEmployees(prev =>
            prev.map(e => (e.id === editingSalary.id ? { ...e, ...editForm } : e))
        );
        const newAct: ActivityItem = {
            id: Date.now(),
            title: `Salary revision — ${editingSalary.name}`,
            description: `Base adjusted to $${editForm.base.toLocaleString()}, Bonus $${editForm.bonus.toLocaleString()}`,
            date: 'Just now',
            admin: 'Aiko Tanaka',
            icon: 'pencil',
            iconBg: 'bg-purple-bg',
            iconColor: 'text-purple'
        };
        setActivities(prev => [newAct, ...prev]);
        showToast(`Updated salary record for ${editingSalary.name}`);
        setEditingSalary(null);
    };

    const handleRunFullPayroll = () => {
        const pendingEmployees = employees.filter(e => e.status !== 'Paid');
        if (pendingEmployees.length === 0) {
            showToast('All employees are already paid for this month!');
            setShowRunPayrollModal(false);
            return;
        }

        const totalDisbursed = pendingEmployees.reduce(
            (sum, e) => sum + e.base + e.hra + e.transport + e.medical + e.bonus,
            0
        );

        setEmployees(prev => prev.map(e => ({ ...e, status: 'Paid' as const })));
        const newAct: ActivityItem = {
            id: Date.now(),
            title: `Full payroll run for ${selectedMonth}`,
            description: `${pendingEmployees.length} pending employee(s) paid — $${totalDisbursed.toLocaleString()} disbursed`,
            date: 'Just now',
            admin: 'Aiko Tanaka',
            icon: 'send',
            iconBg: 'bg-success-bg',
            iconColor: 'text-success'
        };
        setActivities(prev => [newAct, ...prev]);
        setShowRunPayrollModal(false);
        showToast(`Successfully ran payroll! $${totalDisbursed.toLocaleString()} disbursed.`);
    };

    const handleExportCSV = () => {
        const headers = ['Employee Name', 'Role', 'Department', 'Base Salary', 'HRA', 'Transport', 'Medical', 'Bonus', 'Gross Salary', 'Payment Status'];
        const csvRows = filteredEmployees.map(e => [
            `"${e.name}"`,
            `"${e.role}"`,
            `"${e.dept}"`,
            e.base,
            e.hra,
            e.transport,
            e.medical,
            e.bonus,
            e.base + e.hra + e.transport + e.medical + e.bonus,
            `"${e.status}"`
        ]);

        const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...csvRows.map(r => r.join(','))].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `Payroll_Report_${selectedMonth.replace(/\s+/g, '_')}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showToast(`Exported ${filteredEmployees.length} salary records to CSV.`);
    };

    const currentTrend = trendView === 'Monthly' ? MONTHLY_TREND : QUARTERLY_TREND;

    return (
        <>
            <div className="flex flex-col flex-1 min-w-0 px-8 py-6 gap-6">
                    {toastMessage && (
                        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-surface-2 border border-primary text-foreground px-4 py-3 rounded-xl shadow-2xl animate-bounce">
                            <span className="w-2 h-2 rounded-full bg-primary" />
                            <span className="text-sm font-semibold">{toastMessage}</span>
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 hover:border-border/80 transition shadow-sm">
                            <div className="flex items-center justify-between">
                                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-teal-bg text-primary">
                                    <Icon name="banknote" size={17} />
                                </div>
                                <span className="flex items-center gap-1 text-xs font-bold rounded-full px-2 py-0.5 bg-success-bg text-success">
                                    <Icon name="trending-up" size={10} /> +4.2%
                                </span>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-foreground font-headings tracking-tight">
                                    ${totals.gross.toLocaleString()}
                                </div>
                                <div className="text-xs text-foreground-muted mt-0.5 font-medium">Total Monthly Payroll</div>
                                <div className="text-xs text-foreground-muted opacity-60">All {employees.length} employees</div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 hover:border-border/80 transition shadow-sm">
                            <div className="flex items-center justify-between">
                                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-success-bg text-success">
                                    <Icon name="check-circle-2" size={17} />
                                </div>
                                <span className="flex items-center gap-1 text-xs font-bold rounded-full px-2 py-0.5 bg-success-bg text-success">
                                    <Icon name="trending-up" size={10} /> +1
                                </span>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-foreground font-headings tracking-tight">
                                    {totals.paidCount} / {employees.length}
                                </div>
                                <div className="text-xs text-foreground-muted mt-0.5 font-medium">Paid This Month</div>
                                <div className="text-xs text-foreground-muted opacity-60">${totals.paidDisbursed.toLocaleString()} disbursed</div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 hover:border-border/80 transition shadow-sm">
                            <div className="flex items-center justify-between">
                                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-warning-bg text-warning">
                                    <Icon name="clock" size={17} />
                                </div>
                                <span className="text-xs font-bold rounded-full px-2 py-0.5 bg-warning-bg text-warning">
                                    {totals.pendingCount}
                                </span>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-foreground font-headings tracking-tight">
                                    {totals.pendingCount}
                                </div>
                                <div className="text-xs text-foreground-muted mt-0.5 font-medium">Pending Payments</div>
                                <div className="text-xs text-foreground-muted opacity-60">${totals.pendingAmount.toLocaleString()} awaiting</div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 hover:border-border/80 transition shadow-sm">
                            <div className="flex items-center justify-between">
                                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-danger-bg text-danger">
                                    <Icon name="alert-circle" size={17} />
                                </div>
                                <span className="text-xs font-bold rounded-full px-2 py-0.5 bg-danger-bg text-danger">
                                    ! {totals.overdueCount}
                                </span>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-foreground font-headings tracking-tight">
                                    {totals.overdueCount}
                                </div>
                                <div className="text-xs text-foreground-muted mt-0.5 font-medium">Overdue</div>
                                <div className="text-xs text-foreground-muted opacity-60">Action required</div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                        <div className="lg:col-span-7 rounded-xl border border-border bg-surface p-5 flex flex-col justify-between shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-base font-bold text-foreground font-headings">Payroll Trend</h3>
                                    <p className="text-xs text-foreground-muted mt-0.5">
                                        {trendView === 'Monthly' ? 'Monthly total payout — last 6 months' : 'Quarterly payout analysis'}
                                    </p>
                                </div>
                                <div className="flex items-center gap-1 bg-surface-2 p-1 rounded-lg border border-border">
                                    <button
                                        onClick={() => setTrendView('Monthly')}
                                        className={`text-xs font-semibold px-3 py-1.5 rounded-md transition ${
                                            trendView === 'Monthly' ? 'bg-teal-bg text-primary font-bold' : 'text-foreground-muted hover:text-foreground'
                                        }`}
                                    >
                                        Monthly
                                    </button>
                                    <button
                                        onClick={() => setTrendView('Quarterly')}
                                        className={`text-xs font-semibold px-3 py-1.5 rounded-md transition ${
                                            trendView === 'Quarterly' ? 'bg-teal-bg text-primary font-bold' : 'text-foreground-muted hover:text-foreground'
                                        }`}
                                    >
                                        Quarterly
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-end gap-3 h-36 pt-4 pb-1 px-2">
                                {currentTrend.map((item, idx) => (
                                    <div key={idx} className="flex flex-col items-center gap-2 flex-1 group">
                                        <span className={`text-[11px] font-bold transition-opacity ${item.active ? 'text-primary' : 'text-foreground-muted group-hover:text-foreground'}`}>
                                            {item.amount}
                                        </span>
                                        <div className="w-full flex flex-col justify-end rounded-lg overflow-hidden h-24 bg-surface-2/40">
                                            <div
                                                className={`w-full rounded-lg transition-all duration-300 ${
                                                    item.active ? 'bg-primary' : 'bg-surface-2 group-hover:bg-primary/50'
                                                }`}
                                                style={{ height: `${item.height}px` }}
                                            />
                                        </div>
                                        <span className={`text-xs font-medium ${item.active ? 'text-primary font-bold' : 'text-foreground-muted'}`}>
                                            {item.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-5 rounded-xl border border-border bg-surface p-5 flex flex-col justify-between shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <div>
                                    <h3 className="text-base font-bold text-foreground font-headings">By Department</h3>
                                    <p className="text-xs text-foreground-muted mt-0.5">Total Payroll: ${totals.gross.toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="flex rounded-full overflow-hidden h-3 gap-0.5 bg-surface-2 my-2">
                                {deptBreakdown.map((d, idx) => (
                                    <div
                                        key={idx}
                                        className={`${d.color} transition-all duration-500`}
                                        style={{ width: `${d.percent}%` }}
                                        title={`${d.dept}: ${d.percent}% ($${d.total.toLocaleString()})`}
                                    />
                                ))}
                            </div>

                            <div className="flex flex-col gap-2.5 mt-2">
                                {deptBreakdown.map((d, idx) => (
                                    <div key={idx} className="flex items-center justify-between py-1">
                                        <div className="flex items-center gap-2 flex-1 min-w-0">
                                            <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${d.color}`} />
                                            <span className="text-sm text-foreground font-medium truncate">{d.dept}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-bold text-foreground font-headings">
                                                ${d.total.toLocaleString()}
                                            </span>
                                            <span className={`text-xs font-semibold w-9 text-right ${d.textColor}`}>
                                                {d.percent}%
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-border bg-surface overflow-hidden shadow-sm flex flex-col">
                        <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b border-border bg-background-2/40">
                            <div className="flex flex-wrap items-center gap-3">
                                <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs text-foreground-muted w-64">
                                    <Icon name="search" size={13} />
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={e => setSearchTerm(e.target.value)}
                                        placeholder="Search employees, roles, dept..."
                                        className="bg-transparent border-none outline-none text-foreground text-xs w-full"
                                    />
                                    {searchTerm && (
                                        <button onClick={() => setSearchTerm('')} className="text-foreground-muted hover:text-foreground">
                                            <Icon name="x" size={12} />
                                        </button>
                                    )}
                                </div>

                                <div className="relative">
                                    <select
                                        value={selectedMonth}
                                        onChange={e => setSelectedMonth(e.target.value)}
                                        className="appearance-none flex items-center gap-2 px-3 py-2 pr-7 rounded-lg border border-border bg-surface text-xs font-semibold text-foreground cursor-pointer outline-none"
                                    >
                                        <option value="July 2024">July 2024</option>
                                        <option value="June 2024">June 2024</option>
                                        <option value="May 2024">May 2024</option>
                                        <option value="April 2024">April 2024</option>
                                    </select>
                                    <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-foreground-muted">
                                        <Icon name="chevron-down" size={12} />
                                    </div>
                                </div>

                                <div className="flex items-center gap-1 bg-surface-2 border border-border rounded-lg p-1">
                                    {(['All', 'Paid', 'Pending', 'Overdue'] as const).map(tab => {
                                        const count = tab === 'All' ? employees.length : employees.filter(e => e.status === tab).length;
                                        const isActive = statusFilter === tab;
                                        return (
                                            <button
                                                key={tab}
                                                onClick={() => setStatusFilter(tab)}
                                                className={`px-3 py-1 rounded-md text-xs font-semibold transition ${
                                                    isActive
                                                        ? 'bg-teal-bg text-primary font-bold'
                                                        : 'text-foreground-muted hover:text-foreground'
                                                }`}
                                            >
                                                {tab} ({count})
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleExportCSV}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-surface text-xs font-semibold text-foreground hover:bg-surface-2 transition"
                                >
                                    <Icon name="download" size={13} />
                                    <span>Export Payslips</span>
                                </button>
                                <button
                                    onClick={() => setShowRunPayrollModal(true)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:brightness-110 transition shadow-sm"
                                >
                                    <Icon name="zap" size={14} />
                                    <span>Run Payroll</span>
                                </button>
                            </div>
                        </div>

                        {selectedIds.length > 0 && (
                            <div className="flex items-center justify-between px-5 py-2.5 bg-teal-bg/40 border-b border-primary/30 text-xs text-primary font-semibold">
                                <span>{selectedIds.length} employee(s) selected</span>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => {
                                            setEmployees(prev =>
                                                prev.map(e => (selectedIds.includes(e.id) ? { ...e, status: 'Paid' as const } : e))
                                            );
                                            showToast(`Marked ${selectedIds.length} employee(s) as Paid`);
                                            setSelectedIds([]);
                                        }}
                                        className="px-2.5 py-1 rounded bg-primary text-primary-foreground font-bold hover:brightness-110"
                                    >
                                        Mark Selected as Paid
                                    </button>
                                    <button
                                        onClick={() => setSelectedIds([])}
                                        className="px-2.5 py-1 rounded border border-border bg-surface text-foreground-muted hover:text-foreground"
                                    >
                                        Clear
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="overflow-x-auto">
                            <div className="min-w-[980px]">
                                <div className="flex items-center gap-4 px-5 py-3 border-b border-border bg-background-2/60 text-xs font-bold text-foreground-muted uppercase tracking-wider">
                                    <div className="w-4 flex-shrink-0">
                                        <input
                                            type="checkbox"
                                            checked={filteredEmployees.length > 0 && selectedIds.length === filteredEmployees.length}
                                            onChange={handleSelectAll}
                                            className="rounded border-border accent-primary cursor-pointer"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">Employee</div>
                                    <div className="w-24 flex-shrink-0">Dept</div>
                                    <div className="w-20 text-right flex-shrink-0">Base</div>
                                    <div className="w-16 text-right flex-shrink-0">HRA</div>
                                    <div className="w-20 text-right flex-shrink-0">Transport</div>
                                    <div className="w-16 text-right flex-shrink-0">Medical</div>
                                    <div className="w-16 text-right flex-shrink-0">Bonus</div>
                                    <div className="w-24 text-right flex-shrink-0">Gross</div>
                                    <div className="w-24 flex-shrink-0 text-center">Status</div>
                                    <div className="w-20 flex-shrink-0 text-right">Actions</div>
                                </div>

                                <div className="divide-y divide-border">
                                    {filteredEmployees.length === 0 ? (
                                        <div className="p-8 text-center text-foreground-muted text-sm">
                                            No salary records found matching your filters.
                                        </div>
                                    ) : (
                                        filteredEmployees.map(emp => {
                                            const gross = emp.base + emp.hra + emp.transport + emp.medical + emp.bonus;
                                            const isSelected = selectedIds.includes(emp.id);

                                            return (
                                                <div
                                                    key={emp.id}
                                                    className={`flex items-center gap-4 px-5 py-3.5 transition-colors ${
                                                        isSelected ? 'bg-surface-2/60' : 'hover:bg-surface-2/30'
                                                    }`}
                                                >
                                                    <div className="w-4 flex-shrink-0">
                                                        <input
                                                            type="checkbox"
                                                            checked={isSelected}
                                                            onChange={() => handleSelectRow(emp.id)}
                                                            className="rounded border-border accent-primary cursor-pointer"
                                                        />
                                                    </div>

                                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                                        <img
                                                            src={emp.avatar}
                                                            alt={emp.name}
                                                            className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-border"
                                                        />
                                                        <div className="flex flex-col min-w-0">
                                                            <span className="text-sm font-semibold text-foreground truncate">
                                                                {emp.name}
                                                            </span>
                                                            <span className="text-xs text-foreground-muted truncate">
                                                                {emp.role}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="w-24 flex-shrink-0">
                                                        <span
                                                            className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                                                                emp.dept === 'Engineering'
                                                                    ? 'bg-teal-bg text-primary'
                                                                    : emp.dept === 'Design'
                                                                    ? 'bg-purple-bg text-purple'
                                                                    : emp.dept === 'Product'
                                                                    ? 'bg-warning-bg text-warning'
                                                                    : 'bg-info-bg text-info'
                                                            }`}
                                                        >
                                                            {emp.dept}
                                                        </span>
                                                    </div>

                                                    <span className="w-20 text-sm font-semibold text-foreground text-right flex-shrink-0">
                                                        ${emp.base.toLocaleString()}
                                                    </span>

                                                    <span className="w-16 text-sm text-foreground-muted text-right flex-shrink-0">
                                                        ${emp.hra.toLocaleString()}
                                                    </span>

                                                    <span className="w-20 text-sm text-foreground-muted text-right flex-shrink-0">
                                                        ${emp.transport.toLocaleString()}
                                                    </span>

                                                    <span className="w-16 text-sm text-foreground-muted text-right flex-shrink-0">
                                                        ${emp.medical.toLocaleString()}
                                                    </span>

                                                    <span
                                                        className={`w-16 text-sm text-right flex-shrink-0 font-semibold ${
                                                            emp.bonus > 0 ? 'text-primary' : 'text-foreground-muted'
                                                        }`}
                                                    >
                                                        {emp.bonus > 0 ? `$${emp.bonus.toLocaleString()}` : '—'}
                                                    </span>

                                                    <span className="w-24 text-sm font-bold text-foreground text-right flex-shrink-0 font-headings">
                                                        ${gross.toLocaleString()}
                                                    </span>

                                                    <div className="w-24 flex-shrink-0 flex justify-center">
                                                        <span
                                                            className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${
                                                                emp.status === 'Paid'
                                                                    ? 'bg-success-bg text-success'
                                                                    : emp.status === 'Pending'
                                                                    ? 'bg-warning-bg text-warning'
                                                                    : 'bg-danger-bg text-danger'
                                                            }`}
                                                        >
                                                            <Icon
                                                                name={
                                                                    emp.status === 'Paid'
                                                                        ? 'check-circle-2'
                                                                        : emp.status === 'Pending'
                                                                        ? 'clock'
                                                                        : 'alert-circle'
                                                                }
                                                                size={11}
                                                            />
                                                            {emp.status}
                                                        </span>
                                                    </div>

                                                    <div className="w-20 flex items-center justify-end gap-1 flex-shrink-0">
                                                        <button
                                                            onClick={() => setViewingPayslip(emp)}
                                                            title="View Payslip"
                                                            className="w-7 h-7 flex items-center justify-center rounded-lg border border-border text-foreground-muted hover:text-foreground hover:bg-surface-2 transition"
                                                        >
                                                            <Icon name="eye" size={13} />
                                                        </button>

                                                        <button
                                                            onClick={() => handleOpenEdit(emp)}
                                                            title="Edit Salary Structure"
                                                            className="w-7 h-7 flex items-center justify-center rounded-lg border border-border text-foreground-muted hover:text-foreground hover:bg-surface-2 transition"
                                                        >
                                                            <Icon name="pencil" size={13} />
                                                        </button>

                                                        {emp.status !== 'Paid' && (
                                                            <button
                                                                onClick={() => handleDisburse(emp)}
                                                                title="Disburse / Mark as Paid"
                                                                className="w-7 h-7 flex items-center justify-center rounded-lg bg-teal-bg border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition"
                                                            >
                                                                <Icon name="send" size={12} />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>

                                <div className="flex items-center gap-4 px-5 py-4 bg-background-3 border-t-2 border-border text-foreground font-bold">
                                    <div className="w-4 flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <span className="text-sm font-bold font-headings tracking-tight">
                                            Total Payroll — {selectedMonth}
                                        </span>
                                    </div>
                                    <div className="w-24 flex-shrink-0" />
                                    <span className="w-20 text-sm font-bold text-foreground text-right flex-shrink-0">
                                        ${totals.base.toLocaleString()}
                                    </span>
                                    <span className="w-16 text-sm font-bold text-foreground text-right flex-shrink-0">
                                        ${totals.hra.toLocaleString()}
                                    </span>
                                    <span className="w-20 text-sm font-bold text-foreground text-right flex-shrink-0">
                                        ${totals.transport.toLocaleString()}
                                    </span>
                                    <span className="w-16 text-sm font-bold text-foreground text-right flex-shrink-0">
                                        ${totals.medical.toLocaleString()}
                                    </span>
                                    <span className="w-16 text-sm font-bold text-primary text-right flex-shrink-0">
                                        ${totals.bonus.toLocaleString()}
                                    </span>
                                    <span className="w-24 text-base font-bold text-primary text-right flex-shrink-0 font-headings">
                                        ${totals.gross.toLocaleString()}
                                    </span>
                                    <div className="w-24 flex-shrink-0" />
                                    <div className="w-20 flex-shrink-0" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-border bg-surface overflow-hidden shadow-sm">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-background-2/40">
                            <h3 className="text-base font-bold text-foreground font-headings">Recent Payroll Activity</h3>
                            <button
                                onClick={() => showToast('Viewing all recorded payroll transaction logs.')}
                                className="text-xs text-primary font-semibold flex items-center gap-1 hover:underline"
                            >
                                View all <Icon name="arrow-right" size={12} />
                            </button>
                        </div>

                        <div className="divide-y divide-border">
                            {activities.map(act => (
                                <div key={act.id} className="flex items-start gap-4 px-5 py-4 hover:bg-surface-2/30 transition">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${act.iconBg} ${act.iconColor}`}>
                                        <Icon name={act.icon} size={15} />
                                    </div>
                                    <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                                        <span className="text-sm font-semibold text-foreground truncate">{act.title}</span>
                                        <span className="text-xs text-foreground-muted">{act.description}</span>
                                    </div>
                                    <div className="flex flex-col items-end gap-0.5 flex-shrink-0 text-right">
                                        <span className="text-xs text-foreground-muted">{act.date}</span>
                                        <span className="text-xs text-foreground-muted opacity-75">by {act.admin}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            {viewingPayslip && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="w-full max-w-lg rounded-2xl border border-border bg-background-2 p-6 shadow-2xl flex flex-col gap-5">
                        <div className="flex items-center justify-between border-b border-border pb-4">
                            <div className="flex items-center gap-3">
                                <img
                                    src={viewingPayslip.avatar}
                                    alt={viewingPayslip.name}
                                    className="w-11 h-11 rounded-full border border-border"
                                />
                                <div>
                                    <h3 className="text-base font-bold text-foreground font-headings">{viewingPayslip.name}</h3>
                                    <p className="text-xs text-foreground-muted">{viewingPayslip.role} · {viewingPayslip.dept}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setViewingPayslip(null)}
                                className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-foreground-muted hover:text-foreground hover:bg-surface-2 transition"
                            >
                                <Icon name="x" size={14} />
                            </button>
                        </div>

                        <div className="flex items-center justify-between bg-surface p-3.5 rounded-xl border border-border">
                            <div>
                                <span className="text-xs text-foreground-muted">Pay Period</span>
                                <div className="text-sm font-bold text-foreground">{selectedMonth}</div>
                            </div>
                            <div>
                                <span className="text-xs text-foreground-muted">Status</span>
                                <div>
                                    <span
                                        className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full ${
                                            viewingPayslip.status === 'Paid'
                                                ? 'bg-success-bg text-success'
                                                : viewingPayslip.status === 'Pending'
                                                ? 'bg-warning-bg text-warning'
                                                : 'bg-danger-bg text-danger'
                                        }`}
                                    >
                                        {viewingPayslip.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 bg-surface rounded-xl border border-border p-4 text-sm">
                            <span className="text-xs font-bold text-foreground-muted uppercase tracking-wider mb-1">Earnings Breakdown</span>
                            <div className="flex justify-between py-1 border-b border-border/50 text-xs">
                                <span className="text-foreground-muted">Basic Salary</span>
                                <span className="font-semibold text-foreground">${viewingPayslip.base.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-border/50 text-xs">
                                <span className="text-foreground-muted">House Rent Allowance (HRA)</span>
                                <span className="font-semibold text-foreground">${viewingPayslip.hra.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-border/50 text-xs">
                                <span className="text-foreground-muted">Transport Allowance</span>
                                <span className="font-semibold text-foreground">${viewingPayslip.transport.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-border/50 text-xs">
                                <span className="text-foreground-muted">Medical Allowance</span>
                                <span className="font-semibold text-foreground">${viewingPayslip.medical.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-border/50 text-xs">
                                <span className="text-foreground-muted">Performance Bonus</span>
                                <span className="font-semibold text-primary">${viewingPayslip.bonus.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between pt-2 text-sm font-bold">
                                <span className="text-foreground">Total Gross Pay</span>
                                <span className="text-primary font-headings">
                                    $
                                    {(
                                        viewingPayslip.base +
                                        viewingPayslip.hra +
                                        viewingPayslip.transport +
                                        viewingPayslip.medical +
                                        viewingPayslip.bonus
                                    ).toLocaleString()}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-2">
                            <button
                                onClick={() => {
                                    showToast(`Printed payslip for ${viewingPayslip.name}`);
                                    setViewingPayslip(null);
                                }}
                                className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-surface text-xs font-semibold text-foreground hover:bg-surface-2 transition"
                            >
                                <Icon name="download" size={13} />
                                Download PDF
                            </button>
                            <button
                                onClick={() => setViewingPayslip(null)}
                                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:brightness-110 transition"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {editingSalary && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="w-full max-w-md rounded-2xl border border-border bg-background-2 p-6 shadow-2xl flex flex-col gap-4">
                        <div className="flex items-center justify-between border-b border-border pb-3">
                            <div>
                                <h3 className="text-base font-bold text-foreground font-headings">Edit Compensation</h3>
                                <p className="text-xs text-foreground-muted">{editingSalary.name} · {editingSalary.dept}</p>
                            </div>
                            <button
                                onClick={() => setEditingSalary(null)}
                                className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-foreground-muted hover:text-foreground hover:bg-surface-2 transition"
                            >
                                <Icon name="x" size={14} />
                            </button>
                        </div>

                        <div className="flex flex-col gap-3 text-xs">
                            <div>
                                <label className="text-foreground-muted font-medium mb-1 block">Base Salary ($)</label>
                                <input
                                    type="number"
                                    value={editForm.base}
                                    onChange={e => {
                                        const b = Number(e.target.value);
                                        setEditForm(prev => ({ ...prev, base: b, hra: Math.round(b * 0.1) }));
                                    }}
                                    className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground font-semibold outline-none focus:border-primary"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-foreground-muted font-medium mb-1 block">HRA (10% Base)</label>
                                    <input
                                        type="number"
                                        value={editForm.hra}
                                        onChange={e => setEditForm(prev => ({ ...prev, hra: Number(e.target.value) }))}
                                        className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground font-semibold outline-none focus:border-primary"
                                    />
                                </div>
                                <div>
                                    <label className="text-foreground-muted font-medium mb-1 block">Bonus ($)</label>
                                    <input
                                        type="number"
                                        value={editForm.bonus}
                                        onChange={e => setEditForm(prev => ({ ...prev, bonus: Number(e.target.value) }))}
                                        className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground font-semibold outline-none focus:border-primary"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-foreground-muted font-medium mb-1 block">Transport ($)</label>
                                    <input
                                        type="number"
                                        value={editForm.transport}
                                        onChange={e => setEditForm(prev => ({ ...prev, transport: Number(e.target.value) }))}
                                        className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground font-semibold outline-none focus:border-primary"
                                    />
                                </div>
                                <div>
                                    <label className="text-foreground-muted font-medium mb-1 block">Medical ($)</label>
                                    <input
                                        type="number"
                                        value={editForm.medical}
                                        onChange={e => setEditForm(prev => ({ ...prev, medical: Number(e.target.value) }))}
                                        className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground font-semibold outline-none focus:border-primary"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-lg bg-surface border border-border mt-1">
                                <span className="font-semibold text-foreground">Projected Gross:</span>
                                <span className="text-sm font-bold text-primary font-headings">
                                    ${(editForm.base + editForm.hra + editForm.transport + editForm.medical + editForm.bonus).toLocaleString()}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2">
                            <button
                                onClick={() => setEditingSalary(null)}
                                className="px-4 py-2 rounded-lg border border-border bg-surface text-xs font-semibold text-foreground-muted hover:text-foreground"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveEdit}
                                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:brightness-110 transition"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showRunPayrollModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="w-full max-w-md rounded-2xl border border-border bg-background-2 p-6 shadow-2xl flex flex-col gap-4">
                        <div className="w-12 h-12 rounded-xl bg-teal-bg text-primary flex items-center justify-center">
                            <Icon name="zap" size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-foreground font-headings">Run Payroll for {selectedMonth}?</h3>
                            <p className="text-xs text-foreground-muted mt-1 leading-relaxed">
                                This action will disburse salaries to all {totals.pendingCount + totals.overdueCount} remaining employee(s) totalling{' '}
                                <strong className="text-primary">${totals.pendingAmount.toLocaleString()}</strong>.
                            </p>
                        </div>

                        <div className="flex flex-col gap-2 p-3 bg-surface rounded-xl border border-border text-xs">
                            <div className="flex justify-between">
                                <span className="text-foreground-muted">Total Pending Employees:</span>
                                <span className="font-bold text-foreground">{totals.pendingCount + totals.overdueCount}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-foreground-muted">Total Payout Amount:</span>
                                <span className="font-bold text-primary">${totals.pendingAmount.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2">
                            <button
                                onClick={() => setShowRunPayrollModal(false)}
                                className="px-4 py-2 rounded-lg border border-border bg-surface text-xs font-semibold text-foreground-muted hover:text-foreground"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleRunFullPayroll}
                                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:brightness-110 transition shadow-sm"
                            >
                                Confirm & Disburse
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AdminSalaryManagement;
