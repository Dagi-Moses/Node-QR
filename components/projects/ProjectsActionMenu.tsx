import { MoreVertical } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { DeleteModal } from "../delete-modal";





type Props = {
    projectId: string;
    projectName: string;
    onDelete: () => Promise<void>;
};

export function ProjectActionsMenu({
    projectId,
    projectName,
    onDelete,
}: Props) {
    const [open, setOpen] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // close on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <>
            <div ref={ref} className="relative inline-block">
                {/* trigger */}
                <button
                    onClick={() => setOpen((v) => !v)}
                    className="p-2 rounded-md hover:bg-muted"
                    aria-label="QR actions"
                >
                    <MoreVertical size={20} />
                </button>

                {/* dropdown */}
                {open && (
                    <div className="absolute right-0  min-w-20 rounded-md bg-white shadow-lg border z-50">
                        <button
                            className="w-full px-3 py-2 text-sm text-left hover:bg-gray-100"
                            onClick={() => {

                                try {
                                    setOpen(false);
                                    router.push(`/dashboard/projects/${projectId}/edit`);
                                } catch (error) {
                                    console.log("edit error: ", error)
                                }

                            }}
                        >
                            Edit
                        </button>

                        <button
                            className="w-full px-3 py-2 text-sm text-left text-red-600 hover:bg-gray-100"
                            onClick={() => {
                                setOpen(false);
                                setShowDelete(true);
                            }}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>


            {
                showDelete && (

                    <DeleteModal
                        title="Project"
                        description="All QR codes and analytics under"
                        projectName={projectName}

                        onConfirm={onDelete}
                        onClose={() => setShowDelete(false)}
                    />

                    // <DeleteProjectModal
                    //     projectId={projectId}
                    //     projectName={projectName}
                    //     onClose={() => setShowDelete(false)}
                    //     onConfirm={
                    //         onDelete



                    //     }
                    // />
                )
            }
        </>
    );
}
