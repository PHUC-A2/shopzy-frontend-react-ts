import { Drawer, List, Avatar, Badge, Typography, Button, Space } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import "./Modal.scss";

interface IProps {
    setOpenModalNotification: (v: boolean) => void;
    openModalNotification: boolean;
}

// Giả lập danh sách thông báo
const notifications = [
    {
        id: 1,
        title: "Đơn hàng #1234 đã được xác nhận",
        content: "Cảm ơn bạn đã đặt hàng tại Shopzy!",
        time: "2 phút trước",
        read: false,
    },
    {
        id: 2,
        title: "Khuyến mãi HOT 20%",
        content: "Nhập mã SHOPZY20 để được giảm giá.",
        time: "1 giờ trước",
        read: true,
    },
    {
        id: 3,
        title: "Thông báo hệ thống",
        content: "Bảo trì vào lúc 23:00 hôm nay.",
        time: "Hôm qua",
        read: false,
    },
];

const { Text } = Typography;

const ModalNotification = (props: IProps) => {
    const { openModalNotification, setOpenModalNotification } = props;

    return (
        <Drawer
            title={
                <Space style={{ justifyContent: "space-between", width: "100%" }}>
                    <span style={{ color: "#389e0d", fontWeight: "bold" }}>🔔 Thông báo</span>
                    <Button type="link" size="small" style={{ color: "#1890ff" }}>
                        Đánh dấu tất cả đã đọc
                    </Button>
                </Space>
            }
            placement="right"
            width={400}
            onClose={() => setOpenModalNotification(false)}
            open={openModalNotification}
            styles={{
                body: { padding: "16px 8px", background: "#fafafa" },
                header: { borderBottom: "1px solid #f0f0f0" },
            }}
        >
            {notifications.length > 0 ? (
                <List
                    itemLayout="horizontal"
                    dataSource={notifications}
                    renderItem={(item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <List.Item
                                style={{
                                    backgroundColor: item.read ? "#fff" : "#e6f7ff",
                                    borderRadius: 10,
                                    marginBottom: 10,
                                    padding: 14,
                                    cursor: "pointer",
                                    boxShadow: item.read
                                        ? "0 1px 3px rgba(0,0,0,0.05)"
                                        : "0 2px 6px rgba(0,0,0,0.1)",
                                    transition: "all 0.2s ease",
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget.style.transform = "scale(1.02)");
                                    (e.currentTarget.style.backgroundColor = item.read
                                        ? "#f9f9f9"
                                        : "#d6f4ff");
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget.style.transform = "scale(1)");
                                    (e.currentTarget.style.backgroundColor = item.read
                                        ? "#fff"
                                        : "#e6f7ff");
                                }}
                            >
                                <List.Item.Meta
                                    avatar={
                                        <Badge dot={!item.read}>
                                            <Avatar
                                                style={{
                                                    backgroundColor: item.read ? "#d9d9d9" : "#1890ff",
                                                    color: "#fff",
                                                }}
                                                icon={<BellOutlined />}
                                            />
                                        </Badge>
                                    }
                                    title={<Text strong>{item.title}</Text>}
                                    description={<Text type="secondary">{item.content}</Text>}
                                />
                                <Text type="secondary" style={{ fontSize: 12 }}>
                                    {item.time}
                                </Text>
                            </List.Item>
                        </motion.div>
                    )}
                />
            ) : (
                <motion.div
                    style={{ textAlign: "center", marginTop: 80, color: "#999" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                >
                    <Avatar
                        size={72}
                        style={{
                            backgroundColor: "#f0f0f0",
                            color: "#aaa",
                            marginBottom: 12,
                            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                        }}
                        icon={<BellOutlined />}
                    />
                    <p>Không có thông báo mới</p>
                </motion.div>
            )}
        </Drawer>
    );
};

export default ModalNotification;
