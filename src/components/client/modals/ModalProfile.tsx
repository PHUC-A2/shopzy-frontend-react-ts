import { Avatar, Descriptions, Divider, Drawer, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import { TiUserAddOutline } from "react-icons/ti";
import { IoMdLogIn } from "react-icons/io";
import { logout } from "../../../config/Api";
import { setLogoutUser } from "../../../redux/slice/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import "./Modal.scss";

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
                toast.success("Đăng xuất thành công");
                navigate("/login");
            }
        } catch (error: any) {
            const m = error?.response?.data?.message ?? "unknown";
            toast.error(
                <div>
                    <div>
                        <b>Có lỗi xảy ra!</b>
                    </div>
                    <div>{m}</div>
                </div>
            );
        }
    };

    return (
        <Drawer
            title={<span style={{ color: "#389e0d", fontWeight: "bold" }}>👤 Thông tin cá nhân</span>}
            placement="right"
            width={420}
            onClose={() => setOpenModalProfile(false)}
            open={openModalProfile}
            styles={{
                body: { background: "#fdfdfd", padding: "20px" },
                header: { borderBottom: "1px solid #f0f0f0" },
            }}
        >
            {/* Avatar + Name */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                style={{ textAlign: "center", marginBottom: 24 }}
            >
                <motion.div whileHover={{ scale: 1.1 }}>
                    <Avatar
                        size={90}
                        style={{ backgroundColor: "#13c290ff", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
                        icon={<TiUserAddOutline size={45} />}
                    />
                </motion.div>
                <h2 style={{ marginTop: 12, marginBottom: 4, color: "#333" }}>{profile?.fullName}</h2>
                <p style={{ color: "#888", margin: 0 }}>{profile?.name}</p>
            </motion.div>

            <Divider />

            {/* Descriptions Info */}
            <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <Descriptions
                    column={1}
                    bordered
                    size="middle"
                    styles={{
                        label: { fontWeight: "bold", width: "35%", background: "#fafafa" },
                        content: { color: "#333" },
                    }}
                >
                    <Descriptions.Item label="Họ và tên">{profile?.fullName}</Descriptions.Item>
                    <Descriptions.Item label="Tên đăng nhập">{profile?.name}</Descriptions.Item>
                    <Descriptions.Item label="Email">{profile?.email}</Descriptions.Item>
                    <Descriptions.Item label="Số điện thoại">{profile?.phoneNumber}</Descriptions.Item>
                </Descriptions>
            </motion.div>

            <Divider />

            {/* Logout Button */}
            <motion.div
                style={{ width: "100%", display: "flex", justifyContent: "center" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
            >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}>
                    <Button
                        type="primary"
                        danger
                        icon={<IoMdLogIn />}
                        onClick={handleLogout}
                        style={{
                            borderRadius: 8,
                            padding: "0 24px",
                            fontWeight: "bold",
                            boxShadow: "0 3px 6px rgba(0,0,0,0.15)",
                        }}
                    >
                        Đăng xuất
                    </Button>
                </motion.div>
            </motion.div>
        </Drawer>
    );
};

export default ModalProfile;
