/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";


import { QRCode } from "@/lib/types";

import { Clock, QrCode } from "lucide-react";
import { QRActionsMenu } from "./QrActionsMenu";
import { useAuth } from "@clerk/nextjs";
import { useQrsStore } from "@/src/store/qrs.store";
import toast from "react-hot-toast";
import { CopyQrButton } from "../copy-button";
import { useRouter } from "next/navigation";





type Props = {
    qr: QRCode;

};


export default function QRCard({ qr }: Props) {

    const { id, name, status, createdAt, payload, type, projectId } = qr;

    // const qrs = useQrsStore((s) => s.qrs[projectId] || []);
    ///   const { setQrs,  } = useQrsStore();
    // const { setQrs, addQr, updateQr, deleteQr } = useQrsStore();
    // const setQrsStore = useQrsStore((s) => s.setQrs);

    // const addQrToProject = useQrsStore((s) => s.addQr);
    // const updateQrInProject = useQrsStore((s) => s.updateQr);
    const deleteQrFromProject = useQrsStore((s) => s.deleteQr);

    const statusLabel = {
        active: { label: "Active", color: "bg-primary text-primary-foreground" },

        disabled: { label: "Disabled", color: "bg-muted text-muted-foreground" },
    }[status];


    const { getToken } = useAuth();
    const router = useRouter();
    const handleDelete = async () => {


        try {

            const token = await getToken();
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/${projectId}/qrs/${id}`,
                { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
            );
            if (!res.ok) throw new Error("Failed to delete QR");
            // deleteProject(project.id);

            deleteQrFromProject(projectId, id);
            toast.success("QR deleted!",);


        } catch (err: any) {
            console.error(err);
            toast.error(err?.message ?? "Failed to delete QR");

        }
    };


    return (
        <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex flex-col justify-between h-full">
            <div>
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-semibold text-foreground" title="Name">{name}</h3>
                        {/* <p className="text-muted-foreground mt-1 text-sm" title="Domain">{payload?.url && new URL(payload.url).hostname}
                        </p> */}
                        <p className="mt-1 text-sm">
                            {payload && typeof payload === "object" && "url" in payload && typeof (payload as any).url === "string" && (
                                <a
                                    href={(payload as any).url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={(payload as any).url}
                                    className="text-blue-600 underline italic truncate block max-w-full"
                                    style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}
                                >
                                    {new URL((payload as any).url).hostname}
                                </a>
                            )}
                        </p>

                    </div>

                    <div className={`text-xs px-2 py-1 rounded ${statusLabel.color} font-medium`} title="Status">
                        {statusLabel.label}
                    </div>
                </div>

                <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2 " title="QR Type">
                        <QrCode className="w-4 h-4" />
                        <span>{type}</span>
                    </div>

                    <div className="flex items-center gap-2 " title="Date Created">
                        <Clock className="w-4 h-4" />
                        <span>
                            {createdAt ? new Date(createdAt).toLocaleDateString() : "..."}
                        </span>
                    </div>
                </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-2">

                <div className="flex gap-2">


                    <button
                        onClick={() => router.push(`/dashboard/projects/${projectId}/qrs/${id}`)}
                        className="px-3 py-2 rounded-md border border-border text-sm bg-muted text-muted-foreground hover:bg-muted/90"
                    >
                        View
                    </button>

                    <CopyQrButton qrId={id} />
                </div>

                <div className="flex items-center gap-2">
                    < QRActionsMenu qrName={name} onDelete={handleDelete} />

                </div>
            </div>
        </div>
    );
}






// export function QR({
//     qr,

//     onOpen,
// }: Props) {
//     const statusLabel = {
//         active: { label: "Active", color: "bg-primary text-primary-foreground" },
//         disabled: { label: "Paused", color: "bg-muted text-muted-foreground" },

//     }[qr.status];

//     return (
//         <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex items-center justify-between gap-4 hover:bg-muted/30 transition">
//             {/* Left */}
//             <div className="min-w-0">
//                 <div className="flex items-center gap-2 mb-1">
//                     <h3 className="text-sm font-semibold truncate">
//                         {qr.name || "Untitled QR"}
//                     </h3>

//                     <span className={`text-xs px-2 py-0.5 rounded ${statusLabel.color}`}>
//                         {statusLabel.label}
//                     </span>
//                 </div>

//                 <div className="flex items-center gap-3 text-xs text-muted-foreground">
//                     <div className="flex items-center gap-1">
//                         <LinkIcon className="w-3.5 h-3.5" />
//                         <span>{qr.type}</span>
//                     </div>

//                     <div className="flex items-center gap-1">
//                         <BarChart3 className="w-3.5 h-3.5" />
//                         <span>{"scanCount"} scans</span>
//                     </div>

//                     <div className="flex items-center gap-1">
//                         <Clock className="w-3.5 h-3.5" />
//                         <span>

//                             lastScanAt
//                             {/* {lastScanAt
//                                 ? new Date(lastScanAt).toLocaleDateString()
//                                 : "Never scanned"} */}
//                         </span>
//                     </div>
//                 </div>
//             </div>

//             {/* Right */}
//             <div className="flex items-center gap-2">
//                 <button
//                     onClick={() => onOpen(qr.id)}
//                     className="px-3 py-2 rounded-md border border-border text-xs bg-muted hover:bg-muted/80"
//                 >
//                     View
//                 </button>

//                 <QRActionsMenu />
//             </div>
//         </div>
//     );
// }
