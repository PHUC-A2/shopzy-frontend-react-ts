import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    access_token: string | null;
    user: {
        id: number;
        email: string;
        name: string;
    } | null;
    isAuthenticated: boolean;
}

const initialState: UserState = {
    access_token: localStorage.getItem("access_token") || null, // 👉 lấy token cũ từ localStorage
    user: null, // mặc định null
    isAuthenticated: false // mặc định là false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserLoginInfo: (state, action: PayloadAction<UserState>) => {
            // console.log(action.payload);
            state.access_token = action.payload.access_token;
            state.user = action.payload.user;
            state.isAuthenticated = true
        },
        setLogoutUser: (state) => {
            state.access_token = null;
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('access_token');
        },
    },
});

export const { setUserLoginInfo, setLogoutUser } = userSlice.actions;
export default userSlice.reducer;
