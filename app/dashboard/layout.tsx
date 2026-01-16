"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { useSelectedLayoutSegment, useSelectedLayoutSegments } from "next/navigation";

export default function DashboardLayout({ children }: { children: ReactNode }) {

    const page = useSelectedLayoutSegments()

    console.log("this is the currednt page segment", page)

    return (
        <div className="flex min-h-screen bg-background text-foreground">
            {/* Sidebar */}
            <aside className="w-40 bg-card border-r border-border p-6 flex flex-col">

                <nav className="flex flex-col gap-3">
                    {/* <Link
                        href="/dashboard"
                        className="px-4 py-2 rounded hover:bg-primary/10 hover:text-primary font-medium"
                    >
                        Home
                    </Link> */}
                    <Link
                        href="/dashboard/projects"
                        className={`px-4 py-2 rounded hover:bg-primary/10 hover:text-primary font-medium transition-all duration-300 ${page == 'projects' ? "bg-primary text-primary-foreground" : ""}`}
                    >
                        Projects
                    </Link>
                    <Link
                        href="/dashboard/analytics"
                        className={`px-4 py-2 rounded hover:bg-primary/10 hover:text-primary font-medium transition-all duration-300 ${page == 'analytics' ? "bg-primary text-primary-foreground" : ""}`}
                    >
                        Analytics
                    </Link>
                    <Link
                        href="/dashboard/profile"
                        className={`px-4 py-2 rounded hover:bg-primary/10 hover:text-primary font-medium transition-all duration-300 ${page == 'settings' ? "bg-primary text-primary-foreground" : ""}`}
                    >
                        Profile
                    </Link>
                    <Link
                        href="/dashboard/billing"
                        className={`px-4 py-2 rounded hover:bg-primary/10 hover:text-primary font-medium transition-all duration-300 ${page == 'billing' ? "bg-primary text-primary-foreground" : ""}`}
                    >
                        Billing
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
    );
}
