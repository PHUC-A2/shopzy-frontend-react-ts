// src/redux/slice/cartSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ICartItemRes } from "../../types/backend";

interface CartState {
    items: ICartItemRes[];
}

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action: PayloadAction<ICartItemRes[]>) => {
            state.items = action.payload;
            // console.log(action);
        },
        updateQuantity: (state, action: PayloadAction<{ productId: number; delta: number }>) => {
            const item = state.items.find(i => i.productId === action.payload.productId);
            if (item) {
                item.quantity = Math.max(1, item.quantity + action.payload.delta);
                item.subtotal = item.quantity * item.price;
            }
        },
        removeItem: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(i => i.cartItemId !== action.payload);
        },

    },
});

export const { setCart, updateQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
