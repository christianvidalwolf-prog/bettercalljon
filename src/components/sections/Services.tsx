"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

interface Service {
    slug: string;
    title: string;
    shortDescription: string;
    icon: string;
    accent: string;
    glowColor: string;
}

interface ServicesProps {
    services: Service[];
}

export function Services({ services }: ServicesProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const t = useTranslations("services");

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
                        {t("tagline")}
                    </p>
                    <h2
                        className="text-3xl sm:text-4xl md:text-5xl font-bold"
                        style={{ fontFamily: "var(--font-family-display)" }}
                    >
                        {t("title")}{" "}
                        <span className="gradient-text">{t("titleHighlight")}</span>
                    </h2>
                    <p className="mt-4 text-stage-muted max-w-2xl mx-auto">
                        {t("subtitle")}
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, i) => (
                        <Link
                            key={service.title}
                            href={`/servicios/${service.slug}`}
                            className={`${i === 4 ? "md:col-span-2 lg:col-span-1" : ""}`}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="group relative rounded-2xl bg-dark-card border border-dark-border p-8 cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:border-transparent h-full"
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
                                    <div className="relative w-24 h-24 overflow-hidden rounded-xl">
                                        <Image
                                            src={service.icon}
                                            alt={`${service.title} Icon`}
                                            fill
                                            className="object-cover scale-110"
                                        />
                                    </div>
                                </div>

                                {/* Content */}
                                <h3
                                    className="text-xl font-bold mb-3 text-stage-white group-hover:text-white transition-colors"
                                    style={{ fontFamily: "var(--font-family-display)" }}
                                >
                                    {service.title}
                                </h3>
                                <p className="text-sm text-stage-muted leading-relaxed group-hover:text-gray-300 transition-colors">
                                    {service.shortDescription}
                                </p>

                                {/* Arrow */}
                                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-stage-muted group-hover:text-stage-cyan transition-colors">
                                    <span>{t("moreInfo")}</span>
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
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
