import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
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

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: "Better Call Jon | Tour Manager & Producción en Barcelona",
        template: "%s | Better Call Jon",
    },
    description:
        "Agencia de Tour Management, producción de estadios y logística de festivales en Barcelona. 15 años de experiencia con Coldplay, Springsteen, Metallica, Primavera Sound y más.",
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
        locale: "es_ES",
        url: siteUrl,
        title: "Better Call Jon | Tour Manager & Producción en Barcelona",
        description:
            "La solución a todos los problemas de tu gira. 15 años de experiencia en Tour Management, producción de estadios y logística de festivales.",
        siteName: "Better Call Jon",
    },
    twitter: {
        card: "summary_large_image",
        title: "Better Call Jon | Tour Manager & Producción en Barcelona",
        description:
            "La solución a todos los problemas de tu gira. ¡Nunca problemas, sólo soluciones!",
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
};

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

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es" className={`dark ${inter.variable} ${outfit.variable}`}>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className="bg-dark-base text-stage-white antialiased">
                <Navbar />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
