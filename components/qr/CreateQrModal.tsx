"use client";

import { useState } from "react";

export default function CreateQRModal({
  open,
  projectId,
  onClose,
}: {
  open: boolean;
  projectId: string;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="bg-card rounded-xl p-6 z-10 w-full max-w-md">
        <h3 className="text-lg font-semibold">Create QR</h3>

        <div className="mt-4 space-y-3">
          <input
            placeholder="QR name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full border border-border rounded px-3 py-2"
          />
          <input
            placeholder="URL or text"
            value={value}
            onChange={e => setValue(e.target.value)}
            className="w-full border border-border rounded px-3 py-2"
          />

          <div className="flex justify-end gap-3">
            <button onClick={onClose}>Cancel</button>
            <button className="bg-primary px-4 py-2 rounded text-primary-foreground">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
