/* eslint-disable @typescript-eslint/no-explicit-any */


export default function LocationsCard({ locations }: { locations: any[] }) {
    return (
        <div className="bg-white rounded-xl p-5 shadow-sm">
            <h3 className="font-medium mb-4">Top Locations</h3>
            <ul className="space-y-3">
                {locations.map((loc, i) => (
                    <li key={i}>
                        <div className="flex justify-between text-sm mb-1">
                            <span>{loc.city}</span>
                            <span>{loc.percent}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded">
                            <div
                                className="h-2 bg-blue-500 rounded"
                                style={{ width: `${loc.percent}%` }}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

