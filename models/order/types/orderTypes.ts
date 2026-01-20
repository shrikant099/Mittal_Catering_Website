import { Document } from "mongoose";

// Order Status
export enum OrderStatus {
    PLACED = "Placed",
    CONFIRM = "Confirm",
    DISPATCH = "Dispatch",
    DELIVERED = "Delivered",
    CANCEL = "Cancel",
}

// Paytment Status
export enum PaymentStatus {
    PENDING = "Pending",
    PAID = "Paid",
    FAILED = "Failed",
}

// Payment Method
export enum PaymentMethod {
    COD = "COD",
    ONLINE = "ONLINE",
}

// Schema 
export interface IOrderItem {
    _id: string; // menu item id
    name: string;
    image: string;
    price: number;
    qty: number;
    category?: string;
}

// Customer Details
export interface ICustomerDetails {
    fullName: string;
    mobileNumber: string;
    trainNumber: string;
    pnr: string;
    coach: string;
    seat: string;
    instructions?: string;
}

// Schema Docment
export interface IOrder extends Document {
    orderId: string; // Razorpay order id OR internal order id for COD
    items: IOrderItem[];
    subtotal: number;
    gst: number;
    total: number;
    customer: ICustomerDetails;
    status: OrderStatus;
    paymentStatus: PaymentStatus;
    paymentMethod: PaymentMethod;
    createdAt: Date; // date + time
    updatedAt: Date;
}
