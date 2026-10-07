import { Trash2, Eye, ListX } from 'lucide-react';

export interface ResearchHistoryEntry {
  id: string;
  query: string;
  date: string;
  status: 'completed' | 'failed';
  answer?: string;
}

interface ResearchHistoryProps {
  items: ResearchHistoryEntry[];
  onView: (item: ResearchHistoryEntry) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
}

export function ResearchHistory({ items, onView, onDelete, onClear }: ResearchHistoryProps) {
  return (
    <div className="card p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Research History</h2>
          <p className="text-sm text-slate-500">Recent queries saved in your browser</p>
        </div>
        {items.length > 0 ? (
          <button
            onClick={onClear}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <ListX className="h-4 w-4" />
            Clear all
          </button>
        ) : null}
      </div>

      <div className="space-y-3">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5 text-sm text-slate-500">
            No research history yet.
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-800">{item.query}</p>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span>{item.date}</span>
                  <span className={`rounded-full px-2 py-0.5 ${item.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                    {item.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onView(item)}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-100"
                >
                  <Eye className="h-4 w-4" />
                  View
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 hover:bg-rose-100"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
