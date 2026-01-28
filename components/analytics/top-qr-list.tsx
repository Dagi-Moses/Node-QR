"use client";

import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { FiFolder } from "react-icons/fi";
import { TopQr, TopProject } from "@/lib/models";


export default function TopQrList({ topQrs,
    topProjects, }: {
        topQrs: TopQr[],
        topProjects: TopProject[]
    }) {
    const [tab, setTab] = useState<"qr" | "projects">("qr");

    const items = tab === "qr" ? topQrs : topProjects;


    return (
        <div className="bg-white rounded-xl p-5 shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Top Projects</h3>

                <div className="flex rounded-lg bg-gray-100 p-1 text-sm">
                    <button
                        onClick={() => setTab("qr")}
                        className={`px-3 py-1 rounded-md transition ${tab === "qr"
                            ? "bg-white shadow text-gray-900"
                            : "text-gray-500"
                            }`}
                    >
                        QR
                    </button>

                    <button
                        onClick={() => setTab("projects")}
                        className={`px-3 py-1 rounded-md transition ${tab === "projects"
                            ? "bg-white shadow text-gray-900"
                            : "text-gray-500"
                            }`}
                    >
                        Projects
                    </button>
                </div>
            </div>

            {/* List */}
            <ul className="divide-y">
                {items.map((item) => (
                    <li
                        key={item.id}
                        className="flex items-center gap-4 py-3"
                    >
                        {/* Left preview */}
                        <div className="w-10 h-10 flex items-center justify-center border rounded-md bg-gray-50">
                            {tab === "qr" ? (
                                <QRCodeCanvas value={(item as TopQr).url} size={32} />
                            ) : (
                                <FiFolder className="text-gray-500" size={20} />
                            )}
                        </div>

                        {/* Name + meta */}
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                                {item.name}
                            </p>

                            <p className="text-xs text-muted-foreground">
                                {tab === "qr"
                                    ? (item as TopQr).url
                                    : `${(item as TopProject).qrCount} codes`}
                            </p>
                        </div>

                        {/* Stat */}
                        <div className="text-sm font-semibold tabular-nums">
                            {item.scans}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}