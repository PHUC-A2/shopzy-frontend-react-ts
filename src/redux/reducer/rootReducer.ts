import { combineReducers } from "redux";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    //tài khoản user 
    user: userReducer
})

// 👉 Export type RootState để dùng trong useSelector hoặc có thể export ở file store.ts
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;