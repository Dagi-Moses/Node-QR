"use client"

import { useState } from "react";

type DeleteModalProps = {
    // Optional text overrides
    title?: string; // e.g. "Delete project" or "Delete QR Code"
    description?: string; // e.g. "All QR codes under ..." or custom text
    projectName: string; // e.g. "Delete"

   
    onClose: () => void;
    onConfirm: () => Promise<void>;
};

export function DeleteModal({
    title = "item",
    description = "All QR codes and analytics under",
    projectName ,
    onClose,
    onConfirm,
}: DeleteModalProps) {
    const [value, setValue] = useState("");


    const isMatch = value === projectName;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg">
                <h2 className="text-lg font-semibold text-red-600">Delete {title}</h2>


                <p className="mt-2 text-sm text-muted-foreground">
                                    This action is irreversible. {description}{" "}
                               <span className="font-medium text-foreground">
                                       {projectName}
                                    </span>{" "}
                                    will be permanently deleted.
                                </p>


                <p className="mt-4 text-sm">
                    Type <span className="font-semibold">{projectName}</span> to confirm.
                </p>

                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="mt-2 w-full rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder={projectName}
                />

                <div className="mt-6 flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-3 py-2 rounded-md border border-border text-sm"
                    >
                        Cancel
                    </button>

                    <button
                        disabled={!isMatch}
                        onClick={async () => {
                            await onConfirm();
                            onClose();
                        }}
                        className="px-3 py-2 rounded-md text-sm bg-red-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}




// "use client"


// import { useState } from "react";

// type Props = {
    
//     projectId: string;
//     projectName: string;
//     onClose: () => void;
//     onConfirm: (id: string) => Promise<void>;
// };

// export function DeleteProjectModal({
//     projectId,
//     projectName,
//     onClose,
//     onConfirm,
// }: Props) {
//     const [value, setValue] = useState("");
//     const isMatch = value === projectName;

//     return (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
//             <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg">
//                 <h2 className="text-lg font-semibold text-red-600">
//                     Delete project
//                 </h2>

//                 <p className="mt-2 text-sm text-muted-foreground">
//                     This action is irreversible. All QR codes and analytics under{" "}
//                     <span className="font-medium text-foreground">
//                         {projectName}
//                     </span>{" "}
//                     will be permanently deleted.
//                 </p>

//                 <p className="mt-4 text-sm">
//                     Type <span className="font-semibold">{projectName}</span> to confirm.
//                 </p>

//                 <input
//                     value={value}
//                     onChange={(e) => setValue(e.target.value)}
//                     className="mt-2 w-full rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
//                     placeholder="Project name"
//                 />

//                 <div className="mt-6 flex justify-end gap-2">
//                     <button
//                         onClick={onClose}
//                         className="px-3 py-2 rounded-md border border-border text-sm"
//                     >
//                         Cancel
//                     </button>

//                     <button
//                         disabled={!isMatch}
//                         onClick={async () => {
//                             await onConfirm(projectId);
//                             onClose();
//                         }}
//                         className="px-3 py-2 rounded-md text-sm bg-red-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                         Delete
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }








