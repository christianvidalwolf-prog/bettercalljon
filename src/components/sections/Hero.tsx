"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function ParticleCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        const particles: Array<{
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            opacity: number;
            hue: number;
        }> = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        // Initialize particles
        for (let i = 0; i < 60; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.5 + 0.1,
                hue: Math.random() > 0.5 ? 290 : 190, // magenta or cyan
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${p.opacity})`;
                ctx.fill();
            });

            // Draw connections
            particles.forEach((a, i) => {
                particles.slice(i + 1).forEach((b) => {
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.strokeStyle = `hsla(290, 100%, 70%, ${0.05 * (1 - dist / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });

            animationId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0"
            style={{ opacity: 0.6 }}
        />
    );
}

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    const headlineWords = "La solución a todos los problemas de tu gira".split(" ");

    return (
        <section
            ref={containerRef}
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(ellipse at 20% 50%, rgba(224, 64, 251, 0.15), transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(0, 229, 255, 0.1), transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(255, 171, 0, 0.08), transparent 50%)",
                    }}
                />
                <ParticleCanvas />
            </div>

            {/* Noise Overlay */}
            <div
                className="absolute inset-0 z-[1] opacity-[0.03]"
                style={{
                    backgroundImage:
                        'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
                }}
            />

            {/* Content */}
            <motion.div
                style={{ y, opacity }}
                className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center"
            >
                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-sm md:text-base uppercase tracking-[0.3em] text-stage-magenta mb-6 md:mb-8 font-medium"
                >
                    Tour Management · Producción · Logística
                </motion.p>

                {/* Headline */}
                <h1
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 md:mb-8"
                    style={{ fontFamily: "var(--font-family-display)" }}
                >
                    {headlineWords.map((word, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: 0.5 + i * 0.08,
                                ease: "easeOut",
                            }}
                            className="inline-block mr-[0.3em]"
                        >
                            {word === "solución" || word === "gira" ? (
                                <span className="gradient-text">{word}</span>
                            ) : (
                                word
                            )}
                        </motion.span>
                    ))}
                </h1>

                {/* Mantra */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                    className="text-lg md:text-xl lg:text-2xl text-stage-muted mb-10 md:mb-12 italic"
                >
                    ¡Nunca problemas, sólo soluciones!
                </motion.p>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.8 }}
                >
                    <a
                        href="#contacto"
                        className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-stage-magenta to-stage-cyan text-white hover:shadow-[0_0_40px_rgba(224,64,251,0.5)] transition-all duration-500 hover:scale-105 animate-pulse-glow"
                    >
                        Hablemos
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
                    </a>
                </motion.div>

                {/* Experience Badge */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 2.2 }}
                    className="mt-16 md:mt-20 flex flex-wrap items-center justify-center gap-y-6 gap-x-4 sm:gap-12 text-stage-muted text-sm px-2 sm:px-0"
                >
                    <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xl sm:text-2xl font-bold text-stage-white">15+</span>
                        <span className="text-[10px] sm:text-xs leading-tight text-left">
                            años de
                            <br />
                            experiencia
                        </span>
                    </div>
                    <div className="hidden sm:block w-px h-8 bg-dark-border" />
                    <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xl sm:text-2xl font-bold text-stage-white">500+</span>
                        <span className="text-[10px] sm:text-xs leading-tight text-left">
                            eventos
                            <br />
                            gestionados
                        </span>
                    </div>
                    <div className="hidden sm:block w-px h-8 bg-dark-border" />
                    <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xl sm:text-2xl font-bold text-stage-white">BCN</span>
                        <span className="text-[10px] sm:text-xs leading-tight text-left">
                            Barcelona
                            <br />
                            headquarters
                        </span>
                    </div>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
            >
                <div className="animate-bounce-slow flex flex-col items-center gap-2">
                    <span className="text-xs text-stage-muted uppercase tracking-widest">
                        Scroll
                    </span>
                    <svg
                        className="w-5 h-5 text-stage-magenta"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                    </svg>
                </div>
            </motion.div>
        </section>
    );
}
