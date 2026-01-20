import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import MenuItem, { ItemStatus } from "@/models/menu/menu";

// Toggle Menu Status 
export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;

        //  validate id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, message: "Invalid menu item id" },
                { status: 400 }
            );
        }

        const { status } = await req.json();
        //  validate status
        if (!Object.values(ItemStatus).includes(status)) {
            return NextResponse.json(
                { success: false, message: "Invalid status value" },
                { status: 400 }
            );
        }

        /**
        *  SINGLE OPTIMISED QUERY
         */
        const updatedItem = await MenuItem.findByIdAndUpdate(
            id,
            { $set: { status } },
            { new: true }
        ).lean();

        if (!updatedItem) {
            return NextResponse.json(
                { success: false, message: "Menu item not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: `Menu item ${status === "active" ? "enabled" : "disabled"}`,
            data: updatedItem,
        });
    } catch (error) {

    }
}