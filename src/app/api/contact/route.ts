import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/schemas/contact";
import { sanitizeObject } from "@/lib/sanitize";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate with Zod
        const result = contactSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { success: false, message: "Datos inválidos." },
                { status: 400 }
            );
        }

        // Double-sanitize on the server side
        const sanitizedData = sanitizeObject(result.data);

        // TODO: Integrate email service (SendGrid, Resend, etc.)
        // For now, log the sanitized data server-side only
        console.log("[Contact Form]", {
            timestamp: new Date().toISOString(),
            data: sanitizedData,
        });

        return NextResponse.json(
            { success: true, message: "Mensaje recibido." },
            { status: 200 }
        );
    } catch {
        // Never leak error details to the client
        return NextResponse.json(
            { success: false, message: "Error interno del servidor." },
            { status: 500 }
        );
    }
}
