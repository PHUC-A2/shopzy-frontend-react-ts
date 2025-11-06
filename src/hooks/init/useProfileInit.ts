import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUserDetails } from "../../config/Api";
import { setClearProfileUser, setProfileUser } from "../../redux/slice/userSlice";
import type { RootState } from "../../redux/store";

export const useProfileInit = () =>{
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const account = useSelector((state: RootState) => state.auth.user);
    

      // xử lý khi F5 với userSlice
      useEffect(() => {
        const init = async () => {
          try {
            // nếu đã login
            if (isAuthenticated && account?.id) {
              // đảm bảo cho id của user login không bị undefined
              const idAccount = account.id; // luôn đảm bảo là number
              const res = await getUserDetails(idAccount);
              const { id, name, fullName, email, phoneNumber } = res?.data?.data;
              if (res?.data?.statusCode === 200) {
    
                // đẩy lên redux để lưu
                dispatch(setProfileUser({ id, name, fullName, email, phoneNumber }));
              }
            }
    
            // nếu logout thì xóa profile
            if (!isAuthenticated) {
              dispatch(setClearProfileUser());
            }
    
          } catch (error: any) {
            toast.error('Chưa đăng nhập, không có profile')
          }
        }
    
        // gọi hàm
        init();
      }, [dispatch, isAuthenticated, account?.id])
    
}