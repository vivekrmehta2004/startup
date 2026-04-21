import Link from "next/link";

type DashboardShellProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export function DashboardShell({
  title,
  description,
  children,
}: DashboardShellProps) {
  return (
    <main className="mx-auto grid min-h-[calc(100vh-73px)] max-w-6xl gap-6 px-6 py-8 md:grid-cols-[220px_1fr]">
      <aside className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-teal">SocietyOS</p>
        <h2 className="mt-3 text-2xl font-bold text-slate-900">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
        <div className="mt-6 space-y-3 text-sm font-semibold text-slate-700">
          <Link className="block rounded-xl bg-slate-100 px-3 py-2 hover:bg-slate-200" href="/">
            Back home
          </Link>
          <Link
            className="block rounded-xl bg-slate-100 px-3 py-2 hover:bg-slate-200"
            href="/resident/dashboard"
          >
            Resident
          </Link>
          <Link
            className="block rounded-xl bg-slate-100 px-3 py-2 hover:bg-slate-200"
            href="/guard/dashboard"
          >
            Guard
          </Link>
          <Link className="block rounded-xl bg-slate-100 px-3 py-2 hover:bg-slate-200" href="/admin/dashboard">
            Admin
          </Link>
        </div>
      </aside>
      <section className="space-y-6">{children}</section>
    </main>
  );
}
