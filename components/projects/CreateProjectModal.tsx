// app/components/projects/CreateProjectModal.tsx
"use client";

import React, { useState } from "react";
import { Project } from "@/lib/types";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";
import { useProjectsStore } from "@/src/store/projects.store";


type Props = {
    open: boolean;
    onClose: () => void;

};

export default function CreateProjectModal({ open, onClose, }: Props) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const projects = useProjectsStore();
    const { getToken } = useAuth();
    if (!open) return null;

    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects`;

    const handleCreate = async () => {
        if (!name.trim()) {
            toast.error("Project name is required");
            return;
        }

        setLoading(true);

        try {
            const token = await getToken();
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name: name.trim(), description: description.trim() }),
            });

            if (!res.ok) throw new Error("Failed to create project");

            const data: Project = await res.json();
            projects.addProject(data);
            toast.success("Project created!");
            setName("");
            setDescription("");
            onClose();
        } catch (err: any) {
            toast.error(err.message || "Failed to create project");
        } finally {
            setLoading(false);
        }
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
                        disabled={loading}
                        className="bg-background border border-border rounded px-3 py-2 text-foreground"
                    />
                    <textarea
                        value={description}
                        disabled={loading}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Short description (optional)"
                        className="bg-background border border-border rounded px-3 py-2 text-foreground h-24"
                    />
                    <div className="flex justify-end gap-3">
                        <button disabled={loading} onClick={onClose} className="px-4 py-2 rounded border border-border">
                            Cancel
                        </button>
                        <button disabled={loading} onClick={handleCreate} className="px-4 py-2 rounded bg-primary text-primary-foreground">
                            {loading ? "Creating..." : "Create"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
