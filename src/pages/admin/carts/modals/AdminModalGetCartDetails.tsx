import { Descriptions, Drawer } from "antd";
import type { ICart } from "../../../../types/intefaces";
import dayjs from "dayjs";

interface IProps {
    setOpenAdminModalGetCartDetails: (v: boolean) => void;
    openAdminModalGetCartDetails: boolean;
    cart: ICart | null;
}

const AdminModalGetCartDetails = (props: IProps) => {
    const { setOpenAdminModalGetCartDetails, openAdminModalGetCartDetails, cart } = props;
    return (
        <>
            <Drawer
                title="Cart Details"
                onClose={() => setOpenAdminModalGetCartDetails(false)}
                open={openAdminModalGetCartDetails}
                placement='right'
                closable={false}
            >
                {/* Cart */}
                <Descriptions bordered column={1} size="small" title="Cart Information">
                    <Descriptions.Item label="Cart ID">{cart?.id}</Descriptions.Item>
                    <Descriptions.Item label="Created At">
                        {cart?.createdAt ? dayjs(cart.createdAt).format("DD/MM/YYYY HH:mm:ss") : "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Created By">{cart?.createdBy ?? "N/A"}</Descriptions.Item>
                    <Descriptions.Item label="Updated At">
                        {cart?.updatedAt ? dayjs(cart.updatedAt).format("DD/MM/YYYY HH:mm:ss") : "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Updated By">{cart?.updatedBy ?? "N/A"}</Descriptions.Item>
                </Descriptions>

                {/* User trong Cart */}
                <Descriptions bordered column={1} size="small" title="User Information">
                    <Descriptions.Item label="User ID">{cart?.user?.id}</Descriptions.Item>
                    <Descriptions.Item label="Username">{cart?.user?.name}</Descriptions.Item>
                    <Descriptions.Item label="Full Name">{cart?.user?.fullName}</Descriptions.Item>
                    <Descriptions.Item label="Email">{cart?.user?.email}</Descriptions.Item>
                    <Descriptions.Item label="Phone Number">{cart?.user?.phoneNumber}</Descriptions.Item>
                </Descriptions>
            </Drawer>
        </>
    )
}

export default AdminModalGetCartDetails;