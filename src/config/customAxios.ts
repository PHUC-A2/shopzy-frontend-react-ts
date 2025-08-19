// src/config/customAxios.ts
import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true, // rất quan trọng để gửi cookie (refresh_token)
});

// Request interceptor: tự động gắn access_token vào header
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor: xử lý khi token hết hạn
instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Nếu API trả về 401 (token hết hạn) và chưa retry
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // Gọi API refresh token
                const res = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/refresh`,
                    { withCredentials: true }
                );

                const newToken = res.data?.data?.access_token;
                if (newToken) {
                    // Lưu lại token mới
                    localStorage.setItem("access_token", newToken);

                    // Gắn vào header và gọi lại request cũ
                    originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
                    return instance(originalRequest);
                }
            } catch (err) {
                console.error("Refresh token failed", err);
                // Nếu refresh cũng fail thì logout
                localStorage.removeItem("access_token");
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

export default instance;
