'use client';

import { useEffect, useMemo, useState } from 'react';
import { Activity, CheckCircle2, Database, TrendingUp } from 'lucide-react';
import { ApiStatus } from '@/components/ApiStatus';
import { ResearchInput } from '@/components/ResearchInput';
import { ResearchResult } from '@/components/ResearchResult';
import { StatCard } from '@/components/StatCard';
import { api } from '@/lib/api';
import { ResearchHistoryItem, ResearchResult as ResearchResultType } from '@/types';

const HISTORY_KEY = 'deep-research-history';

export default function DashboardPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [history, setHistory] = useState<ResearchHistoryItem[]>([]);
  const [result, setResult] = useState<ResearchResultType | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY);
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch {
      setHistory([]);
    }

    checkApiHealth();
  }, []);

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  async function checkApiHealth() {
    setApiStatus('checking');
    try {
      const response = await api.health();
      if (response?.status === 'ok') {
        setApiStatus('online');
      } else {
        setApiStatus('offline');
      }
    } catch {
      setApiStatus('offline');
    }
  }

  async function handleResearch() {
    const trimmed = query.trim();
    if (!trimmed) {
      setError('Please enter a research question before starting.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await api.query({ query: trimmed });
      const timestamp = new Date().toLocaleString();
      const nextResult: ResearchResultType = {
        query: response.query,
        answer: response.answer,
        status: 'completed',
        timestamp,
        trace: response.trace,
      };

      setResult(nextResult);

      const historyEntry: ResearchHistoryItem = {
        id: `${Date.now()}`,
        query: response.query,
        date: timestamp,
        status: 'completed',
        answer: response.answer,
      };

      setHistory((current) => [historyEntry, ...current].slice(0, 10));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Research request failed.';
      setResult({
        query: trimmed,
        answer: `Unable to complete research. ${message}`,
        status: 'failed',
        timestamp: new Date().toLocaleString(),
      });
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  const stats = useMemo(() => {
    return {
      totalResearch: history.length + (result ? 1 : 0),
      completedResearch: history.filter((item) => item.status === 'completed').length + (result?.status === 'completed' ? 1 : 0),
      recentQueries: history.length,
      apiStatus: apiStatus === 'online' ? 'online' : 'offline',
    };
  }, [apiStatus, history, result]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-700">Overview</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Deep Research Dashboard</h1>
          <p className="mt-2 text-sm text-slate-500">Research, analyze and discover insights with AI.</p>
        </div>
        <div className="w-full max-w-xs">
          <ApiStatus
            status={apiStatus}
            message={apiStatus === 'offline' ? 'Unable to connect to the research server. Please make sure the FastAPI backend is running.' : undefined}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Research" value={stats.totalResearch} subtitle="Total queries tracked" trend="+12%" tone="blue" />
        <StatCard title="Completed Research" value={stats.completedResearch} subtitle="Successful research runs" trend="+8%" tone="green" />
        <StatCard title="Recent Queries" value={stats.recentQueries} subtitle="Latest saved in browser" trend="+4%" tone="amber" />
        <StatCard title="API Status" value={apiStatus === 'online' ? 'Online' : 'Offline'} subtitle={apiStatus === 'online' ? 'Backend connected' : 'Backend unavailable'} tone={apiStatus === 'online' ? 'green' : 'slate'} />
      </div>

      <div className="space-y-6">
        <ResearchInput value={query} onChange={setQuery} onSubmit={handleResearch} loading={loading} error={error} />

        {result ? (
          <ResearchResult
            question={result.query}
            answer={result.answer}
            status={result.status}
            timestamp={result.timestamp}
            trace={result.trace}
            onCopy={() => navigator.clipboard.writeText(result.answer)}
            onDownload={() => {
              const blob = new Blob([result.answer], { type: 'text/markdown;charset=utf-8' });
              const url = URL.createObjectURL(blob);
              const anchor = document.createElement('a');
              anchor.href = url;
              anchor.download = 'research-result.md';
              anchor.click();
              URL.revokeObjectURL(url);
            }}
          />
        ) : null}
      </div>
    </div>
  );
}
