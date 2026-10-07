import { Copy, Download, FileText, ShieldCheck } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ResearchResultProps {
  question: string;
  answer: string;
  status: 'completed' | 'failed';
  timestamp: string;
  trace?: Array<{ description: string; tool: string; query: string }>;
  onCopy: () => void;
  onDownload: () => void;
}

export function ResearchResult({ question, answer, status, timestamp, trace, onCopy, onDownload }: ResearchResultProps) {
  return (
    <div className="card p-5 sm:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Research Result</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">{question}</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onCopy}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          >
            <Copy className="h-4 w-4" />
            Copy
          </button>
          <button
            onClick={onDownload}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            <Download className="h-4 w-4" />
            Download
          </button>
        </div>
      </div>

      <div className="mb-5 flex flex-wrap items-center gap-3 text-xs text-slate-500">
        <span className="soft-badge">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          {status === 'completed' ? 'Completed' : 'Failed'}
        </span>
        <span className="soft-badge">
          <FileText className="h-3.5 w-3.5" />
          {timestamp}
        </span>
      </div>

      <div className="markdown-body rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
        <ReactMarkdown>{answer}</ReactMarkdown>
      </div>

      {trace && trace.length > 0 ? (
        <div className="mt-6">
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Research Trace</h4>
          <div className="space-y-2">
            {trace.map((item, index) => (
              <div key={`${item.tool}-${index}`} className="rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-600">
                <div className="font-medium text-slate-800">{item.description}</div>
                <div className="mt-1 text-xs text-slate-500">Tool: {item.tool}</div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
