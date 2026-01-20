import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/user/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/jwt";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { email, password } = await req.json();

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        const token = signToken({
            id: user._id,
            role: user.role,
            email: user.email,
        });

        const res = NextResponse.json({ success: true })
        res.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",          // 🔥 MOST IMPORTANT
            maxAge: 60 * 60 * 24 * 7,
        });
        return res;
    } catch (error) {
        console.error("LOGIN ERROR:", error);
        return NextResponse.json({ message: "Login failed" }, { status: 500 });
    }
}