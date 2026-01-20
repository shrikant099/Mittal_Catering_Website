import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
    _id: string;
    name: string;
    price: number;
    image: string;
    qty: number;
}

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [] as CartItem[],
    },
    reducers: {
        addToCart(state, action) {
            const found = state.items.find(i => i._id === action.payload._id);
            if (found) found.qty += 1;
            else state.items.push({ ...action.payload, qty: 1 });
        },
        increaseQty(state, action) {
            const i = state.items.find(x => x._id === action.payload);
            if (i) i.qty += 1;
        },
        decreaseQty(state, action) {
            const i = state.items.find(x => x._id === action.payload);
            if (i) {
                i.qty -= 1;
                if (i.qty <= 0) state.items = state.items.filter(x => x._id !== action.payload);
            }
        },

        clearCart(state) {
            state.items = [];
        },
    },
});

export const { addToCart, increaseQty, decreaseQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
