import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface UserState {
    user: {
        id: number;
        name: string;
        fullName: string;
        email: string;
        phoneNumber: string;
    } | null;
}

// Define the initial state using that type
const initialState: UserState = {
    user: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setProfileUser(state, action: PayloadAction<{ id: number; name: string; fullName: string; email: string; phoneNumber: string }>) {
            // console.log(action.payload);
            state.user = action.payload;
        },
        setClearProfileUser(state) {
            state.user = null;
        },
    },
})

export const { setProfileUser, setClearProfileUser } = userSlice.actions
export default userSlice.reducer