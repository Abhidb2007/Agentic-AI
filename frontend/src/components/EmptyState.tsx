export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="card flex flex-col items-center justify-center p-10 text-center">
      <div className="mb-3 text-3xl">📊</div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-slate-500">{description}</p>
    </div>
  );
}
