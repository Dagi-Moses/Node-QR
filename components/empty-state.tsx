"use client";

import { useRouter } from "next/navigation";

type Props = {
    icon?: React.ReactNode;
    title: string;
    description?: string;
    actionLabel?: string;
    actionRoute?: string;
};

export default function EmptyState({
    icon = "🚫",
    title,
    description,
    actionLabel = "Home",
    actionRoute = "/dashboard",
}: Props) {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center gap-4">
            <div className="text-5xl">{icon}</div>

            <h2 className="text-xl font-semibold">{title}</h2>

            {description && (
                <p className="text-sm text-muted-foreground max-w-sm">
                    {description}
                </p>
            )}

            <button
                onClick={() => router.push(actionRoute)}
                className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
            >
                {actionLabel}
            </button>
        </div>
    );
}
