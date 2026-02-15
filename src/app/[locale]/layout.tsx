import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { locales, type Locale } from "@/i18n/config";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
    display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bettercalljon.com";

const ogLocaleMap: Record<Locale, string> = {
    es: "es_ES",
    ca: "ca_ES",
    en: "en_US",
};

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "metadata" });

    return {
        metadataBase: new URL(siteUrl),
        title: {
            default: t("title"),
            template: t("titleTemplate"),
        },
        description: t("description"),
        keywords: [
            "Tour manager Barcelona",
            "Producción conciertos estadio",
            "Logística de festivales",
            "Tour management España",
            "Producción Palau Sant Jordi",
            "Producción Estadi Olímpic",
            "Merchandising giras",
            "Festival logistics Spain",
            "Jonathan Vidal",
            "Better Call Jon",
        ],
        authors: [{ name: "Jonathan Vidal" }],
        creator: "Better Call Jon",
        openGraph: {
            type: "website",
            locale: ogLocaleMap[locale as Locale] || "es_ES",
            url: siteUrl,
            title: t("title"),
            description: t("ogDescription"),
            siteName: "Better Call Jon",
        },
        twitter: {
            card: "summary_large_image",
            title: t("title"),
            description: t("twitterDescription"),
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
        alternates: {
            canonical: `${siteUrl}/${locale}`,
            languages: {
                es: `${siteUrl}/es`,
                ca: `${siteUrl}/ca`,
                en: `${siteUrl}/en`,
            },
        },
    };
}

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    if (!locales.includes(locale as Locale)) notFound();

    const messages = await getMessages();

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                name: "Better Call Jon",
                url: siteUrl,
                description:
                    "Agencia de Tour Management, producción de estadios y logística de festivales en Barcelona.",
                foundingDate: "2010",
                founder: {
                    "@type": "Person",
                    name: "Jonathan Vidal",
                    jobTitle: "Tour Manager & Director",
                },
                address: {
                    "@type": "PostalAddress",
                    addressLocality: "Barcelona",
                    addressCountry: "ES",
                },
                areaServed: {
                    "@type": "Place",
                    name: "Europe",
                },
            },
            {
                "@type": "ProfessionalService",
                name: "Better Call Jon",
                url: siteUrl,
                description:
                    "Servicios profesionales de Tour Management, producción de conciertos en estadios y arenas, logística de festivales, merchandising y vehículos.",
                priceRange: "$$$$",
                address: {
                    "@type": "PostalAddress",
                    addressLocality: "Barcelona",
                    addressCountry: "ES",
                },
                hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "Servicios",
                    itemListElement: [
                        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tour Management" } },
                        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Producción de Estadios y Arenas" } },
                        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Logística de Festivales" } },
                        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Merchandising" } },
                        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Vehículos" } },
                    ],
                },
            },
        ],
    };

    return (
        <html lang={locale} className={`dark ${inter.variable} ${outfit.variable}`}>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className="bg-dark-base text-stage-white antialiased">
                <NextIntlClientProvider messages={messages}>
                    <Navbar />
                    <main>{children}</main>
                    <Footer />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
