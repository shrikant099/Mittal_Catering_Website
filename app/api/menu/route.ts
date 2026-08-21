import cloudinary from "@/lib/cloudinary";
import { dbConnect } from "@/lib/dbConnect";
import Category from "@/models/category/category";
import MenuItem, { FoodType, ItemStatus } from "@/models/menu/menu";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { ALLOWED_IMAGE_MESSAGE, isAllowedImageType } from "@/lib/imageValidation";
import { basePriceFromVariants, parseVariants } from "@/lib/menuVariants";

// Create Menu Items
export async function POST(req: Request) {
    try {
        await dbConnect();
        const formData = await req.formData();
        const name = formData.get("name") as string;
        const file = formData.get("image") as File;
        const category = formData.get("category") as string;
        const foodType = formData.get("foodType") as FoodType;
        const status = (formData.get("status") as ItemStatus) || ItemStatus.ACTIVE;
        const description = formData.get("description") as string;

        const variants = parseVariants(formData.get("variants"));
        const hasVariants = variants.length > 0;

        const price = hasVariants
            ? basePriceFromVariants(variants)
            : Number(formData.get("price"));
        const discount = hasVariants
            ? 0
            : Number(formData.get("discount") || 0);

        if (!name || !category || !foodType || !price || !description) {
            return NextResponse.json(
                { success: false, message: "Missing required fields" },
                { status: 400 }
            );
        }

        const hasImage = file && file.size > 0;

        if (hasImage && !isAllowedImageType(file)) {
            return NextResponse.json(
                { success: false, message: ALLOWED_IMAGE_MESSAGE },
                { status: 400 }
            );
        }

        // Validate Category
        const categoryExists = await Category.exists({ _id: category });
        if (!categoryExists) {
            return NextResponse.json({
                success: false,
                message: "Invalid category"
            },
                { status: 404 }
            )
        };

        // upload image (optional)
        let imageUrl: string | undefined;
        if (hasImage) {
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
            imageUrl = uploadResult.secure_url;
        }

        // save menu item
        const item = await MenuItem.create({
            name,
            image: imageUrl,
            category,
            foodType,
            price,
            discount,
            variants,
            status,
            description,
        });

        return NextResponse.json({
            success: true,
            data: item,
        });
    } catch (error) {
        console.error("MENU ITEM CREATE ERROR:", error);
        return NextResponse.json(
            { success: false, message: "Failed to create menu item" },
            { status: 500 })
    }
}

// Get Menu Items

export async function GET(req: Request) {
    try {
        await dbConnect();

        const { searchParams } = new URL(req.url);

        const page = Number(searchParams.get("page") || 1);
        const limit = Number(searchParams.get("limit") || 10);
        const search = searchParams.get("search") || "";
        const category = searchParams.get("category");
        const status = searchParams.get("status");

        const skip = (page - 1) * limit;

        /**
         *  Dynamic query (only add what is needed)
         */
        const query: any = {};

        //  Search by item name
        if (search) {
            query.name = {
                $regex: search,
                $options: "i", // case-insensitive
            };
        }

        //  Filter by category
        if (category) {
            query.category = category;
        }


        //  Filter by status (active / disabled)
        if (status && Object.values(ItemStatus).includes(status as ItemStatus)) {
            query.status = status;
        }

        /**
         *  Parallel DB calls (performance boost)
         */
        const [items, total] = await Promise.all([
            MenuItem.find(query)
                .populate("category", "name thumbnail")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),

            MenuItem.countDocuments(query),
        ]);

        return NextResponse.json({
            success: true,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
            data: items,
        });
    } catch (error) {
        console.error("MENU ITEMS GET ERROR:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch menu items" },
            { status: 500 }
        );
    }
}
