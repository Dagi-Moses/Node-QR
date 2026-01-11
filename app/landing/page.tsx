"use client";
import Image from "next/image";
import Link from "next/link";
import {
    useUser
} from '@clerk/nextjs'


export default function Landing() {

    const { isSignedIn, } = useUser();




    return (
        <main className="min-h-screen bg-background">

            <section className="py-24 bg-background">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold tracking-tight text-foreground">
                        Create, Track & Manage Your QR Codes
                    </h2>

                    <p className="mt-4 max-w-2xl mx-auto text-muted-foreground text-lg">
                        Generate dynamic QR codes, monitor real-time analytics, and manage all your links from a single dashboard.
                    </p>

                    <div className="mt-8 flex justify-center gap-4">
                        <Link
                            href={isSignedIn ? "/dashboard" : "/sign-up"}
                            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg text-sm"
                        >
                            Get Started
                        </Link>

                        <a
                            href="#features"
                            className="px-6 py-3 border border-border text-muted-foreground rounded-lg text-sm"
                        >
                            Learn More
                        </a>
                    </div>
                </div>
            </section>

            {/* Showcase Image */}
            <div className="mt-12  max-w-6xl mx-auto px-6 flex items-center justify-center">
                <div className="w-full max-w-5xl shadow-xs">
                    <Image


                        src="/qr-landing.webp"
                        alt="App preview"
                        width={1900}
                        height={900}
                        className="rounded-xl shadow-lg w-full h-auto object-cover"
                        priority
                    />
                </div>
            </div>


            {/* Features */}
            <section id="features" className="py-24 bg-background">
                <div className="max-w-6xl mx-auto px-6">
                    <h3 className="text-3xl font-semibold text-center text-foreground">Features</h3>

                    <div className="grid md:grid-cols-3 gap-10 mt-12">
                        <div className="p-6 bg-card rounded-xl shadow-sm">
                            <h4 className="text-xl text-foreground font-semibold text-center">Dynamic QR Codes</h4>
                            <p className="mt-3 text-muted-foreground text-sm text-center">
                                Update destination links anytime without changing the QR code.
                            </p>
                        </div>

                        <div className="p-6 bg-card rounded-xl shadow-sm">
                            <h4 className="text-xl text-foreground font-semibold text-center">Analytics Dashboard</h4>
                            <p className="mt-3 text-muted-foreground text-sm text-center">
                                Track scans, locations, devices, and daily usage trends.
                            </p>
                        </div>

                        <div className="p-6 bg-card rounded-xl shadow-sm">
                            <h4 className="text-xl text-foreground font-semibold text-center">Custom Branding</h4>
                            <p className="mt-3 text-muted-foreground text-sm">
                                Add logos, frames, colors, and export high-quality QR codes.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-primary text-primary-foreground">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h3 className="text-3xl font-bold">Ready to get started?</h3>
                    <p className="mt-3 text-muted-foreground">
                        Generate your first QR code in seconds.
                    </p>

                    <a
                        href="/dashboard"
                        className="inline-block mt-6 px-8 py-4 bg-card text-foreground rounded-lg font-medium"
                    >
                        Launch App
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-10 text-center bg-background text-muted-foreground text-sm">
                © {new Date().getFullYear()} QR Manager. All rights reserved.
            </footer>
        </main>
    );
}
