import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAccount, getCartItemClient, getUserDetails } from "./config/Api";
import { setUserLoginInfo } from "./redux/slice/authSlice";
import type { RootState } from "./redux/store";
import { setClearProfileUser, setProfileUser } from "./redux/slice/userSlice";
import AppRouter from "./routers/AppRouter";
import { Slide, toast, ToastContainer } from "react-toastify";
import { setCartCount, setClearCartCount } from "./redux/slice/cartCountSilce";
import { setCart } from "./redux/slice/cartSlice";

const App = () => {

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const account = useSelector((state: RootState) => state.auth.user);

  // xử lý khi F5 với Login (authSlice)
  useEffect(() => {
    const init = async () => {
      // kiểm tra nếu không có token thì bỏ qua
      const token = localStorage.getItem('access_token');
      if (!token) return;

      try {
        const res = await getAccount();
        if (res?.data?.statusCode === 200) {
          dispatch(setUserLoginInfo({
            access_token: token,
            user: res.data.data.user,
            isAuthenticated: true
          }));
        }
      } catch (error: any) {
        toast.error('Chưa đăng nhập')
      }

    }

    init(); // gọi hàm 
  }, [dispatch])


  // xử lý khi F5 với userSlice
  useEffect(() => {
    const getProfile = async () => {
      try {
        // nếu đã login
        if (isAuthenticated && account?.id) {
          // đảm bảo cho id của user login không bị undefined
          const idAccount = account.id; // luôn đảm bảo là number
          const res = await getUserDetails(idAccount);
          const { id, name, fullName, email, phoneNumber } = res?.data?.data;
          if (res?.data?.statusCode === 200) {

            // đẩy lên redux để lưu
            dispatch(setProfileUser({ id, name, fullName, email, phoneNumber }));
          }
        }

        // nếu logout thì xóa profile
        if (!isAuthenticated) {
          dispatch(setClearProfileUser());
        }

      } catch (error: any) {
        toast.error('Chưa đăng nhập, không có profile')
      }
    }

    // gọi hàm
    getProfile();
  }, [dispatch, isAuthenticated, account?.id])

  // xử lý khi F5 với cartCountSlice
  useEffect(() => {
    const getCartCount = async () => {

      try {
        // nếu đã login
        if (isAuthenticated) {
          const res = await getCartItemClient();
          if (res.data.statusCode === 200) {
            dispatch(setCartCount({ cartCount: res?.data?.data?.cartItems.length }));
          }
        }

        // nếu logout thì xóa cart count
        if (!isAuthenticated) {
          dispatch(setClearCartCount());
        }

      } catch (error: any) {
        toast.error('Chưa đăng nhập, giỏ hàng rỗng')
      }
    }

    // gọi hàm
    getCartCount();
  }, [dispatch, isAuthenticated])

  // xử lý khi F5 với cartSlice
  useEffect(() => {
    const getCart = async () => {

      try {
        // nếu đã login
        if (isAuthenticated) {
          const res = await getCartItemClient();
          if (res.data.statusCode === 200) {
            dispatch(setCart(res.data.data.cartItems));
          }
        }

        // nếu logout thì xóa cart count
        if (!isAuthenticated) {
          dispatch(setClearCartCount());
        }

      } catch (error: any) {
        toast.error('Chưa đăng nhập, giỏ hàng rỗng')
      }
    }

    // gọi hàm
    getCart();
  }, [dispatch, isAuthenticated])

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
