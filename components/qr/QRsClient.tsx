/* eslint-disable @typescript-eslint/no-explicit-any */
// app/components/projects/ProjectsClient.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Project, QRCode } from "@/lib/types";


import { Search } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import QRsGrid from "./QrGrid";
import CreateQRModal from "./CreateQrModal";


export default function QRsClient() {


    const router = useRouter();

    const { projectId } = useParams<{ projectId: string }>();

    const [qrs, setQrs] = useState<QRCode[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [openCreate, setOpenCreate] = useState(false);
    const { getToken } = useAuth();


    const [query, setQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<"all" | Project["status"]>("all");

    const [selectedId, setSelectedId] = useState<string | null>(null);


    useEffect(() => {

        console.log("project id ", projectId);
        if (!projectId) return;

        const fetchQrs = async () => {
            try {
                const token = await getToken();
                const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/${projectId}/qrs`;
                setLoading(true);

                const res = await fetch(
                    url,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );

                if (!res.ok) throw new Error("Failed to fetch QRs");

                const data: QRCode[] = await res.json();
                setQrs(data);
            } catch {
                setError("Unable to load project QRs");
            } finally {
                setLoading(false);
            }
        };

        fetchQrs();
    }, [projectId]);






    const filtered = useMemo(() => {
        return qrs.filter((p) => {
            if (statusFilter !== "all" && p.status !== statusFilter) return false;
            if (query.trim() === "") return true;
            const q = query.toLowerCase();
            return p.name.toLowerCase().includes(q);
        });
    }, [qrs, query, statusFilter]);

    const handleCreate = (p: QRCode) => {
        setQrs((prev) => [p, ...prev]);
    };



    const handleOpen = (id: string) => {
        setSelectedId(id);
        router.push(`/dashboard/projects/${projectId}/qrs/${id}`);

    };


    return (
        <div>


            {/* header row */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-foreground">QR Codes</h2>
                    <p className="text-muted-foreground mt-1">Manage your QR codes.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search QR"
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
                        <option value="disabled">Disabled</option>

                    </select>

                    <button
                        onClick={() => setOpenCreate(true)}
                        className="px-4 py-2 rounded bg-primary text-primary-foreground font-medium"
                    >
                        New QR
                    </button>
                </div>
            </div>

            {/* grid */}
            <QRsGrid qrs={filtered} onOpen={handleOpen} />

            <div className="flex flex-col items-center justify-center my-6">
                {loading && <p>Loading QR Code s...</p>}
                {error && <p className="text-red-500">{error}</p>}
            </div>
            {/* create modal */}
            <CreateQRModal
                open={openCreate}
                onClose={() => setOpenCreate(false)}
                projectId={projectId}            // onCreate={handleCreate}
            />
        </div>
    );
}
