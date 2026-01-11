"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ApiUrl } from "@/lib/const";

export default function PaymentSuccessPage() {
    const url = `${ApiUrl}/payments/verify`;
    const searchParams = useSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [message, setMessage] = useState<string>("Verifying your payment…");

    useEffect(() => {
        const reference = searchParams.get("reference");
        if (!reference) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setStatus("error");
            setMessage("No payment reference found.");
            return;
        }

        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reference }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setStatus("success");
                    setMessage("Payment verified! Redirecting to your dashboard…");
                    setTimeout(() => router.replace("/dashboard"), 2000);
                } else {
                    setStatus("error");
                    setMessage("Payment could not be verified. Please try again or contact support.");
                }
            })
            .catch(() => {
                setStatus("error");
                setMessage("Something went wrong while verifying your payment.");
            });
    }, [searchParams, router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 text-center">
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
                {status === "loading" && (
                    <>
                        <div className="loader mb-4 mx-auto"></div>
                        <p className="text-gray-700">{message}</p>
                    </>
                )}
                {status === "success" && (
                    <p className="text-green-600 font-semibold">{message}</p>
                )}
                {status === "error" && (
                    <p className="text-red-600 font-semibold">{message}</p>
                )}
            </div>

            {/* Loader styles */}
            <style jsx>{`
        .loader {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #4ade80; /* Tailwind green-400 */
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
}
