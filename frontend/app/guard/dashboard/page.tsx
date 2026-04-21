import { DashboardShell } from "@/components/dashboard-shell";
import { StatCard } from "@/components/stat-card";

export default function GuardDashboardPage() {
  return (
    <DashboardShell
      title="Guard Dashboard"
      description="The guard interface should always be fast, obvious, and easy to use at the gate."
    >
      <section className="grid gap-4 md:grid-cols-3">
        <StatCard label="Waiting Approval" value="03" hint="Visitors waiting at the gate" />
        <StatCard label="Checked In" value="14" hint="Currently inside the premises" />
        <StatCard label="Staff Entries" value="11" hint="Daily help and service staff today" />
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white/85 p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Guard workflow</h2>
        <ol className="mt-4 space-y-3 text-slate-700">
          <li>1. Search resident or visitor pass</li>
          <li>2. Confirm approval status</li>
          <li>3. Mark check-in with timestamp</li>
          <li>4. Mark checkout when the visitor leaves</li>
        </ol>
      </section>
    </DashboardShell>
  );
}
