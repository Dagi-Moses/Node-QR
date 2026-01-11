// lib/types.ts
export type Project = {
  id: string;
  name: string;
  description?: string;
  createdAt: string; // ISO string
  status: "active" | "archived" | "draft";
  qrCount: number;
  owner?: string;
  lastScanAt?: string | null; // ISO or null
};
