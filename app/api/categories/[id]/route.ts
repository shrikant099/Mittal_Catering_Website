import cloudinary from "@/lib/cloudinary";
import { dbConnect } from "@/lib/dbConnect";
import Category from "@/models/category/category";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// Update Category
export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;


        // Validate Mongodb Id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, message: "Invalid category id" },
                { status: 400 }
            )
        }

        const category = await Category.findById(id);
        if (!category) {
            return NextResponse.json(
                { success: false, message: "Category not found" },
                { status: 404 }
            );
        }

        const formData = await req.formData();

        const name = formData.get("name") as string | null;
        const file = formData.get("thumbnail") as File | null;

        /**
        * Update name (if provided)
        */
        if (name) {
            category.name = name.trim();
        }

        /**
       *  Update image (if provided)
       */
        if (file) {
            // 1️ delete old image from cloudinary
            if (category.thumbnail) {
                const publicId = category.thumbnail
                    .split("/")
                    .slice(-2)
                    .join("/")
                    .split(".")[0];

                await cloudinary.uploader.destroy(publicId);
            }

            // 2️ upload new image
            const buffer = Buffer.from(await file.arrayBuffer());
            const uploadResult: any = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    {
                        folder: "mittal-website/food/superAdmin/categories",
                        resource_type: "image"
                    },
                    (err, result) => {
                        if (err) reject(err)
                        resolve(result)
                    }
                ).end(buffer)
            })
            category.thumbnail = uploadResult.secure_url;
        }
        await category.save();
        return NextResponse.json({
            success: true,
            data: category,
        });

    } catch (error: any) {
        console.error("CATEGORY UPDATE ERROR:", error);
        return NextResponse.json(
            { success: false, message: "Failed to update category" },
            { status: 500 }
        );
    }
}

// Delete Category
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
                { success: false, message: "Invalid category id" },
                { status: 400 }
            );
        }

        // Find Category
        const category = await Category.findById(id);
        if (!category) {
            return NextResponse.json(
                { success: false, message: "Category not found" },
                { status: 404 }
            );
        }

        // Delete Image from cloudinary 
        if (category.thumbnail) {
            const publicId = category.thumbnail
                .split("/")
                .slice(-2)
                .join("/")
                .split(".")[0];

            await cloudinary.uploader.destroy(publicId);
        }

        // Delete category from DB
        await category.deleteOne();
        return NextResponse.json({
            success: true,
            message: "Category deleted successfully",
        });
    } catch (error: any) {
        console.error("CATEGORY DELETE ERROR:", error);
        return NextResponse.json(
            { success: false, message: "Failed to delete category" },
            { status: 500 }
        );
    }
}