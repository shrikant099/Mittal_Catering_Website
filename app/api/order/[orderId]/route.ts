import { dbConnect } from "@/lib/dbConnect";
import Order from "@/models/order/order";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest, { params }: { params: Promise<{ orderId: string }> }) {
    try {
        await dbConnect();

        const { orderId } = await params;

        const order = await Order.findOne({ orderId }).lean();
        if (!order) {
            return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: order });
    } catch (err) {
        console.error("GET ORDER BY ID ERROR:", err);
        return NextResponse.json({ success: false, message: "Failed to fetch order" }, { status: 500 });
    }
}
