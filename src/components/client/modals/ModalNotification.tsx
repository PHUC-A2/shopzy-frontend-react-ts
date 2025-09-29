import { Drawer, List, Avatar, Badge, Typography, Button, Space } from "antd";
import { BellOutlined } from "@ant-design/icons";
import './Modal.scss'
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
                    <span style={{ color:'#389e0d'}}>Thông báo</span>
                    <Button type="link" size="small">
                        Đánh dấu tất cả đã đọc
                    </Button>
                </Space>
            }
            placement="right"
            width={400}
            onClose={() => setOpenModalNotification(false)}
            open={openModalNotification}
        >
            {notifications.length > 0 ? (
                <List
                    itemLayout="horizontal"
                    dataSource={notifications}
                    renderItem={(item) => (
                        <List.Item
                            key={item.id}
                            style={{
                                backgroundColor: item.read ? "#fff" : "#e6f7ff",
                                borderRadius: 8,
                                marginBottom: 8,
                                padding: 12,
                                cursor: "pointer",
                            }}
                        >
                            <List.Item.Meta
                                avatar={
                                    <Badge dot={!item.read}>
                                        <Avatar
                                            style={{ backgroundColor: "#1890ff", color: "#fff" }}
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
                    )}
                />
            ) : (
                <div style={{ textAlign: "center", marginTop: 50, color: "#999" }}>
                    <Avatar
                        size={64}
                        style={{ backgroundColor: "#f0f0f0", color: "#aaa", marginBottom: 10 }}
                        icon={<BellOutlined />}
                    />
                    <p>Không có thông báo mới</p>
                </div>
            )}
        </Drawer>
    );
};

export default ModalNotification;
