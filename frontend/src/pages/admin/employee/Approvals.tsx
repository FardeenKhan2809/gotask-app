import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/Icon';
import { useToast } from '@/context/ToastContext';

type ApprovalStatus = 'pending' | 'approved' | 'rejected';
type ApprovalType = 'overtime' | 'manual' | 'deletion' | 'edit' | 'expense';

interface Approval {
    id: number;
    type: ApprovalType;
    typeLabel: string;
    typeIcon: string;
    typeColor: string;
    priority: 'high' | 'medium' | 'low';
    status: ApprovalStatus;
    title: string;
    description: string;
    time: string;
    amount?: string;
    submitted: string;
    employee: {
        name: string;
        role: string;
        avatar: string;
    };
}

const initialApprovals: Approval[] = [
    {
        id: 1,
        type: 'overtime',
        typeLabel: 'Overtime',
        typeIcon: 'clock',
        typeColor: 'bg-warning-bg text-warning',
        priority: 'high',
        status: 'pending',
        title: 'Overtime Log — Jul 17, 2024',
        description: 'Requesting +2h 30m overtime on Tuesday for payment gateway integration deadline.',
        time: '+2h 30m',
        amount: '+$66.25',
        submitted: '2h ago',
        employee: {
            name: 'Aryan Mehta',
            role: 'Frontend Engineer',
            avatar: 'male/25-35/South Asian/0',
        },
    },
    {
        id: 2,
        type: 'manual',
        typeLabel: 'Manual Entry',
        typeIcon: 'timer',
        typeColor: 'bg-info-bg text-info',
        priority: 'medium',
        status: 'pending',
        title: 'Manual Time Entry — Jul 15, 2024',
        description: 'Forgot to start timer during client call. Requesting 4h manual log for Product Review meeting.',
        time: '4h 00m',
        amount: '+$74.00',
        submitted: '4h ago',
        employee: {
            name: 'Carlos Vega',
            role: 'QA Engineer',
            avatar: 'male/25-35/Hispanic/4',
        },
    },
    {
        id: 3,
        type: 'deletion',
        typeLabel: 'Deletion',
        typeIcon: 'trash-2',
        typeColor: 'bg-danger-bg text-danger',
        priority: 'low',
        status: 'pending',
        title: 'Task Deletion Request',
        description: 'Requesting deletion of "Prototype v1" task (logged 0h). Created by mistake, no billable time.',
        time: '0h',
        amount: undefined,
        submitted: '5h ago',
        employee: {
            name: 'Priya Sharma',
            role: 'Senior Designer',
            avatar: 'female/25-35/South Asian/1',
        },
    },
    {
        id: 4,
        type: 'edit',
        typeLabel: 'Edit Request',
        typeIcon: 'pencil',
        typeColor: 'bg-purple-bg text-purple',
        priority: 'medium',
        status: 'pending',
        title: 'Retroactive Task Edit — Jul 16, 2024',
        description: 'Timer stopped mid-session due to browser crash. Requesting +1h 15m correction to "Backend refactor" task.',
        time: '+1h 15m',
        amount: '+$31.25',
        submitted: '6h ago',
        employee: {
            name: 'Ryan Park',
            role: 'DevOps Engineer',
            avatar: 'male/25-35/East Asian/6',
        },
    },
    {
        id: 5,
        type: 'expense',
        typeLabel: 'Expense',
        typeIcon: 'receipt',
        typeColor: 'bg-teal-bg text-primary',
        priority: 'medium',
        status: 'pending',
        title: 'Expense Claim — Software License',
        description: 'Requesting reimbursement for JetBrains All Products Pack annual subscription used for backend work.',
        time: '—',
        amount: '$89.00',
        submitted: '1d ago',
        employee: {
            name: 'James Carter',
            role: 'Backend Engineer',
            avatar: 'male/25-35/North American/2',
        },
    },
    {
        id: 6,
        type: 'overtime',
        typeLabel: 'Overtime',
        typeIcon: 'clock',
        typeColor: 'bg-warning-bg text-warning',
        priority: 'low',
        status: 'approved',
        title: 'Overtime Log — Jul 14, 2024',
        description: 'Weekend sprint push for staging deployment. +3h approved.',
        time: '+3h 00m',
        amount: '+$112.50',
        submitted: '3d ago',
        employee: {
            name: 'James Carter',
            role: 'Backend Engineer',
            avatar: 'male/25-35/North American/2',
        },
    },
    {
        id: 7,
        type: 'manual',
        typeLabel: 'Manual Entry',
        typeIcon: 'timer',
        typeColor: 'bg-info-bg text-info',
        priority: 'low',
        status: 'rejected',
        title: 'Manual Time Entry — Jul 12, 2024',
        description: 'Requested 6h manual log for "Research" — insufficient documentation provided.',
        time: '6h 00m',
        amount: undefined,
        submitted: '5d ago',
        employee: {
            name: 'Amara Osei',
            role: 'UX Researcher',
            avatar: 'female/25-35/African/5',
        },
    },
];

