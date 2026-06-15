import React from 'react';

const BillingTab: React.FC = () => {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-1">
                <h2 className="text-lg font-bold text-foreground">Billing & Plan</h2>
                <p className="text-sm text-foreground-muted">Manage your subscription and payment methods</p>
            </div>
            <div className="rounded-xl border border-border bg-surface overflow-hidden">
                <div className="px-6 py-4 border-b border-border bg-background-3">
                    <h3 className="text-sm font-bold text-foreground">Current Plan: Pro</h3>
                </div>
                <div className="px-6 py-5">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-sm font-semibold text-foreground">5 of 10 seats used</p>
                            <p className="text-xs text-foreground-muted">Renews on Aug 1, 2024</p>
                        </div>
                        <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold">Manage Subscription</button>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden mb-4">
                        <div className="h-full rounded-full bg-primary" style={{ width: '50%' }}></div>
                    </div>
                    <p className="text-xs text-foreground-muted">You will be charged $29/month per active user.</p>
                </div>
            </div>
            <div className="rounded-xl border border-border bg-surface overflow-hidden">
                <div className="px-6 py-4 border-b border-border bg-background-3">
                    <h3 className="text-sm font-bold text-foreground">Payment Method</h3>
                </div>
                <div className="px-6 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">💳</div>
                        <div>
                            <p className="font-semibold text-foreground">Visa ending in 4242</p>
                            <p className="text-xs text-foreground-muted">Expires 12/2026</p>
                        </div>
                    </div>
                    <button className="text-xs font-semibold text-primary border border-border px-3 py-1.5 rounded-lg">Update</button>
                </div>
            </div>
        </div>
    );
};

export default BillingTab;