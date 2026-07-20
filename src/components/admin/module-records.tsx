"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, Loader2, X } from "lucide-react";

type Row = Record<string, unknown> & { _id: string };

export function ModuleRecords({
  moduleSlug,
  table,
  initialRows,
}: {
  moduleSlug: string;
  table: string;
  initialRows: Row[];
}) {
  const router = useRouter();
  const [editing, setEditing] = useState<Row | "new" | null>(null);
  const [draft, setDraft] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const columns =
    initialRows.length > 0 ? Object.keys(initialRows[0]).filter((k) => k !== "_id").slice(0, 7) : [];

  function openNew() {
    setEditing("new");
    setDraft(
      columns.length > 0
        ? JSON.stringify(Object.fromEntries(columns.map((c) => [c, ""])), null, 2)
        : JSON.stringify({ field_name: "value" }, null, 2)
    );
    setError(null);
  }

  function openEdit(row: Row) {
    const { _id, ...rest } = row;
    setEditing(row);
    setDraft(JSON.stringify(rest, null, 2));
    setError(null);
  }

  async function save() {
    setError(null);
    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(draft);
    } catch {
      setError("That isn't valid JSON — check for missing commas or quotes.");
      return;
    }

    setSaving(true);
    const res =
      editing === "new"
        ? await fetch(`/api/admin/${moduleSlug}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(parsed),
          })
        : await fetch(`/api/admin/${moduleSlug}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: (editing as Row)._id, data: parsed }),
          });
    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.error ?? "Save failed.");
      return;
    }

    setEditing(null);
    router.refresh();
  }

  async function remove(row: Row) {
    if (!confirm("Delete this record? This can't be undone.")) return;
    await fetch(`/api/admin/${moduleSlug}?id=${row._id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          onClick={openNew}
          className="flex items-center gap-1.5 rounded-lg bg-red px-4 py-2 text-sm font-semibold text-white hover:bg-red-dark"
        >
          <Plus className="h-4 w-4" /> Add Record
        </button>
      </div>

      {initialRows.length === 0 ? (
        <div className="rounded-xl border border-dashed border-silver bg-white p-10 text-center text-sm text-grey-medium">
          No records yet in <strong>{table}</strong>. Click <strong>Add Record</strong> above to create the first
          one.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-grey-light bg-white">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-grey-light bg-grey-light/60">
              <tr>
                {columns.map((col) => (
                  <th key={col} className="px-4 py-3 font-semibold text-navy-dark">
                    {col}
                  </th>
                ))}
                <th className="px-4 py-3 text-right font-semibold text-navy-dark">Actions</th>
              </tr>
            </thead>
            <tbody>
              {initialRows.map((row) => (
                <tr key={row._id} className="border-b border-grey-light last:border-0">
                  {columns.map((col) => (
                    <td key={col} className="max-w-[220px] truncate px-4 py-3 text-grey-medium">
                      {typeof row[col] === "object" ? JSON.stringify(row[col]) : String(row[col] ?? "—")}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEdit(row)}
                        className="rounded p-1.5 text-grey-medium hover:bg-grey-light hover:text-navy-dark"
                        aria-label="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => remove(row)}
                        className="rounded p-1.5 text-red hover:bg-red/10"
                        aria-label="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading text-lg font-bold text-navy-dark">
                {editing === "new" ? "Add Record" : "Edit Record"}
              </h2>
              <button
                onClick={() => setEditing(null)}
                className="rounded p-1 text-grey-medium hover:bg-grey-light"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mb-2 text-xs text-grey-medium">
              Editing as JSON — field names should match the columns shown in the table.
            </p>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={12}
              spellCheck={false}
              className="w-full rounded-lg border border-grey-light p-3 font-mono text-xs text-navy-dark focus:border-navy focus:outline-none"
            />
            {error && <p className="mt-2 text-sm font-medium text-red">{error}</p>}
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setEditing(null)}
                className="rounded-lg px-4 py-2 text-sm font-medium text-grey-medium"
              >
                Cancel
              </button>
              <button
                onClick={save}
                disabled={saving}
                className="flex items-center gap-1.5 rounded-lg bg-red px-4 py-2 text-sm font-semibold text-white hover:bg-red-dark disabled:opacity-60"
              >
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}