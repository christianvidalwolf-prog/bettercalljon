import { z } from "zod";
import { sanitizeInput } from "@/lib/sanitize";

const sanitizedString = (minLength: number, maxLength: number) =>
    z
        .string()
        .min(minLength, `Mínimo ${minLength} caracteres`)
        .max(maxLength, `Máximo ${maxLength} caracteres`)
        .transform(sanitizeInput);

const serviceValues = {
    "tour-manager": "tour-manager",
    "produccion-estadios": "produccion-estadios",
    "logistica-festivales": "logistica-festivales",
    "merchandising": "merchandising",
    "vehiculos": "vehiculos",
} as const;

export const contactSchema = z.object({
    name: sanitizedString(2, 100),
    company: sanitizedString(2, 150),
    email: z
        .string()
        .email("Introduce un email válido")
        .max(254, "Email demasiado largo")
        .transform((v) => v.toLowerCase().trim()),
    phone: z
        .string()
        .max(20, "Teléfono demasiado largo")
        .optional()
        .or(z.literal(""))
        .transform((v) => (v ? sanitizeInput(v) : "")),
    service: z.enum(serviceValues, {
        error: "Selecciona un servicio",
    }),
    message: sanitizedString(10, 2000),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const serviceOptions = [
    { value: "tour-manager", label: "Tour Manager" },
    { value: "produccion-estadios", label: "Producción de Estadios y Arenas" },
    { value: "logistica-festivales", label: "Logística de Festivales" },
    { value: "merchandising", label: "Merchandising" },
    { value: "vehiculos", label: "Vehículos" },
] as const;
