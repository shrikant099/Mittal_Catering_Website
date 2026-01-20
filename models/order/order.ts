import { Model, Schema } from "mongoose";
import { ICustomerDetails, IOrder, IOrderItem, OrderStatus, PaymentMethod, PaymentStatus } from "./types/orderTypes";
import mongoose from "mongoose";

// Order Item Schema
const OrderItemSchema = new Schema<IOrderItem>(
    {
        _id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        qty: {
            type: Number,
            required: true
        },
        category: {
            type: String
        },
    },
    { _id: false }
)

// Customer Schema
const CustomerSchema = new Schema<ICustomerDetails>(
    {
        fullName: { type: String, required: true, trim: true },
        mobileNumber: { type: String, required: true, match: [/^\d{10}$/, "Invalid mobile number"] },
        trainNumber: { type: String, required: true, match: [/^\d{5}$/, "Invalid train number"] },
        pnr: { type: String, required: true, match: [/^\d{10}$/, "Invalid PNR"] },
        coach: { type: String, required: true },
        seat: { type: String, required: true },
        instructions: { type: String, maxlength: 150 },
    },
    { _id: false }
);


// Order Schema
const OrderSchema = new Schema<IOrder>(
    {
        orderId: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        items: {
            type: [OrderItemSchema],
            required: true
        },
        subtotal: {
            type: Number,
            required: true
        },
        gst: {
            type: Number,
            required: true
        },
        total: {
            type: Number,
            required: true
        },
        customer: {
            type: CustomerSchema,
            required: true
        },
        status: {
            type: String,
            enum: Object.values(OrderStatus),
            default: OrderStatus.PLACED,
            index: true,
        },
        paymentStatus: {
            type: String,
            enum: Object.values(PaymentStatus),
            default: PaymentStatus.PENDING,
            index: true,
        },
        paymentMethod: {
            type: String,
            enum: Object.values(PaymentMethod),
            required: true,
            index: true,
        },
    },
    {
        timestamps: true
    }
)

delete mongoose.models.Order;
const Order: Model<IOrder> = mongoose.model<IOrder>("Order", OrderSchema);
export default Order;