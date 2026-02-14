"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

type Tier = "tour-manager" | "estadios" | "festivales";

interface Artist {
    name: string;
    role?: string;
}

const tiers: Record<Tier, { label: string; artists: Artist[] }> = {
    "tour-manager": {
        label: "Tour Manager",
        artists: [
            { name: "Nick Lowe", role: "Tour Manager" },
            { name: "The Lemon Twigs", role: "Tour Manager" },
        ],
    },
    estadios: {
        label: "Estadios",
        artists: [
            { name: "Coldplay", role: "Producción" },
            { name: "Bruce Springsteen", role: "Producción" },
            { name: "Metallica", role: "Producción" },
            { name: "Rosalía", role: "Producción" },
        ],
    },
    festivales: {
        label: "Festivales",
        artists: [
            { name: "Primavera Sound", role: "Logística" },
            { name: "Sónar", role: "Logística" },
            { name: "Cruïlla", role: "Logística" },
        ],
    },
};

const tierKeys: Tier[] = ["tour-manager", "estadios", "festivales"];

const accentColors: Record<Tier, string> = {
    "tour-manager": "from-stage-magenta to-pink-700",
    estadios: "from-stage-cyan to-blue-700",
    festivales: "from-stage-amber to-orange-700",
};

const glowColors: Record<Tier, string> = {
    "tour-manager": "rgba(224, 64, 251, 0.25)",
    estadios: "rgba(0, 229, 255, 0.25)",
    festivales: "rgba(255, 171, 0, 0.25)",
};

export function HallOfFame() {
    const [activeTier, setActiveTier] = useState<Tier>("estadios");
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const currentTier = tiers[activeTier];

    return (
        <section
            ref={sectionRef}
            id="archivo"
            className="section-padding relative overflow-hidden"
        >
            {/* Background */}
            <div
                className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle, rgba(0, 229, 255, 0.2), transparent 70%)",
                }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <p className="text-sm uppercase tracking-[0.3em] text-stage-cyan mb-4 font-medium">
                        El Archivo
                    </p>
                    <h2
                        className="text-3xl sm:text-4xl md:text-5xl font-bold"
                        style={{ fontFamily: "var(--font-family-display)" }}
                    >
                        Salón de la{" "}
                        <span className="gradient-text">Fama</span>
                    </h2>
                    <p className="mt-4 text-stage-muted max-w-2xl mx-auto">
                        15 años trabajando con los artistas y festivales más importantes de
                        la escena internacional.
                    </p>
                </motion.div>

                {/* Tier Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex justify-center mb-12"
                >
                    <div className="inline-flex rounded-full bg-dark-card border border-dark-border p-1.5 gap-1">
                        {tierKeys.map((tier) => (
                            <button
                                key={tier}
                                onClick={() => setActiveTier(tier)}
                                className={`relative px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${activeTier === tier
                                        ? "text-white"
                                        : "text-stage-muted hover:text-stage-white"
                                    }`}
                            >
                                {activeTier === tier && (
                                    <motion.div
                                        layoutId="activeTierBg"
                                        className={`absolute inset-0 rounded-full bg-gradient-to-r ${accentColors[tier]}`}
                                        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                                    />
                                )}
                                <span className="relative z-10">{tiers[tier].label}</span>
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Artists Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTier}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className={`grid gap-5 ${currentTier.artists.length <= 2
                                ? "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto"
                                : currentTier.artists.length === 3
                                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto"
                                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                            }`}
                    >
                        {currentTier.artists.map((artist, i) => (
                            <motion.div
                                key={artist.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: i * 0.08 }}
                                className="group relative rounded-2xl overflow-hidden cursor-pointer"
                                whileHover={{ scale: 1.03 }}
                            >
                                {/* Card Background */}
                                <div
                                    className="aspect-[4/5] bg-dark-card border border-dark-border rounded-2xl flex flex-col items-center justify-center p-6 relative overflow-hidden transition-all duration-500"
                                    style={{
                                        boxShadow: `0 0 0px ${glowColors[activeTier]}`,
                                    }}
                                >
                                    {/* Gradient Glow on Hover */}
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${accentColors[activeTier]} opacity-0 group-hover:opacity-[0.12] transition-opacity duration-500`}
                                    />

                                    {/* Name Initial */}
                                    <div
                                        className={`w-20 h-20 rounded-full bg-gradient-to-br ${accentColors[activeTier]} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}
                                    >
                                        <span
                                            className="text-3xl font-bold text-white"
                                            style={{ fontFamily: "var(--font-family-display)" }}
                                        >
                                            {artist.name.charAt(0)}
                                        </span>
                                    </div>

                                    {/* Name */}
                                    <h3
                                        className="text-lg font-bold text-stage-white text-center mb-2"
                                        style={{ fontFamily: "var(--font-family-display)" }}
                                    >
                                        {artist.name}
                                    </h3>

                                    {/* Role Badge */}
                                    {artist.role && (
                                        <span className="text-xs uppercase tracking-wider text-stage-muted bg-dark-surface px-3 py-1 rounded-full">
                                            {artist.role}
                                        </span>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
