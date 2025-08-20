import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import UserLayout from "./routers/UserLayout";
import HomePage from "./pages/HomePage";
import UsersPage from "./pages/users/UsersPage";
import AdminUsersPage from "./pages/admin/users/AdminUsersPage";
import AdminLayout from "./routers/AdminLayout";
import AdminPage from "./pages/admin/AdminPage";
import { toast, ToastContainer } from 'react-toastify';
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAccount } from "./service/Api";
import { setUserLoginInfo } from "./redux/slice/authSlide";

const router = createBrowserRouter([
  /* cấu hình cho user */
  {
    path: "/", element: <UserLayout />,
    children:
      [
        { index: true, element: <HomePage /> },
        { path: "users", element: <UsersPage /> }
      ]
  },

  /* cấu hình cho admin */
  {
    path: "/admin",
    element: <AdminLayout />,
    children:
      [
        { index: true, element: <AdminPage /> },
        { path: "users", element: <AdminUsersPage /> }
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

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}

export default App
