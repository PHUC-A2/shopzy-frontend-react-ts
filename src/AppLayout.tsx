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
import { ToastContainer } from 'react-toastify';
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,

    /* cấu hình cho user */
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "users",
        element: <UsersPage />
      }
    ]
  },

  /* cấu hình cho admin */
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminPage />
      },
      {
        path: "users",
        element: <AdminUsersPage />
      }
    ]
  },
  /* cấu hình cho login */
  {
    path: "/login",
    element: <LoginPage />,
  },
  /* cấu hình cho register */
  {
    path: "/register",
    element: <RegisterPage />,
  }
]);

const App = () => {

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}

export default App
