// src/redux/thunks/cartThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCartItemClient } from "../../config/Api";

export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (_, { rejectWithValue }) => {
        try {
            const res = await getCartItemClient();
            if (res.data.statusCode === 200) {
                return res.data.data.cartItems || [];
            }
            return rejectWithValue("Lấy giỏ hàng thất bại");
        } catch (error: any) {
            return rejectWithValue("Lỗi hệ thống");
            console.log("Lỗi hệ thống: ", error);
        }
    }
)