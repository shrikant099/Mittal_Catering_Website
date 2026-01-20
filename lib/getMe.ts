import { cookies } from "next/headers";

export async function getMe() {
    const cookie = (await cookies()).toString();

    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/me`, {
        headers: {
            Cookie: cookie,
        },
        cache: "no-store",
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.user;
}
