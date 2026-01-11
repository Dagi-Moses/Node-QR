'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {

    const router = useRouter()

    useEffect(() => {
        router.replace("/dashboard/projects")
    })

    return (
        <>
        </>
    )
}













// // app/dashboard/page.tsx
// "use client"; // make interactive page; if you'd rather server-render, remove and convert components accordingly

// import { redirect} from "next/navigation";
// import ProjectsClient from "@/app/components/projects/ProjectsClient";

// export default function DashboardPage() {
//     return (
//         <main className="min-h-screen bg-background text-foreground p-6">
//             <div className="max-w-7xl mx-auto">
//                 <ProjectsClient />
//             </div>
//         </main>
//     );
// }
