import { dbConnect } from "@/lib/dbConnect";
import { Blog } from "@/models/blog/blog";
import { NextResponse } from "next/server";

function createSlug(text: string) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, "-");
}

export async function POST(req: Request) {
    await dbConnect();
    const body = await req.json();

    const blog = await Blog.create({
        title: body.title,
        slug: createSlug(body.title),

        metaTitle: body.metaTitle || body.title,
        metaDescription: body.metaDescription,
        metaKeywords: body.metaKeywords
            ? body.metaKeywords.split(",").map((k: string) => k.trim())
            : [],

        content: body.content,
        image: body.image,
    });

    return NextResponse.json({
        success: true,
        blogId: blog._id,
    });
}

export async function GET() {
    await dbConnect();
  
    const blogs = await Blog.find().sort({ createdAt: -1 });
  
    return NextResponse.json({
      success: true,
      blogs,
    });
  }