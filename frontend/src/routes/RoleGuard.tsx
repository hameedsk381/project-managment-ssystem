import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { UserRole } from '../types/auth';

interface RoleGuardProps {
  allowedRoles: UserRole[];
}

export const RoleGuard = ({ allowedRoles }: RoleGuardProps) => {
  const hasRole = useAuthStore((state) => state.hasRole);

  if (!hasRole(allowedRoles)) {
    return <Navigate to="/dashboard/unauthorized" replace />;
  }

  return <Outlet />;
};
