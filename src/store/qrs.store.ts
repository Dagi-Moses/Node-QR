// app/stores/useQrsStore.ts
import { create } from "zustand";
import { QRCode } from "@/lib/types";

interface QrState {
  qrs: Record<string, QRCode[]>; // projectId -> list of QRs
  setQrs: (projectId: string, qrs: QRCode[]) => void;
  addQr: (projectId: string, qr: QRCode) => void;
  updateQr: (projectId: string, qr: QRCode) => void;
  deleteQr: (projectId: string, qrId: string) => void;
}

export const useQrsStore = create<QrState>((set) => ({
  qrs: {},
  setQrs: (projectId, qrs) =>
    set((state) => ({ qrs: { ...state.qrs, [projectId]: qrs } })),
  addQr: (projectId, qr) =>
    set((state) => ({
      qrs: { ...state.qrs, [projectId]: [...(state.qrs[projectId] || []), qr] },
    })),
  updateQr: (projectId, qr) =>
    set((state) => ({
      qrs: {
        ...state.qrs,
        [projectId]: (state.qrs[projectId] || []).map((q) =>
          q.id === qr.id ? qr : q,
        ),
      },
    })),
  deleteQr: (projectId, qrId) =>
    set((state) => ({
      qrs: {
        ...state.qrs,
        [projectId]: (state.qrs[projectId] || []).filter((q) => q.id !== qrId),
      },
    })),
}));
