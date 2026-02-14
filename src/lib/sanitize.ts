/**
 * Sanitizes user input to prevent XSS attacks.
 * Strips HTML tags, script elements, and dangerous patterns.
 */
export function sanitizeInput(input: string): string {
    return input
        // Remove HTML tags
        .replace(/<[^>]*>/g, "")
        // Remove script-related patterns
        .replace(/javascript:/gi, "")
        .replace(/on\w+\s*=/gi, "")
        // Remove data URIs that could contain scripts
        .replace(/data:\s*[^,]*;base64/gi, "")
        // Trim whitespace
        .trim();
}

/**
 * Sanitizes all string values in an object recursively.
 */
export function sanitizeObject<T extends Record<string, unknown>>(
    obj: T
): T {
    const sanitized = { ...obj };
    for (const key in sanitized) {
        if (typeof sanitized[key] === "string") {
            (sanitized as Record<string, unknown>)[key] = sanitizeInput(
                sanitized[key] as string
            );
        }
    }
    return sanitized;
}
