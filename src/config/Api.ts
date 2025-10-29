import instance from "./customAxios";
import type { ICreateCartItemReq, ICreateCartReq, ICreateOrderItemReq, ICreateOrderReq, ICreateProductReq, ICreateUserReq, IGetAllProductsResponse, IGetCartItemResponse, IGetUploadResponse, IUpdateCartItemReq, IUpdateCartReq, IUpdateOrderItemReq, IUpdateOrderReq, IUpdateProductReq, IUpdateUserReq } from "../types/backend";

// chuyển sang dùng instance

/* api user */
export const getAllUsers = () => instance.get("/api/v1/users");
export const getUserDetails = (id: number) => instance.get(`/api/v1/users/${id}`);
export const createUser = (data: ICreateUserReq) => instance.post("/api/v1/users", data);
export const updateUser = (data: IUpdateUserReq) => instance.put("/api/v1/users", data);
export const deleteUser = (id: number) => instance.delete(`/api/v1/users/${id}`);

/* api auth  */
export const register = (data: ICreateUserReq) => instance.post("/api/v1/auth/register", data);
export const login = (username: string, password: string) => instance.post("/api/v1/auth/login", { username, password });
export const logout = () => instance.post("/api/v1/auth/logout");
export const getAccount = () => instance.get("/api/v1/auth/account");
export const getRefreshToken = () => instance.get("/api/v1/auth/refresh");


/* api product */
export const createProduct = (data: ICreateProductReq) => instance.post("/api/v1/products", data);
export const updateProduct = (data: IUpdateProductReq) => instance.put("/api/v1/products", data);
export const getAllProducts = () => instance.get("/api/v1/products");
export const getProductDetails = (id: number) => instance.get(`/api/v1/products/${id}`);
export const deleteProducts = (id: number) => instance.delete(`/api/v1/products/${id}`);

/* api cart */
export const getAllCarts = () => instance.get(`/api/v1/carts`);
export const getCartById = (id: number) => instance.get(`/api/v1/carts/${id}`);
export const deleteCart = (id: number) => instance.delete(`/api/v1/carts/${id}`);
export const createCart = (data: ICreateCartReq) => instance.post(`/api/v1/carts`, data); // vì api trả ra dạng {user:{"id":1}}
export const updateCart = (data: IUpdateCartReq) => instance.put(`/api/v1/carts`, data); // vì api trả ra dạng {user:{"id":1}}

/* api cart item */
export const getAllCartItems = () => instance.get(`/api/v1/cart-items`);
export const getCartItemById = (id: number) => instance.get(`/api/v1/cart-items/${id}`);
export const deleteCartItem = (id: number) => instance.delete(`/api/v1/cart-items/${id}`);
export const createCartItem = (data: ICreateCartItemReq) => instance.post(`/api/v1/cart-items`, data);
export const updateCartItem = (data: IUpdateCartItemReq) => instance.put(`/api/v1/cart-items`, data);

/* api order */
export const getAllOrders = () => instance.get(`/api/v1/orders`);
export const getOrderById = (id: number) => instance.get(`/api/v1/orders/${id}`);
export const deleteOrder = (id: number) => instance.delete(`/api/v1/orders/${id}`);
export const createOrder = (data: ICreateOrderReq) => instance.post(`/api/v1/orders`, data);
export const updateOrder = (data: IUpdateOrderReq) => instance.put(`/api/v1/orders`, data);

/* api order item */
export const getAllOrderItems = () => instance.get(`/api/v1/order-items`);
export const getOrderItemById = (id: number) => instance.get(`/api/v1/order-items/${id}`);
export const deleteOrderItem = (id: number) => instance.delete(`/api/v1/order-items/${id}`);
export const createOrderItem = (data: ICreateOrderItemReq) => instance.post(`/api/v1/order-items`, data);
export const updateOrderItem = (data: IUpdateOrderItemReq) => instance.put(`/api/v1/order-items`, data);

/* ====================Client================ */
/* api product (client) */
// export const clientGetAllProducts = () => instance.get<IGetAllProductsResponse>("/api/v1/products");
// export const clientGetAllProducts = (page: number, size: number) =>
//     instance.get<IGetAllProductsResponse>("/api/v1/products", {
//         params: { page, size },
//     });
/* api product (client) */
// export const clientGetAllProducts = (page: number, size: number, filter?: string) => {
//     return instance.get<IGetAllProductsResponse>(`/api/v1/products?page=${page}&size=${size}${filter ? `&filter=${filter}` : ''}`);
// };

export const clientGetAllProducts = (query?: string) => {
    return instance.get<IGetAllProductsResponse>(`/api/v1/products?${query || ''}`);
};


export const getCartItemClient = () => instance.get<IGetCartItemResponse>(`/api/v1/client/carts`);

// ==========upload product=======
// export const uploadImageProduct = (data: IUploadFileReq) => instance.post('/api/v1/files/upload', data);
// Đúng cách gửi file (FormData)
export const uploadImageProduct = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "products");

    const { data } = await instance.post<IGetUploadResponse>(
        "/api/v1/files/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
    );

    return data; //  trả về đúng cấu trúc JSON từ backend
};