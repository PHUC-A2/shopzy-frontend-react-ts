import { createBrowserRouter, RouterProvider } from "react-router";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ClientLayout from "../layouts/ClientLayout";
import HomePage from "../pages/client/home/HomePage";
import ProductPage from "../pages/client/product/ProductPage";
import ProductPageDetails from "../pages/client/details/ProductDetails";
import CartPage from "../pages/client/cart/CartPage";
import AboutPage from "../pages/client/about/AboutPage";
import AdminLayout from "../layouts/AdminLayout";
import AdminPage from "../pages/admin/AdminPage";
import AdminUsersPage from "../pages/admin/users/AdminUsersPage";
import AdminProductPage from "../pages/admin/products/AdminProductPage";
import AdminCartPage from "../pages/admin/carts/AdminCartPage";
import AdminCartItemPage from "../pages/admin/cart-items/AdminCartItemPage";
import AdminOrderPage from "../pages/admin/orders/AdminOrderPage";
import AdminOrderItemPage from "../pages/admin/order-items/AdminOrderItemPage";
import NotFoundPage from "../pages/error/NotFoundPage";


const router = createBrowserRouter([
    /* cấu hình cho user */
    {
        path: "/", element: <ClientLayout />,
        children:
            [
                { index: true, element: <HomePage /> },
                { path: "product", element: <ProductPage /> },
                { path: "product-details/:id", element: <ProductPageDetails /> },
                { path: "cart", element: <CartPage /> },
                { path: "about", element: <AboutPage /> }

            ],
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
            ],
    },
    /* cấu hình cho login */
    {
        path: "/login", element: <LoginPage />
    },
    /* cấu hình cho register */
    {
        path: "/register", element: <RegisterPage />
    },

    /* cấu hình cho lỗi sai đường dẫn */
    {
        path: "*", // bất kỳ đường dẫn nào không match
        element: <NotFoundPage />
    }
]);

const AppRouter = () => <RouterProvider router={router} />
export default AppRouter;