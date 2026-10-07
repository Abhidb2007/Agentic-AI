'use client';

import { useEffect, useMemo, useState } from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { EmptyState } from '@/components/EmptyState';

const HISTORY_KEY = 'deep-research-history';

export default function AnalyticsPage() {
  const [history, setHistory] = useState<Array<{ id: string; query: string; date: string; status: 'completed' | 'failed' }>>([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
      setHistory(stored);
    } catch {
      setHistory([]);
    }
  }, []);

  const chartData = useMemo(() => {
    const counts: Record<string, number> = {};
    history.forEach((item) => {
      const date = new Date(item.date).toLocaleDateString('en-CA');
      counts[date] = (counts[date] || 0) + 1;
    });

    return Object.entries(counts).map(([date, value]) => ({ date, value }));
  }, [history]);

  const stats = {
    total: history.length,
    completed: history.filter((item) => item.status === 'completed').length,
    failed: history.filter((item) => item.status === 'failed').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-700">Analytics</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Research Analytics</h1>
      </div>

      {history.length === 0 ? (
        <EmptyState
          title="No analytics yet"
          description="Submit a research query to see your dashboard metrics and query trends."
        />
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="card p-5">
              <p className="text-sm text-slate-500">Total Research Queries</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{stats.total}</p>
            </div>
            <div className="card p-5">
              <p className="text-sm text-slate-500">Completed</p>
              <p className="mt-2 text-3xl font-semibold text-emerald-600">{stats.completed}</p>
            </div>
            <div className="card p-5">
              <p className="text-sm text-slate-500">Failed</p>
              <p className="mt-2 text-3xl font-semibold text-rose-600">{stats.failed}</p>
            </div>
          </div>

          <div className="card h-[320px] p-4 sm:p-6">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">Queries by date</h2>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}
