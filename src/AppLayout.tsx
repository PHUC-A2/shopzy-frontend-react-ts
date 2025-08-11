import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import MainLayout from "./routers/MainLayout";
import HomePage from "./pages/HomePage";
import UsersPage from "./pages/users/UsersPage";
import AdminPage from "./pages/admin/AdminPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,

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
    element: <AdminPage />,
    children: [
      {
        path: "users",
        element: <AdminUsersPage />
      }
    ]
  }
]);

const App = () => {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
