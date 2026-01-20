import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/user/userModel";
import { ROLES } from "@/lib/roles";
import { signToken } from "@/lib/jwt";

export async function POST(req: Request) {
    try {
        await dbConnect();

        const { name, email, password, role } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json({ message: "Missing fields" }, { status: 400 });
        }

        const exists = await User.findOne({ email })
        if (exists) {
            return NextResponse.json({ message: "User already exists" }, { status: 409 });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || ROLES.USER
        });

        const token = signToken({
            id: user._id,
            role: user.role,
            email: user.email
        });

        const res = NextResponse.json({ success: true });
        res.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",          // 🔥 MOST IMPORTANT
            maxAge: 60 * 60 * 24 * 7,
        });
        return res;
    } catch (error) {
        console.error("SIGNUP ERROR:", error);
        return NextResponse.json({ message: "Signup failed" }, { status: 500 });
    }
}
