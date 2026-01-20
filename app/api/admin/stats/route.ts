import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Order from "@/models/order/order";

export async function GET(_: NextRequest) {
  try {
    await dbConnect();

    const since = new Date(Date.now() - 24 * 60 * 60 * 1000); // last 24 hours

    const pipeline = [
      { $match: { createdAt: { $gte: since } } },
      {
        $group: {
          _id: null,
          todayOrders: { $sum: 1 },
          todayEarnings: { $sum: "$total" },
          customers: { $addToSet: "$customer.mobileNumber" },
        },
      },
      {
        $project: {
          _id: 0,
          todayOrders: 1,
          todayEarnings: "$todayEarnings",
          customers: { $size: "$customers" },
        },
      },
    ];

    const [stats] = await Order.aggregate(pipeline);

    const safe = stats || { todayOrders: 0, todayEarnings: 0, customers: 0 };

    const avgDaily = safe.todayOrders
      ? +(safe.todayEarnings / safe.todayOrders).toFixed(2)
      : 0;

    return NextResponse.json({
      success: true,
      data: {
        todayOrders: safe.todayOrders,
        todayEarnings: +safe.todayEarnings.toFixed(2),
        customers: safe.customers,
        avgDaily,
      },
    });
  } catch (err) {
    console.error("ADMIN STATS ERROR:", err);
    return NextResponse.json(
      { success: false, message: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
