import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface NameState {
    name: string;
}

// Define the initial state using that type
const initialState: NameState = {
    name: ''
}

export const nameSlice = createSlice({
    name: 'name',
    initialState,
    reducers: {
        test(state, action: PayloadAction<{ name: string }>) {
            state.name = action.payload.name;
            console.log(action);
        }
    },
})

export const { test } = nameSlice.actions
export default nameSlice.reducer
