import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import ClientLayout from "./routers/ClientLayout";
import HomePage from "./pages/client/HomePage";
import AdminUsersPage from "./pages/admin/users/AdminUsersPage";
import AdminLayout from "./routers/AdminLayout";
import AdminPage from "./pages/admin/AdminPage";
import { toast, ToastContainer } from 'react-toastify';
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAccount, getUserDetails } from "./config/Api";
import { setUserLoginInfo } from "./redux/slice/authSlice";
import type { RootState } from "./redux/store";
import { setClearProfileUser, setProfileUser } from "./redux/slice/userSlice";
import AdminProductPage from "./pages/admin/products/AdminProductPage";
import AdminCartPage from "./pages/admin/carts/AdminCartPage";
import AdminOrderPage from "./pages/admin/orders/AdminOrderPage";
import AdminCartItemPage from "./pages/admin/cart-items/AdminCartItemPage";
import AdminOrderItemPage from "./pages/admin/order-items/AdminOrderItemPage";
import ProductPage from "./pages/client/ProductPage";
import AboutPage from "./pages/client/AboutPage";

const router = createBrowserRouter([
  /* cấu hình cho user */
  {
    path: "/", element: <ClientLayout />,
    children:
      [
        { index: true, element: <HomePage /> },
        { path: "product", element: <ProductPage /> },
        { path: "about", element: <AboutPage /> }
      ]
  },

  /* cấu hình cho admin */
  {
    path: "/admin",
    element: <AdminLayout />,
    children:
      [
        { index: true, element: <AdminPage /> },
        { path: "user", element: <AdminUsersPage /> },
        { path: "product", element: <AdminProductPage /> },
        { path: "cart", element: <AdminCartPage /> },
        { path: "cart-item", element: <AdminCartItemPage /> },
        { path: "order", element: <AdminOrderPage /> },
        { path: "order-item", element: <AdminOrderItemPage /> },
      ]
  },
  /* cấu hình cho login */
  {
    path: "/login", element: <LoginPage />,
  },
  /* cấu hình cho register */
  {
    path: "/register", element: <RegisterPage />,
  }
]);

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

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}

export default App
