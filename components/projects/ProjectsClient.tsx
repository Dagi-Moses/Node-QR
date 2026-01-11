// app/components/projects/ProjectsClient.tsx
"use client";

import React, { useMemo, useState } from "react";
import { Project } from "@/lib/types";
import ProjectsGrid from "./ProjectsGrid";
import CreateProjectModal from "./CreateProjectModal";
import { sampleProjects } from "@/lib/mock-projects";
import { Search } from "lucide-react";

export default function ProjectsClient() {
    // replace sampleProjects with real fetch when you add an API
    const [projects, setProjects] = useState<Project[]>(sampleProjects);
    const [query, setQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<"all" | Project["status"]>("all");
    const [openCreate, setOpenCreate] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const filtered = useMemo(() => {
        return projects.filter((p) => {
            if (statusFilter !== "all" && p.status !== statusFilter) return false;
            if (query.trim() === "") return true;
            const q = query.toLowerCase();
            return p.name.toLowerCase().includes(q) || (p.description || "").toLowerCase().includes(q);
        });
    }, [projects, query, statusFilter]);

    const handleCreate = (p: Project) => {
        setProjects((prev) => [p, ...prev]);
    };

    const handleOpen = (id: string) => {
        setSelectedId(id);
        // navigation to project detail would happen here, e.g. router.push(`/dashboard/projects/${id}`)
        // for now just console
        console.log("Open project", id);
    };

    return (
        <div>
            {/* header row */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-foreground">Projects</h2>
                    <p className="text-muted-foreground mt-1">Manage project groups that contain your QR codes.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search projects"
                            className="pl-10 pr-3 py-2 rounded-lg border border-border bg-background text-foreground"
                        />
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as any)}
                        className="px-3 py-2 rounded border border-border bg-background text-foreground"
                    >
                        <option value="all">All</option>
                        <option value="active">Active</option>
                        <option value="draft">Draft</option>
                        <option value="archived">Archived</option>
                    </select>

                    <button
                        onClick={() => setOpenCreate(true)}
                        className="px-4 py-2 rounded bg-primary text-primary-foreground font-medium"
                    >
                        New Project
                    </button>
                </div>
            </div>

            {/* grid */}
            <ProjectsGrid projects={filtered} onOpen={handleOpen} />

            {/* create modal */}
            <CreateProjectModal open={openCreate} onClose={() => setOpenCreate(false)} onCreate={handleCreate} />
        </div>
    );
}
