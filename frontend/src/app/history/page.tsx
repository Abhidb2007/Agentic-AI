'use client';

import { useEffect, useState } from 'react';
import { ResearchHistory, ResearchHistoryEntry } from '@/components/ResearchHistory';
import { ResearchResult } from '@/components/ResearchResult';

const HISTORY_KEY = 'deep-research-history';

export default function HistoryPage() {
  const [items, setItems] = useState<ResearchHistoryEntry[]>([]);
  const [selected, setSelected] = useState<ResearchHistoryEntry | null>(null);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
      setItems(stored);
    } catch {
      setItems([]);
    }
  }, []);

  function updateItems(next: ResearchHistoryEntry[]) {
    setItems(next);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  }

  function handleDelete(id: string) {
    updateItems(items.filter((item) => item.id !== id));
  }

  function handleClear() {
    updateItems([]);
    setSelected(null);
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-700">History</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Research History</h1>
      </div>

      <ResearchHistory items={items} onView={setSelected} onDelete={handleDelete} onClear={handleClear} />

      {selected && selected.answer ? (
        <ResearchResult
          question={selected.query}
          answer={selected.answer}
          status={selected.status}
          timestamp={selected.date}
          onCopy={() => navigator.clipboard.writeText(selected.answer || '')}
          onDownload={() => {
            const blob = new Blob([selected.answer || ''], { type: 'text/markdown;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'deep-research-history.md';
            a.click();
            URL.revokeObjectURL(url);
          }}
        />
      ) : null}
    </div>
  );
}
