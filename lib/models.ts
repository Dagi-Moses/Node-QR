// models/analytics.ts
export interface Stats {
  totalScans: number;
  uniqueVisitors: number;
  activeQrs: number;
  avgPerCode: number;
}

export interface StatItem {
  label: string;
  value: number;
  change: string;
}

export interface TopQr {
  id: string;
  name: string;
  scans: number;
  url: string;
}

export interface TopProject {
  id: string;
  name: string;
  scans: number;
  qrCount: number;
}

export interface AnalyticsResponse {
  stats: StatItem[];
  topQrs: TopQr[];
  topProjects: TopProject[];
}

// models/analytics.ts
export enum DateRange {
  TODAY = "today",
  LAST_7_DAYS = "7d",
  LAST_30_DAYS = "30d",
  ALL = "all",
  CUSTOM = "custom",
}
