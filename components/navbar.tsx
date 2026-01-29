"use client";

import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { useUser, SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useThemeStore } from "@/src/store/theme.store";





export default function NavBar() {
    const { isDarkMode } = useThemeStore();
    const { isLoaded, isSignedIn } = useUser();
    const pathname = usePathname();
    const isHome = pathname === "/";
    const [menuOpen, setMenuOpen] = useState(false);

    const links = [
        { href: "#features", label: "Features" },
        { href: "#", label: "FAQ", disabled: true },
        { href: "/subscribe", label: "Pricing" },
        { href: "/contact", label: "Contact" },
    ];
    const router = useRouter();



    return (
        <nav className="w-full border-b bg-background">
            <div
                className={`px-6 flex items-center justify-between py-4 ${isHome ? "mx-auto max-w-6xl" : "mx-5 max-w-8xl"
                    }`}
            >
                {/* Logo */}
                <Link href={isSignedIn ? "/dashboard/projects" : "/"}>
                    <div className="flex items-center space-x-3">
                        <Image
                            src="/qr-code.svg"
                            alt="logo"
                            width={30}
                            height={30}
                            className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-xl shadow-lg ${isDarkMode ? "filter invert" : ""
                                }`}
                            // className="rounded-xl shadow-lg w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 brightness-1 "
                            priority
                        />
                        <h1 className="text-xl sm:text-2xl font-semibold text-foreground">NodeQR</h1>
                    </div>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-6 text-sm text-foreground/70">
                    <SignedOut>
                        {links.map((link) => {
                            const isActive =
                                (link.href.startsWith("#") && pathname === "/" && window.location.hash === link.href) ||
                                pathname === link.href;

                            const handleClick = (e: React.MouseEvent) => {
                                if (link.href === "#features") {
                                    e.preventDefault();
                                    if (pathname === "/") {
                                        const el = document.getElementById("features");
                                        if (el) el.scrollIntoView({ behavior: "smooth" });
                                    } else {
                                        router.push("/#features");
                                    }
                                }
                            };

                            return (
                                <Link
                                    key={link.label}
                                    href={link.href.startsWith("#") ? "/" : link.href}
                                    onClick={handleClick}
                                    title={link.disabled ? "Coming soon" : undefined}
                                    className={`
          font-semibold hover:text-foreground
          ${link.disabled ? "cursor-not-allowed text-muted-foreground" : ""}
          ${isActive ? "text-primary underline" : ""}
        `}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </SignedOut>



                    <SignedIn>
                        <SignOutButton>
                            <button className="ml-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/60 transition">
                                Sign Out
                            </button>
                        </SignOutButton>
                    </SignedIn>

                    <ThemeToggle />
                </div>

                {/* Mobile Hamburger */}
                <div className="md:hidden flex items-center">
                    <ThemeToggle />
                    <button
                        className="ml-2 p-2 rounded-md hover:bg-gray-200 transition"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden px-6 pb-4 flex flex-row justify-end items-end  gap-3 text-sm text-foreground/80">
                    <SignedOut>
                        {links.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                title={link.disabled ? "Coming soon" : undefined}
                                className={`font-semibold hover:text-foreground ${link.disabled
                                    ? "cursor-not-allowed text-muted-foreground"
                                    : ""
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </SignedOut>

                    <SignedIn>
                        <SignOutButton>
                            <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/60 transition">
                                Sign Out
                            </button>
                        </SignOutButton>
                    </SignedIn>
                </div>
            )}
        </nav>
    );
}























// "use client"

// import Image from "next/image";
// import Link from "next/link";
// import { ThemeToggle } from "./ThemeToggle";
// import { useUser, SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";
// import { usePathname } from "next/navigation";


// export default function NavBar() {
//     const { isLoaded, isSignedIn, } = useUser();
//     const pathname = usePathname();
//     const isHome = pathname === "/";

//     return <nav>
//         <div className="w-full py-6 border-b bg-background">
//             {/* <div className= {`max-w-6xl mx-auto px-6 flex items-center justify-between `}> */}
//             <div
//                 className={`px-6 flex items-center justify-between ${isHome ? "mx-auto max-w-6xl" : "mx-5 max-w-8xl "
//                     }`}
//             >
//                 <Link
//                     href={isSignedIn ? "/dashboard/projects" : "/"}
//                 >
//                     <div className="flex space-x-3">
//                         <Image
//                             src="/qr-code.svg"
//                             alt="logo"
//                             width={30}
//                             height={30}
//                             className="rounded-xl shadow-lg "
//                             priority
//                         />
//                         <h1 className=" text-xl sm;text-2xl font-semibold text-foreground">NodeQR</h1>


//                     </div>
//                 </Link>

//                 <div className="flex gap-6 text-sm text-foreground/70


// ">


//                     <SignedIn>

//                         <SignOutButton>
//                             <button className="ml-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/60  transition">
//                                 Sign Out
//                             </button>
//                         </SignOutButton>
//                     </SignedIn>
//                     <SignedOut>





//                         <Link href="#features" className="text-muted-foreground hover:text-foreground
//  font-semibold">Features</Link>

//                         <Link href="#"
//                             title="Coming soon"
//                             className="cursor-not-allowed text-muted-foreground hover:text-foreground font-semibold">FAQ</Link>





//                         <Link href="/subscribe"
//                             title="Coming soon"
//                             className="text-muted-foreground hover:text-foreground font-semibold">Pricing</Link>


//                     </SignedOut>

//                     <ThemeToggle />
//                 </div>




//             </div>
//         </div>
//     </nav>
// }