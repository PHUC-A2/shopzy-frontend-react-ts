import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlide';
export const store = configureStore({
    reducer: {
        auth: authReducer  // authReducer là tên có thể đặt tùy ý
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch