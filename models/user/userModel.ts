import { Role, ROLES } from "@/lib/roles";
import mongoose, { Schema, models, model } from "mongoose";

// User Interface
export interface IUser {
    name: string;
    email: string;
    role: Role;
    password: string;
}

// Mongoose Model
const UserSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            index: true
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        role: {
            type: String,
            enum: Object.values(ROLES),
            default: ROLES.USER
        }
    },
    { timestamps: true }
);

const User = models.User || model<IUser>("User", UserSchema);
export default User;
