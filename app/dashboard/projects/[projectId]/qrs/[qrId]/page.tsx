"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
import { FiDownload, FiCopy, FiCheck } from "react-icons/fi";
import { Spinner } from "@/components/spinner";
import { useAuth } from "@clerk/nextjs";
import { QRStatus } from "@/lib/types";

export default function QrDetailPage() {
    const { projectId, qrId } = useParams<{ projectId: string; qrId: string }>();
    const router = useRouter();
    const { getToken } = useAuth();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [status, setStatus] = useState<QRStatus>("active");

    const publicPageUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/qrs/${qrId}`;

    useEffect(() => {
        if (!projectId || !qrId) return;

        (async () => {
            try {
                const token = await getToken();
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/${projectId}/qrs/${qrId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                if (!res.ok) throw new Error("Failed to fetch QR");

                const data = await res.json();
                setName(data.name);
                setUrl(data.payload?.url || "");
                setStatus(data.status);
            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        })();
    }, [projectId, qrId]);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(publicPageUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const canvas = document.querySelector("canvas");
        if (!canvas) return;

        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = `${name || "qr"}.png`;
        link.click();
    };


    const handleSave = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/${projectId}/qrs/${qrId}`,
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

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Spinner />
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 text-center mt-10">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-3">
            <div className="mx-auto max-w-6xl flex flex-col lg:flex-row justify-between gap-8">

                {/* LEFT – FORM */}
                <div className="flex-2 space-y-6">
                    <h2 className="text-xl font-semibold">
                        Edit content on your QR code
                    </h2>

                    {/* Website Info */}
                    <section className="bg-white rounded-xl border p-5 space-y-3">
                        <h3 className="font-medium">Website Information *</h3>
                        <p className="text-sm text-muted-foreground">
                            Input the URL this QR will redirect to.
                        </p>

                        <input
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://example.com"
                            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </section>

                    {/* Name */}
                    <section className="bg-white rounded-xl border p-5 space-y-3">
                        <h3 className="font-medium">Name of the QR Code *</h3>

                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="My QR Code"
                            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </section>
                    <section className="bg-white rounded-xl border p-5 space-y-3">
                        <h3 className="font-medium">QR Code Status</h3>
                        <select
                            value={status}
                            onChange={(e) =>
                                setStatus(e.target.value as QRStatus)
                            }
                            className="px-3 py-2 border rounded-md max-w-[100px] "
                        >
                            <option value="active">Active</option>
                            <option value="disabled">Disabled</option>

                        </select>

                    </section>

                    <div className="flex w-full gap-2 mt-2">
                        <button
                            onClick={() => console.log("saved")}
                            className="flex-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => console.log("deleted")}
                            className="flex-1 bg-red-500 text-white p-2 rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                </div>


                {/* URL – PHONE PREVIEW */}

                <div className=" w-[300px] h-[600px] rounded-[40px] border bg-white shadow-lg overflow-hidden" title="URL Preview">
                    <div className="h-14 bg-orange-400 flex items-center px-4">
                        <div className="bg-white/80 rounded-full px-3 py-1 text-xs truncate w-full">
                            {url || "https://example.com"}
                        </div>
                    </div>

                    {url ? (
                        <iframe
                            src="https://dagi-moses.web.app/"
                            className="w-full h-full border-none"
                            sandbox="allow-scripts allow-same-origin allow-forms"
                            aria-label="Preview"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                            Enter a URL to preview
                        </div>
                    )}
                </div>


                {/* RIGHT QR – PHONE PREVIEW */}

                <div className="flex justify-center" title="QR Link">

                    <div className="w-[300px] h-[600px] rounded-[40px] border bg-white shadow-lg overflow-hidden flex flex-col">
                        {/* Fake browser bar */}
                        <div className="h-14 bg-orange-400 flex items-center px-4 shrink-0">
                            <div className="bg-white/80 rounded-full px-3 py-1 text-xs truncate w-full">
                                {publicPageUrl || "https://example.com"}
                            </div>
                        </div>

                        {/* Body */}
                        <div className="flex flex-1 flex-col justify-between p-6">
                            {/* Center QR */}
                            <div className="flex flex-1 items-center justify-center">
                                <QRCodeCanvas value={publicPageUrl} size={180} />
                            </div>

                            {/* Bottom actions */}
                            <div className="flex gap-2">
                                <button
                                    onClick={handleDownload}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                >
                                    <FiDownload className="w-4" />
                                    Download
                                </button>



                                <button
                                    onClick={handleCopy}
                                    className="flex-1 flex items-center justify-center gap-2 bg-gray-100 rounded-lg py-2 hover:bg-gray-200"
                                >
                                    {copied ? <FiCheck className="text-green-500" /> : <FiCopy />}
                                    {copied ? "Copied" : "Copy Link"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}





// "use client";

// import { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { QRCodeCanvas } from "qrcode.react";
// import { BsQrCode } from "react-icons/bs";
// import { FiDownload, FiCopy, FiCheck, FiX } from "react-icons/fi";
// import { Spinner } from "@/components/spinner";
// import { useAuth } from "@clerk/nextjs";

// export default function QrDetailPage() {
//     const { projectId, qrId } = useParams<{ projectId: string; qrId: string }>();
//     const router = useRouter();

//     const [qr, setQr] = useState<any>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [copied, setCopied] = useState(false);

//     const [name, setName] = useState("");
//     const [url, setUrl] = useState("");
//     const [status, setStatus] = useState<"active" | "disabled" | "draft">("active");

//     const publicPageUrl = `${process.env.NEXT_PUBLIC_APP_URL}/qrs/${qrId}`;
//     const { getToken } = useAuth();
//     // Fetch QR
//     useEffect(() => {
//         if (!projectId || !qrId) return;

//         async function fetchQR() {
//             setLoading(true);
//             const token = await getToken();
//             try {

//                 const res = await fetch(
//                     `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/${projectId}/qrs/${qrId}`,
//                     {
//                         method: "GET",
//                         headers: {
//                             "Content-Type": "application/json",
//                             Authorization: `Bearer ${token}`,
//                         }
//                     }
//                 );

//                 if (!res.ok) throw new Error("Failed to fetch QR");
//                 const data = await res.json();
//                 setQr(data);
//                 setName(data.name);
//                 setUrl(data.payload?.url || "");
//                 setStatus(data.status);
//             } catch (err: any) {
//                 setError(err.message || "Something went wrong");
//             } finally {
//                 setLoading(false);
//             }
//         }

//         fetchQR();
//     }, [projectId, qrId]);

//     const handleDownload = () => {
//         const canvas = document.querySelector("canvas");
//         if (!canvas) return;
//         const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
//         const link = document.createElement("a");
//         link.href = pngUrl;
//         link.download = `${name || "qr"}.png`;
//         link.click();
//     };

//     const handleCopy = async () => {
//         try {
//             await navigator.clipboard.writeText(publicPageUrl);
//             setCopied(true);
//             setTimeout(() => setCopied(false), 2000);
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     const handleSave = async () => {
//         try {
//             const token = localStorage.getItem("token");
//             const res = await fetch(
//                 `${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/${projectId}/qrs/${qrId}`,
//                 {
//                     method: "PUT",
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${token}`,
//                     },
//                     body: JSON.stringify({ name, payload: { url }, status }),
//                 }
//             );

//             if (!res.ok) throw new Error("Failed to update QR");
//             alert("QR updated successfully!");
//         } catch (err: any) {
//             console.error(err);
//             alert(err.message || "Failed to save changes");
//         }
//     };

//     const handleDelete = async () => {
//         if (!confirm("Are you sure you want to delete this QR?")) return;
//         try {
//             const token = localStorage.getItem("token");
//             const res = await fetch(
//                 `${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/${projectId}/qrs/${qrId}`,
//                 { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
//             );
//             if (!res.ok) throw new Error("Failed to delete QR");
//             alert("QR deleted!");
//             router.push(`/dashboard/projects/${projectId}`);
//         } catch (err: any) {
//             console.error(err);
//             alert(err.message || "Failed to delete QR");
//         }
//     };

//     if (loading) {
//         return (
//             <div className="flex h-screen items-center justify-center text-muted-foreground">
//                 <Spinner />
//             </div>
//         );

//     }
//     if (error) return <div className="flex h-screen items-center justify-center text-red-500">{error}</div>;
//     if (!qr) return <div>No QR found</div>;

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//             <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg flex flex-col items-center gap-4">
//                 <h1 className="text-xl font-semibold">{name}</h1>

//                 <textarea
//                     className="w-full p-2 border rounded"
//                     value={url}
//                     onChange={(e) => setUrl(e.target.value)}
//                     placeholder="Enter URL"
//                 />

//                 <select
//                     value={status}
//                     onChange={(e) => setStatus(e.target.value as any)}
//                     className="w-full p-2 border rounded"
//                 >
//                     <option value="active">Active</option>
//                     <option value="archived">Archived</option>
//                     <option value="draft">Draft</option>
//                 </select>

//                 <div className="bg-white p-4 border rounded flex items-center justify-center w-full">
//                     <QRCodeCanvas value={publicPageUrl} size={200} />
//                 </div>

//                 <div className="flex w-full gap-2">
//                     <button
//                         onClick={handleDownload}
//                         className="flex-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//                     >
//                         Download
//                     </button>
//                     <button
//                         onClick={handleCopy}
//                         className="flex-1 bg-gray-200 p-2 rounded hover:bg-gray-300"
//                     >
//                         {copied ? "Copied!" : "Copy"}
//                     </button>
//                 </div>

//                 <div className="flex w-full gap-2 mt-2">
//                     <button
//                         onClick={handleSave}
//                         className="flex-1 bg-green-500 text-white p-2 rounded hover:bg-green-600"
//                     >
//                         Save
//                     </button>
//                     <button
//                         onClick={handleDelete}
//                         className="flex-1 bg-red-500 text-white p-2 rounded hover:bg-red-600"
//                     >
//                         Delete
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }
