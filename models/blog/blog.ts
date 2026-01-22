import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        slug: { type: String, unique: true },

        metaTitle: String,
        metaDescription: String,
        metaKeywords: [String],

        // Content
        content: { type: Object, required: true },
        image: String,
    },
    { timestamps: true }
);

const Blog = mongoose.models.Blog ||
    mongoose.model("Blog", BlogSchema);

export {
    Blog
}