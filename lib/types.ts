// types.ts

// Enums
export type ProjectStatus = "active" | "archived" | "draft";
export type QRStatus = "active" | "disabled";
export type QRType = "url";

// Profile
export interface Profile {
  id: string;
  userId: string;
  email: string;
  createdAt: string; // ISO string from backend
  updatedAt: string;
  subscription?: Subscription;
  projects: Project[];
}

// Subscription
export interface Subscription {
  id: string;
  userId: string;
  planType: string;
  active: boolean;
  expiresAt?: string;
  reference: string;
  provider: string;
  providerSubscriptionId?: string;
  providerCustomerId?: string;
  providerAuthCode?: string;
  createdAt: string;
  updatedAt: string;
}

// Project
export interface Project {
  id: string;
  userId: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;

  qrCount: number;

  qrs: QRCode[];
  // profile: Profile;
}

// QRCode
export interface QRCode {
  id: string;
  projectId: string;
  type: QRType;
  name: string;
  payload: Record<string, unknown>;
  status: QRStatus;
  createdAt: string;
  updatedAt: string;
  // project: Project;
  qrScans: QRScan[];
}

// QRScan
export interface QRScan {
  id: string;
  qrId: string;
  ip?: string;
  userAgent?: string;
  createdAt: string;
  // qr: QRCode;
}
