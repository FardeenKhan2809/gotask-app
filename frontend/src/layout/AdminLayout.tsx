import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTopbar from '@/components/admin/AdminTopbar';
import ActivitiesSidebar from '@/components/ui/ActivitiesSidebar';

export interface AdminLayoutContext {
    showActivity: boolean;
    setShowActivity: React.Dispatch<React.SetStateAction<boolean>>;
    toggleActivity: () => void;
}

const AdminLayout: React.FC = () => {
    const [showActivity, setShowActivity] = useState(false);

    const toggleActivity = () => {
        setShowActivity((prev) => !prev);
    };

    return (
        <div className="flex bg-background font-body min-h-screen">
            <AdminSidebar />
            <div className="flex flex-col flex-1 min-w-0">
                <AdminTopbar onToggleActivity={toggleActivity} />
                <div className="relative flex flex-1 min-w-0">
                    <Outlet context={{ showActivity, setShowActivity, toggleActivity }} />
                    {showActivity && <ActivitiesSidebar />}
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
