import React from 'react';
import Icon, { type IconName } from '@/components/ui/Icon';

export interface StatCardProps {
    icon: IconName | (string & {});
    iconBg?: string;
    iconColor?: string;
    value: string | number;
    label: string;
    sublabel?: string;
    trend?: string;
    trendUp?: boolean;
    trendDown?: boolean;
    trendColor?: string;
    className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
    icon,
    iconBg = 'bg-teal-bg',
    iconColor = 'text-primary',
    value,
    label,
    sublabel,
    trend,
    trendUp,
    trendDown,
    trendColor,
    className = '',
}) => {
    const isPositive = trendUp ?? (trendDown !== undefined ? !trendDown : undefined);

    const defaultTrendColor = isPositive === undefined
        ? 'text-foreground-muted bg-surface'
        : isPositive
            ? 'text-success bg-success-bg'
            : 'text-danger bg-danger-bg';

    const appliedTrendColor = trendColor || defaultTrendColor;

    return (
        <div className={`flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 hover:border-border/80 transition shadow-sm ${className}`}>
            <div className="flex items-center justify-between">
                <div className={`w-9 h-9 flex items-center justify-center rounded-lg ${iconBg} ${iconColor}`}>
                    <Icon name={icon} size={16} />
                </div>
                {trend && (
                    <span className={`flex items-center gap-1 text-xs font-bold rounded-full px-2 py-0.5 ${appliedTrendColor}`}>
                        {isPositive !== undefined && (
                            <Icon name={isPositive ? 'trending-up' : 'trending-down'} size={10} />
                        )}
                        {trend}
                    </span>
                )}
            </div>
            <div>
                <div className="font-headings font-bold text-2xl text-foreground tracking-tight">{value}</div>
                <div className="text-xs font-medium text-foreground-muted mt-0.5">{label}</div>
                {sublabel && (
                    <div className="text-[11px] text-foreground-muted/70 mt-1">{sublabel}</div>
                )}
            </div>
        </div>
    );
};

export default StatCard;
