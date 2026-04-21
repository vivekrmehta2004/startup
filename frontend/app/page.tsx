import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <section className="grid gap-10 md:grid-cols-[1.3fr_0.9fr] md:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-brand-teal">
            PropTech Startup Starter
          </p>
          <h1 className="mt-4 max-w-3xl text-5xl font-bold leading-tight text-slate-900">
            Build a society management product one working module at a time.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            This starter is shaped for a beginner founder. You already have a Flask backend
            skeleton and a dashboard-style Next.js frontend, so we can keep adding features
            without losing clarity.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              className="rounded-full bg-brand-ink px-6 py-3 text-sm font-bold text-white"
              href="/admin/dashboard"
            >
              Open Admin Dashboard
            </Link>
            <Link
              className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-900"
              href="/resident/dashboard"
            >
              Open Resident Dashboard
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white/85 p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">MVP modules</h2>
          <ul className="mt-4 space-y-3 text-slate-700">
            <li>Visitor management for residents and guards</li>
            <li>Complaint tracking with statuses</li>
            <li>Resident and unit setup</li>
            <li>Maintenance billing later</li>
            <li>Notices and reports later</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
