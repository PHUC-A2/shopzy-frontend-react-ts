import { Form, InputNumber, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";
import type { ICreateCartItemReq } from "../../../../types/intefaces";
import { createCartItem } from "../../../../service/Api";

interface IProps {
    openAdminModalAddCartItem: boolean;
    setOpenAdminModalAddCartItem: (v: boolean) => void;
    fetchAllCartItems: () => void;
}

const AdminModalAddCartItem = (props: IProps) => {

    const { openAdminModalAddCartItem, setOpenAdminModalAddCartItem, fetchAllCartItems } = props;
    const [form] = useForm();

    const handleAddCartItem = async (data: ICreateCartItemReq) => {

        try {
            const res = await createCartItem(data);
            if (res.data.statusCode === 201) {
                await fetchAllCartItems();
                setOpenAdminModalAddCartItem(false)
                toast.success("Thêm mới sản phẩm trong giỏ hàng thành công")
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

    return (
        <>
            <Modal
                title="Add a Cart"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={openAdminModalAddCartItem}
                onOk={() => form.submit()}
                okText="Save"
                maskClosable={false}
                onCancel={() => setOpenAdminModalAddCartItem(false)}
                width={500}
            >
                <Form
                    form={form}
                    onFinish={handleAddCartItem}
                    layout='vertical'
                    autoComplete="off"
                >
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
export default AdminModalAddCartItem;