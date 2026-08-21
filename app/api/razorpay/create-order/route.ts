import Razorpay from "razorpay";
import { NextResponse } from "next/server";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});


export async function POST(request: Request) {
    const body = await request.json();
    const { amount } = body;

    if (!Number.isFinite(amount) || amount <= 0) {
        return NextResponse.json(
            { error: "Invalid order amount" },
            { status: 400 }
        );
    }

    try {
        const order = await razorpay.orders.create({
            amount: Math.round(amount * 100),
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        });

        return NextResponse.json(order);
    } catch (error: any) {
        console.error("RAZORPAY ORDER CREATE ERROR:", error);
        return NextResponse.json(
            { error: error?.error?.description || "Failed to create payment order" },
            { status: error?.statusCode || 500 }
        );
    }
}