import { Button, Table } from "react-bootstrap";
import { AiOutlineUserAdd } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { getAllUsers, getUserDetails } from "../../../service/Api";
import { toast } from "react-toastify";
import type { DrawerProps } from 'antd';
import { useEffect, useState } from "react";
import { Drawer } from 'antd';

interface IUsers {
    id: number;
    name: string;
    fullName: string;
    email: string;
}


const AdminUsersPage = () => {

    const [listUsers, setListUsers] = useState<IUsers[]>([]);
    const [user, setUser] = useState<IUsers | null>();


    const [openUserDrawer, setOpenUserDrawer] = useState(false);
    const [placement, setPlacement] = useState<DrawerProps['placement']>('left');

    // chi tiết user
    const handleGetUserDetails = async (id: number) => {
        const res = await getUserDetails(id);
        if (res?.data?.statusCode === 200) {
            // console.log(res.data.data);
            setUser(res.data.data);
            // console.log(user);
        }
    }

    // mở drawer chi tiết user
    const showUserDrawer = (id: number) => {
        handleGetUserDetails(id);
        // console.log(user)
        setPlacement("right"); // mở bên phải
        setOpenUserDrawer(true);
    };

    // useEffect(() => {
    //     if (user) {
    //         console.log(user);
    //     }
    // }, [user])


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
            <div>
                <h2>Table Users</h2>
                <hr />
            </div>

            <Table striped bordered hover className="text-center">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.fullName}</td>
                            <td>{item.email}</td>
                            <td style={{ display: "flex", gap: 10, justifyContent: "space-between" }}>

                                <Button variant="outline-success" onClick={() => showUserDrawer(item.id)}><FaRegEye /></Button>
                                <Button variant="outline-primary" ><AiOutlineUserAdd /></Button>
                                <Button variant="outline-dark"><CiEdit /></Button>
                                <Button variant="outline-danger"><MdDelete /></Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal Drawer chi tiết User */}
            <Drawer
                title="User Details"
                placement={placement}
                closable={false}
                onClose={() => setOpenUserDrawer(false)}
                open={openUserDrawer}
                key={placement}
            >
                <p><strong>ID: </strong><span>{user?.id}</span></p>
                <p><strong>Name: </strong><span>{user?.name}</span></p>
                <p><strong>Full Name: </strong><span>{user?.fullName}</span></p>
                <p><strong>Email </strong><span>{user?.email}</span></p>
                <hr />
                <div>
                    <div><strong>Lorem</strong> ipsum dolor sit amet consectetur adipisicing elit. Dolorum, in illo cupiditate ipsam ut debitis illum doloribus qui sequi culpa quisquam facilis delectus voluptatum officia ex id accusamus reprehenderit dolorem.</div>
                    <div><strong>Lorem</strong> ipsum dolor sit amet consectetur adipisicing elit. Dolorum, in illo cupiditate ipsam ut debitis illum doloribus qui sequi culpa quisquam facilis delectus voluptatum officia ex id accusamus reprehenderit dolorem.</div>
                    <div><strong>Lorem</strong> ipsum dolor sit amet consectetur adipisicing elit. Dolorum, in illo cupiditate ipsam ut debitis illum doloribus qui sequi culpa quisquam facilis delectus voluptatum officia ex id accusamus reprehenderit dolorem.</div>
                    <div><strong>Lorem</strong> ipsum dolor sit amet consectetur adipisicing elit. Dolorum, in illo cupiditate ipsam ut debitis illum doloribus qui sequi culpa quisquam facilis delectus voluptatum officia ex id accusamus reprehenderit dolorem.</div>
                </div>
            </Drawer>

        </>
    )
}
export default AdminUsersPage;