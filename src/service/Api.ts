// import axios from "axios";

import instance from "../config/customAxios";
import type { IProduct, ProductConditionEnum, ProductStatusEnum } from "../types/intefaces";

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
const getAllUsers = () => instance.get("/api/v1/users");

const getUserDetails = (id: number) => instance.get(`/api/v1/users/${id}`);

const createUser = (name: string, fullName: string, email: string, password: string, phoneNumber: string) =>
    instance.post("/api/v1/users", { name, fullName, email, password, phoneNumber });

const updateUser = (id: number, name: string, fullName: string, phoneNumber: string) =>
    instance.put("/api/v1/users", { id, name, fullName, phoneNumber });

const deleteUser = (id: number) => instance.delete(`/api/v1/users/${id}`);

/* api auth  */
const register = (name: string, fullName: string, email: string, password: string, phoneNumber: string) =>
    instance.post("/api/v1/auth/register", { name, fullName, email, password, phoneNumber });

const login = (username: string, password: string) =>
    instance.post("/api/v1/auth/login", { username, password });

const logout = () => instance.post("/api/v1/auth/logout");

const getAccount = () => instance.get("/api/v1/auth/account");

const getRefreshToken = () => instance.get("/api/v1/auth/refresh");


/* api user */
const createProduct = (name: string, description: string, price: number, stock: number, status: ProductStatusEnum, productCondition: ProductConditionEnum, imageUrl: string, size: string, color: string) =>
    instance.post("/api/v1/products", { name, description, price, stock, status, productCondition, imageUrl, size, color });
const getAllProducts = () => instance.get("/api/v1/products");

export {
    getAllUsers,
    getUserDetails,
    createUser,
    deleteUser,
    updateUser,

    // auth
    register,
    login,
    logout,
    getAccount,
    getRefreshToken,

    // products
    createProduct,
    getAllProducts

};
