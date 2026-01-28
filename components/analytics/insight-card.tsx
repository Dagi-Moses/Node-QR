
export default function InsightCard({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="bg-white rounded-xl border p-4">
            <h3 className="font-medium mb-3">{title}</h3>
            <div className="space-y-2">{children}</div>
        </div>
    );
}


export function KeyValue({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{label}</span>
            <span className="font-medium">{value}</span>
        </div>
    );
}


function calculatePercentage(value: number, total: number) {
    return Math.round((value / total) * 100);
}

export function InsightListCard({
    title,
    items,
}: {
    title: string;
    items: { label: string; value: number }[];
}) {
    const total = items.reduce((sum, i) => sum + i.value, 0);

    return (
        <div className="bg-white rounded-xl p-5 shadow-sm">
            <h3 className="font-medium mb-4">{title}</h3>

            <ul className="space-y-3">
                {items.map((item, i) => {
                    const percentage = calculatePercentage(item.value, total);

                    return (
                        <li key={i} className="space-y-1">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-700">{item.label}</span>
                                <span className="font-medium">{percentage}%</span>
                            </div>

                            {/* Progress bar */}
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-blue-500 rounded-full"
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
