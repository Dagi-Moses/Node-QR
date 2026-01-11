"use client"

import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { useUser, SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";


export default function NavBar() {
    const { isLoaded, isSignedIn, } = useUser();

    return <nav>
        <div className="w-full py-6 border-b bg-background">
            <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
                <Link
                    href={isSignedIn ? "/dashboard/projects" : "/"}
                >
                    <div className="flex space-x-3">
                        <Image
                            src="/qr-code.svg"
                            alt="logo"
                            width={30}
                            height={30}
                            className="rounded-xl shadow-lg "
                            priority
                        />
                        <h1 className="text-2xl font-semibold text-foreground">NodeQR</h1>


                    </div>
                </Link>

                <div className="flex gap-6 text-sm text-foreground/70


">


                    <SignedIn>

                        <SignOutButton>
                            <button className="ml-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/60  transition">
                                Sign Out
                            </button>
                        </SignOutButton>
                    </SignedIn>
                    <SignedOut>





                        <Link href="#features" className="text-muted-foreground hover:text-foreground
 font-semibold">Features</Link>

                        <Link href="#"
                            title="Coming soon"
                            className="cursor-not-allowed text-muted-foreground hover:text-foreground font-semibold">FAQ</Link>





                        <Link href="/subscribe"
                            title="Coming soon"
                            className="text-muted-foreground hover:text-foreground font-semibold">Pricing</Link>


                    </SignedOut>

                    <ThemeToggle />
                </div>




            </div>
        </div>
    </nav>
}