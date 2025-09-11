
import { Button, Table } from "react-bootstrap";
import { deleteCart, getAllCarts, getCartById } from "../../../service/Api";
import { useEffect, useState } from "react";
import type { ICart } from "../../../types/intefaces";
import { FaRegEye } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { IoIosAddCircle } from "react-icons/io";
import AdminModalGetCartDetails from "./modals/AdminModalGetCartDetails";
import AdminModalAddCart from "./modals/AdminModalAddCart";
import { Empty, message, Popconfirm, type PopconfirmProps } from "antd";
import AdminModalUpdateCart from "./modals/AdminModalUpdateCart";

const AdminCartPage = () => {

    const [listCart, setListCart] = useState<ICart[]>([]);
    const [cart, setCart] = useState<ICart | null>(null);
    const [openAdminModalGetCartDetails, setOpenAdminModalGetCartDetails] = useState<boolean>(false);
    const [openAdminModalAddCart, setOpenAdminModalAddCart] = useState<boolean>(false);
    const [openAdminModalUpdateCart, setOpenAdminModalUpdateCart] = useState<boolean>(false);
    const [cartUpdate, setCartUpdate] = useState<ICart | null>(null);

    const handleUpdateCart = (cart: ICart) => {
        setCartUpdate(cart);
        setOpenAdminModalUpdateCart(true);
    }

    const cancel: PopconfirmProps['onCancel'] = () => {
        message.error('Click on No');
    };
    const handleDeleteCart = async (id: number) => {
        try {
            const res = await deleteCart(id);
            if (res.data.statusCode === 200) {
                await fetchAllCarts();
                toast.success('Xóa giỏ hàng thành công')
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

    const handleGetCartDetails = async (id: number) => {
        try {
            const res = await getCartById(id);
            if (res.data.statusCode === 200) {
                setOpenAdminModalGetCartDetails(true);
                setCart(res.data.data);
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
                        variant="outline-primary"
                        onClick={() => setOpenAdminModalAddCart(true)}
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
                        listCart.length > 0 ? listCart?.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.id}</td>
                                <td>{item.user?.fullName}</td>
                                <td style={{ display: "flex", gap: 10, justifyContent: "space-between" }}>
                                    <Button className="mr" variant="outline-info" onClick={() => handleGetCartDetails(item.id)}><FaRegEye /></Button>
                                    <Button variant="outline-dark" onClick={() => handleUpdateCart(item)}><CiEdit /></Button>
                                    <Popconfirm
                                        title="Delete the user"
                                        description="Are you sure to delete this cart?"
                                        onConfirm={() => handleDeleteCart(item.id)}
                                        onCancel={cancel}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button variant="outline-danger"><MdDelete /></Button>
                                    </Popconfirm>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={4} style={{ textAlign: 'center', fontStyle: 'italic' }}>
                                    <Empty />
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>

            {/* modal cart details */}
            <AdminModalGetCartDetails
                setOpenAdminModalGetCartDetails={setOpenAdminModalGetCartDetails}
                openAdminModalGetCartDetails={openAdminModalGetCartDetails}
                cart={cart}
            />

            {/* modal add cart */}
            <AdminModalAddCart
                openAdminModalAddCart={openAdminModalAddCart}
                setOpenAdminModalAddCart={setOpenAdminModalAddCart}
                fetchAllCarts={fetchAllCarts}
            />

            {/* modal update cart */}
            <AdminModalUpdateCart
                openAdminModalUpdateCart={openAdminModalUpdateCart}
                setOpenAdminModalUpdateCart={setOpenAdminModalUpdateCart}
                fetchAllCarts={fetchAllCarts}
                cartUpdate={cartUpdate}
            />


        </>
    )
}

export default AdminCartPage;