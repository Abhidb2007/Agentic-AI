import { Check, Loader2, Sparkles } from 'lucide-react';

interface ResearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
  error?: string;
}

const examples = [
  'What are the latest trends in Generative AI?',
  'Compare React and Next.js for enterprise applications.',
  'What are the latest developments in telecom AI?',
  'Analyze the future of AI agents.',
];

export function ResearchInput({ value, onChange, onSubmit, loading, error }: ResearchInputProps) {
  return (
    <div className="card p-5 sm:p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-slate-900">Start New Research</h2>
        <p className="mt-2 text-sm text-slate-500">Ask a question and let the AI research agent analyze it.</p>
      </div>

      <div className="space-y-4">
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Enter your research question..."
          className="min-h-[160px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
        />

        <div className="flex flex-wrap gap-2">
          {examples.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => onChange(example)}
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              {example}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={onSubmit}
            disabled={loading || !value.trim()}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Researching...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Start Research
              </>
            )}
          </button>

          {error ? <span className="text-sm text-rose-600">{error}</span> : null}
        </div>
      </div>
    </div>
  );
}
