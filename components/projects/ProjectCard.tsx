// app/components/projects/ProjectCard.tsx
"use client";

import React from "react";
import { Project } from "@/lib/types";
import { Clock, Archive, Zap, List } from "lucide-react";

type Props = {
    project: Project;
    onOpen: (id: string) => void;
};

export default function ProjectCard({ project, onOpen }: Props) {
    const { id, name, description, qrCount, status, lastScanAt } = project;

    const statusLabel = {
        active: { label: "Active", color: "bg-primary text-primary-foreground" },
        archived: { label: "Archived", color: "bg-muted text-muted-foreground" },
        draft: { label: "Draft", color: "bg-muted text-muted-foreground" },
    }[status];

    return (
        <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex flex-col justify-between h-full">
            <div>
                <div className="flex items-start justify-between gap-4">
                    <div> 
                        <h3 className="text-lg font-semibold text-foreground">{name}</h3>
                        <p className="text-muted-foreground mt-1 text-sm">{description}</p>
                    </div>

                    <div className={`text-xs px-2 py-1 rounded ${statusLabel.color} font-medium`}>
                        {statusLabel.label}
                    </div>
                </div>

                <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <List className="w-4 h-4" />
                        <span>{qrCount} QR</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>
                            {lastScanAt ? new Date(lastScanAt).toLocaleDateString() : "No scans yet"}
                        </span>
                    </div>
                </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-2">
                <button
                    onClick={() => onOpen(id)}
                    className="px-3 py-2 rounded-md border border-border text-sm bg-muted text-muted-foreground hover:bg-muted/90"
                >
                    Open
                </button>

                <div className="flex items-center gap-2">
                    <button className="px-3 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
                        Manage QRs
                    </button>
                    <button className="px-3 py-2 rounded-md border border-border text-sm hover:bg-muted">
                        Export
                    </button>
                </div>
            </div>
        </div>
    );
}
