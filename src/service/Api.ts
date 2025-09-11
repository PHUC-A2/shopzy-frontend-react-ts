// import axios from "axios";

import instance from "../config/customAxios";
import type { ICreateCartReq, ICreateOrderReq, ICreateProductReq, ICreateUserReq, IUpdateCartReq, IUpdateOrderReq, IUpdateProductReq, IUpdateUserReq } from "../types/intefaces";

// /* api user */
// const getAllUsers = () => {
//     const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/users`
//     return axios.get(url);
// }

// // chi tiết user
// const getUserDetails = (id: number) => {
//     const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/${id}`
//     return axios.get(url);
// }

// // thêm mới user
// const createUser = (name: string, fullName: string, email: string, password: string, phoneNumber: string) => {
//     const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/users`
//     return axios.post(url, { name, fullName, email, password, phoneNumber });
// }

// // sửa user
// const updateUser = (id: number, name: string, fullName: string, phoneNumber: string) => {
//     const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/users`
//     return axios.put(url, { id, name, fullName, phoneNumber });
// }

// // xóa user
// const deleteUser = (id: number) => {
//     const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/${id}`
//     return axios.delete(url);
// }


// // đăng ký 
// const register = (name: string, fullName: string, email: string, password: string, phoneNumber: string) => {
//     const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/register`
//     return axios.post(url, { name, fullName, email, password, phoneNumber });
// }

// // Đăng nhập
// const login = (username: string, password: string) => {
//     const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/login`
//     return axios.post(url, { username, password });
// }
// // Đăng nhập
// const logout = () => {
//     const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/logout`
//     return axios.post(url);
// }
// // Đăng nhập
// const getAccount = () => {
//     const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/account`
//     return axios.get(url);
// }

// // Đăng nhập
// const getRefreshToken = () => {
//     const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/refresh`
//     return axios.get(url);
// }

// // có thể gọi đến ở mọi nơi
// export {
//     getAllUsers,
//     getUserDetails,
//     createUser,
//     deleteUser,
//     updateUser,
//     register,
//     login,
//     logout,
//     getAccount,
//     getRefreshToken
// }


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


/* api user */
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

/* api order */
export const getAllOrders = () => instance.get(`/api/v1/orders`);
export const getOrderById = (id: number) => instance.get(`/api/v1/orders/${id}`);
export const deleteOrder = (id: number) => instance.delete(`/api/v1/orders/${id}`);
export const createOrder = (data: ICreateOrderReq) => instance.post(`/api/v1/orders`, data);
export const updateOrder = (data: IUpdateOrderReq) => instance.put(`/api/v1/orders`, data);

