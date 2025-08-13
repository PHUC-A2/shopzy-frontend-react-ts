import { Button, Table } from "react-bootstrap";
import { AiOutlineUserAdd } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { deleteUser, getAllUsers, getUserDetails } from "../../../service/Api";
import { toast } from "react-toastify";
import { message, Popconfirm, type DrawerProps } from 'antd';
import { useEffect, useState } from "react";
import AdminModalGetUserDetails from "./modals/AdminModalGetUserDetails";
import type { IUser } from "../../../types/intefaces";
import AdminModalAddUser from "./modals/AdminModalAddUser";
import type { PopconfirmProps } from 'antd';
import AdminModalUpdateUser from "./modals/AdminModalUpdateUser";

const AdminUsersPage = () => {

    const [listUsers, setListUsers] = useState<IUser[]>([]);
    const [user, setUser] = useState<IUser | null>(null);
    const [placement, setPlacement] = useState<DrawerProps['placement']>('left');
    const [openUserDrawer, setOpenUserDrawer] = useState<boolean>(false);
    const [openModalAddUser, setOpenModalAddUser] = useState<boolean>(false);
    const [openModalUpdateUser, setOpenModalUpdateUser] = useState<boolean>(false);
    const [userUpdate, setUserUpdate] = useState<IUser | null>(null);

    // sửa user
    // đảm bảo luôn có data user
    const handleEditUser = (user1: IUser) => {
        console.log(user1.fullName);
        setUserUpdate(user1);
        setOpenModalUpdateUser(true);
    }

    // xóa user
    const handleDeleteUser = async (id: number) => {
        try {
            const res = await deleteUser(id);
            if (res?.data?.statusCode === 200) {
                toast.info('User deleted successfully')
                handleGetAllUsers();
            }
        } catch (error: any) {
            const m = error?.response?.data?.message ?? "unknow";
            toast.error(
                <div>
                    <div>Có lỗi xảy ra khi xóa user</div>
                    <div>{m}</div>
                </div>
            )
        }
    }

    const cancel: PopconfirmProps['onCancel'] = (e) => {
        console.log(e);
        message.error('Click on No');
    };

    // chi tiết user
    const handleGetUserDetails = async (id: number) => {
        setPlacement('right');
        try {
            setOpenUserDrawer(true);
            const res = await getUserDetails(id);
            if (res?.data?.statusCode === 200) {
                setUser(res.data.data);
            }
        } catch (error: any) {
            toast.error('Lỗi không thể gọi API', error)
        }
    }

    // lấy tất cả user
    const handleGetAllUsers = async () => {
        try {
            const res = await getAllUsers();
            if (res?.data?.statusCode === 200) {
                setListUsers(res.data.data);
            } else {
                toast.error('Có lỗi xảy ra')
            }
        } catch (error: any) {
            toast.error('Có lỗi xảy ra', error)
        }
    }

    useEffect(() => {
        handleGetAllUsers();
    }, [])

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h2>Table Users</h2>
                <div>
                    <Button className="d-flex align-items-center"
                        variant="outline-primary"
                        onClick={() => setOpenModalAddUser(true)} >
                        <AiOutlineUserAdd /> Add a user
                    </Button>
                </div>
            </div>
            <hr />
            <Table striped bordered hover className="text-center">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers.map((item, index) => (
                        <tr key={index}>
                            <td onClick={() => handleGetUserDetails(item.id)}><a href="#">{index + 1}</a></td>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.fullName}</td>
                            <td>{item.email}</td>
                            <td >{item.status}</td>
                            <td style={{ display: "flex", gap: 10, justifyContent: "space-between" }}>

                                <Button variant="outline-success" onClick={() => handleGetUserDetails(item.id)}><FaRegEye /></Button>
                                <Button variant="outline-dark" onClick={() => handleEditUser(item)}><CiEdit /></Button>

                                <Popconfirm
                                    title="Delete the user"
                                    description="Are you sure to delete this user?"
                                    onConfirm={() => handleDeleteUser(item.id)}
                                    onCancel={cancel}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button variant="outline-danger"><MdDelete /></Button>
                                </Popconfirm>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal Drawer chi tiết User */}
            <AdminModalGetUserDetails
                placement={placement}
                setOpenUserDrawer={setOpenUserDrawer}
                openUserDrawer={openUserDrawer}
                user={user}
            />
            {/* Modal AddUser */}
            <AdminModalAddUser
                openModalAddUser={openModalAddUser}
                setOpenModalAddUser={setOpenModalAddUser}
                handleGetAllUsers={handleGetAllUsers}
            />
            {/* Modal Update user */}
            <AdminModalUpdateUser
                openModalUpdateUser={openModalUpdateUser}
                setOpenModalUpdateUser={setOpenModalUpdateUser}
                handleGetAllUsers={handleGetAllUsers}
                userUpdate={userUpdate}
            />
        </>
    )
}
export default AdminUsersPage;