const AdminApprovals: React.FC = () => {
    const navigate = useNavigate();
    const { success, warning, info } = useToast();
    const [approvals, setApprovals] = useState<Approval[]>(initialApprovals);
    const [activeFilter, setActiveFilter] = useState<ApprovalStatus | 'all'>('all');
    const [selectedType, setSelectedType] = useState<string>('all');
    const [selectedEmployee, setSelectedEmployee] = useState<string>('all');

    const pendingCount = approvals.filter(a => a.status === 'pending').length;
    const approvedCount = approvals.filter(a => a.status === 'approved').length;
    const rejectedCount = approvals.filter(a => a.status === 'rejected').length;
    const total = approvals.length;

    const uniqueEmployees = Array.from(new Set(approvals.map(a => a.employee.name)));

    const filteredApprovals = approvals.filter(a => {
        const matchesStatus = activeFilter === 'all' || a.status === activeFilter;
        const matchesType = selectedType === 'all' || a.type === selectedType;
        const matchesEmployee = selectedEmployee === 'all' || a.employee.name === selectedEmployee;
        return matchesStatus && matchesType && matchesEmployee;
    });

    const handleApprove = (id: number) => {
        const item = approvals.find(a => a.id === id);
        setApprovals(prev => prev.map(a => a.id === id ? { ...a, status: 'approved' } : a));
        success('Request Approved', `Approved request #${id} from ${item?.employee.name || 'employee'}.`);
    };

    const handleReject = (id: number) => {
        const item = approvals.find(a => a.id === id);
        setApprovals(prev => prev.map(a => a.id === id ? { ...a, status: 'rejected' } : a));
        warning('Request Rejected', `Rejected request #${id} from ${item?.employee.name || 'employee'}.`);
    };

    const handleReset = (id: number) => {
        setApprovals(prev => prev.map(a => a.id === id ? { ...a, status: 'pending' } : a));
        info('Request Reset', `Request #${id} reset back to pending.`);
    };

    const handleBulkApprove = () => {
        const pendingItems = filteredApprovals.filter(a => a.status === 'pending');
        if (pendingItems.length === 0) {
            info('Bulk Approve', 'There are no pending requests to approve under the current view.');
            return;
        }
        const pendingIds = new Set(pendingItems.map(a => a.id));
        setApprovals(prev => prev.map(a => pendingIds.has(a.id) ? { ...a, status: 'approved' } : a));
        success('Bulk Approve Success', `Successfully approved ${pendingItems.length} pending request(s).`);
    };

    const handleMessage = (name: string) => {
        navigate('/chat');
        info('Open Chat', `Navigating to chat with ${name}`);
    };

    return (
        <div className="flex flex-col flex-1 min-w-0 px-8 py-6 gap-6">
            <div className="grid grid-cols-4 gap-4">
                <StatCard
                    icon="clock"
                    iconBg="bg-warning-bg"
                    iconColor="text-warning"
                    value={pendingCount.toString()}
                    label="Pending Review"
                    sublabel="Awaiting your action"
                    trend={`${pendingCount} pending`}
                    trendUp={false}
                />
                <StatCard
                    icon="check-circle-2"
                    iconBg="bg-success-bg"
                    iconColor="text-success"
                    value={approvedCount.toString()}
                    label="Approved Requests"
                    sublabel="Total approved items"
                    trend="+33%"
                    trendUp={true}
                />
                <StatCard
                    icon="x-circle"
                    iconBg="bg-danger-bg"
                    iconColor="text-danger"
                    value={rejectedCount.toString()}
                    label="Rejected"
                    sublabel="Total rejected items"
                    trend="-1"
                    trendUp={true}
                />
                <StatCard
                    icon="timer"
                    iconBg="bg-teal-bg"
                    iconColor="text-primary"
                    value="1.4h"
                    label="Avg Response Time"
                    sublabel="vs 2.1h last week"
                    trend="-33%"
                    trendUp={true}
                />
            </div>

            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-1 bg-surface rounded-lg p-1 border border-border">
                    {(['all', 'pending', 'approved', 'rejected'] as const).map((filter) => {
                        const count = filter === 'all' ? total : approvals.filter(a => a.status === filter).length;
                        const isActive = activeFilter === filter;
                        return (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition ${isActive ? 'bg-teal-bg text-primary' : 'text-foreground-muted hover:bg-surface-2'
                                    }`}
                            >
                                {filter === 'all' ? 'All' : filter.charAt(0).toUpperCase() + filter.slice(1)}
                                <span
                                    className={`rounded-full px-1.5 text-[10px] ${isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground-muted'
                                        }`}
                                >
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border bg-surface text-xs font-semibold text-foreground-muted">
                        <Icon name="filter" size={13} />
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="bg-transparent outline-none text-foreground-muted"
                        >
                            <option value="all">All Types</option>
                            <option value="overtime">Overtime</option>
                            <option value="manual">Manual Entry</option>
                            <option value="deletion">Deletion</option>
                            <option value="edit">Edit Request</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border bg-surface text-xs font-semibold text-foreground-muted">
                        <Icon name="user" size={13} />
                        <select
                            value={selectedEmployee}
                            onChange={(e) => setSelectedEmployee(e.target.value)}
                            className="bg-transparent outline-none text-foreground-muted"
                        >
                            <option value="all">All Employees</option>
                            {uniqueEmployees.map(emp => (
                                <option key={emp} value={emp}>{emp}</option>
                            ))}
                        </select>
                    </div>
                    <button
                        onClick={handleBulkApprove}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-success text-white text-xs font-bold hover:bg-success/90 transition shadow-sm"
                    >
                        <Icon name="check" size={13} />
                        Bulk Approve
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                {filteredApprovals.map((approval) => (
                    <ApprovalCard
                        key={approval.id}
                        approval={approval}
                        onApprove={handleApprove}
                        onReject={handleReject}
                        onReset={handleReset}
                        onMessage={handleMessage}
                    />
                ))}
                {filteredApprovals.length === 0 && (
                    <div className="py-12 rounded-xl border border-border bg-surface text-center text-sm text-foreground-muted">
                        No requests found matching current filter criteria.
                    </div>
                )}
            </div>
        </div>
    );
};

interface StatCardProps {
    icon: string;
    iconBg: string;
    iconColor: string;
    value: string;
    label: string;
    sublabel: string;
    trend: string;
    trendUp: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
    icon,
    iconBg,
    iconColor,
    value,
    label,
    sublabel,
    trend,
    trendUp,
}) => {
    return (
        <div className="flex flex-col gap-2 rounded-xl border border-border bg-surface p-5">
            <div className="flex items-center justify-between">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${iconBg} ${iconColor}`}>
                    <Icon name={icon} size={16} />
                </div>
                <span className={`text-xs font-semibold ${trendUp ? 'text-success' : 'text-foreground-muted'}`}>
                    {trend}
                </span>
            </div>
            <div>
                <div className="text-2xl font-bold text-foreground font-headings">{value}</div>
                <div className="text-xs font-semibold text-foreground-muted">{label}</div>
            </div>
            <div className="text-xs text-foreground-muted">{sublabel}</div>
        </div>
    );
};

interface ApprovalCardProps {
    approval: Approval;
    onApprove: (id: number) => void;
    onReject: (id: number) => void;
    onReset: (id: number) => void;
    onMessage: (name: string) => void;
}

const ApprovalCard: React.FC<ApprovalCardProps> = ({ approval, onApprove, onReject, onReset, onMessage }) => {
    const statusColors = {
        pending: 'bg-warning-bg text-warning',
        approved: 'bg-success-bg text-success',
        rejected: 'bg-danger-bg text-danger',
    };
    const statusIcons = {
        pending: 'clock',
        approved: 'check-circle-2',
        rejected: 'x-circle',
    };
    const borderColors = {
        pending: 'border-warning/30',
        approved: 'border-success/30',
        rejected: 'border-danger/30',
    };
    const priorityColors = {
        high: 'text-danger bg-danger-bg',
        medium: 'text-warning bg-warning-bg',
        low: 'text-foreground-muted bg-muted',
    };

    return (
        <div
            className={`flex flex-col gap-0 rounded-xl border bg-surface overflow-hidden ${borderColors[approval.status]}`}
        >
            <div className={`h-0.5 ${approval.status === 'pending' ? 'bg-warning' : approval.status === 'approved' ? 'bg-success' : 'bg-danger'}`} />
            <div className="flex items-start gap-5 px-5 py-4">
                <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${approval.typeColor}`}
                >
                    <Icon name={approval.typeIcon} size={18} />
                </div>
                <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${approval.typeColor}`}>
                            {approval.typeLabel}
                        </span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${priorityColors[approval.priority]}`}>
                            {approval.priority.charAt(0).toUpperCase() + approval.priority.slice(1)} priority
                        </span>
                        <span className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${statusColors[approval.status]}`}>
                            <Icon name={statusIcons[approval.status]} size={10} />
                            {approval.status.charAt(0).toUpperCase() + approval.status.slice(1)}
                        </span>
                    </div>
                    <h3 className="text-sm font-bold text-foreground">{approval.title}</h3>
                    <p className="text-xs text-foreground-muted leading-relaxed">{approval.description}</p>
                    <div className="flex items-center gap-4 mt-1">
                        <div className="flex items-center gap-1.5">
                            <Icon name="clock" size={11} />
                            <span className="text-xs text-foreground-muted">{approval.time}</span>
                        </div>
                        {approval.amount && (
                            <div className="flex items-center gap-1.5">
                                <Icon name="banknote" size={11} />
                                <span className="text-xs text-foreground-muted">{approval.amount}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-1.5">
                            <Icon name="calendar" size={11} />
                            <span className="text-xs text-foreground-muted">Submitted {approval.submitted}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0" style={{ width: 190 }}>
                    <img
                        src={`https://storage.googleapis.com/banani-avatars/avatar/${approval.employee.avatar}`}
                        className="w-9 h-9 rounded-full"
                        alt={approval.employee.name}
                    />
                    <div className="flex flex-col min-w-0">
                        <span className="text-sm font-semibold text-foreground truncate">{approval.employee.name}</span>
                        <span className="text-xs text-foreground-muted truncate">{approval.employee.role}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                    {approval.status === 'pending' ? (
                        <>
                            <button
                                onClick={() => onApprove(approval.id)}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-success text-white text-xs font-bold hover:bg-success/90 transition shadow-sm"
                            >
                                <Icon name="check" size={13} />
                                Approve
                            </button>
                            <button
                                onClick={() => onReject(approval.id)}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-danger-bg text-danger border border-danger-bg text-xs font-bold hover:bg-danger-bg/80 transition"
                            >
                                <Icon name="x" size={13} />
                                Reject
                            </button>
                        </>
                    ) : (
                        <div className="flex items-center gap-2">
                            <span
                                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold ${approval.status === 'approved'
                                    ? 'bg-success-bg text-success'
                                    : 'bg-danger-bg text-danger'
                                    }`}
                            >
                                <Icon name={approval.status === 'approved' ? 'check-circle-2' : 'x-circle'} size={13} />
                                {approval.status.charAt(0).toUpperCase() + approval.status.slice(1)}
                            </span>
                            <button
                                onClick={() => onReset(approval.id)}
                                title="Reset to Pending"
                                className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-foreground-muted hover:bg-surface-2 transition"
                            >
                                <Icon name="rotate-ccw" size={13} />
                            </button>
                        </div>
                    )}
                    <button
                        onClick={() => onMessage(approval.employee.name)}
                        title={`Chat with ${approval.employee.name}`}
                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-foreground-muted hover:bg-surface-2 transition"
                    >
                        <Icon name="message-circle" size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminApprovals;