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

    return (
        <div className="flex items-center gap-1 text-sm">
            {locales.map((loc, i) => (
                <span key={loc} className="flex items-center">
                    {i > 0 && <span className="text-dark-border mx-1">/</span>}
                    <button
                        onClick={() => handleChange(loc)}
                        className={`font-medium transition-colors duration-200 ${
                            locale === loc
                                ? "text-stage-white"
                                : "text-stage-muted hover:text-stage-white"
                        }`}
                    >
                        {localeNames[loc]}
                    </button>
                </span>
            ))}
        </div>
    );
}
