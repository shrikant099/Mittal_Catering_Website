export interface MenuVariantInput {
    label: string;
    price: number;
    discount: number;
}

/**
 * Variants are sent from the admin forms as a JSON string inside FormData
 * (multipart bodies can't carry nested arrays natively).
 */
export function parseVariants(raw: FormDataEntryValue | null): MenuVariantInput[] {
    if (!raw || typeof raw !== "string") return [];

    let parsed: unknown;
    try {
        parsed = JSON.parse(raw);
    } catch {
        return [];
    }
    if (!Array.isArray(parsed)) return [];

    return parsed
        .map((v: any) => ({
            label: String(v?.label ?? "").trim(),
            price: Number(v?.price),
            discount: Number(v?.discount) || 0,
        }))
        .filter((v) => v.label && Number.isFinite(v.price) && v.price > 0);
}

export function basePriceFromVariants(variants: MenuVariantInput[]): number {
    return Math.min(...variants.map((v) => v.price));
}
