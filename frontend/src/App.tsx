import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useThemeStore } from './store/theme';



// Layouts & Routing
import AuthLayout from './layouts/AuthLayout';
import { AppLayout } from './components/layout/AppLayout';
import { ProtectedRoute } from './routes/ProtectedRoute';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// Workspace Pages
import WorkspaceOverview from './pages/dashboard/WorkspaceOverview';
import ProjectList from './pages/dashboard/projects/ProjectList';
import ProjectDetails from './pages/dashboard/projects/ProjectDetails';

// Issue Pages
import KanbanBoard from './pages/dashboard/issues/KanbanBoard';
import IssueList from './pages/dashboard/issues/IssueList';
import IssueDetails from './pages/dashboard/issues/IssueDetails';
import MyIssuesPage from './pages/dashboard/issues/MyIssuesPage';

// Advanced Feature Pages
import OKRPage from './pages/dashboard/goals/OKRPage';
import DiscussionFeed from './pages/dashboard/collaboration/DiscussionFeed';
import PortfolioDashboard from './pages/dashboard/portfolio/PortfolioDashboard';
import WikiPage from './pages/dashboard/wiki/WikiPage';
import AdminSettings from './pages/dashboard/settings/AdminSettings';
import TeamsPage from './pages/dashboard/teams/TeamsPage';
import NotificationsPage from './pages/dashboard/notifications/NotificationsPage';
import ReportsPage from './pages/dashboard/reports/ReportsPage';

function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Routes>
      {/* Public/Auth Routes */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Navigate to="/auth/login" replace />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* Protected Routes */}
      <Route path="/" element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard/workspace" replace />} />
          <Route path="dashboard">
            <Route path="workspace" element={<WorkspaceOverview />} />
            <Route path="projects" element={<ProjectList />} />
            <Route path="projects/:projectId" element={<ProjectDetails />} />
            <Route path="issues" element={<KanbanBoard />} />
            <Route path="issues/my" element={<MyIssuesPage />} />
            <Route path="issues/:issueId" element={<IssueDetails />} />
            <Route path="teams" element={<TeamsPage />} />
            <Route path="goals" element={<OKRPage />} />
            <Route path="collaboration" element={<DiscussionFeed />} />
            <Route path="portfolio" element={<PortfolioDashboard />} />
            <Route path="wiki" element={<WikiPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="settings" element={<AdminSettings />} />
            {/* Fallback for unbuilt modules */}
            <Route path="*" element={<div className="p-8 flex items-center justify-center h-full text-muted-foreground">Module in development (Phase 2)</div>} />
          </Route>
        </Route>
      </Route>
      
      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/dashboard/workspace" replace />} />
    </Routes>
  );
}

export default App;
