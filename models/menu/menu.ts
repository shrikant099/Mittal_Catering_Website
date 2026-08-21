import { Schema, Types } from "mongoose";
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
 * A variant lets one menu item (e.g. "Jain Dal Tadka") offer multiple
 * sizes/options (e.g. 250 ML, 500 ML, 650 ML) each with its own price,
 * instead of duplicating the item under different names.
 */
export interface IMenuVariant {
    _id?: Types.ObjectId;
    label: string;
    price: number;
    discount: number;
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
    variants: IMenuVariant[];
    status: ItemStatus;
    description: string;
}

const MenuVariantSchema = new Schema<IMenuVariant>({
    label: {
        type: String,
        required: true,
        trim: true,
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
});

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
    variants: {
        type: [MenuVariantSchema],
        default: [],
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

delete mongoose.models.MenuItem;
export default mongoose.model<IMenuItem>("MenuItem", MenuItemSchema);
