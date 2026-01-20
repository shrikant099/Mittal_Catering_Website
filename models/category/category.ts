import { Schema, model, models, Types } from "mongoose";

/**
 * TypeScript Interface
 */

export interface ICategory {
    name: string;
    thumbnail: string; // Cloudinary URL
    isActive: boolean;
}

/**
 * Mongoose Schema
 */

const CategorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true,
    },
    thumbnail: {
        type: String,
        required: true, // Cloudinary image URL
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

const Category =
    models.Category || model<ICategory>("Category", CategorySchema);

export default Category;