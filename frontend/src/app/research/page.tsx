'use client';

import { useState } from 'react';
import { ResearchInput } from '@/components/ResearchInput';
import { ResearchResult } from '@/components/ResearchResult';
import { api } from '@/lib/api';

export default function ResearchPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<{ query: string; answer: string; status: 'completed' | 'failed'; timestamp: string; trace?: Array<{ description: string; tool: string; query: string }> } | null>(null);

  async function handleResearch() {
    const trimmed = query.trim();
    if (!trimmed) {
      setError('Please enter a research question.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await api.query({ query: trimmed });
      setResult({
        query: response.query,
        answer: response.answer,
        status: 'completed',
        timestamp: new Date().toLocaleString(),
        trace: response.trace,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'A research error occurred.';
      setError(message);
      setResult({
        query: trimmed,
        answer: `Unable to complete research. ${message}`,
        status: 'failed',
        timestamp: new Date().toLocaleString(),
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-700">Research</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">New Research</h1>
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
              const a = document.createElement('a');
              a.href = url;
              a.download = 'deep-research-result.md';
              a.click();
              URL.revokeObjectURL(url);
            }}
          />
        ) : null}
      </div>
    </div>
  );
}
