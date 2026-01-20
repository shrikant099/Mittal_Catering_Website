import { dbConnect } from "@/lib/dbConnect";
import Order from "@/models/order/order";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
    req: NextRequest,
    ctx: { params: Promise<{ orderId: string }> }
) {
    try {
        await dbConnect();

        const { orderId } = await ctx.params;
        const body = await req.json();

        const order = await Order.findOneAndUpdate(
            { orderId },
            body,
            { new: true }
        );

        if (!order) {
            return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: order });
    } catch (err) {
        console.error("STATUS UPDATE ERROR:", err);
        return NextResponse.json({ success: false, message: "Failed to update" }, { status: 500 });
    }
}
