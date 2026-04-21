import { DashboardShell } from "@/components/dashboard-shell";
import { StatCard } from "@/components/stat-card";

export default function AdminDashboardPage() {
  return (
    <DashboardShell
      title="Admin Dashboard"
      description="The admin view combines operational insight with action screens for setup, complaints, billing, and notices."
    >
      <section className="grid gap-4 md:grid-cols-4">
        <StatCard label="Residents" value="128" hint="Owners and tenants mapped to units" />
        <StatCard label="Visitors" value="37" hint="Entries recorded today" />
        <StatCard label="Complaints" value="09" hint="Open and in-progress issues" />
        <StatCard label="Collections" value="84%" hint="Maintenance billing received this month" />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-3xl border border-slate-200 bg-white/85 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">What to build next</h2>
          <ul className="mt-4 space-y-3 text-slate-700">
            <li>Connect this dashboard to live counts from Flask APIs</li>
            <li>Build resident and unit setup forms</li>
            <li>Create complaint list and detail page</li>
            <li>Add maintenance invoice list after that</li>
          </ul>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white/85 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Beginner reminder</h2>
          <p className="mt-4 leading-7 text-slate-700">
            You do not need a perfect product in week one. The first win is one full
            working flow: create society data, invite a visitor, check them in, and show
            the status on screen.
          </p>
        </article>
      </section>
    </DashboardShell>
  );
}
