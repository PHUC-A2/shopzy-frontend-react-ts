import { Button, Table } from "react-bootstrap";
import { AiOutlineUserAdd } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { getAllUsers, getUserDetails } from "../../../service/Api";
import { toast } from "react-toastify";
import type { DrawerProps } from 'antd';
import { useEffect, useState } from "react";
import AdminModalGetUserDetails from "./modals/AdminModalGetUserDetails";
import type { IUser } from "../../../types/intefaces";
import AdminModalAddUser from "./modals/AdminModalAddUser";

const AdminUsersPage = () => {

    const [listUsers, setListUsers] = useState<IUser[]>([]);
    const [user, setUser] = useState<IUser | null>(null);
    const [placement, setPlacement] = useState<DrawerProps['placement']>('left');
    const [openUserDrawer, setOpenUserDrawer] = useState<boolean>(false);
    const [openModalAddUser, setOpenModalAddUser] = useState<boolean>(false);


    // thêm user
    // const handleAddUser = () => {
    //     setOpenModalAddUser(true);
    //     // alert('me')
    // }

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
                                <Button variant="outline-dark"><CiEdit /></Button>
                                <Button variant="outline-danger"><MdDelete /></Button>
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
        </>
    )
}
export default AdminUsersPage;