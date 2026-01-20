// lib/roles.ts
export const ROLES = {
    SUPER_ADMIN: "super_admin",
    ADMIN: "admin",
    USER: "user",
} as const;

/**
 * Union type from roles
 */
export type Role = (typeof ROLES)[keyof typeof ROLES];