import React, { useState } from 'react';
import Icon from '../../components/ui/Icon';
import ProfileTab from './tabs/ProfileTab';
import AccountSecurityTab from './tabs/AccountSecurityTab';
import NotificationsTab from './tabs/NotificationsTab';
import AppearanceTab from './tabs/AppearanceTab';
import IntegrationsTab from './tabs/IntegrationsTab';
import WorkspaceTab from './tabs/WorkspaceTab';
import BillingTab from './tabs/BillingTab';
import KeyboardShortcutsTab from './tabs/KeyboardShortcutsTab';

type TabId = 'profile' | 'account' | 'notifications' | 'appearance' | 'integrations' | 'workspace' | 'billing' | 'shortcuts';

const tabs: { id: TabId; label: string; icon: string }[] = [
    { id: 'profile', label: 'Profile', icon: 'user' },
    { id: 'account', label: 'Account & Security', icon: 'shield' },
    { id: 'notifications', label: 'Notifications', icon: 'bell' },
    { id: 'appearance', label: 'Appearance', icon: 'palette' },
    { id: 'integrations', label: 'Integrations', icon: 'plug' },
    { id: 'workspace', label: 'Workspace', icon: 'building-2' },
    { id: 'billing', label: 'Billing & Plan', icon: 'credit-card' },
    { id: 'shortcuts', label: 'Keyboard Shortcuts', icon: 'keyboard' },
];

const Settings: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabId>('account');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'profile': return <ProfileTab />;
            case 'account': return <AccountSecurityTab />;
            case 'notifications': return <NotificationsTab />;
            case 'appearance': return <AppearanceTab />;
            case 'integrations': return <IntegrationsTab />;
            case 'workspace': return <WorkspaceTab />;
            case 'billing': return <BillingTab />;
            case 'shortcuts': return <KeyboardShortcutsTab />;
            default: return <AccountSecurityTab />;
        }
    };

    return (
        <div className="flex flex-1 min-w-0">
            <div className="flex flex-col gap-1 px-4 py-6 border-r border-border bg-background-2 w-[220px] flex-shrink-0">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition ${activeTab === tab.id ? 'bg-teal-bg text-primary' : 'text-foreground-muted hover:bg-surface-2'
                            }`}
                    >
                        <Icon name={tab.icon as any} size={15} />
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>

            <div className="flex flex-col flex-1 min-w-0 px-10 py-8 gap-8 overflow-y-auto">
                {renderTabContent()}
            </div>

            {/* <div className="flex flex-col gap-5 border-l border-border px-6 py-6 w-[240px] flex-shrink-0">
                <div className="flex flex-col gap-3">
                    <h3 className="text-xs font-bold text-foreground-muted uppercase tracking-wide">Quick Links</h3>
                    <a href="#" className="flex items-center gap-2 text-sm text-foreground-muted hover:text-primary transition"><Icon name="user" size={14} /> Edit Profile</a>
                    <a href="#" className="flex items-center gap-2 text-sm text-foreground-muted hover:text-primary transition"><Icon name="bell" size={14} /> Notification prefs</a>
                    <a href="#" className="flex items-center gap-2 text-sm text-foreground-muted hover:text-primary transition"><Icon name="palette" size={14} /> Appearance</a>
                    <a href="#" className="flex items-center gap-2 text-sm text-foreground-muted hover:text-primary transition"><Icon name="plug" size={14} /> Integrations</a>
                    <a href="#" className="flex items-center gap-2 text-sm text-foreground-muted hover:text-primary transition"><Icon name="credit-card" size={14} /> Billing</a>
                </div>
                <div className="rounded-xl border border-border bg-surface p-4 flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                        <Icon name="zap" size={14} />
                        <span className="text-xs font-bold text-foreground">Plan: Pro</span>
                    </div>
                    <p className="text-xs text-foreground-muted">5 of 10 seats used. Renews Aug 1, 2024.</p>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-primary" style={{ width: '50%' }}></div>
                    </div>
                    <button className="text-xs font-semibold text-primary text-left">Upgrade to Business →</button>
                </div>
            </div> */}
        </div>
    );
};

export default Settings;
