"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ServiceSection as ServiceSectionType } from "@/data/services-data";

interface ServiceSectionProps {
    section: ServiceSectionType;
    index: number;
}

export function ServiceSection({ section, index }: ServiceSectionProps) {
    const fadeIn = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.6, delay: index * 0.1 },
    };

    if (section.type === 'text') {
        return (
            <motion.div {...fadeIn} className="mb-12 md:mb-16">
                {section.title && (
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 gradient-text">
                        {section.title}
                    </h2>
                )}
                <div className="prose prose-invert prose-lg max-w-none">
                    <p className="text-stage-muted leading-relaxed whitespace-pre-line">
                        {section.content}
                    </p>
                </div>
            </motion.div>
        );
    }

    if (section.type === 'text-image') {
        const isImageRight = section.imagePosition === 'right';
        return (
            <motion.div {...fadeIn} className="mb-12 md:mb-16">
                {section.title && (
                    <h2 className="text-2xl md:text-3xl font-bold mb-8 gradient-text">
                        {section.title}
                    </h2>
                )}
                <div className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${isImageRight ? '' : 'md:flex-row-reverse'}`}>
                    <div className={`${isImageRight ? 'md:order-1' : 'md:order-2'}`}>
                        <div className="prose prose-invert prose-lg max-w-none">
                            <p className="text-stage-muted leading-relaxed whitespace-pre-line">
                                {section.content}
                            </p>
                        </div>
                    </div>
                    {section.imageUrl && (
                        <div className={`relative h-64 md:h-96 rounded-2xl overflow-hidden ${isImageRight ? 'md:order-2' : 'md:order-1'}`}>
                            <Image
                                src={section.imageUrl}
                                alt={section.title || 'Service image'}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                </div>
            </motion.div>
        );
    }

    if (section.type === 'image' && section.imageUrl) {
        return (
            <motion.div {...fadeIn} className="mb-12 md:mb-16">
                {section.title && (
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 gradient-text">
                        {section.title}
                    </h2>
                )}
                <div className="relative h-64 md:h-[500px] rounded-2xl overflow-hidden">
                    <Image
                        src={section.imageUrl}
                        alt={section.title || 'Service image'}
                        fill
                        className="object-cover"
                    />
                </div>
            </motion.div>
        );
    }

    if (section.type === 'video' && section.videoUrl) {
        return (
            <motion.div {...fadeIn} className="mb-12 md:mb-16">
                {section.title && (
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 gradient-text">
                        {section.title}
                    </h2>
                )}
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-dark-card">
                    <iframe
                        src={section.videoUrl}
                        title={section.title || 'Service video'}
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            </motion.div>
        );
    }

    if (section.type === 'gallery' && section.images) {
        return (
            <motion.div {...fadeIn} className="mb-12 md:mb-16">
                {section.title && (
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 gradient-text">
                        {section.title}
                    </h2>
                )}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {section.images.map((img, i) => (
                        <div key={i} className="relative h-48 md:h-64 rounded-xl overflow-hidden">
                            <Image
                                src={img}
                                alt={`${section.title || 'Gallery'} ${i + 1}`}
                                fill
                                className="object-cover hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                    ))}
                </div>
            </motion.div>
        );
    }

    return null;
}
