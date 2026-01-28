import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend,
} from "recharts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function LineChartCard({ data }: { data: any[] }) {
    return (
        <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Scans</h3>
            </div>

            <ResponsiveContainer width="100%" height={260}>
                <LineChart data={data}>
                    {/* Horizontal grid lines */}
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#e5e7eb"
                    />

                    <XAxis
                        dataKey="month"
                        tick={{ fontSize: 12 }}
                        stroke="#9ca3af"
                    />

                    <YAxis
                        tick={{ fontSize: 12 }}
                        stroke="#9ca3af"
                    />

                    <Tooltip />

                    {/* Top-right legend */}
                    <Legend
                        verticalAlign="bottom"
                        align="right"
                        iconType="square"
                        iconSize={10}
                        wrapperStyle={{ fontSize: 12 }}
                    />

                    <Line
                        type="monotone"
                        dataKey="total"
                        stroke="#2563eb"
                        strokeWidth={2}
                        dot={false}
                        name="Total"
                    />

                    <Line
                        type="monotone"
                        dataKey="unique"
                        stroke="#93c5fd"
                        strokeWidth={2}
                        dot={false}
                        name="Unique"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
