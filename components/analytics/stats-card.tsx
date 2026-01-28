type Props = {
    label: string;
    value: number | string;
    change: string;
};



export default function StatCard({ label, value, change }: Props) {
    return (
        <div className="bg-white rounded-xl p-5 shadow-sm">
            <p className="text-sm text-gray-500">{label}</p>
            <div className="flex items-end justify-between mt-2">
                <p className="text-2xl font-semibold">{value}</p>
                <span className="text-sm text-green-500">{change}</span>
            </div>
        </div>
    );
}


