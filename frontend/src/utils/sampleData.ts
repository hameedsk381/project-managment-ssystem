// Centralized Sample Data for UI Preview
// In a real application, these would come from an API

export const SAMPLE_PROJECTS = [
  { id: '1', name: 'Apollo Platform', identifier: 'APO', status: 'ongoing', progress: 65 },
  { id: '2', name: 'Hermes Messenger', identifier: 'HER', status: 'ongoing', progress: 40 },
  { id: '3', name: 'Atlas Analytics', identifier: 'ATL', status: 'completed', progress: 100 },
];

export const SAMPLE_ISSUES = [
  { id: 'ISS-1', title: 'Implement user auth', state: 'in_progress', priority: 'urgent' },
  { id: 'ISS-2', title: 'Dark mode styles', state: 'todo', priority: 'high' },
  { id: 'ISS-3', title: 'Mobile overflow fix', state: 'backlog', priority: 'medium' },
];

export const SAMPLE_TEAMS = [
  { name: 'Frontend', members: 6, workload: 85 },
  { name: 'Backend', members: 8, workload: 62 },
];

export const SAMPLE_GOALS = [
  { 
    id: '1', 
    title: 'Achieve Market Leadership in PM Software', 
    owner: 'CEO Office', 
    progress: 75, 
    status: 'on_track', 
    startDate: '2023-01-01', 
    dueDate: '2023-12-31',
    projects: ['Apollo Platform', 'Atlas Analytics'],
    keyResults: [
      { id: 'kr1', title: 'Onboard 50 enterprise customers', current: 42, target: 50, unit: 'customers' },
      { id: 'kr2', title: 'Maintain 99.99% uptime', current: 99.95, target: 99.99, unit: '%' }
    ]
  },
  { 
    id: '2', 
    title: 'Enhance AI Integration Capabilities', 
    owner: 'Product Team', 
    progress: 45, 
    status: 'at_risk', 
    startDate: '2023-06-01', 
    dueDate: '2023-12-15',
    projects: ['Hermes Messenger'],
    keyResults: [
      { id: 'kr3', title: 'Implement AI task auto-generation', current: 0, target: 1, unit: 'feature' },
      { id: 'kr4', title: 'Reduce manual triage time by 30%', current: 15, target: 30, unit: '%' }
    ]
  }
];

export const SAMPLE_WIKI_PAGES = [
  { 
    id: '1', 
    title: 'Onboarding Guide', 
    category: 'General', 
    author: 'John Doe', 
    lastUpdated: '2 days ago', 
    status: 'published',
    description: 'A comprehensive guide for new team members to set up their environment.'
  },
  { 
    id: '2', 
    title: 'Product Roadmap Q4', 
    category: 'Strategy', 
    author: 'Sarah Chen', 
    lastUpdated: '5 hours ago', 
    status: 'published',
    description: 'Upcoming features and milestones for the final quarter of the year.'
  },
  { 
    id: '3', 
    title: 'API Documentation', 
    category: 'Engineering', 
    author: 'Mike Ross', 
    lastUpdated: '1 week ago', 
    status: 'draft',
    description: 'Technical specifications for the v2 REST API endpoints.'
  }
];
