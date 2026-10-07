import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="card mx-auto max-w-xl p-8 text-center">
      <h1 className="text-3xl font-semibold text-slate-900">Page Not Found</h1>
      <p className="mt-3 text-slate-500">The page you requested does not exist.</p>
      <Link href="/" className="mt-6 inline-flex rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-800">
        Back to dashboard
      </Link>
    </div>
  );
}
