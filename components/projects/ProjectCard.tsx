/* eslint-disable @typescript-eslint/no-explicit-any */
// app/components/projects/ProjectCard.tsx
"use client";

import { Project } from "@/lib/types";
import { Clock, List } from "lucide-react";
import { ProjectActionsMenu } from "./ProjectsActionMenu";
import { useAuth } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useProjectsStore } from "@/src/store/projects.store";



type Props = {
    project: Project;

};





export default function ProjectCard({ project, }: Props) {
    const { id, name, description, qrCount, status, createdAt } = project;
    const { deleteProject } = useProjectsStore();
    const { getToken } = useAuth();
    const router = useRouter();

    const handleDelete = async () => {


        try {

            const token = await getToken();
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/${id}`,
                { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
            );
            if (!res.ok) throw new Error("Failed to delete Project");
            deleteProject(project.id);
            toast.success("Project deleted!",);


        } catch (err: any) {
            console.error(err);
            toast.error(err?.message ?? "Failed to delete project");

        }
    };



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
                            {createdAt ? new Date(createdAt).toLocaleDateString() : "..."}
                        </span>
                    </div>
                </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-2">
                <button
                    onClick={


                        () => router.push(`/dashboard/projects/${id}`)
                    }
                    className="px-3 py-2 rounded-md border border-border text-sm bg-muted text-muted-foreground hover:bg-muted/90"
                >
                    Open
                </button>

                <div className="flex items-center gap-2">
                    <ProjectActionsMenu
                        projectId={project.id}
                        projectName={project.name}
                        onDelete={handleDelete}
                    />


                </div>
            </div>
        </div>
    );
}

