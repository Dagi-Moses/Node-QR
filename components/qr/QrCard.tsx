"use client";


import { QRCode } from "@/lib/types";
import { QRActionsMenu } from "./QrActionsMenu";
import { BarChart3, Clock, LinkIcon, List } from "lucide-react";


type Props = {
    qr: QRCode;

    onOpen: (id: string) => void;
};


export default function QRCard({ qr, onOpen }: Props) {
    const { id, name, status, createdAt, payload } = qr;

    const statusLabel = {
        active: { label: "Active", color: "bg-primary text-primary-foreground" },

        disabled: { label: "Disabled", color: "bg-muted text-muted-foreground" },
    }[status];

    return (
        <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex flex-col justify-between h-full">
            <div>
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-semibold text-foreground">{name}</h3>
                        <p className="text-muted-foreground mt-1 text-sm">{payload.url}</p>
                    </div>

                    <div className={`text-xs px-2 py-1 rounded ${statusLabel.color} font-medium`}>
                        {statusLabel.label}
                    </div>
                </div>

                <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <List className="w-4 h-4" />
                        {/* <span>{qrCount} QR</span> */}
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
                    onClick={() => onOpen(id)}
                    className="px-3 py-2 rounded-md border border-border text-sm bg-muted text-muted-foreground hover:bg-muted/90"
                >
                    View
                </button>

                <div className="flex items-center gap-2">
                    < QRActionsMenu />

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
