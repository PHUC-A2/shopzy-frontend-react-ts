import axios from "axios";

/* api user */
const getAllUsers = () => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/users`
    return axios.get(url);
}

// có thể gọi đến ở mọi nơi
export {
    getAllUsers
}