import { createSlice } from "@reduxjs/toolkit";

interface MenuState {
    itemsByCategory: Record<string, any[]>; // categoryId maps to an array of items
}

const initialState: MenuState = {
    itemsByCategory: {}, // { categoryId: [items] }
};

const menuPublicSlice = createSlice({
    name: "menuPublic",
    initialState,
    reducers: {
        setCategoryItems(state, action) {
            state.itemsByCategory[action.payload.categoryId] = action.payload.items;
        },
        hydrateItemsByCategory(state, action) {
            state.itemsByCategory = { ...state.itemsByCategory, ...action.payload };
        },
    },
});

export const { setCategoryItems, hydrateItemsByCategory } = menuPublicSlice.actions;
export default menuPublicSlice.reducer;
