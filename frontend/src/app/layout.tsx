import './globals.css';
import type { Metadata } from 'next';
import { Sidebar } from '@/components/Sidebar';
import { Navbar } from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Deep Research AI',
  description: 'Professional AI research dashboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-slate-50 text-slate-900">
          <div className="mx-auto flex max-w-[1800px] gap-6 p-4 lg:p-6">
            <Sidebar />
            <div className="flex min-w-0 flex-1 flex-col gap-6">
              <Navbar />
              <main className="min-w-0 flex-1">{children}</main>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
