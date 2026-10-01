import { adminUser, loadStudents, toCsv } from "@/lib/admin";

// /admin/export?day=YYYY-MM-DD: that session's students as a CSV, one row each. Admins only.
export async function GET(request: Request) {
  if (!(await adminUser())) return new Response("Not found", { status: 404 });
  const day = new URL(request.url).searchParams.get("day") ?? "";
  const students = (await loadStudents())?.filter((s) => s.day === day) ?? [];
  // BOM so Excel reads the curly quotes and accents correctly.
  return new Response("﻿" + toCsv(students), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="stellar-origins-${day.replace(/[^\d-]/g, "")}.csv"`,
    },
  });
}
