"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { contactSchema, type ContactFormData } from "@/lib/schemas/contact";

type FormState =
    | { status: "idle" }
    | { status: "submitting" }
    | { status: "success" }
    | { status: "error"; message: string }
    | { status: "validation"; errors: Record<string, string> };

const serviceValues = [
    { value: "tour-manager", key: "tourManager" },
    { value: "produccion-estadios", key: "stadiumProduction" },
    { value: "logistica-festivales", key: "festivalLogistics" },
    { value: "merchandising", key: "merchandising" },
    { value: "vehiculos", key: "vehicles" },
] as const;

export function Contact() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const [formState, setFormState] = useState<FormState>({ status: "idle" });
    const t = useTranslations("contact");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormState({ status: "submitting" });

        const formData = new FormData(e.currentTarget);
        const raw = {
            name: formData.get("name") as string,
            company: formData.get("company") as string,
            email: formData.get("email") as string,
            phone: (formData.get("phone") as string) || "",
            service: formData.get("service") as string,
            message: formData.get("message") as string,
        };

        const result = contactSchema.safeParse(raw);
        if (!result.success) {
            const errors: Record<string, string> = {};
            result.error.issues.forEach((issue) => {
                const key = issue.path[0] as string;
                if (!errors[key]) errors[key] = issue.message;
            });
            setFormState({ status: "validation", errors });
            return;
        }

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(result.data),
            });

            if (!res.ok) {
                setFormState({
                    status: "error",
                    message: t("errors.submitError"),
                });
                return;
            }

            setFormState({ status: "success" });
            (e.target as HTMLFormElement).reset();
        } catch {
            setFormState({
                status: "error",
                message: t("errors.connectionError"),
            });
        }
    };

    const getError = (field: string) =>
        formState.status === "validation" ? formState.errors[field] : undefined;

    const inputClasses = (field: string) =>
        `w-full bg-dark-surface border ${getError(field)
            ? "border-red-500"
            : "border-dark-border focus:border-stage-magenta"
        } rounded-xl px-4 py-3 text-sm text-stage-white placeholder:text-stage-muted/50 outline-none transition-all duration-300 focus:ring-1 focus:ring-stage-magenta/30`;

    return (
        <section
            ref={sectionRef}
            id="contacto"
            className="section-padding relative overflow-hidden"
        >
            {/* Background */}
            <div
                className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle, rgba(224, 64, 251, 0.2), transparent 70%)",
                }}
            />

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <p className="text-sm uppercase tracking-[0.3em] text-stage-amber mb-4 font-medium">
                        {t("tagline")}
                    </p>
                    <h2
                        className="text-3xl sm:text-4xl md:text-5xl font-bold"
                        style={{ fontFamily: "var(--font-family-display)" }}
                    >
                        <span className="gradient-text">{t("title")}</span>
                    </h2>
                    <p className="mt-4 text-stage-muted max-w-xl mx-auto">
                        {t("subtitle")}
                    </p>
                </motion.div>

                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="glass rounded-2xl p-6 sm:p-8 md:p-10"
                >
                    {formState.status === "success" ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-12"
                        >
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-stage-magenta to-stage-cyan flex items-center justify-center">
                                <svg
                                    className="w-8 h-8 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                            <h3
                                className="text-2xl font-bold mb-2"
                                style={{ fontFamily: "var(--font-family-display)" }}
                            >
                                {t("success.title")}
                            </h3>
                            <p className="text-stage-muted">
                                {t("success.message")}
                            </p>
                            <button
                                onClick={() => setFormState({ status: "idle" })}
                                className="mt-6 text-sm text-stage-cyan hover:underline"
                            >
                                {t("success.sendAnother")}
                            </button>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} noValidate className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {/* Name */}
                                <div>
                                    <label
                                        htmlFor="contact-name"
                                        className="block text-sm font-medium text-stage-muted mb-2"
                                    >
                                        {t("form.name")}
                                    </label>
                                    <input
                                        id="contact-name"
                                        name="name"
                                        type="text"
                                        required
                                        placeholder={t("form.namePlaceholder")}
                                        className={inputClasses("name")}
                                    />
                                    {getError("name") && (
                                        <p className="mt-1 text-xs text-red-400">
                                            {getError("name")}
                                        </p>
                                    )}
                                </div>

                                {/* Company */}
                                <div>
                                    <label
                                        htmlFor="contact-company"
                                        className="block text-sm font-medium text-stage-muted mb-2"
                                    >
                                        {t("form.company")}
                                    </label>
                                    <input
                                        id="contact-company"
                                        name="company"
                                        type="text"
                                        required
                                        placeholder={t("form.companyPlaceholder")}
                                        className={inputClasses("company")}
                                    />
                                    {getError("company") && (
                                        <p className="mt-1 text-xs text-red-400">
                                            {getError("company")}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label
                                        htmlFor="contact-email"
                                        className="block text-sm font-medium text-stage-muted mb-2"
                                    >
                                        {t("form.email")}
                                    </label>
                                    <input
                                        id="contact-email"
                                        name="email"
                                        type="email"
                                        required
                                        placeholder={t("form.emailPlaceholder")}
                                        className={inputClasses("email")}
                                    />
                                    {getError("email") && (
                                        <p className="mt-1 text-xs text-red-400">
                                            {getError("email")}
                                        </p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label
                                        htmlFor="contact-phone"
                                        className="block text-sm font-medium text-stage-muted mb-2"
                                    >
                                        {t("form.phone")}
                                    </label>
                                    <input
                                        id="contact-phone"
                                        name="phone"
                                        type="tel"
                                        placeholder={t("form.phonePlaceholder")}
                                        className={inputClasses("phone")}
                                    />
                                    {getError("phone") && (
                                        <p className="mt-1 text-xs text-red-400">
                                            {getError("phone")}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Service */}
                            <div>
                                <label
                                    htmlFor="contact-service"
                                    className="block text-sm font-medium text-stage-muted mb-2"
                                >
                                    {t("form.service")}
                                </label>
                                <select
                                    id="contact-service"
                                    name="service"
                                    required
                                    className={`${inputClasses("service")} appearance-none cursor-pointer`}
                                    defaultValue=""
                                >
                                    <option value="" disabled>
                                        {t("form.servicePlaceholder")}
                                    </option>
                                    {serviceValues.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {t(`serviceOptions.${opt.key}`)}
                                        </option>
                                    ))}
                                </select>
                                {getError("service") && (
                                    <p className="mt-1 text-xs text-red-400">
                                        {getError("service")}
                                    </p>
                                )}
                            </div>

                            {/* Message */}
                            <div>
                                <label
                                    htmlFor="contact-message"
                                    className="block text-sm font-medium text-stage-muted mb-2"
                                >
                                    {t("form.message")}
                                </label>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    required
                                    rows={5}
                                    placeholder={t("form.messagePlaceholder")}
                                    className={`${inputClasses("message")} resize-none`}
                                />
                                {getError("message") && (
                                    <p className="mt-1 text-xs text-red-400">
                                        {getError("message")}
                                    </p>
                                )}
                            </div>

                            {/* Error Banner */}
                            {formState.status === "error" && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-400"
                                >
                                    {formState.message}
                                </motion.div>
                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={formState.status === "submitting"}
                                className="w-full py-4 px-8 rounded-xl bg-gradient-to-r from-stage-magenta to-stage-cyan text-white font-semibold text-lg hover:shadow-[0_0_40px_rgba(224,64,251,0.4)] transition-all duration-500 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {formState.status === "submitting" ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg
                                            className="animate-spin w-5 h-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                            />
                                        </svg>
                                        {t("form.submitting")}
                                    </span>
                                ) : (
                                    t("form.submit")
                                )}
                            </button>
                        </form>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
