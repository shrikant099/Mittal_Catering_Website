import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Order from "@/models/order/order";

export async function GET(_: NextRequest) {
  try {
    await dbConnect();

    // 🔹 Last 24 hours
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // 🔹 Today stats
    const todayPipeline = [
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
          todayEarnings: 1,
          customers: { $size: "$customers" },
        },
      },
    ];

    // 🔹 Lifetime total earnings
    const totalPipeline = [
      {
        $group: {
          _id: null,
          totalEarnings: { $sum: "$total" },
        },
      },
      {
        $project: {
          _id: 0,
          totalEarnings: 1,
        },
      },
    ];

    const [todayStats] = await Order.aggregate(todayPipeline);
    const [totalStats] = await Order.aggregate(totalPipeline);

    const safeToday = todayStats || {
      todayOrders: 0,
      todayEarnings: 0,
      customers: 0,
    };

    const totalEarnings = totalStats?.totalEarnings || 0;

    const avgDaily = safeToday.todayOrders
      ? +(safeToday.todayEarnings / safeToday.todayOrders).toFixed(2)
      : 0;

    return NextResponse.json({
      success: true,
      data: {
        todayOrders: safeToday.todayOrders,
        todayEarnings: +safeToday.todayEarnings.toFixed(2),
        customers: safeToday.customers,
        avgDaily,
        totalEarnings: +totalEarnings.toFixed(2), // 🔥 NEW FIELD
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
