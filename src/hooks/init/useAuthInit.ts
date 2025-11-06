import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { toast } from "react-toastify";
import { getAccount } from "../../config/Api";
import { setUserLoginInfo } from "../../redux/slice/authSlice";

export const useAuthInit = () => {
    const dispatch = useDispatch();

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
}