import { Drawer } from "antd";
import type { IUser } from "../../../../types/intefaces";

interface IProps {
    setOpenUserDrawer: (v: boolean) => void;
    openUserDrawer: boolean;
    user: IUser | null;
}

const AdminModalGetUserDetails = (props: IProps) => {

    const { openUserDrawer, setOpenUserDrawer, user } = props;

    return (
        <Drawer
            title="User Details"
            placement="right"
            closable={false}
            onClose={() => setOpenUserDrawer(false)}
            open={openUserDrawer}
        >
            <p><strong>ID: </strong><span> {user?.id}</span></p>
            <p><strong>Name: </strong><span> {user?.name}</span></p>
            <p><strong>Full Name: </strong><span> {user?.fullName}</span></p>
            <p><strong>Email: </strong><span> {user?.email}</span></p>
            <p><strong>Password: </strong><span hidden>{user?.password}</span></p>
            <p><strong>Phone Number: </strong><span> {user?.phoneNumber}</span></p>
            <p><strong>Status: </strong><span> {user?.status}</span></p>
            <hr />
        </Drawer>
    )
}

export default AdminModalGetUserDetails;