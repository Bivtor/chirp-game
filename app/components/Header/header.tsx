"use client"; // This is a client component 👈🏽

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ChirpLogo from "./logo";
import Chirp from '@/public/assets/icons/chirp-logo.svg'
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
        <header className="w-full text-[color:var(--theme-text)] ">
            <div className="flex justify-between items-center">
                <Link href='/'>
                    <div >
                        <ChirpLogo />
                    </div>
                </Link>
                <div >
                    <Link href='/'>
                        <Image src={Chirp} alt="Chirp Logo" width={150}>

                        </Image>
                    </Link>
                </div>
            </div>
        </header>
    )
}