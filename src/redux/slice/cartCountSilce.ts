import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface cartCountState {
    cartCount: number;
}

// Define the initial state using that type
const initialState: cartCountState = {
    cartCount: 0
}

export const cartCountSlice = createSlice({
    name: 'cartCount',
    initialState,
    reducers: {
        setCartCount(state, action: PayloadAction<{ cartCount: number }>) {
            state.cartCount = action.payload.cartCount;
            // console.log(action.payload.cartCount);
        },

        setClearCartCount(state) {
            state.cartCount = 0;
        }
    },
})

export const { setCartCount, setClearCartCount } = cartCountSlice.actions
export default cartCountSlice.reducer
