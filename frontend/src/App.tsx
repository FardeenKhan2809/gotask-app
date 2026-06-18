import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Sidebar from './components/ui/Sidebar';
import Topbar from './components/ui/Topbar';
import AdminDashboard from './pages/admin/AdminDashboard';
import Dashboard from './pages/dashboard/Dashboard';
import MyTasks from './pages/tasks/MyTasks';
import TimeTracker from './pages/tasks/TimeTracker';
import Calendar from './pages/calendar/Calendar';
import Reports from './pages/reports/Reports';
import Team from './pages/team/Team';
import Projects from './pages/projects/Projects';
import Chat from './pages/chat/Chat';
import Signup from './pages/login/Signup';
import Login from './pages/login/Login';
import Settings from './pages/settings/Settings';
import Notifications from './pages/notifications/Notifications';
import TaskCreation from './pages/tasks/CreateTask';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex bg-background font-body min-h-screen">
    <Sidebar />
    <div className="flex flex-col flex-1 min-w-0">
      <Topbar />
      {children}
    </div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth routes – no layout (no Sidebar/Topbar) */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Protected routes – wrapped with Layout */}
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/my-tasks" element={<Layout><MyTasks /></Layout>} />
          <Route path="/time-tracker" element={<Layout><TimeTracker /></Layout>} />
          <Route path="/calendar" element={<Layout><Calendar /></Layout>} />
          <Route path="/reports" element={<Layout><Reports /></Layout>} />
          <Route path="/team" element={<Layout><Team /></Layout>} />
          <Route path="/projects" element={<Layout><Projects /></Layout>} />
          <Route path="/chat" element={<Layout><Chat /></Layout>} />
          <Route path="/notifications" element={<Layout><Notifications /></Layout>} />
          <Route path="/settings" element={<Layout><Settings /></Layout>} />
          <Route path="/create-task" element={<Layout><TaskCreation /></Layout>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;