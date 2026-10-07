import { ArrowUpRight, CheckCircle2, CircleDashed, Database } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  trend?: string;
  tone?: 'blue' | 'green' | 'amber' | 'slate';
}

const colors = {
  blue: 'bg-blue-50 text-blue-600',
  green: 'bg-emerald-50 text-emerald-600',
  amber: 'bg-amber-50 text-amber-600',
  slate: 'bg-slate-100 text-slate-700',
};

export function StatCard({ title, value, subtitle, trend, tone = 'blue' }: StatCardProps) {
  const Icon = title === 'API Status' ? CircleDashed : Database;

  return (
    <div className="card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${colors[tone]}`}>
          {title === 'Completed Research' ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
        </div>
        {trend ? (
          <div className="flex items-center gap-1 text-xs font-medium text-emerald-600">
            <ArrowUpRight className="h-3.5 w-3.5" />
            {trend}
          </div>
        ) : null}
      </div>
      <p className="text-sm text-slate-500">{title}</p>
      <div className="mt-2 flex items-end justify-between gap-4">
        <h3 className="text-3xl font-semibold tracking-tight text-slate-900">{value}</h3>
      </div>
      <p className="mt-2 text-xs text-slate-500">{subtitle}</p>
    </div>
  );
}
