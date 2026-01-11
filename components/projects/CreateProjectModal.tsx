// app/components/projects/CreateProjectModal.tsx
"use client";

import React, { useState } from "react";
import { Project } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";

type Props = {
    open: boolean;
    onClose: () => void;
    onCreate: (p: Project) => void;
};

export default function CreateProjectModal({ open, onClose, onCreate }: Props) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    if (!open) return null;

    const handleCreate = () => {
        if (!name.trim()) return;
        const newProject: Project = {
            id: `proj_${uuidv4().slice(0, 8)}`,
            name: name.trim(),
            description: description.trim(),
            createdAt: new Date().toISOString(),
            status: "draft",
            qrCount: 0,
            owner: "You",
            lastScanAt: null,
        };
        onCreate(newProject);
        setName("");
        setDescription("");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />
            <div className="bg-card border border-border rounded-xl p-6 z-10 w-full max-w-xl">
                <h3 className="text-lg font-semibold text-foreground">Create project</h3>
                <p className="text-muted-foreground text-sm mt-1">Group related QR codes and settings.</p>

                <div className="mt-4 grid gap-3">
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Project name"
                        className="bg-background border border-border rounded px-3 py-2 text-foreground"
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Short description (optional)"
                        className="bg-background border border-border rounded px-3 py-2 text-foreground h-24"
                    />
                    <div className="flex justify-end gap-3">
                        <button onClick={onClose} className="px-4 py-2 rounded border border-border">
                            Cancel
                        </button>
                        <button onClick={handleCreate} className="px-4 py-2 rounded bg-primary text-primary-foreground">
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
