
import { ResponsiveContainer, Pie, Cell, PieChart } from "recharts";
import { FaApple, FaWindows, FaAndroid, FaLinux, FaQuestion } from "react-icons/fa";
import { JSX } from "react";

const osIcons: Record<string, JSX.Element> = {
    iOS: <FaApple size={100} className="text-gray-700" />,
    macOS: <FaApple size={100} className="text-gray-700" />,
    Windows: <FaWindows size={100} className="text-gray-700" />,
    Android: <FaAndroid size={100} className="text-gray-700" />,
    Linux: <FaLinux size={100} className="text-gray-700" />,
};

const COLORS = ["#2563eb", "#475569", "#60a5fa", "#93c5fd", "#cbd5e1"];



export default function OsDonut({ data }: { data: { name: string; value: number }[] }) {
    const total = data.reduce((sum, d) => sum + d.value, 0);

    const enriched = data.map(d => ({
        ...d,
        percent: Math.round((d.value / total) * 100),
    }));

    const topOs = enriched.reduce((a, b) =>
        b.value > a.value ? b : a
    );
    const topOsIcon = osIcons[topOs.name] ?? <FaQuestion size={100} className="text-gray-500" />;

    return (
        <div className="bg-white rounded-xl p-5 shadow-sm">
            <h3 className="font-medium mb-4">Operating System</h3>

            <div className="flex items-center space-x-5 gap-6">
                {/* Donut */}
                <div className="relative w-[220px] h-[220px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={enriched}
                                dataKey="value"
                                innerRadius={70}
                                outerRadius={100}
                                paddingAngle={4}
                            >
                                {enriched.map((_, i) => (
                                    <Cell
                                        key={i}
                                        fill={COLORS[i % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Center label */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">

                        <span className="text-lg font-semibold">
                            {topOs.name}
                        </span>
                        <span className="text-sm text-muted-foreground">
                            {topOs.percent}%
                        </span>
                    </div>
                </div>

                {/* Right legend */}
                <div className="flex flex-col gap-3">
                    {enriched.map((d, i) => (
                        <div
                            key={d.name}
                            className="flex items-center gap-3 text-sm"
                        >
                            <span
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: COLORS[i % COLORS.length] }}
                            />
                            <span className="min-w-[70px]">{d.name}</span>
                            <span className="text-muted-foreground">
                                {d.percent}%
                            </span>
                        </div>
                    ))}
                </div>

                <div className="ml-2">{topOsIcon}</div>
            </div>
        </div>
    );
}
