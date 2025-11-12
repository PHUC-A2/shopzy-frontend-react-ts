// src/redux/slice/cartSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ICartItemRes } from "../../types/backend";
import { fetchCart } from "./thunk/cartThunk";

interface CartState {
    items: ICartItemRes[];
    loading: boolean;
    error?: string;
}

const initialState: CartState = {
    items: [],
    loading: false
};

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

        setClearCart(state) {
            state.items = [];
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload ?? [];
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as string) ?? "Lỗi không xác định"; // đảm bảo cho rejected luôn trả string
            });
    }
});

export const { setCart, updateQuantity, removeItem, setClearCart } = cartSlice.actions;
export default cartSlice.reducer;
