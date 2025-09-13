import { Form, InputNumber, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";
import type { ICartItem, IUpdateCartItemReq } from "../../../../types/intefaces";
import { updateCartItem } from "../../../../service/Api";
import { useEffect } from "react";

interface IProps {
    openAdminModalUpdateCartItem: boolean;
    setOpenAdminModalUpdateCartItem: (v: boolean) => void;
    cartItemUpdate: ICartItem | null;
    fetchAllCartItems: () => void;
}

const AdminModalUpdateCartItem = (props: IProps) => {

    const { openAdminModalUpdateCartItem, setOpenAdminModalUpdateCartItem, cartItemUpdate, fetchAllCartItems } = props;
    const [form] = useForm();

    const handleUpdateCartItem = async (data: IUpdateCartItemReq) => {

        try {
            const res = await updateCartItem(data);
            if (res.data.statusCode === 200) {
                await fetchAllCartItems();
                setOpenAdminModalUpdateCartItem(false)
                toast.success("Cập nhật sản phẩm trong giỏ hàng thành công")
                form.resetFields();
            }
        } catch (error: any) {
            const m = error?.response?.data?.error ?? "unknown";
            toast.error(
                <div>
                    <div><strong>Có lỗi xảy ra!</strong></div>
                    <div>{m}</div>
                </div>
            )
        }
    }

    useEffect(() => {
        if (openAdminModalUpdateCartItem && cartItemUpdate) {
            form.setFieldsValue(cartItemUpdate);
        }
    }, [openAdminModalUpdateCartItem, cartItemUpdate]);

    return (
        <>
            <Modal
                title="Add a Cart"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={openAdminModalUpdateCartItem}
                onOk={() => form.submit()}
                okText="Save"
                maskClosable={false}
                onCancel={() => setOpenAdminModalUpdateCartItem(false)}
                width={500}
            >
                <Form
                    form={form}
                    onFinish={handleUpdateCartItem}
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
                        label="Quantity"
                        name="quantity"
                        rules={[{ required: true, message: 'Please input your quantity id!' }]}
                    >
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item
                        label="Product ID"
                        name={['product', 'id']}
                        rules={[{ required: true, message: 'Please input your product id!' }]}
                    >
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item
                        label="Cart ID"
                        name={['cart', 'id']}
                        rules={[{ required: true, message: 'Please input your cart id!' }]}
                    >
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
export default AdminModalUpdateCartItem;