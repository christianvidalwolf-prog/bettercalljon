"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { locales, localeNames, type Locale } from "@/i18n/config";

export function LanguageSwitcher() {
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();

    const handleChange = (newLocale: Locale) => {
        router.replace(pathname, { locale: newLocale });
    };

    const flags: Record<Locale, React.ReactNode> = {
        es: (
            <svg viewBox="0 0 750 500" className="w-5 h-auto rounded-sm overflow-hidden shadow-sm">
                <rect width="750" height="500" fill="#c60b1e" />
                <rect width="750" height="250" y="125" fill="#ffc400" />
            </svg>
        ),
        ca: (
            <svg viewBox="0 0 9 6" className="w-5 h-auto rounded-sm overflow-hidden shadow-sm">
                <rect width="9" height="6" fill="#f5d033" />
                <rect width="9" height="0.66" y="0.66" fill="#d32e28" />
                <rect width="9" height="0.66" y="2" fill="#d32e28" />
                <rect width="9" height="0.66" y="3.33" fill="#d32e28" />
                <rect width="9" height="0.66" y="4.66" fill="#d32e28" />
            </svg>
        ),
        en: (
            <svg viewBox="0 0 60 30" className="w-5 h-auto rounded-sm overflow-hidden shadow-sm">
                <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
                <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
                <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" />
                <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
                <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
            </svg>
        ),
    };

    return (
        <div className="flex items-center gap-3">
            {locales.map((loc) => (
                <button
                    key={loc}
                    onClick={() => handleChange(loc)}
                    className={`transition-all duration-300 hover:scale-110 active:scale-95 flex items-center ${locale === loc
                            ? "opacity-100 ring-2 ring-stage-white/20 ring-offset-2 ring-offset-dark-base rounded-sm"
                            : "opacity-40 hover:opacity-75"
                        }`}
                    title={localeNames[loc]}
                >
                    {flags[loc]}
                </button>
            ))}
        </div>
    );
}
