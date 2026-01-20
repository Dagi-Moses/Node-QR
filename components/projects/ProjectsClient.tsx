/* eslint-disable @typescript-eslint/no-explicit-any */
// app/components/projects/ProjectsClient.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Project } from "@/lib/types";
import ProjectsGrid from "./ProjectsGrid";
import CreateProjectModal from "./CreateProjectModal";

import { Search } from "lucide-react";
import { useAuth } from "@clerk/nextjs";

import { useProjectsStore } from "@/src/store/projects.store";
import { Spinner } from "../spinner";


export default function ProjectsClient() {
    const { projects, setProjects } = useProjectsStore();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<"all" | Project["status"]>("all");
    const [openCreate, setOpenCreate] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const { getToken } = useAuth();


    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects`;

    useEffect(() => {
        async function fetchProjects() {
            try {
                setLoading(true);
                const token = await getToken();
                const res = await fetch(url,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }
                    });
                if (!res.ok) throw new Error("Failed to fetch projects");
                const data: Project[] = await res.json();
                setProjects(data);
            } catch (err: unknown) {
                console.error(err);
                if (err instanceof Error) {
                    setError(err.message);
                } else if (typeof err === "string") {
                    setError(err);
                } else {
                    setError("An error occurred");
                }
            } finally {
                setLoading(false);
            }
        }

        fetchProjects();
    }, []);




    const filtered = useMemo(() => {
        return projects.filter((p) => {
            if (statusFilter !== "all" && p.status !== statusFilter) return false;
            if (query.trim() === "") return true;
            const q = query.toLowerCase();
            return p.name.toLowerCase().includes(q) || (p.description || "").toLowerCase().includes(q);
        });
    }, [projects, query, statusFilter]);






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
            <ProjectsGrid projects={filtered} />

            <div className="flex flex-col items-center justify-center my-6">


                {loading &&
                    <Spinner />
                }
                {error && <p className="text-red-500">{error}</p>}
            </div>
            {/* create modal */}
            <CreateProjectModal open={openCreate} onClose={() => setOpenCreate(false)} />
        </div>
    );
}
