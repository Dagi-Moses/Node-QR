// app/components/projects/ProjectsGrid.tsx
"use client";

import React from "react";
import { Project } from "@/lib/types";
import ProjectCard from "./ProjectCard";

type Props = {
    projects: Project[];
    onOpen: (id: string) => void;

};

export default function ProjectsGrid({ projects, onOpen, }: Props) {


    if (!projects.length) {
        return (
            <div className="bg-muted p-8 rounded-xl text-center text-muted-foreground">
                📂  No projects yet. Create your first project to start generating QR codes.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
                <ProjectCard key={p.id} project={p} onOpen={onOpen} />
            ))}
        </div>
    );
}
