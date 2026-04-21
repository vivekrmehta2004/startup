const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:5000";

type VisitorInviteInput = {
  society_id: number;
  unit_id: number;
  visitor_name: string;
  phone?: string;
  purpose?: string;
  created_by_user_id?: number;
};

export async function fetchVisitors(societyId?: number) {
  const query = societyId ? `?society_id=${societyId}` : "";
  const response = await fetch(`${API_BASE_URL}/api/visitors${query}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Could not load visitors");
  }

  return response.json();
}

export async function inviteVisitor(input: VisitorInviteInput) {
  const response = await fetch(`${API_BASE_URL}/api/visitors/invite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Could not invite visitor");
  }

  return data;
}
