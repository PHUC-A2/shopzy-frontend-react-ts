import { Drawer } from "antd";
import type { ICart } from "../../../../types/intefaces";

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
                <p><strong>Cart ID: </strong><span> {cart?.id}</span></p>
                <p><strong>User: </strong></p>
                <p><strong>User ID: </strong><span> {cart?.user?.id}</span></p>
                <p><strong>Name: </strong><span> {cart?.user?.name}</span></p>
                <p><strong>Full Name: </strong><span> {cart?.user?.fullName}</span></p>
                <p><strong>Email: </strong><span> {cart?.user?.email}</span></p>
                <p><strong>Phone Number: </strong><span> {cart?.user?.phoneNumber}</span></p>
                <hr />
            </Drawer>
        </>
    )
}

export default AdminModalGetCartDetails;