import { dbConnect } from "@/lib/dbConnect";
import Order from "@/models/order/order";
import {
  PaymentMethod,
  PaymentStatus,
  OrderStatus,
} from "@/models/order/types/orderTypes";

import { NextRequest, NextResponse } from "next/server";

// Utility: generate internal order id for COD
function generateInternalOrderId() {
  return `MC-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json().catch(() => ({}));
    console.log("Order Body:", body);
    const {
      customer,
      items,
      subtotal,
      gst,
      total,
      paymentMethod,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = body;

    if (
      !customer ||
      !items?.length ||
      !subtotal ||
      !gst ||
      !total ||
      !paymentMethod
    ) {
      return NextResponse.json(
        { success: false, message: "Missing fields" },
        { status: 400 }
      );
    }

    const orderId =
      paymentMethod === PaymentMethod.ONLINE && razorpay_order_id
        ? razorpay_order_id
        : generateInternalOrderId();

        const order = await Order.create({
            orderId: generateInternalOrderId(),
            customer,
            items,
            subtotal,
            gst,
            total,
            status: OrderStatus.PLACED,
            paymentStatus:
              paymentMethod === PaymentMethod.ONLINE
                ? PaymentStatus.PAID
                : PaymentStatus.PENDING,
            paymentMethod,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
          });
          return NextResponse.json(
            { success: true, data: order, message: "Order Created Successfully" },
            { status: 201 }
    );
  } catch (error: any) {
    console.error("CREATE ORDER ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create order" },
      { status: 500 }
    );
  }
}

// Get Order Admin
export async function GET() {
  try {
    await dbConnect();
    const orders = await Order.find().sort({ createdAt: -1 }).limit(50).lean();
    return NextResponse.json({ success: true, data: orders });
  } catch (err) {
    console.error("GET ORDERS ERROR:", err);
    return NextResponse.json(
      { success: false, message: "Failed to get orders" },
      { status: 500 }
    );
  }
}
