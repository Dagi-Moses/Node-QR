// lib/mock-projects.ts
import { Project } from "./types";

export const sampleProjects: Project[] = [
  {
    id: "proj_001",
    name: "Cafe Loyalty QR",
    description: "QR codes for cafe loyalty stamps and offers.",
    createdAt: "2025-10-01T09:20:00.000Z",
    status: "active",
    qrCount: 24,
    owner: "Node Tech",
    lastScanAt: "2025-12-10T11:12:00.000Z",
  },
  {
    id: "proj_002",
    name: "Annual Event Tickets",
    description: "Single-use QR tickets for the product launch event.",
    createdAt: "2025-07-12T08:00:00.000Z",
    status: "archived",
    qrCount: 120,
    owner: "Node Tech",
    lastScanAt: "2025-09-05T16:00:00.000Z",
  },
  {
    id: "proj_003",
    name: "Product Labels",
    description: "QR codes on product packaging linking to specs.",
    createdAt: "2025-06-22T10:30:00.000Z",
    status: "active",
    qrCount: 8,
    owner: "Node Tech",
    lastScanAt: null,
  },
  {
    id: "proj_004",
    name: "Beta Landing",
    description: "QR landing pages for beta testers.",
    createdAt: "2025-11-01T13:00:00.000Z",
    status: "draft",
    qrCount: 2,
    owner: "Node Tech",
    lastScanAt: null,
  },
];
