import { InsightItem, InsightRow } from "./insight-row";

// function calculatePercentage(value: number, total: number) {
//   return Math.round((value / total) * 100);
// }
interface InsightCardProps {
  title: string;
  data: InsightItem[];
  iconMap: Record<string, React.ElementType>;
}

export default function InsightDeviceCard({ title, data, iconMap }: InsightCardProps) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <h3 className="mb-4 text-sm font-semibold text-muted-foreground">
        {title}
      </h3>

      <div className="divide-y">
        {data.map((item) => (
          <InsightRow
            key={item.key}
            item={item}
            iconMap={iconMap} />
        ))}
      </div>
    </div>
  );
}
