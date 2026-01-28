/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import InsightDeviceCard from "@/components/analytics/insight-devices-card";
import { InsightItem } from "@/components/analytics/insight-row";
import LineChartCard from "@/components/analytics/line-chart-card";
import LocationsCard from "@/components/analytics/locations-card";
import OsDonut from "@/components/analytics/os-donut";
import StatCard from "@/components/analytics/stats-card";
import TopQrList from "@/components/analytics/top-qr-list";
import { AnalyticsResponse, DateRange, StatItem, TopProject, TopQr } from "@/lib/models";
import { deviceIconMap, browserIconMap } from "@/lib/icons-map";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";



// const stats = [
//   { label: "Total Scans", value: 425, change: "+23%" },
//   { label: "Unique Unique", value: 53, change: "+12%" },
//   { label: "Active dynamic codes", value: 65, change: "+13%" },
//   { label: "Avg per code", value: 1.53, change: "+23%" },
// ];

const scansData = [
  { month: "Jan", total: 5, unique: 1 },
  { month: "Feb", total: 12, unique: 3 },
  { month: "Mar", total: 16, unique: 4 },
  { month: "Apr", total: 14, unique: 8 },
  { month: "May", total: 18, unique: 10 },
  { month: "Jun", total: 30, unique: 6 },
  { month: "Jul", total: 26, unique: 4 },
  { month: "Aug", total: 22, unique: 6 },
  { month: "Sep", total: 23, unique: 8 },
  { month: "Oct", total: 24, unique: 12 },
  { month: "Nov", total: 26, unique: 18 },
  { month: "Dec", total: 28, unique: 25 },
];
// const topQrs = [
//   { id: "1", name: "Discount 15%", scans: 633, url: "https://example.com/discount15" },
//   { id: "2", name: "Restaurant 5 avenue", scans: 234, url: "https://example.com/restaurant" },
//   { id: "3", name: "Coffee Hall", scans: 221, url: "https://example.com/coffee" },
//   { id: "4", name: "Concert Square", scans: 124, url: "https://example.com/concert" },

// ];
// const topProjectss = [
//   { id: "1", name: "Project 1", scans: 633, qrCount: 40 },
//   { id: "2", name: "Project 2", scans: 234, qrCount: 20 },
//   { id: "3", name: "Project 3", scans: 221, qrCount: 10 },
//   { id: "4", name: "Project 4", scans: 124, qrCount: 4 },

// ];

const locations = [
  { city: "London", percent: 80 },
  { city: "Liverpool", percent: 43 },
  { city: "Manchester", percent: 14 },
  { city: "Oxford", percent: 10 },
  { city: "Newcastle", percent: 7 },
];

const osData = [
  { name: "iOS", value: 73 },
  { name: "Windows", value: 22 },
  { name: "Android", value: 12 },
  { name: "macOS", value: 9 },
  { name: "Linux", value: 3 },
];

export const topDevices: InsightItem[] = [
  { key: "mobile", label: "Mobile", percentage: 68 },
  { key: "desktop", label: "Desktop", percentage: 24 },
  { key: "tablet", label: "Tablet", percentage: 8 },
  { key: "unknown", label: "Other", percentage: 8 },
];

export const topBrowsers: InsightItem[] = [
  { key: "chrome", label: "Chrome", percentage: 61 },
  { key: "safari", label: "Safari", percentage: 22 },
  { key: "firefox", label: "Firefox", percentage: 9 },
  { key: "unknown", label: "Other", percentage: 8 }, // fallback icon
];






export default function AnalyticsPage() {
  const { getToken } = useAuth();
  const [stats, setStats] = useState<StatItem[]>([]);
  const [totalCodes, setTotalCodes] = useState<number>(0);

  const [topQrs, setTopQrs] = useState<TopQr[]>([]);
  const [topProjects, setTopProjects] = useState<TopProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState<DateRange>(DateRange.ALL);
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");


  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const token = await getToken();
        const query = new URLSearchParams();
        query.set("range", range);
        if (range === "custom" && from && to) {
          query.set("from", from);
          query.set("to", to);
        }

        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/analytics?${query.toString()}`;

        const res = await fetch(
          url,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            }
          },
        );

        const data: AnalyticsResponse = await res.json();

        setStats(data.stats);
        setTopQrs(data.topQrs);
        setTopProjects(data.topProjects);
        setTotalCodes(data.totalCodes);
      } catch (err) {
        console.error("Failed to fetch analytics", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [range, from, to]);

  if (loading || !stats) return <div>Loading...</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-6">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Analytics</h1>

        <div className="flex gap-2">
          {range === "custom" && (
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="border rounded-md px-3 py-2 text-sm"
              />
              <span className="text-sm text-muted-foreground">to</span>
              <input
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="border rounded-md px-3 py-2 text-sm"
              />
            </div>
          )}

          <select
            value={range}
            onChange={(e) => setRange(e.target.value as any)}
            className="border rounded-md px-3 py-2 text-sm bg-white"
          >
            <option value="today">Today</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="all">All time</option>
            <option value="custom">Custom range</option>
          </select>

          <div
            title="Total QR Codes"
            className="border  px-3 py-2 text-sm  bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-center w-32">
            <span className="text-xl font-bold text-gray-800">
              {totalCodes}
            </span>
            <span className="text-sm text-gray-500">
              {totalCodes === 1 ? " code" : " codes"}
            </span>
          </div>
        </div>
      </div>



      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <StatCard key={i} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LineChartCard data={scansData} />
        </div>
        <TopQrList topQrs={topQrs} topProjects={topProjects} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <LocationsCard locations={locations} />
        </div>

        <div className="lg:col-span-2">
          <OsDonut data={osData} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InsightDeviceCard
          title="Top Devices"
          data={topDevices}
          iconMap={deviceIconMap}
        />

        <InsightDeviceCard
          title="Top Browsers"
          data={topBrowsers}
          iconMap={browserIconMap}
        />
      </div>

    </div>
  );
}


