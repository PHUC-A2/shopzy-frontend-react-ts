import { Descriptions, Drawer, Tag } from "antd";
import type { IUser } from "../../../../types/backend";
import dayjs from "dayjs";
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
            <Descriptions bordered column={1} size="small">
                <Descriptions.Item label="ID">{user?.id}</Descriptions.Item>
                <Descriptions.Item label="Username">{user?.name ?? "N/A"}</Descriptions.Item>
                <Descriptions.Item label="Full Name">{user?.fullName ?? "N/A"}</Descriptions.Item>
                <Descriptions.Item label="Email">{user?.email ?? "N/A"}</Descriptions.Item>
                <Descriptions.Item label="Phone Number">{user?.phoneNumber ?? "N/A"}</Descriptions.Item>

                <Descriptions.Item label="Status">
                    {user?.status ? (
                        <Tag color={user.status === "ACTIVE" ? "green" : "red"}>{user.status}</Tag>
                    ) : (
                        "N/A"
                    )}
                </Descriptions.Item>

                <Descriptions.Item label="Created At">
                    {user?.createdAt ? dayjs(user.createdAt).format("DD/MM/YYYY HH:mm:ss") : "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="Created By">{user?.createdBy ?? "N/A"}</Descriptions.Item>

                <Descriptions.Item label="Updated At">
                    {user?.updatedAt ? dayjs(user.updatedAt).format("DD/MM/YYYY HH:mm:ss") : "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="Updated By">{user?.updatedBy ?? "N/A"}</Descriptions.Item>
            </Descriptions>
        </Drawer>
    )
}

export default AdminModalGetUserDetails;