export type IssueState = 'backlog' | 'todo' | 'in_progress' | 'review' | 'done' | 'cancelled';
export type IssuePriority = 'none' | 'low' | 'medium' | 'high' | 'urgent';

export interface IssueLabel {
  id: string;
  name: string;
  color: string;
}

export interface IssueComment {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
}

export interface Issue {
  id: string;
  projectId: string;
  title: string;
  description: string;
  state: IssueState;
  priority: IssuePriority;
  assigneeId?: string;
  labelIds: string[];
  dueDate?: string;
  estimate?: number;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
}
