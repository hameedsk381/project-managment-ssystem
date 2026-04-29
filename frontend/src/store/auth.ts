import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, UserRole, SessionData } from '../types/auth';
import { setToken, removeToken } from '../utils/auth';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (data: SessionData) => void;
  logout: () => void;
  hasRole: (roles: UserRole[]) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (data) => {
        setToken(data.token);
        set({ user: data.user, token: data.token, isAuthenticated: true });
      },
      logout: () => {
        removeToken();
        set({ user: null, token: null, isAuthenticated: false });
      },
      hasRole: (roles) => {
        const user = get().user;
        if (!user) return false;
        // Admin overrides all permissions
        if (user.role === UserRole.ADMIN) return true;
        return roles.includes(user.role);
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
