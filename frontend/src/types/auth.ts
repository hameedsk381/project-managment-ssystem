export enum UserRole {
  ADMIN = 'admin',
  PROJECT_MANAGER = 'project_manager',
  TEAM_LEAD = 'team_lead',
  MEMBER = 'member',
  VIEWER = 'viewer',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  isEmailVerified: boolean;
  createdAt: string;
}

export interface SessionData {
  user: User;
  token: string;
}
