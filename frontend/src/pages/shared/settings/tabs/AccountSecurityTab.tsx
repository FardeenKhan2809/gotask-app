import React, { useState } from 'react';
import Icon from '../../../../components/ui/Icon';

const AccountSecurityTab: React.FC = () => {
    const [showCurrentPwd, setShowCurrentPwd] = useState(false);
    const [showNewPwd, setShowNewPwd] = useState(false);
    const [showConfirmPwd, setShowConfirmPwd] = useState(false);

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-1">
                <h2 className="text-lg font-bold text-foreground">Account & Security</h2>
                <p className="text-sm text-foreground-muted">Manage your login credentials and security settings</p>
            </div>

            {/* Login Information */}
            <div className="rounded-xl border border-border bg-surface overflow-hidden">
                <div className="px-6 py-4 border-b border-border bg-background-3">
                    <h3 className="text-sm font-bold text-foreground">Login Information</h3>
                </div>
                <div className="flex flex-col gap-0">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                        <div>
                            <span className="text-xs text-foreground-muted">Email Address</span>
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-sm font-semibold text-foreground">aryan@acmecorp.com</span>
                                <span className="flex items-center gap-1 text-xs font-semibold text-success bg-success-bg px-2 py-0.5 rounded-full">
                                    <Icon name="check-circle-2" size={11} /> Verified
                                </span>
                            </div>
                        </div>
                        <button className="text-xs font-semibold text-primary border border-border px-3 py-1.5 rounded-lg">Change</button>
                    </div>
                    <div className="flex items-center justify-between px-6 py-4">
                        <div>
                            <span className="text-xs text-foreground-muted">Username</span>
                            <div className="mt-0.5">
                                <span className="text-sm font-semibold text-foreground">@aryan.mehta</span>
                            </div>
                        </div>
                        <button className="text-xs font-semibold text-primary border border-border px-3 py-1.5 rounded-lg">Change</button>
                    </div>
                </div>
            </div>

            {/* Password */}
            <div className="rounded-xl border border-border bg-surface overflow-hidden">
                <div className="px-6 py-4 border-b border-border bg-background-3">
                    <h3 className="text-sm font-bold text-foreground">Password</h3>
                </div>
                <div className="flex flex-col gap-4 px-6 py-5">
                    <div className="flex flex-col gap-2 max-w-md">
                        <label className="text-xs font-semibold text-foreground">Current Password</label>
                        <div className="flex items-center gap-3 rounded-xl border border-border bg-input px-4 py-3">
                            <Icon name="lock" size={14} />
                            <input type={showCurrentPwd ? 'text' : 'password'} defaultValue="password123" className="flex-1 bg-transparent text-foreground outline-none" />
                            <button onClick={() => setShowCurrentPwd(!showCurrentPwd)} className="text-foreground-muted">
                                <Icon name="eye" size={14} />
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 max-w-md">
                        <label className="text-xs font-semibold text-foreground">New Password</label>
                        <div className="flex items-center gap-3 rounded-xl border border-border bg-input px-4 py-3">
                            <Icon name="lock" size={14} />
                            <input type={showNewPwd ? 'text' : 'password'} className="flex-1 bg-transparent text-foreground outline-none" />
                            <button onClick={() => setShowNewPwd(!showNewPwd)} className="text-foreground-muted">
                                <Icon name="eye" size={14} />
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 max-w-md">
                        <label className="text-xs font-semibold text-foreground">Confirm New Password</label>
                        <div className="flex items-center gap-3 rounded-xl border border-border bg-input px-4 py-3">
                            <Icon name="lock" size={14} />
                            <input type={showConfirmPwd ? 'text' : 'password'} className="flex-1 bg-transparent text-foreground outline-none" />
                            <button onClick={() => setShowConfirmPwd(!showConfirmPwd)} className="text-foreground-muted">
                                <Icon name="eye" size={14} />
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 max-w-md">
                        <div className="flex gap-1 flex-1">
                            <div className="flex-1 h-1.5 rounded-full bg-warning"></div>
                            <div className="flex-1 h-1.5 rounded-full bg-warning"></div>
                            <div className="flex-1 h-1.5 rounded-full bg-warning"></div>
                            <div className="flex-1 h-1.5 rounded-full bg-border"></div>
                        </div>
                        <span className="text-xs font-semibold text-warning">Good</span>
                    </div>
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-bold w-fit">
                        <Icon name="save" size={14} /> Update Password
                    </button>
                </div>
            </div>

            {/* Two-Factor Authentication */}
            <div className="rounded-xl border border-border bg-surface overflow-hidden">
                <div className="px-6 py-4 border-b border-border bg-background-3 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-foreground">Two-Factor Authentication</h3>
                    <span className="text-xs font-semibold text-danger bg-danger-bg px-2.5 py-1 rounded-full">Not Enabled</span>
                </div>
                <div className="flex items-center justify-between px-6 py-5">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-warning-bg flex items-center justify-center">
                            <Icon name="shield-alert" size={18} className="text-warning" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-foreground">Protect your account with 2FA</p>
                            <p className="text-xs text-foreground-muted">Use an authenticator app or SMS to add an extra layer of security.</p>
                        </div>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold ml-6">
                        <Icon name="shield-check" size={14} /> Enable 2FA
                    </button>
                </div>
            </div>

            {/* Active Sessions */}
            <div className="rounded-xl border border-border bg-surface overflow-hidden">
                <div className="px-6 py-4 border-b border-border bg-background-3">
                    <h3 className="text-sm font-bold text-foreground">Active Sessions</h3>
                </div>
                <div className="flex flex-col gap-0">
                    <div className="flex items-center gap-4 px-6 py-4 border-b border-border">
                        <div className="w-9 h-9 rounded-lg bg-teal-bg flex items-center justify-center">
                            <Icon name="monitor" size={16} className="text-primary" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-foreground">Chrome on macOS</span>
                                <span className="text-xs text-primary font-bold bg-teal-bg px-2 py-0.5 rounded-full">This device</span>
                            </div>
                            <span className="text-xs text-foreground-muted">Mumbai, India · Current session</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 px-6 py-4 border-b border-border">
                        <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                            <Icon name="smartphone" size={16} className="text-foreground-muted" />
                        </div>
                        <div className="flex-1">
                            <span className="text-sm font-semibold text-foreground">Safari on iPhone 15</span>
                            <span className="text-xs text-foreground-muted block">Mumbai, India · 2 days ago</span>
                        </div>
                        <button className="text-xs font-semibold text-danger border border-danger-bg bg-danger-bg px-3 py-1.5 rounded-lg">Revoke</button>
                    </div>
                    <div className="flex items-center gap-4 px-6 py-4">
                        <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                            <Icon name="monitor" size={16} className="text-foreground-muted" />
                        </div>
                        <div className="flex-1">
                            <span className="text-sm font-semibold text-foreground">Firefox on Windows</span>
                            <span className="text-xs text-foreground-muted block">Delhi, India · 5 days ago</span>
                        </div>
                        <button className="text-xs font-semibold text-danger border border-danger-bg bg-danger-bg px-3 py-1.5 rounded-lg">Revoke</button>
                    </div>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="rounded-xl border border-danger-bg bg-surface overflow-hidden">
                <div className="px-6 py-4 border-b border-danger-bg bg-background-3">
                    <h3 className="text-sm font-bold text-danger">Danger Zone</h3>
                </div>
                <div className="flex items-center justify-between px-6 py-5">
                    <div>
                        <p className="text-sm font-semibold text-foreground">Delete Account</p>
                        <p className="text-xs text-foreground-muted mt-0.5">Permanently delete your account and all associated data. This cannot be undone.</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-danger-bg border border-danger text-danger text-sm font-bold ml-6">
                        <Icon name="trash-2" size={14} /> Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccountSecurityTab;