import { Bell, Search, UserCircle2 } from 'lucide-react';

export function Navbar() {
  return (
    <header className="card flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 lg:hidden">
          <Search className="h-4 w-4" />
        </div>
        <div>
          <p className="text-lg font-semibold text-slate-900">Deep Research AI</p>
        </div>
      </div>

      <div className="hidden items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 md:flex">
        <Search className="h-4 w-4" />
        <input
          placeholder="Search"
          className="w-52 border-0 bg-transparent text-slate-700 outline-none placeholder:text-slate-400"
          aria-label="Search"
        />
      </div>

      <div className="flex items-center gap-3">
        <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50">
          <Bell className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
          <UserCircle2 className="h-5 w-5 text-slate-600" />
          <span className="text-sm font-medium text-slate-700">User</span>
        </div>
      </div>
    </header>
  );
}
