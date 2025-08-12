import { Button, Table } from "react-bootstrap";
import { AiOutlineUserAdd } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { getAllUsers } from "../../../service/Api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface IUsers {
    id: number;
    name: string;
    fullName: string;
    email: string;
}

const AdminUsersPage = () => {

    const [listUsers, setListUsers] = useState<IUsers[]>([]);

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

    // chi tiết user
    const handleGetUserDetails = () => {
        toast.success('Bạn đã click vào tôi')
    }

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
                                <Button variant="outline-success" onClick={handleGetUserDetails}><FaRegEye /></Button>
                                <Button variant="outline-primary"><AiOutlineUserAdd /></Button>
                                <Button variant="outline-dark"><CiEdit /></Button>
                                <Button variant="outline-danger"><MdDelete /></Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}
export default AdminUsersPage;