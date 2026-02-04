import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
    _id: string;
    name: string;
    price: number;
    qty: number;
}

interface CartState {
    items: CartItem[] | any;
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<any>) {

            if (!Array.isArray(state.items)) {
                state.items = [];
            }

            const id = action.payload._id;

            const existing = state.items.find((i: any) => i._id === id);

            if (existing) {
                existing.qty += 1;
            } else {
                state.items.push({
                    ...action.payload,
                    qty: 1,
                });
            }
        },
        // Increase 
        increaseQty(state, action: PayloadAction<string>) {
            if (!Array.isArray(state.items)) return;
            const item = state.items.find(i => i._id === action.payload);
            if (item) item.qty += 1;
        },
        // Decrease Qunatity
        decreaseQty(state, action: PayloadAction<string>) {
            if (!Array.isArray(state.items)) return;

            const item = state.items.find(i => i._id === action.payload);
            if (!item) return;

            item.qty -= 1;

            if (item.qty <= 0) {
                state.items = state.items.filter(
                    i => i._id !== action.payload
                );
            }
        },
        // Clear Cart
        clearCart(state) {
            state.items = [];
        },
    },
});

export const {
    addToCart,
    increaseQty,
    decreaseQty,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
