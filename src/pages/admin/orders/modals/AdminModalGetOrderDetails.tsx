import { Descriptions, Drawer } from "antd";
import dayjs from "dayjs";
import type { IOrder } from "../../../../types/intefaces";

interface IProps {
    setOpenAdminModalGetOrderDetails: (v: boolean) => void;
    openAdminModalGetOrderDetails: boolean;
    order: IOrder | null;
}

const AdminModalGetOrderDetails = (props: IProps) => {
    const { setOpenAdminModalGetOrderDetails, openAdminModalGetOrderDetails, order } = props;
    return (
        <>
            <Drawer
                title="Order Details"
                onClose={() => setOpenAdminModalGetOrderDetails(false)}
                open={openAdminModalGetOrderDetails}
                placement="right"
                closable={false}
                width={500}
            >
                {/* Order Info */}
                <Descriptions bordered column={1} size="small" title="Order Information">
                    <Descriptions.Item label="Order ID">{order?.id}</Descriptions.Item>
                    <Descriptions.Item label="Status">{order?.status}</Descriptions.Item>
                    <Descriptions.Item label="Payment Method">{order?.paymentMethod}</Descriptions.Item>
                    <Descriptions.Item label="Payment Status">{order?.paymentStatus}</Descriptions.Item>
                    <Descriptions.Item label="Total">
                        {order?.total
                            ? new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(order.total)
                            : "0 ₫"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Shipping Address">{order?.shippingAddress}</Descriptions.Item>
                    <Descriptions.Item label="Shipping Phone">{order?.shippingPhone}</Descriptions.Item>
                    <Descriptions.Item label="Created At">
                        {order?.createdAt ? dayjs(order.createdAt).format("DD/MM/YYYY HH:mm:ss") : "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Created By">{order?.createdBy ?? "N/A"}</Descriptions.Item>
                    <Descriptions.Item label="Updated At">
                        {order?.updatedAt ? dayjs(order.updatedAt).format("DD/MM/YYYY HH:mm:ss") : "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Updated By">{order?.updatedBy ?? "N/A"}</Descriptions.Item>
                </Descriptions>

                {/* User Info */}
                <Descriptions bordered column={1} size="small" title="User Information">
                    <Descriptions.Item label="User ID">{order?.user?.id}</Descriptions.Item>
                    <Descriptions.Item label="Username">{order?.user?.name}</Descriptions.Item>
                    <Descriptions.Item label="Full Name">{order?.user?.fullName}</Descriptions.Item>
                    <Descriptions.Item label="Email">{order?.user?.email}</Descriptions.Item>
                    <Descriptions.Item label="Phone Number">{order?.user?.phoneNumber}</Descriptions.Item>
                </Descriptions>
            </Drawer>
        </>
    )
}

export default AdminModalGetOrderDetails;