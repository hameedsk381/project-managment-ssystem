import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-secondary rounded-lg shadow-xl border border-border">
        <Outlet />
      </div>
    </div>
  );
}
