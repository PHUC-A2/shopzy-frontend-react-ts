import { Form, InputNumber, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";
import type { ICart, IUpdateCartReq } from "../../../../types/intefaces";
import { updateCart } from "../../../../service/Api";
import { useEffect } from "react";

interface IProps {
    openAdminModalUpdateCart: boolean;
    setOpenAdminModalUpdateCart: (v: boolean) => void;
    fetchAllCarts: () => void;
    cartUpdate: ICart | null;
}

const AdminModalUpdateCart = (props: IProps) => {

    const { openAdminModalUpdateCart, setOpenAdminModalUpdateCart, fetchAllCarts, cartUpdate } = props;
    const [form] = useForm();

    const handleUpdateCart = async (data: IUpdateCartReq) => {

        try {
            const res = await updateCart(data);
            if (res.data.statusCode === 200) {
                await fetchAllCarts();
                setOpenAdminModalUpdateCart(false)
                toast.success("Cập nhật giỏ hàng thành công")
                form.resetFields();
            }

        } catch (error: any) {
            const m = error?.response?.data?.message ?? "unknown";
            toast.error(
                <div>
                    <div><strong>Có lỗi xảy ra!</strong></div>
                    <div>{m}</div>
                </div>
            )
        }
    }

    useEffect(() => {
        if (openAdminModalUpdateCart && cartUpdate) {
            form.setFieldsValue(cartUpdate);
        }
    }, [openAdminModalUpdateCart, cartUpdate]);

    return (
        <>
            <Modal
                title="Add a Cart"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={openAdminModalUpdateCart}
                onOk={() => form.submit()}
                okText="Save"
                maskClosable={false}
                onCancel={() => setOpenAdminModalUpdateCart(false)}
                width={500}
            >
                <Form
                    form={form}
                    onFinish={handleUpdateCart}
                    layout='vertical'
                    autoComplete="off"
                >
                    <Form.Item
                        hidden
                        name="id"
                    >
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item
                        label="User ID"
                        name={['user', 'id']}   // <-- Nested key
                        rules={[{ required: true, message: 'Please input your user id!' }]}
                    >
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
export default AdminModalUpdateCart;