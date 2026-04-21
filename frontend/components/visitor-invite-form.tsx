"use client";

import { FormEvent, useState } from "react";

import { inviteVisitor } from "@/services/api";

export function VisitorInviteForm() {
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const result = await inviteVisitor({
        society_id: Number(formData.get("society_id")),
        unit_id: Number(formData.get("unit_id")),
        visitor_name: String(formData.get("visitor_name")),
        phone: String(formData.get("phone") || ""),
        purpose: String(formData.get("purpose") || ""),
        created_by_user_id: Number(formData.get("created_by_user_id") || 0) || undefined,
      });
      setMessage(`Success: visitor created with id ${result.visitor_id}`);
      form.reset();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      setMessage(`Error: ${errorMessage}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white/85 p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-slate-900">Invite A Visitor</h2>
        <p className="mt-1 text-sm text-slate-600">
          This form talks to your Flask backend. Seed demo data first, then use
          society `1`, unit `1`, and resident `1`.
        </p>
      </div>

      <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
        <label className="text-sm font-semibold text-slate-700">
          Society ID
          <input
            className="mt-1 w-full rounded-2xl border border-slate-300 px-4 py-3"
            defaultValue="1"
            name="society_id"
            required
            type="number"
          />
        </label>

        <label className="text-sm font-semibold text-slate-700">
          Unit ID
          <input
            className="mt-1 w-full rounded-2xl border border-slate-300 px-4 py-3"
            defaultValue="1"
            name="unit_id"
            required
            type="number"
          />
        </label>

        <label className="text-sm font-semibold text-slate-700">
          Visitor name
          <input
            className="mt-1 w-full rounded-2xl border border-slate-300 px-4 py-3"
            name="visitor_name"
            placeholder="Rahul Sharma"
            required
            type="text"
          />
        </label>

        <label className="text-sm font-semibold text-slate-700">
          Phone
          <input
            className="mt-1 w-full rounded-2xl border border-slate-300 px-4 py-3"
            name="phone"
            placeholder="9876543210"
            type="text"
          />
        </label>

        <label className="text-sm font-semibold text-slate-700">
          Purpose
          <input
            className="mt-1 w-full rounded-2xl border border-slate-300 px-4 py-3"
            name="purpose"
            placeholder="Delivery / Guest / Electrician"
            type="text"
          />
        </label>

        <label className="text-sm font-semibold text-slate-700">
          Created by user ID
          <input
            className="mt-1 w-full rounded-2xl border border-slate-300 px-4 py-3"
            defaultValue="1"
            name="created_by_user_id"
            type="number"
          />
        </label>

        <div className="md:col-span-2">
          <button
            className="rounded-full bg-brand-teal px-6 py-3 text-sm font-bold text-white transition hover:bg-teal-800 disabled:opacity-60"
            disabled={submitting}
            type="submit"
          >
            {submitting ? "Submitting..." : "Create Visitor Invite"}
          </button>
        </div>
      </form>

      {message ? <p className="mt-4 text-sm font-semibold text-slate-700">{message}</p> : null}
    </section>
  );
}
