// src/pages/admin/AdminApprovals.tsx
import React, { useState } from 'react';
import Icon from '../../../components/ui/Icon';

// Types
type ApprovalStatus = 'pending' | 'approved' | 'rejected';
type ApprovalType = 'overtime' | 'manual' | 'deletion' | 'edit' | 'expense';

interface Approval {
    id: number;
    type: ApprovalType;
    typeLabel: string;
    typeIcon: string;
    typeColor: string; // tailwind bg class
    priority: 'high' | 'medium' | 'low';
    status: ApprovalStatus;
    title: string;
    description: string;
    time: string; // e.g., "+2h 30m"
    amount?: string; // optional, e.g., "+$66.25" or "$89.00"
    submitted: string; // e.g., "2h ago"
    employee: {
        name: string;
        role: string;
        avatar: string; // path to avatar
    };
}

const AdminApprovals: React.FC = () => {
    // State for filters
    const [activeFilter, setActiveFilter] = useState<ApprovalStatus | 'all'>('all');
    // For demonstration, we'll also have a search (not implemented in detail)
    const [searchTerm] = useState('');

    // Mock data
    const approvals: Approval[] = [
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

    // Stats
    const pendingCount = approvals.filter(a => a.status === 'pending').length;
    const approvedCount = approvals.filter(a => a.status === 'approved').length;
    const rejectedCount = approvals.filter(a => a.status === 'rejected').length;
    const total = approvals.length;

    // Filter logic
    const filteredApprovals = approvals.filter(a => {
        if (activeFilter === 'all') return true;
        return a.status === activeFilter;
    });

    // Actions
    const handleApprove = (id: number) => {
        alert(`Approved request #${id}`);
        // In real implementation, update status
    };
    const handleReject = (id: number) => {
        alert(`Rejected request #${id}`);
        // In real implementation, update status
    };
    const handleBulkApprove = () => {
        alert('Bulk approve selected requests');
    };

    return (
        <div className="flex flex-col flex-1 min-w-0 px-8 py-6 gap-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-4">
                <StatCard
                    icon="clock"
                    iconBg="bg-warning-bg"
                    iconColor="text-warning"
                    value={pendingCount.toString()}
                    label="Pending Review"
                    sublabel="Awaiting your action"
                    trend="+3 today"
                    trendUp={false}
                />
                <StatCard
                    icon="check-circle-2"
                    iconBg="bg-success-bg"
                    iconColor="text-success"
                    value={approvedCount.toString()}
                    label="Approved This Week"
                    sublabel="vs 9 last week"
                    trend="+33%"
                    trendUp={true}
                />
                <StatCard
                    icon="x-circle"
                    iconBg="bg-danger-bg"
                    iconColor="text-danger"
                    value={rejectedCount.toString()}
                    label="Rejected"
                    sublabel="This week"
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

            {/* Filter Bar */}
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-1 bg-surface rounded-lg p-1 border border-border">
                    {(['all', 'pending', 'approved', 'rejected'] as const).map((filter) => {
                        const count = filter === 'all' ? total : approvals.filter(a => a.status === filter).length;
                        const isActive = activeFilter === filter;
                        return (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold ${isActive ? 'bg-teal-bg text-primary' : 'text-foreground-muted'
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
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-surface text-xs font-semibold text-foreground-muted">
                        <Icon name="filter" size={13} />
                        <span>Type</span>
                        <Icon name="chevron-down" size={12} />
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-surface text-xs font-semibold text-foreground-muted">
                        <Icon name="user" size={13} />
                        <span>Employee</span>
                        <Icon name="chevron-down" size={12} />
                    </div>
                    <button
                        onClick={handleBulkApprove}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-success text-primary-foreground text-xs font-bold"
                    >
                        <Icon name="check" size={13} />
                        Bulk Approve
                    </button>
                </div>
            </div>

            {/* Approval List */}
            <div className="flex flex-col gap-4">
                {filteredApprovals.map((approval) => (
                    <ApprovalCard
                        key={approval.id}
                        approval={approval}
                        onApprove={handleApprove}
                        onReject={handleReject}
                    />
                ))}
            </div>
        </div>
    );
};

// ----- Stat Card Component -----
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
        <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
            <div className="flex items-center justify-between">
                <div className={`w-9 h-9 flex items-center justify-center rounded-lg ${iconBg} ${iconColor}`}>
                    <Icon name={icon} size={16} />
                </div>
                <span
                    className={`flex items-center gap-1 text-xs font-bold rounded-full px-2 py-0.5 ${trendUp ? 'bg-success-bg text-success' : 'bg-danger-bg text-danger'
                        }`}
                >
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
};

// ----- Approval Card Component -----
interface ApprovalCardProps {
    approval: Approval;
    onApprove: (id: number) => void;
    onReject: (id: number) => void;
}

const ApprovalCard: React.FC<ApprovalCardProps> = ({ approval, onApprove, onReject }) => {
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
        pending: 'border-warning',
        approved: 'border-success',
        rejected: 'border-danger',
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
            <div className={`h-0.5 bg-${approval.status === 'pending' ? 'warning' : approval.status === 'approved' ? 'success' : 'danger'}`} />
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
                                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-success text-primary-foreground text-xs font-bold"
                            >
                                <Icon name="check" size={13} />
                                Approve
                            </button>
                            <button
                                onClick={() => onReject(approval.id)}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-danger-bg text-danger border border-danger-bg text-xs font-bold"
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
                            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-foreground-muted">
                                <Icon name="rotate-ccw" size={13} />
                            </button>
                        </div>
                    )}
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-foreground-muted">
                        <Icon name="message-circle" size={14} />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-foreground-muted">
                        <Icon name="more-horizontal" size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminApprovals;