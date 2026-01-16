import { MoreVertical } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function QRActionsMenu() {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

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
                        className="w-full px-3 py-2 text-sm text-left text-red-600 hover:bg-gray-100"
                        onClick={() => {
                            setOpen(false);
                            // delete action
                        }}
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}
