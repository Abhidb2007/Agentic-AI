'use client';

import Link from 'next/link';
import { ExternalLink, Server, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

export default function SettingsPage() {
  const [status, setStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  useEffect(() => {
    async function check() {
      try {
        const response = await fetch(`${API_URL}/health`);
        setStatus(response.ok ? 'online' : 'offline');
      } catch {
        setStatus('offline');
      }
    }

    check();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-700">Settings</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Application Settings</h1>
      </div>

      <div className="card p-5 sm:p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <Server className="h-4 w-4" />
              API Base URL
            </div>
            <p className="text-base font-medium text-slate-900">{API_URL}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <ShieldCheck className="h-4 w-4" />
              Backend status
            </div>
            <p className={`text-base font-medium ${status === 'online' ? 'text-emerald-600' : 'text-rose-600'}`}>
              {status === 'checking' ? 'Checking...' : status === 'online' ? 'API Online' : 'API Offline'}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-3 text-sm text-slate-600">
          <p>Frontend version: 0.1.0</p>
          <p>API documentation: http://127.0.0.1:8000/docs</p>
        </div>

        <div className="mt-6">
          <Link
            href="http://127.0.0.1:8000/docs"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-800"
          >
            Open API Documentation
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
