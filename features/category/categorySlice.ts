import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoryState {
    list: any[];
}

const initialState: CategoryState = {
    list: [],
};

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setCategories(state, action: PayloadAction<any[]>) {
            state.list = action.payload;
        },
        addCategory(state, action: PayloadAction<any>) {
            state.list.unshift(action.payload);
        },
        updateCategory(state, action: PayloadAction<any>) {
            state.list = state.list.map(c => c._id === action.payload._id ? action.payload : c);
        },
        deleteCategory(state, action: PayloadAction<string>) {
            state.list = state.list.filter(c => c._id !== action.payload);
        },
    },
});

export const { setCategories, addCategory, updateCategory, deleteCategory } = categorySlice.actions;
export default categorySlice.reducer;
