export type ApiStatus = 'online' | 'offline' | 'checking';

export interface ResearchResult {
  query: string;
  answer: string;
  status: 'completed' | 'failed';
  timestamp: string;
  trace?: ResearchStep[];
}

export interface ResearchStep {
  step_id: number;
  description: string;
  tool: string;
  query: string;
  status: string;
  result?: string | null;
}

export interface ResearchHistoryItem {
  id: string;
  query: string;
  date: string;
  status: 'completed' | 'failed';
  answer?: string;
}

export interface DashboardStats {
  totalResearch: number;
  completedResearch: number;
  recentQueries: number;
  apiStatus: 'online' | 'offline';
}
