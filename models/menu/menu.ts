import { Schema, model, models, Types } from "mongoose";
import mongoose from "mongoose"
/**
 * ENUMS (safe & optimised)
 */
export enum FoodType {
    VEG = "veg",
    NON_VEG = "non_veg",
}

export enum ItemStatus {
    ACTIVE = "active",
    DISABLED = "disabled",
}


/**
 * TypeScript Interface
 */
export interface IMenuItem {
    name: string;
    image: string; // Cloudinary URL
    category: Types.ObjectId;
    foodType: FoodType;
    price: number;
    discount: number;
    status: ItemStatus;
    description: string;
}

/**
 * Mongoose Schema
 */
const MenuItemSchema = new Schema<IMenuItem>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: true, // Cloudinary image URL
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category", //  relation
        required: true,
        index: true,
    },
    foodType: {
        type: String,
        enum: Object.values(FoodType),
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    discount: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
    },
    status: {
        type: String,
        enum: Object.values(ItemStatus),
        default: ItemStatus.ACTIVE,
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.models.MenuItem
    ? mongoose.model<IMenuItem>("MenuItem")
    : mongoose.model<IMenuItem>("MenuItem", MenuItemSchema);
