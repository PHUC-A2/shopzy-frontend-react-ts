import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slice/userSlide';
export const store = configureStore({
    reducer: {
        user: userReducer  // userReducer là tên có thể đặt tùy ý
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch