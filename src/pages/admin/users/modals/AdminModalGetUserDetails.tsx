import { Drawer, type DrawerProps } from "antd";
import type { IUser } from "../../../../types/intefaces";

interface IProps {
    setOpenUserDrawer: (v: boolean) => void;
    openUserDrawer: boolean;
    placement: DrawerProps['placement'];
    user: IUser | null;
}

const AdminModalGetUserDetails = (props: IProps) => {

    const { placement, openUserDrawer, setOpenUserDrawer, user } = props;

    return (
        <Drawer
            title="User Details"
            placement={placement}
            closable={false}
            onClose={() => setOpenUserDrawer(false)}
            open={openUserDrawer}
            key={placement}
        >
            <p><strong>ID: </strong><span> {user?.id}</span></p>
            <p><strong>Name: </strong><span> {user?.name}</span></p>
            <p><strong>Full Name: </strong><span> {user?.fullName}</span></p>
            <p><strong>Email: </strong><span> {user?.email}</span></p>
            <p><strong>Password: </strong><span hidden>{user?.password}</span></p>
            <p><strong>Phone Number: </strong><span> {user?.phoneNumber}</span></p>
            <hr />
            <div>
                <div><strong>Demo</strong> <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus saepe, adipisci nihil veritatis itaque debitis sequi qui illum earum culpa mollitia, quaerat aut quod, vel deserunt ad dolorem beatae amet!</span> </div>
                <div><strong>Demo</strong> <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus saepe, adipisci nihil veritatis itaque debitis sequi qui illum earum culpa mollitia, quaerat aut quod, vel deserunt ad dolorem beatae amet!</span> </div>
                <div><strong>Demo</strong> <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus saepe, adipisci nihil veritatis itaque debitis sequi qui illum earum culpa mollitia, quaerat aut quod, vel deserunt ad dolorem beatae amet!</span> </div>
            </div>
        </Drawer>
    )
}

export default AdminModalGetUserDetails;