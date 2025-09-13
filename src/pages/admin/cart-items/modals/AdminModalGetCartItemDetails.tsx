import { Drawer, Descriptions, Divider } from "antd";
import type { ICartItem } from "../../../../types/intefaces";

interface IProps {
    setOpenAdminModalGetCartItemDetails: (v: boolean) => void;
    openAdminModalGetCartItemDetails: boolean;
    cartItem: ICartItem | null;
}

const AdminModalGetCartItemDetails = (props: IProps) => {
    const { setOpenAdminModalGetCartItemDetails, openAdminModalGetCartItemDetails, cartItem } = props;
    return (
        <Drawer
            title="Cart Item Details"
            onClose={() => setOpenAdminModalGetCartItemDetails(false)}
            open={openAdminModalGetCartItemDetails}
            placement="right"
            width={600}
        >
            {/* Cart Item */}
            <Descriptions bordered column={1} size="small" title="Cart Item">
                <Descriptions.Item label="ID">{cartItem?.id}</Descriptions.Item>
                <Descriptions.Item label="Quantity">{cartItem?.quantity}</Descriptions.Item>
                <Descriptions.Item label="Created At">{cartItem?.createdAt}</Descriptions.Item>
                <Descriptions.Item label="Created By">{cartItem?.createdBy}</Descriptions.Item>
                <Descriptions.Item label="Updated At">{cartItem?.updatedAt ?? "N/A"}</Descriptions.Item>
                <Descriptions.Item label="Updated By">{cartItem?.updatedBy ?? "N/A"}</Descriptions.Item>
            </Descriptions>

            <Divider />

            {/* Product */}
            <Descriptions bordered column={1} size="small" title="Product">
                <Descriptions.Item label="ID">{cartItem?.product?.id}</Descriptions.Item>
                <Descriptions.Item label="Name">{cartItem?.product?.name}</Descriptions.Item>
                <Descriptions.Item label="Description">{cartItem?.product?.description}</Descriptions.Item>
                <Descriptions.Item label="Price">{cartItem?.product?.price}</Descriptions.Item>
                <Descriptions.Item label="Stock">{cartItem?.product?.stock}</Descriptions.Item>
                <Descriptions.Item label="Status">{cartItem?.product?.status}</Descriptions.Item>
                <Descriptions.Item label="Condition">{cartItem?.product?.productCondition}</Descriptions.Item>
                <Descriptions.Item label="Image URL">{cartItem?.product?.imageUrl}</Descriptions.Item>
                <Descriptions.Item label="Size">{cartItem?.product?.size}</Descriptions.Item>
                <Descriptions.Item label="Color">{cartItem?.product?.color}</Descriptions.Item>
            </Descriptions>

            <Divider />

            {/* Cart */}
            <Descriptions bordered column={1} size="small" title="Cart">
                <Descriptions.Item label="Cart ID">{cartItem?.cart?.id}</Descriptions.Item>
            </Descriptions>

            <Descriptions bordered column={1} size="small" title="User">
                <Descriptions.Item label="ID">{cartItem?.cart?.user?.id}</Descriptions.Item>
                <Descriptions.Item label="Username">{cartItem?.cart?.user?.name}</Descriptions.Item>
                <Descriptions.Item label="Full Name">{cartItem?.cart?.user?.fullName}</Descriptions.Item>
                <Descriptions.Item label="Email">{cartItem?.cart?.user?.email}</Descriptions.Item>
                <Descriptions.Item label="Phone Number">{cartItem?.cart?.user?.phoneNumber}</Descriptions.Item>
            </Descriptions>
        </Drawer>
    );
};

export default AdminModalGetCartItemDetails;
