import Razorpay from "razorpay";
import { NextResponse } from "next/server";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});


export async function POST(request: Request) {
    const body = await request.json();
    const { amount } = body;
    console.log("Amount received:", amount);
    const order = await razorpay.orders.create({
        amount: Math.round(amount * 100),
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
    });
    console.log("Order created amount:", order.amount);

    return NextResponse.json(order)
}