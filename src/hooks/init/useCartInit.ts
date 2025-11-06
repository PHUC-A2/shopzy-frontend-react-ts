import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItemClient } from "../../config/Api";
import { setCart } from "../../redux/slice/cartSlice";
import { setClearCartCount } from "../../redux/slice/cartCountSilce";
import { toast } from "react-toastify";
import type { RootState } from "../../redux/store";

export const useCartInit = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    useEffect(() => {
        const init = async () => {

            try {
                // nếu đã login
                if (isAuthenticated) {
                    const res = await getCartItemClient();
                    if (res.data.statusCode === 200) {
                        dispatch(setCart(res.data.data.cartItems));
                    }
                }

                // nếu logout thì xóa cart count
                if (!isAuthenticated) {
                    dispatch(setClearCartCount());
                }

            } catch (error: any) {
                toast.error('Chưa đăng nhập, giỏ hàng rỗng')
            }
        }

        // gọi hàm
        init();
    }, [dispatch, isAuthenticated])
}