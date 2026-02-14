export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-dark-border bg-dark-surface/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div>
                        <h3
                            className="text-xl font-bold mb-2"
                            style={{ fontFamily: "var(--font-family-display)" }}
                        >
                            <span className="gradient-text">Better Call</span> Jon
                        </h3>
                        <p className="text-sm text-stage-muted max-w-xs">
                            Tour Management, producción de estadios y logística de festivales.
                            Barcelona.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-stage-white mb-4 uppercase tracking-wider">
                            Navegación
                        </h4>
                        <ul className="space-y-2">
                            {[
                                { href: "#servicios", label: "Servicios" },
                                { href: "#archivo", label: "Archivo" },
                                { href: "#contacto", label: "Contacto" },
                            ].map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-stage-muted hover:text-stage-magenta transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-sm font-semibold text-stage-white mb-4 uppercase tracking-wider">
                            Contacto
                        </h4>
                        <ul className="space-y-2 text-sm text-stage-muted">
                            <li>Barcelona, España</li>
                            <li>
                                <a
                                    href="mailto:info@bettercalljon.com"
                                    className="hover:text-stage-cyan transition-colors"
                                >
                                    info@bettercalljon.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-dark-border flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-stage-muted">
                        © {currentYear} Better Call Jon. Todos los derechos reservados.
                    </p>
                    <p className="text-xs text-stage-muted">
                        ¡Nunca problemas, sólo soluciones!
                    </p>
                </div>
            </div>
        </footer>
    );
}
