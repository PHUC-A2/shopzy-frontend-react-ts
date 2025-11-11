// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import type { RootState } from "../../redux/store";
// import { getCartItemClient } from "../../config/Api";
// import { setCartCount, setClearCartCount } from "../../redux/slice/cartCountSilce";

// export const useCartCountInit = () => {
//     const dispatch = useDispatch();
//     const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
//     useEffect(() => {
//         const init = async () => {

//             try {
//                 // nếu đã login
//                 if (isAuthenticated) {
//                     const res = await getCartItemClient();
//                     if (res.data.statusCode === 200) {
//                         dispatch(setCartCount({ cartCount: res?.data?.data?.cartItems.length }));
//                     }
//                 }

//                 // nếu logout thì xóa cart count
//                 if (!isAuthenticated) {
//                     dispatch(setClearCartCount());
//                 }

//             } catch (error: any) {
//                 toast.error('Chưa đăng nhập, giỏ hàng rỗng')
//             }
//         }

//         // gọi hàm
//         init();
//     }, [dispatch, isAuthenticated])
// }