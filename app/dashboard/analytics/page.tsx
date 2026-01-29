/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import InsightDeviceCard from "@/components/analytics/insight-devices-card";

import LineChartCard from "@/components/analytics/line-chart-card";
import LocationsCard from "@/components/analytics/locations-card";
import OsDonut from "@/components/analytics/os-donut";
import StatCard from "@/components/analytics/stats-card";
import TopQrList from "@/components/analytics/top-qr-list";
import { AnalyticsResponse, DateRange, InsightItem, Locations, OsData, ScansData, StatItem, TopProject, TopQr } from "@/lib/models";
import { deviceIconMap, browserIconMap } from "@/lib/icons-map";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";











export default function AnalyticsPage() {
  const { getToken } = useAuth();
  const [stats, setStats] = useState<StatItem[]>([]);
  const [scansData, setScansData] = useState<ScansData[]>([]);
  const [osData, setOsData] = useState<OsData[]>([]);
  const [locations, setLocations] = useState<Locations[]>([]);
  const [topDevices, setTopDevices] = useState<InsightItem[]>([]);
  const [topBrowsers, setTopBrowsers] = useState<InsightItem[]>([]);
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
        setScansData(data.scansData);
        setLocations(data.locations);
        setOsData(data.osData);
        setTopDevices(data.topDevices);
        setTopBrowsers(data.topBrowsers);
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


