import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface MenuState {
    list: any[];
}

const initialState: MenuState = { list: [] };
const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        setMenuItems(state, action: PayloadAction<any[]>) { state.list = action.payload; },
        addMenuItem(state, action: PayloadAction<any>) { state.list.unshift(action.payload); },
        updateMenuItem(state, action: PayloadAction<any>) { state.list = state.list.map(i => i._id === action.payload._id ? action.payload : i); },
        deleteMenuItem(state, action: PayloadAction<string>) { state.list = state.list.filter(i => i._id !== action.payload); },
        updateMenuStatus(state, action: PayloadAction<{ id: string; status: string }>) {
            const it = state.list.find(i => i._id === action.payload.id);
            if (it) it.status = action.payload.status;
        },
    },
});


export const { setMenuItems, addMenuItem, updateMenuItem, deleteMenuItem, updateMenuStatus } = menuSlice.actions;
export default menuSlice.reducer;