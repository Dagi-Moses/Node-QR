"use client";

import EmptyState from "@/components/empty-state";
import { Spinner } from "@/components/spinner";
import { ProjectStatus } from "@/lib/types";
import { useAuth } from "@clerk/nextjs";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";



type Project = {
    name: string;
    description: string;
    status: ProjectStatus;
};

export default function EditProjectPage() {
    const { projectId } = useParams();
    const router = useRouter();

    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [notFound, setNotFound] = useState(false);

    const { getToken } = useAuth();
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/${projectId}`;

    useEffect(() => {
        async function fetchProject() {
            try {
                const token = await getToken();
                const res = await fetch(url,

                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );

                if (res.status === 404) {
                    setNotFound(true);
                    return;
                }

                if (!res.ok) throw new Error();

                const data = await res.json();
                setProject({
                    name: data.name,
                    description: data.description ?? "",
                    status: data.status,
                });
            } catch {
                toast.error("Failed to load project");
            } finally {
                setLoading(false);
            }
        }

        fetchProject();
    }, [projectId]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!project) return;

        try {
            setSaving(true);
            const token = await getToken();
            const res = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },

                body: JSON.stringify(project),
            });

            if (!res.ok) throw new Error();

            toast.success("Project updated");

            // TODO: if need be manually update the project list from the store after saving

            // updateProjectInList(updatedProject);



            router.back();
        } catch (e) {
            console.log("error: ", e);
            toast.error("Failed to update project");
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center text-muted-foreground">
                <Spinner />
            </div>
        );

    }

    if ((!project && !loading) || notFound) {
        return (

            <EmptyState
                title="Project not found"
                description="This project may have been deleted or you don’t have access."
                actionLabel="Back to projects"
                actionRoute="/dashboard/projects"
            />

        )
    }



    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-card rounded-xl shadow">
            <h1 className="text-xl font-semibold mb-6">Edit Project</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-muted-foreground">
                        Name
                    </label>
                    <input
                        type="text"
                        value={project?.name}
                        onChange={(e) => project && setProject({ ...project, name: e.target.value })}
                        className="px-3 py-2 border rounded-md"
                        placeholder="Project name"
                        required
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-muted-foreground">
                        Description
                    </label>
                    <textarea
                        value={project?.description}
                        onChange={(e) => project && setProject({ ...project, description: e.target.value })}
                        className="px-3 py-2 border rounded-md"
                        placeholder="Description"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-muted-foreground">
                        Status
                    </label>
                    <select
                        value={project?.status}
                        onChange={(e) =>
                            project && setProject({ ...project, status: e.target.value as ProjectStatus })
                        }

                        className="px-3 py-2 border rounded-md max-w-[100px] "
                    >
                        <option value="active">Active</option>
                        <option value="draft">Draft</option>
                        <option value="archived">Archived</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={saving}
                    className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                    {saving ? "Saving…" : "Save changes"}
                </button>
            </form>
        </div>
    );
}
