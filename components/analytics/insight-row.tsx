import { DefaultIcon } from "@/lib/icons-map";

export interface InsightItem {
    key: string;      // "mobile", "chrome", etc
    label: string;    // "Mobile", "Chrome"
    percentage: number;
}



interface InsightRowProps {
    item: InsightItem;
    iconMap: Record<string, React.ElementType>;
}

export const InsightRow = ({ item, iconMap }: InsightRowProps) => {
    const Icon = iconMap[item.key] ?? DefaultIcon;

    return (
        <div className="space-y-2 py-2">
            {/* Top row */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="rounded-md bg-muted p-2">
                        <Icon
                            className="h-4 w-4"
                            stroke="#2563eb"
                        />
                    </div>
                    <span className="text-sm font-medium">
                        {item.label}
                    </span>
                </div>

                <span className="text-sm font-semibold">
                    {item.percentage}%
                </span>
            </div>

            {/* Progress indicator */}
            {/* <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                <div
                    className="h-full rounded-full bg-blue-600 transition-all"
                    style={{ width: `${item.percentage}%` }}
                />
            </div> */}
        </div>
    );
};
