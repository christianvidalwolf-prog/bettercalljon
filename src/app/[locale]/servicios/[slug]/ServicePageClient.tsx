"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { ServiceSection } from "@/components/service/ServiceSection";
import type { ServiceContent } from "@/data/services-data";
import { useState } from "react";

interface ServicePageClientProps {
  service: ServiceContent;
}

export function ServicePageClient({ service }: ServicePageClientProps) {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);
  const t = useTranslations("servicePage");
  const t_services = useTranslations("services");

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        {service.heroImage && !imageError && (
          <div className="absolute inset-0 z-0">
            <Image
              src={service.heroImage}
              alt=""
              fill
              className="object-cover opacity-30"
              priority
              onError={() => setImageError(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/50 via-dark-bg/80 to-dark-bg" />
          </div>
        )}

        {/* Background Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none z-[1]"
          style={{
            background: `radial-gradient(circle, ${service.glowColor}, transparent 70%)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-block"
          >
            <div
              className={`w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-black border-2 border-transparent p-4 shadow-2xl relative overflow-hidden group`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-20`} />
              <div className="relative w-full h-full z-10">
                <Image
                  src={service.icon}
                  alt={service.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className={`absolute inset-0 border-2 border-transparent bg-clip-border rounded-2xl`}
                style={{ background: `linear-gradient(to bottom right, var(--stage-magenta), var(--stage-cyan)) border-box`, mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)', maskComposite: 'exclude' }} />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
            style={{ fontFamily: "var(--font-family-display)" }}
          >
            <span className="gradient-text">{t_services(`cards.${service.slug}.title`)}</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-stage-muted max-w-3xl mx-auto"
          >
            {t_services(`cards.${service.slug}.description`)}
          </motion.p>

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8"
          >
            <button
              onClick={() => router.push('/#servicios')}
              className="inline-flex items-center gap-2 text-stage-cyan hover:text-stage-magenta transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span>{t("backToServices")}</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="section-padding relative">
        <div className="max-w-5xl mx-auto">
          {service.sections.map((section, index) => {
            // Priority: Localized JSON content -> raw Sanity content
            const translatedTitle = t_services.raw(`details.${service.slug}.sections`)?.[index]?.title || section.title;
            const translatedContent = t_services.raw(`details.${service.slug}.sections`)?.[index]?.content || section.content;

            const translatedSection = {
              ...section,
              title: translatedTitle,
              content: translatedContent,
            };

            return <ServiceSection key={index} section={translatedSection} index={index} />;
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto mt-16 md:mt-24 text-center"
        >
          <div className="bg-dark-card border border-dark-border rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {t("interested")}
            </h2>
            <p className="text-stage-muted mb-8">
              {t("contactUs")}
            </p>
            <button
              onClick={() => router.push('/#contacto')}
              className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-stage-magenta to-stage-cyan text-white hover:shadow-[0_0_40px_rgba(224,64,251,0.5)] transition-all duration-500 hover:scale-105"
            >
              {t("cta")}
              <svg
                className="w-5 h-5"
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
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
