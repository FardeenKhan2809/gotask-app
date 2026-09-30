import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/ui/Sidebar';
import Topbar from '@/components/ui/Topbar';

const AppLayout: React.FC = () => {
    return (
        <div className="flex bg-background font-body min-h-screen">
            <Sidebar />
            <div className="flex flex-col flex-1 min-w-0">
                <Topbar />
                <Outlet />
            </div>
        </div>
    );
};

export default AppLayout;
