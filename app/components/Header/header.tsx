"use client"; // This is a client component 👈🏽

import { useEffect } from "react";
import Link from "next/link";
// import Menu from "../Menu/Menu";

export default function Header() {

    /** The string constant denoting a change event */
    const CHANGE_EVENT: string = "change";
    /** The string constant denoting a dark theme */
    const DARK: string = "dark";
    /** The string constant denoting a light theme */
    const LIGHT: string = "light";

    useEffect(() => {
        /**
         * Gets the default theme from the user's browser settings
         *
         * @returns the object that can be listened to for theme changes
         */
        const getDefaultTheme = (): MediaQueryList =>
            window.matchMedia(`(prefers-color-scheme: ${LIGHT})`);

        /**
         * Updates the site's theme from the user's browser settings
         */
        const updateTheme = (): void => {
            document.documentElement.dataset.theme = getDefaultTheme().matches
                ? LIGHT
                : DARK;
        };

        // Set up event listener for dynamic theme changes
        const themeQuery: MediaQueryList = getDefaultTheme();
        themeQuery.addEventListener(CHANGE_EVENT, updateTheme);

        // Grab theme initially
        updateTheme();

        // Clean up event listener
        return () => {
            document.removeEventListener(CHANGE_EVENT, updateTheme);
        };
    }, []);

    // border-3 border-rose-300
    return (
        <header className="w-full py-8  text-[color:var(--theme-text)] ">
            <div className="flex justify-between items-center">
                <Link href='/'>
                    <div className="flex flex-row space-x-10">

                        <div className="relative">
                            <h1
                                className="text-3xl font-bold hover:text-[color:var(--theme-hover)] duration-[time:var(--transition-time)] hover:cursor-pointer"
                            >
                                Chirp
                            </h1>
                        </div>

                    </div>
                </Link>
                <div></div>
            </div>
        </header>
    )
}