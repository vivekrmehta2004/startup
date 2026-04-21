import { DashboardShell } from "@/components/dashboard-shell";
import { StatCard } from "@/components/stat-card";
import { VisitorInviteForm } from "@/components/visitor-invite-form";

export default function ResidentDashboardPage() {
  return (
    <DashboardShell
      title="Resident Dashboard"
      description="A resident can invite visitors, track complaints, and view society notices."
    >
      <section className="grid gap-4 md:grid-cols-3">
        <StatCard label="Visitors Today" value="08" hint="Guests, delivery, and service visits" />
        <StatCard label="Open Complaints" value="02" hint="Water leakage and lift check" />
        <StatCard label="Pending Bills" value="01" hint="Maintenance invoice for April" />
      </section>
      <VisitorInviteForm />
    </DashboardShell>
  );
}
