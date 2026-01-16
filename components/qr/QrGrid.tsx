// app/components/qrs/QrGrid.tsx
"use client";


import QrCard from "./QrCard";
import { QRCode } from "@/lib/types";

type Props = {
  qrs: QRCode[];
  onOpen: (id: string) => void;
};


/* TODO: HANDLE DISPLAYING EMPTY STATE WHEN THERE IS NO QR CODES AND A DIFFERENT ONE WHEN THE PROJECT ID IS WRONG OR NOT FOUND IN THE DATABASE
FOR INSTANCE IF NOT FOUND SAY SOMETHING LIKE "PROJECT NOT FOUND...": IF EMPTY SAY "NO QR YET WITH A NICE UI"
*/


export default function QRsGrid({ qrs, onOpen }: Props) {
  if (!qrs.length) {
    return (
      <div className="bg-muted p-8 rounded-xl text-center text-muted-foreground">
        No QR codes yet. Create one to get started.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {qrs.map((p) => (
        <QrCard key={p.id} qr={p} onOpen={onOpen} />
      ))}
    </div>
  );
}
