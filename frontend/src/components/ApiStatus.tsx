import { Activity, AlertTriangle, Loader2 } from 'lucide-react';

interface ApiStatusProps {
  status: 'checking' | 'online' | 'offline';
  message?: string;
}

export function ApiStatus({ status, message }: ApiStatusProps) {
  const isOnline = status === 'online';
  const isChecking = status === 'checking';

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {isChecking ? (
            <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
          ) : isOnline ? (
            <Activity className="h-4 w-4 text-emerald-500" />
          ) : (
            <AlertTriangle className="h-4 w-4 text-rose-500" />
          )}
          <div>
            <p className="text-sm font-semibold text-slate-800">API Status</p>
            <p className="text-xs text-slate-500">
              {isChecking ? 'Checking connection...' : isOnline ? 'API Online' : 'API Offline'}
            </p>
          </div>
        </div>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
            isChecking
              ? 'bg-amber-100 text-amber-700'
              : isOnline
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-rose-100 text-rose-700'
          }`}
        >
          {isChecking ? 'Checking' : isOnline ? 'Online' : 'Offline'}
        </span>
      </div>
      {!isChecking && message ? <p className="mt-3 text-sm text-slate-600">{message}</p> : null}
    </div>
  );
}
