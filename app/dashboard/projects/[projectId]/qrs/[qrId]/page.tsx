"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
import { BsQrCode } from "react-icons/bs";
import { FiDownload, FiCopy, FiCheck, FiX } from "react-icons/fi";
import { Spinner } from "@/components/spinner";

export default function QrDetailPage() {
    const { projectId, qrId } = useParams<{ projectId: string; qrId: string }>();
    const router = useRouter();

    const [qr, setQr] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [status, setStatus] = useState<"active" | "disabled" | "draft">("active");

    const publicPageUrl = `${process.env.NEXT_PUBLIC_APP_URL}/qrs/${qrId}`;

    // Fetch QR
    useEffect(() => {
        if (!projectId || !qrId) return;

        async function fetchQR() {
            setLoading(true);
            try {
                const token = localStorage.getItem("token"); // auth
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/${projectId}/qrs/${qrId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!res.ok) throw new Error("Failed to fetch QR");
                const data = await res.json();
                setQr(data);
                setName(data.name);
                setUrl(data.payload?.url || "");
                setStatus(data.status);
            } catch (err: any) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        }

        fetchQR();
    }, [projectId, qrId]);

    const handleDownload = () => {
        const canvas = document.querySelector("canvas");
        if (!canvas) return;
        const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        const link = document.createElement("a");
        link.href = pngUrl;
        link.download = `${name || "qr"}.png`;
        link.click();
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(publicPageUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/${projectId}/qrs/${qrId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ name, payload: { url }, status }),
                }
            );

            if (!res.ok) throw new Error("Failed to update QR");
            alert("QR updated successfully!");
        } catch (err: any) {
            console.error(err);
            alert(err.message || "Failed to save changes");
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this QR?")) return;
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/${projectId}/qrs/${qrId}`,
                { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
            );
            if (!res.ok) throw new Error("Failed to delete QR");
            alert("QR deleted!");
            router.push(`/dashboard/projects/${projectId}`);
        } catch (err: any) {
            console.error(err);
            alert(err.message || "Failed to delete QR");
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center text-muted-foreground">
                <Spinner />
            </div>
        );

    }
    if (error) return <div className="flex h-screen items-center justify-center text-red-500">{error}</div>;
    if (!qr) return <div>No QR found</div>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg flex flex-col items-center gap-4">
                <h1 className="text-xl font-semibold">{name}</h1>

                <textarea
                    className="w-full p-2 border rounded"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter URL"
                />

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full p-2 border rounded"
                >
                    <option value="active">Active</option>
                    <option value="archived">Archived</option>
                    <option value="draft">Draft</option>
                </select>

                <div className="bg-white p-4 border rounded flex items-center justify-center w-full">
                    <QRCodeCanvas value={publicPageUrl} size={200} />
                </div>

                <div className="flex w-full gap-2">
                    <button
                        onClick={handleDownload}
                        className="flex-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Download
                    </button>
                    <button
                        onClick={handleCopy}
                        className="flex-1 bg-gray-200 p-2 rounded hover:bg-gray-300"
                    >
                        {copied ? "Copied!" : "Copy"}
                    </button>
                </div>

                <div className="flex w-full gap-2 mt-2">
                    <button
                        onClick={handleSave}
                        className="flex-1 bg-green-500 text-white p-2 rounded hover:bg-green-600"
                    >
                        Save
                    </button>
                    <button
                        onClick={handleDelete}
                        className="flex-1 bg-red-500 text-white p-2 rounded hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
