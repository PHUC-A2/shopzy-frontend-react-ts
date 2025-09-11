import { Drawer } from "antd";
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
                placement='right'
                closable={false}
            >
                <p><strong>Order ID: </strong><span> {order?.id}</span></p>
                <p><strong>Status: </strong><span> {order?.status}</span></p>
                <p><strong>Payment Method: </strong><span> {order?.paymentMethod}</span></p>
                <p><strong>Payment Status: </strong><span> {order?.paymentStatus}</span></p>
                <p><strong>Total: </strong><span> {order?.total}</span></p>
                <p><strong>Shipping Address: </strong><span> {order?.shippingAddress}</span></p>
                <p><strong>Shipping Phone: </strong><span> {order?.shippingPhone}</span></p>
                <p><strong>User: </strong></p>
                <p><strong>User ID: </strong><span> {order?.user?.id}</span></p>
                <p><strong>Name: </strong><span> {order?.user?.name}</span></p>
                <p><strong>Full Name: </strong><span> {order?.user?.fullName}</span></p>
                <p><strong>Email: </strong><span> {order?.user?.email}</span></p>
                <p><strong>Phone Number: </strong><span> {order?.user?.phoneNumber}</span></p>
                <hr />
            </Drawer>
        </>
    )
}

export default AdminModalGetOrderDetails;