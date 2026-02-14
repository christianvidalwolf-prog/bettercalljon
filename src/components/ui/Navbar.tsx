"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import clsx from "clsx";

const navLinks = [
    { href: "#servicios", label: "Servicios" },
    { href: "#archivo", label: "Hall of Fame" },
    { href: "#contacto", label: "Contacto" },
];

export function Navbar() {
    const [isVisible, setIsVisible] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > 100) {
            setIsVisible(latest < previous);
            setIsScrolled(true);
        } else {
            setIsVisible(true);
            setIsScrolled(false);
        }
    });

    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    return (
        <>
            <motion.header
                initial={{ y: 0 }}
                animate={{ y: isVisible ? 0 : -100 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={clsx(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    isScrolled ? "glass" : "bg-transparent"
                )}
            >
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <a
                        href="#"
                        className="font-display text-xl md:text-2xl font-bold tracking-tight"
                        style={{ fontFamily: "var(--font-family-display)" }}
                    >
                        <span className="gradient-text">Better Call</span>{" "}
                        <span className="text-stage-white">Jon</span>
                    </a>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-stage-muted hover:text-stage-white transition-colors duration-200 relative group"
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-stage-magenta transition-all duration-300 group-hover:w-full" />
                            </a>
                        ))}
                        <a
                            href="#contacto"
                            className="px-5 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-stage-magenta to-stage-cyan text-white hover:shadow-[0_0_24px_rgba(224,64,251,0.4)] transition-all duration-300 hover:scale-105"
                        >
                            Hablemos
                        </a>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5"
                        aria-label="Abrir menú"
                    >
                        <span
                            className={clsx(
                                "block w-6 h-0.5 bg-stage-white transition-all duration-300",
                                mobileOpen && "rotate-45 translate-y-2"
                            )}
                        />
                        <span
                            className={clsx(
                                "block w-6 h-0.5 bg-stage-white transition-all duration-300",
                                mobileOpen && "opacity-0"
                            )}
                        />
                        <span
                            className={clsx(
                                "block w-6 h-0.5 bg-stage-white transition-all duration-300",
                                mobileOpen && "-rotate-45 -translate-y-2"
                            )}
                        />
                    </button>
                </nav>
            </motion.header>

            {/* Mobile Menu */}
            <motion.div
                initial={false}
                animate={mobileOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: "100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed inset-0 z-40 bg-dark-base/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center gap-8"
                style={{ pointerEvents: mobileOpen ? "auto" : "none" }}
            >
                {navLinks.map((link) => (
                    <a
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="text-2xl font-display font-semibold text-stage-white hover:text-stage-magenta transition-colors"
                        style={{ fontFamily: "var(--font-family-display)" }}
                    >
                        {link.label}
                    </a>
                ))}
                <a
                    href="#contacto"
                    onClick={() => setMobileOpen(false)}
                    className="mt-4 px-8 py-3 text-lg font-semibold rounded-full bg-gradient-to-r from-stage-magenta to-stage-cyan text-white"
                >
                    Hablemos
                </a>
            </motion.div>
        </>
    );
}
