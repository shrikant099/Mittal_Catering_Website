import cloudinary from "@/lib/cloudinary";
import { dbConnect } from "@/lib/dbConnect";
import Category from "@/models/category/category";
import MenuItem, { FoodType, ItemStatus } from "@/models/menu/menu";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// Update Menu
export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;

        // validate id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, message: "Invalid menu item id" },
                { status: 400 }
            );
        }

        const item = await MenuItem.findById(id);
        if (!item) {
            return NextResponse.json(
                { success: false, message: "Menu item not found" },
                { status: 404 }
            );
        }

        const formData = await req.formData();
        /**
         *  Update object (only provided fields)
         */
        const updates: any = {};

        const name = formData.get("name") as string | null;
        const category = formData.get("category") as string | null;
        const foodType = formData.get("foodType") as FoodType | null;
        const price = formData.get("price");
        const discount = formData.get("discount");
        const status = formData.get("status") as ItemStatus | null;
        const file = formData.get("image") as File | null;

        if (name) updates.name = name.trim();
        if (category) {
            const exists = await Category.exists({ _id: category });
            if (!exists) {
                return NextResponse.json(
                    { success: false, message: "Invalid category" },
                    { status: 400 }
                );
            }
            updates.category = category;
        }

        if (foodType && Object.values(FoodType).includes(foodType)) {
            updates.foodType = foodType;
        }
        if (price !== null) updates.price = Number(price);
        if (discount !== null) updates.discount = Number(discount);

        if (status && Object.values(ItemStatus).includes(status)) {
            updates.status = status;
        }

        /**
    * Image update (Cloudinary replace)
    */
        if (file && file.size > 0) {

            if (item.image) {
                const publicId = item.image
                    .split("/")
                    .slice(-2)
                    .join("/")
                    .split(".")[0];

                await cloudinary.uploader.destroy(publicId);
            }

            // upload new image
            const buffer = Buffer.from(await file.arrayBuffer());

            const uploadResult: any = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    {
                        folder: "mittal-website/food/superAdmin/menu",
                        resource_type: "image",
                    },
                    (err, result) => {
                        if (err) reject(err);
                        resolve(result);
                    }
                ).end(buffer);
            });

            updates.image = uploadResult.secure_url;
        }

        const updatedItem = await MenuItem.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true }
        );

        return NextResponse.json({
            success: true,
            data: updatedItem,
        });

    } catch (error: any) {
        console.error("MENU ITEM UPDATE ERROR:", error);
        return NextResponse.json(
            { success: false, message: "Failed to update menu item" },
            { status: 500 }
        );
    }
}

// Delete Menu
export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;

        //  Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, message: "Invalid menu item id" },
                { status: 400 }
            );
        }

        //  Find menu item
        const item = await MenuItem.findById(id);
        if (!item) {
            return NextResponse.json(
                { success: false, message: "Menu item not found" },
                { status: 404 }
            );
        }

        // Delete Image from cloudinary
        if (item.image) {
            const publicId = item.image
                .split("/")
                .slice(-2)
                .join("/")
                .split(".")[0];

            await cloudinary.uploader.destroy(publicId);
        }

        //  Delete menu item from DB
        await item.deleteOne();
        return NextResponse.json({
            success: true,
            message: "Menu item deleted successfully",
        });
    } catch (error) {
        console.error("MENU ITEM DELETE ERROR:", error);
        return NextResponse.json(
            { success: false, message: "Failed to delete menu item" },
            { status: 500 }
        );
    }
}