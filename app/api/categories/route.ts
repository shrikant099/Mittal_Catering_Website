import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import cloudinary from "@/lib/cloudinary";
import Category from "@/models/category/category";

// Create Category
export async function POST(req: Request) {
    try {
        await dbConnect();

        const formData = await req.formData();

        const name = formData.get("name") as string;
        const file = formData.get("thumbnail") as File;

        if (!name || !file) {
            return NextResponse.json(
                { success: false, message: "Name and thumbnail required" },
                { status: 400 }
            );
        }

        //  check duplicate category
        const exists = await Category.exists({ name });
        if (exists) {
            return NextResponse.json(
                { success: false, message: "Category already exists" },
                { status: 409 }
            );
        }

        //  upload image to Cloudinary
        const buffer = Buffer.from(await file.arrayBuffer());

        const uploadResult: any = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    folder: "mittal-website/food/superAdmin/categories",
                    resource_type: "image",
                },
                (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                }
            ).end(buffer);
        });

        //  save category
        const category = await Category.create({
            name,
            thumbnail: uploadResult.secure_url,
        });

        return NextResponse.json({
            success: true,
            data: category,
        });
    } catch (error) {
        console.error("CATEGORY CREATE ERROR:", error);
        return NextResponse.json(
            { success: false, message: "Failed to create category" },
            { status: 500 }
        );
    }
}


// Get Category 
export async function GET(req: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const search = searchParams.get("search") || "";
        const page = Number(searchParams.get("page") || 1);
        const limit = Number(searchParams.get("limit") || 10);

        const skip = (page - 1) * limit;
        /**
           *  Search condition (indexed field)
           */
        const query: any = {};
        if (search) {
            query.name = {
                $regex: search,
                $options: "i", // case-insensitive
            };
        }

        /**
  *  Parallel queries (performance boost)
  */
        const [categories, total] = await Promise.all([
            Category.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(), //  FAST

            Category.countDocuments(query),
        ]);

        return NextResponse.json({
            success: true,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
            data: categories,
        });
    } catch (error) {
        console.error("GET CATEGORY ERROR:", error);
        return NextResponse.json(
            { success: false, message: "Failed to get category" },
            { status: 500 }
        );
    }
}
