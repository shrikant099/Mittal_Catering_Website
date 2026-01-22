import { dbConnect } from "@/lib/dbConnect";
import Order from "@/models/order/order";
import { NextRequest, NextResponse } from "next/server";

// Get Order By Id
export async function GET(_: NextRequest, { params }: { params: Promise<{ orderId: string }> }) {
    try {
        await dbConnect();

        const { orderId } = await params;

        const order = await Order.findOne({ orderId }).lean();
        if (!order) {
            return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: order });
    } catch (err: any) {
        console.error("GET ORDER BY ID ERROR:", err);
        return NextResponse.json({ success: false, message: "Failed to fetch order" }, { status: 500 });
    }
}

// Delete Order
export async function DELETE(_: NextRequest, { params }: { params: Promise<{ orderId: string }> }) {
    try {
        await dbConnect();

        const { orderId } = await params;

        const deletedOrder = await Order.findOneAndDelete({ orderId });

        if (!deletedOrder) {
            return NextResponse.json(
                { success: false, message: "Order Not Found!" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, message: "Order Delete Succesfull" }, { status: 200 })
    } catch (error: any) {
        console.error(`Error delete order: ${error}`);
        return NextResponse.json({ success: false, message: error || "Something Went Wrong !" }, { status: 500 })
    };
};


// Update Order APi
export async function PUT(
    req: NextRequest,
    context: { params: Promise<{ orderId: string }> }
) {
    try {
        await dbConnect();
        const { orderId } = await context.params;

        const body = await req.json();
        const order = await Order.findOneAndUpdate({ orderId }, {
            customer: body.customer,
            status: body.status,
            paymentStatus: body.paymentStatus,
            paymentMethod: body.paymentMethod,
        
        }, { new: true });

        if (!order) {
            return NextResponse.json({ success: false, message: "Order Not Found" }, { status: 404 });
        };

        return NextResponse.json({
            success: true,
            data: order,
        });

    } catch (error: any) {
        console.error(`Error edit order: ${error}`);
        return NextResponse.json({ success: false, message: error || "Something Went Wrong" }, { status: 500 })
    }
}