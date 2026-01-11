import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";



import NavBar from "../components/navbar";

import { ClerkProvider } from "@clerk/nextjs";
// import { ReactQueryClientProvider } from "@/components/react-query-client-provider";
import { AppProviders } from "@/components/providers/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NodeQR - Smart QR Code and Link Manager",
  description: "Create, track, and manage dynamic QR codes with real - time analytics and secure link routing.Designed for seamless business workflows and fast deployment.",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}

        >
          <AppProviders>
            <NavBar />
            {children}
          </AppProviders>
        </body>

      </html>
    </ClerkProvider>

  );
}


