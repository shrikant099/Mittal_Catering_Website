import { cookies } from "next/headers";
import { verifyToken } from "./jwt";

interface JwtPayload {
    id: string;
    email: string;
    role: string;
}

export async function getAuthUser(): Promise<JwtPayload | null> {
    const cookieStore = await cookies();      // call cookies()
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    try {
        return verifyToken(token) as JwtPayload;
    } catch (error) {
        return null;
    }
}
