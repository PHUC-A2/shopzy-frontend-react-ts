import { Descriptions, Divider, Drawer } from "antd";
import type { IOrderItem } from "../../../../types/backend";

interface IProps {
    setOpenAdminModalGetOrderItemDetails: (v: boolean) => void;
    openAdminModalGetOrderItemDetails: boolean;
    orderItem: IOrderItem | null;
}

const AdminModalGetOrderItemDetails = (props: IProps) => {
    const { setOpenAdminModalGetOrderItemDetails, openAdminModalGetOrderItemDetails, orderItem } = props;
    return (
        <Drawer
            title="Cart Item Details"
            onClose={() => setOpenAdminModalGetOrderItemDetails(false)}
            open={openAdminModalGetOrderItemDetails}
            placement="right"
        >
            {/* Order Item */}
            <Descriptions bordered column={1} size="small" title="Cart Item">
                <Descriptions.Item label="ID">{orderItem?.id}</Descriptions.Item>
                <Descriptions.Item label="Quantity">{orderItem?.quantity}</Descriptions.Item>
                <Descriptions.Item label="Unit Price">{orderItem?.unitPrice}</Descriptions.Item>
                <Descriptions.Item label="Created At">{orderItem?.createdAt}</Descriptions.Item>
                <Descriptions.Item label="Created By">{orderItem?.createdBy}</Descriptions.Item>
                <Descriptions.Item label="Updated At">{orderItem?.updatedAt ?? "N/A"}</Descriptions.Item>
                <Descriptions.Item label="Updated By">{orderItem?.updatedBy ?? "N/A"}</Descriptions.Item>
            </Descriptions>

            <Divider />

            {/* Product */}
            <Descriptions bordered column={1} size="small" title="Product">
                <Descriptions.Item label="ID">{orderItem?.product?.id}</Descriptions.Item>
                <Descriptions.Item label="Name">{orderItem?.product?.name}</Descriptions.Item>
                <Descriptions.Item label="Description">{orderItem?.product?.description}</Descriptions.Item>
                <Descriptions.Item label="Price">{orderItem?.product?.price}</Descriptions.Item>
                <Descriptions.Item label="Stock">{orderItem?.product?.stock}</Descriptions.Item>
                <Descriptions.Item label="Status">{orderItem?.product?.status}</Descriptions.Item>
                <Descriptions.Item label="Condition">{orderItem?.product?.productCondition}</Descriptions.Item>
                <Descriptions.Item label="Image URL">{orderItem?.product?.imageUrl}</Descriptions.Item>
                <Descriptions.Item label="Size">{orderItem?.product?.size}</Descriptions.Item>
                <Descriptions.Item label="Color">{orderItem?.product?.color}</Descriptions.Item>
            </Descriptions>

            <Divider />

            {/* Order User Info */}
            <Descriptions bordered column={1} size="small" title="Order">
                <Descriptions.Item label="Order ID">{orderItem?.order?.id}</Descriptions.Item>
            </Descriptions>

            <Descriptions bordered column={1} size="small" title="User">
                <Descriptions.Item label="ID">{orderItem?.order?.user?.id}</Descriptions.Item>
                <Descriptions.Item label="Username">{orderItem?.order?.user?.name}</Descriptions.Item>
                <Descriptions.Item label="Full Name">{orderItem?.order?.user?.fullName}</Descriptions.Item>
                <Descriptions.Item label="Email">{orderItem?.order?.user?.email}</Descriptions.Item>
                <Descriptions.Item label="Phone Number">{orderItem?.order?.user?.phoneNumber}</Descriptions.Item>
            </Descriptions>
        </Drawer>
    );
};

export default AdminModalGetOrderItemDetails;
