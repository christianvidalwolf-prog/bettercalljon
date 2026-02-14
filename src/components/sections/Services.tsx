"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const services = [
    {
        icon: (
            <div className="relative w-[88px] h-[88px] overflow-hidden rounded-lg">
                <Image
                    src="/icons/tour-manager.png"
                    alt="Tour Manager Icon"
                    fill
                    className="object-cover rounded-lg"
                />
            </div>
        ),
        title: "Tour Manager",
        description:
            "Gestión integral de giras nacionales e internacionales. El adulto de la gira que convierte el caos en precisión.",
        accent: "from-stage-magenta to-pink-600",
        glowColor: "rgba(224, 64, 251, 0.3)",
    },
    {
        icon: (
            <div className="relative w-[88px] h-[88px] overflow-hidden rounded-lg">
                <Image
                    src="/icons/estadios.png"
                    alt="Estadios Icon"
                    fill
                    className="object-cover rounded-lg"
                />
            </div>
        ),
        title: "Producción de Estadios y Arenas",
        description:
            "Palau Sant Jordi, Estadi Olímpic y más. Producción a gran escala con estándares internacionales.",
        accent: "from-stage-cyan to-blue-600",
        glowColor: "rgba(0, 229, 255, 0.3)",
    },
    {
        icon: (
            <div className="relative w-[88px] h-[88px] overflow-hidden rounded-xl">
                <Image
                    src="/icons/festivales.png"
                    alt="Festivales Icon"
                    fill
                    className="object-cover rounded-xl scale-105"
                />
            </div>
        ),
        title: "Logística de Festivales",
        description:
            "Primavera Sound, Sónar, Cruïlla. Coordinación de escenarios, artistas y operaciones en tiempo real.",
        accent: "from-stage-amber to-orange-600",
        glowColor: "rgba(255, 171, 0, 0.3)",
    },
    {
        icon: (
            <div className="relative w-[88px] h-[88px] overflow-hidden rounded-lg">
                <Image
                    src="/icons/merchandising.png"
                    alt="Merchandising Icon"
                    fill
                    className="object-cover rounded-lg"
                />
            </div>
        ),
        title: "Merchandising",
        description:
            "Gestión completa de merchandising oficial: diseño, producción, logística y venta en gira.",
        accent: "from-stage-magenta to-stage-cyan",
        glowColor: "rgba(224, 64, 251, 0.2)",
    },
    {
        icon: (
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
            </svg>
        ),
        title: "Vehículos",
        description:
            "Flota propia de vehículos para transporte de equipos, backline y personal técnico.",
        accent: "from-gray-400 to-gray-600",
        glowColor: "rgba(200, 200, 220, 0.15)",
    },
];

export function Services() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section
            ref={sectionRef}
            id="servicios"
            className="section-padding relative overflow-hidden"
        >
            {/* Background Glow */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20 blur-3xl pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle, rgba(224, 64, 251, 0.15), transparent 70%)",
                }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 md:mb-20"
                >
                    <p className="text-sm uppercase tracking-[0.3em] text-stage-magenta mb-4 font-medium">
                        El Arsenal
                    </p>
                    <h2
                        className="text-3xl sm:text-4xl md:text-5xl font-bold"
                        style={{ fontFamily: "var(--font-family-display)" }}
                    >
                        Nuestros{" "}
                        <span className="gradient-text">Servicios</span>
                    </h2>
                    <p className="mt-4 text-stage-muted max-w-2xl mx-auto">
                        Cinco pilares de excelencia operativa que cubren cada aspecto de tu
                        producción en vivo.
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, i) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className={`group relative rounded-2xl bg-dark-card border border-dark-border p-8 cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:border-transparent ${i === 4 ? "md:col-span-2 lg:col-span-1" : ""
                                }`}
                            style={{
                                willChange: "transform",
                            }}
                            whileHover={{
                                boxShadow: `0 20px 60px ${service.glowColor}`,
                            }}
                        >
                            {/* Hover Gradient Overlay */}
                            <div
                                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.accent} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500`}
                            />

                            {/* Icon */}
                            <div
                                className={`inline-flex items-center justify-center w-24 h-24 rounded-xl bg-gradient-to-br ${service.accent} text-white mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}
                            >
                                {service.icon}
                            </div>

                            {/* Content */}
                            <h3
                                className="text-xl font-bold mb-3 text-stage-white group-hover:text-white transition-colors"
                                style={{ fontFamily: "var(--font-family-display)" }}
                            >
                                {service.title}
                            </h3>
                            <p className="text-sm text-stage-muted leading-relaxed group-hover:text-gray-300 transition-colors">
                                {service.description}
                            </p>

                            {/* Arrow */}
                            <div className="mt-6 flex items-center gap-2 text-sm font-medium text-stage-muted group-hover:text-stage-cyan transition-colors">
                                <span>Más información</span>
                                <svg
                                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
