import { Avatar, Descriptions, Divider, Drawer } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../redux/store';
import { TiUserAddOutline } from 'react-icons/ti';
import { Button } from 'react-bootstrap';
import { IoMdLogIn } from 'react-icons/io';
import { logout } from '../../../config/Api';
import { setLogoutUser } from '../../../redux/slice/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

interface IProps {
    setOpenModalProfile: (v: boolean) => void;
    openModalProfile: boolean;
}

const ModalProfile = (props: IProps) => {

    const { openModalProfile, setOpenModalProfile } = props;
    const profile = useSelector((state: RootState) => state.user.user);
    const dispatch = useDispatch();
    const navigave = useNavigate();

    const handleLogout = async () => {
        try {
            const res = await logout();
            if (res?.data?.statusCode === 200) {
                dispatch(setLogoutUser())
                toast.success('Đăng xuất thành công');
                navigave('/login');
            }
        } catch (error: any) {
            const m = error?.response?.data?.message ?? "unknown";
            toast.error(
                <div>
                    <div><b>Có Lỗi xảy ra!</b></div>
                    <div>{m}</div>
                </div>
            )
        }

    }

    return (
        <>
            <Drawer
                title="Thông tin cá nhân"
                placement="right"
                width={400}
                onClose={() => setOpenModalProfile(false)}
                open={openModalProfile}
            >
                <div style={{ textAlign: "center", marginBottom: 20 }}>
                    <Avatar style={{ backgroundColor: '#13c290ff' }} icon={<TiUserAddOutline />} />
                    <h3 style={{ marginTop: 10 }}>{profile?.fullName}</h3>
                    <p style={{ color: "#888" }}>{profile?.name}</p>
                </div>

                <Divider />

                <Descriptions
                    column={1}
                    bordered
                    size="middle"
                    labelStyle={{ fontWeight: "bold", width: "30%" }}
                >
                    <Descriptions.Item label="Họ và tên">
                        {profile?.fullName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Tên đăng nhập">
                        {profile?.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Email">
                        {profile?.email}
                    </Descriptions.Item>
                    <Descriptions.Item label="Số điện thoại">
                        {profile?.phoneNumber}
                    </Descriptions.Item>
                </Descriptions>
                <hr />
                <Button variant='outline-dark' onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 5 }} ><IoMdLogIn /><span>Log out</span></Button>
            </Drawer>
        </>
    )
}
export default ModalProfile;