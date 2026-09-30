import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from '@/layout/AppLayout';
import AdminLayout from '@/layout/AdminLayout';

const Dashboard = lazy(() => import('@/pages/dashboard/Dashboard'));
const MyTasks = lazy(() => import('@/pages/tasks/MyTasks'));
const TimeTracker = lazy(() => import('@/pages/tasks/TimeTracker'));
const Calendar = lazy(() => import('@/pages/calendar/Calendar'));
const Reports = lazy(() => import('@/pages/reports/Reports'));
const Team = lazy(() => import('@/pages/team/Team'));
const Projects = lazy(() => import('@/pages/projects/Projects'));
const Chat = lazy(() => import('@/pages/chat/Chat'));
const Notifications = lazy(() => import('@/pages/notifications/Notifications'));
const Settings = lazy(() => import('@/pages/shared/settings/Settings'));
const TaskCreation = lazy(() => import('@/pages/tasks/CreateTask'));
const Login = lazy(() => import('@/pages/shared/login/Login'));
const Signup = lazy(() => import('@/pages/shared/login/Signup'));
const NotFound = lazy(() => import('@/pages/shared/NotFound'));

const AdminDashboard = lazy(() => import('@/pages/admin/dashboard/AdminDashboard'));
const AdminEmployeeListing = lazy(() => import('@/pages/admin/employee/AdminEmployeeListingPage'));
const AdminAddEmployee = lazy(() => import('@/pages/admin/employee/AddEmployee'));
const AdminApprovals = lazy(() => import('@/pages/admin/employee/Approvals'));
const AdminSalaryManagement = lazy(() => import('@/pages/admin/salary/AdminSalaryManagement'));

const PageLoader: React.FC = () => (
    <div className="flex flex-1 items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            <span className="text-xs font-semibold text-foreground-muted">Loading...</span>
        </div>
    </div>
);

const AppRoutes: React.FC = () => {
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                <Route element={<AdminLayout />}>
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/salary" element={<AdminSalaryManagement />} />
                    <Route path="/salary" element={<Navigate to="/admin/salary" replace />} />
                    <Route path="/admin/employee" element={<AdminEmployeeListing />} />
                    <Route path="/employee" element={<AdminEmployeeListing />} />
                    <Route path="/admin/add-employee" element={<AdminAddEmployee />} />
                    <Route path="/add-employee" element={<AdminAddEmployee />} />
                    <Route path="/admin/approvals" element={<AdminApprovals />} />
                    <Route path="/approvals" element={<AdminApprovals />} />
                </Route>

                <Route element={<AppLayout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/my-tasks" element={<MyTasks />} />
                    <Route path="/time-tracker" element={<TimeTracker />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/team" element={<Team />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/create-task" element={<TaskCreation />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
