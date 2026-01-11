"use client";



import { useEffect, useState, FC } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "../lib/utils";

export const ThemeToggle: FC = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    useEffect(() => {
        const storedTheme: string | null = localStorage.getItem("theme");

        if (storedTheme === "dark") {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsDarkMode(true);
            document.documentElement.classList.add("dark");
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const toggleTheme = (): void => {
        if (isDarkMode) {
            setIsDarkMode(false);
            localStorage.setItem("theme", "light");
            document.documentElement.classList.remove("dark");
        } else {
            setIsDarkMode(true);
            localStorage.setItem("theme", "dark");
            document.documentElement.classList.add("dark");
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className={cn(
                "rounded-full transition-colors duration-300",
                "focus:outline-hidden"
            )}
        >
            {isDarkMode ? (
                <Sun className="h-6 w-6 text-yellow-300" size={25} />
            ) : (
                <Moon className="h-6 w-6 text-black" size={25} />
            )}
        </button>
    );
};
