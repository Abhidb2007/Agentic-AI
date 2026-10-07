export function LoadingState({ label = 'Loading...' }: { label?: string }) {
  return (
    <div className="card flex items-center gap-3 p-4 text-slate-600">
      <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
