import { headers } from "next/headers";

/**
 * Resolves the origin to use for server-side fetches to this app's own API routes.
 * Uses the incoming request's host so it works in local dev, previews, and production
 * alike, instead of relying on NEXT_PUBLIC_APP_URL (which is pinned to the prod domain).
 */
export async function getBaseUrl() {
    const h = await headers();
    const host = h.get("host");

    if (!host) {
        return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    }

    const protocol = h.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
    return `${protocol}://${host}`;
}
