import { Avatar, Descriptions, Divider, Drawer, Button, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../redux/store';
import { TiUserAddOutline } from 'react-icons/ti';
import { IoMdLogIn } from 'react-icons/io';
import { logout } from '../../../config/Api';
import { setLogoutUser } from '../../../redux/slice/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import './Modal.scss'

interface IProps {
    setOpenModalProfile: (v: boolean) => void;
    openModalProfile: boolean;
}

const ModalProfile = (props: IProps) => {
    const { openModalProfile, setOpenModalProfile } = props;
    const profile = useSelector((state: RootState) => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const res = await logout();
            if (res?.data?.statusCode === 200) {
                dispatch(setLogoutUser());
                toast.success('Đăng xuất thành công');
                navigate('/login');
            }
        } catch (error: any) {
            const m = error?.response?.data?.message ?? "unknown";
            toast.error(
                <div>
                    <div><b>Có lỗi xảy ra!</b></div>
                    <div>{m}</div>
                </div>
            );
        }
    };

    return (
        <Drawer
            title={<span style={{ color: "#389e0d" }}>Thông tin cá nhân</span>}
            placement="right"
            width={420}
            onClose={() => setOpenModalProfile(false)}
            open={openModalProfile}
        >
            {/* Avatar + Name */}
            <div style={{ textAlign: "center", marginBottom: 24 }}>
                <Avatar
                    size={80}
                    style={{ backgroundColor: '#13c290ff' }}
                    icon={<TiUserAddOutline size={40} />}
                />
                <h2 style={{ marginTop: 12, marginBottom: 4 }}>{profile?.fullName}</h2>
                <p style={{ color: "#888", margin: 0 }}>{profile?.name}</p>
            </div>

            <Divider />

            {/* Descriptions Info */}
            <Descriptions
                column={1}
                bordered
                size="middle"
                styles={{
                    label: { fontWeight: "bold", width: "30%" },
                    content: { color: "#333" }
                }}
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

            <Divider />

            {/* Logout Button */}
            <Space style={{ width: "100%", justifyContent: "center" }}>
                <Button
                    type="primary"
                    danger
                    icon={<IoMdLogIn />}
                    onClick={handleLogout}
                    style={{ borderRadius: 8, padding: "0 20px" }}
                >
                    Đăng xuất
                </Button>
            </Space>
        </Drawer>
    );
};

export default ModalProfile;
