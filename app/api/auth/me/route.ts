import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/user/userModel";

interface JwtPayload {
    id: string;
    email: string;
    role: string;
}

export async function GET() {
    try {
        await dbConnect();

        const token = (await cookies()).get("token")?.value;

        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        let decoded: JwtPayload;

        try {
            decoded = verifyToken(token) as JwtPayload;
        } catch {
            return NextResponse.json(
                { message: "Invalid token" },
                { status: 401 }
            );
        }

        /**
         * Fetch user (no password)
         */
        const user = await User.findById(decoded.id)
            .select("-password")
            .lean();

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            user,
        });
    } catch (error) {
        console.error("GET ME ERROR:", error);
        return NextResponse.json(
            { message: "Failed to fetch user" },
            { status: 500 }
        );
    }
}
