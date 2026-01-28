"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
import { BsQrCode } from "react-icons/bs";
import { FiDownload, FiCopy, FiCheck } from "react-icons/fi";
import { Spinner } from "@/components/spinner";

interface PublicQRCode {
    id: string;
    name: string;
}

export default function QrDetailPage() {
    const { qrId } = useParams<{ qrId: string }>();

    const [qr, setQr] = useState<PublicQRCode | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    // 🔥 This is what the QR actually encodes (analytics-safe)
    const encodedUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/q/${qrId}`;

    // Public page URL (for sharing)
    const publicPageUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/qrs/${qrId}`;


    useEffect(() => {
        if (!qrId) return;

        const fetchQr = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/qrs/${qrId}`
                );

                console.log("res", res);
                alert(res);
                if (!res.ok) {
                    throw new Error("QR not found");
                }

                const data = await res.json();
                setQr(data);
            } catch {
                setError("This QR code does not exist or is no longer available.");
            } finally {
                setLoading(false);
            }
        };

        fetchQr();
    }, [qrId]);

    const handleDownload = () => {
        const canvas = document.querySelector("canvas");
        if (!canvas) return;

        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");

        const link = document.createElement("a");
        link.href = pngUrl;
        link.download = "NodeQR.png";
        link.click();
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(publicPageUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (e) {
            console.log(e)

        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-rose-400 to-indigo-400">
            <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-lg flex flex-col items-center">
                <div className="flex flex-col items-center mb-6">
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-rose-400 to-indigo-400 mb-2">
                        <BsQrCode className="w-8 h-8 text-white" />
                    </div>

                    <h1 className="text-xl font-semibold text-gray-800 mb-1">
                        {qr?.name}
                    </h1>
                    <p
                        className={`text-sm ${error || !qr ? "text-red-500" : "text-gray-500"
                            }`}
                    >
                        {loading ? <Spinner /> : (error || !qr) ? error : "Scan this QR code to open the link"}
                    </p>


                </div>


                <div className="mb-5 flex items-center justify-center w-full">
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex items-center justify-center p-4 min-h-[200px] w-full">
                        {qr ? (
                            <QRCodeCanvas
                                value={encodedUrl}
                                size={200}
                                className="rounded"
                            />
                        ) : (
                            <BsQrCode className="  text-gray-300 mb-2" size={200} />
                        )}
                    </div>
                </div>



                <div className="flex w-full gap-3">
                    <button
                        onClick={handleDownload}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                        <FiDownload className="w-4" />
                        Download
                    </button>

                    <button
                        onClick={handleCopy}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                    >
                        {copied ? <FiCheck className="text-green-500" /> : <FiCopy />}
                        {copied ? "Copied!" : "Copy link"}
                    </button>
                </div>
            </div>
        </div>
    );
}
