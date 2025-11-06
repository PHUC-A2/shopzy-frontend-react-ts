import AppRouter from "./routers/AppRouter";
import { Slide, ToastContainer } from "react-toastify";

import { useAuthInit } from "./hooks/init/useAuthInit";
import { useProfileInit } from "./hooks/init/useProfileInit";
import { useCartInit } from "./hooks/init/useCartInit";
import { useCartCountInit } from "./hooks/init/useCartCountInit";

const App = () => {


  useAuthInit();// xử lý khi F5 với Login (authSlice)
  useProfileInit()// xử lý khi F5 với userSlice
  useCartCountInit();// xử lý khi F5 với cartCountSlice
  useCartInit() // xử lý khi F5 với cartSlice

  return (
    <>
      {/* router */}
      <AppRouter />
      <ToastContainer
        position="top-right"
        autoClose={1800}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover={false}
        draggable={false}
        theme="colored"
        transition={Slide}   // 👈 giống default
        toastStyle={{
          marginTop: "25px",
          fontSize: "13px",
          padding: "8px 14px",
          borderRadius: "12px",
          minHeight: "unset",
          lineHeight: "1.3",
          fontWeight: 500,
          boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
        }}
      />
    </>
  )
}

export default App
