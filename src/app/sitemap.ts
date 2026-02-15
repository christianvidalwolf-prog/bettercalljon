import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bettercalljon.com";

    const routes = ["", "/servicios/tour-manager", "/servicios/produccion-estadios", "/servicios/logistica-festivales", "/servicios/merchandising", "/servicios/vehiculos"];

    return locales.flatMap((locale) =>
        routes.map((route) => ({
            url: `${baseUrl}/${locale}${route}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: route === "" ? 1 : 0.8,
            alternates: {
                languages: Object.fromEntries(
                    locales.map((l) => [l, `${baseUrl}/${l}${route}`])
                ),
            },
        }))
    );
}
