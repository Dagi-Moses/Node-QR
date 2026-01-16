
import QRsClient from "@/components/qr/QRsClient"

export default function Page() {
    return (
        <main className="min-h-screen bg-background text-foreground p-6">
            <div className="max-w-7xl mx-auto">
                <QRsClient />
            </div>
        </main>
    )
}