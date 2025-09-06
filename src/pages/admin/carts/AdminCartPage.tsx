
import { Button, Table } from "react-bootstrap";
import { getAllCarts } from "../../../service/Api";
import { useEffect, useState } from "react";
import type { ICart } from "../../../types/intefaces";
import { FaRegEye } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { IoIosAddCircle } from "react-icons/io";

const AdminCartPage = () => {

    const [listCart, setListCart] = useState<ICart[] | null>(null);

    const handleGetCartDetails = () => {
        console.log("Hello")
    }

    const fetchAllCarts = async () => {
        try {
            const res = await getAllCarts();
            if (res.data.statusCode === 200) {
                setListCart(res?.data?.data?.result);
            }
        } catch (error: any) {
            const m = error?.response?.data?.message ?? "unknow";
            toast.error(
                <div>
                    <div><b>Có lỗi xảy ra!</b></div>
                    <div>{m}</div>
                </div>
            )
        }
    }

    useEffect(() => {
        fetchAllCarts();
    }, [])


    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h2>Table Cart</h2>
                <div>
                    <Button className="d-flex align-items-center"
                        onClick={handleGetCartDetails}
                        variant="outline-primary"
                    >
                        <IoIosAddCircle /> Add a cart
                    </Button>
                </div>
            </div>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>ID</th>
                        <th>User</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listCart?.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.id}</td>
                                <td>{item.user?.fullName}</td>
                                <td style={{ display: "flex", gap: 10, justifyContent: "space-between" }}>
                                    <Button className="mr" variant="outline-info"><FaRegEye /></Button>
                                    <Button variant="outline-dark"><CiEdit /></Button>
                                    <Button variant="outline-danger"><MdDelete /></Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </>
    )
}

export default AdminCartPage;