import { Flex, Form, Input, InputNumber, Modal, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { toast } from 'react-toastify';
import { updateProduct } from '../../../../service/Api';
import type { IProduct, IUpdateProductReq } from '../../../../types/intefaces';
import { useEffect } from 'react';

interface IProps {
    openAdminModalUpdateProduct: boolean;
    setOpenAdminModalUpdateProduct: (v: boolean) => void;
    fetchAllProducts: () => void;
    productUpdate: IProduct | null;
}
const AdminModalUpdateProduct = (props: IProps) => {
    const { openAdminModalUpdateProduct, setOpenAdminModalUpdateProduct, fetchAllProducts, productUpdate } = props;
    const [form] = useForm();

    const handleUpdateProduct = async (data:IUpdateProductReq) => {
        try {
            const res = await updateProduct(data);
            if (res?.data?.statusCode === 200) {
                await fetchAllProducts();
                setOpenAdminModalUpdateProduct(false);
                toast.success("Product updated successfully")
                form.resetFields();
            }
        } catch (error: any) {
            const m = error?.response?.data?.message ?? "unknow";
            toast.error(
                <div>
                    <div><strong>Có lỗi xảy ra!</strong></div>
                    <div>{m}</div>
                </div>
            );
        }

    }

    useEffect(() => {
        if (openAdminModalUpdateProduct && productUpdate) {
            form.setFieldsValue(productUpdate);
        }
    }, [openAdminModalUpdateProduct, productUpdate])
    
    return (
        <>
            <Modal
                title="Add a Product"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={openAdminModalUpdateProduct}
                onOk={() => form.submit()}
                okText="Update"
                maskClosable={false}
                onCancel={() => setOpenAdminModalUpdateProduct(false)}
                width={1000}
            >
                <Form
                    form={form}
                    onFinish={handleUpdateProduct}
                    layout='vertical'
                    autoComplete="off"
                // style={{ maxWidth: 900, margin: "0 auto" }} // 👈 căn giữa
                >
                    <Flex justify='space-between' gap={20} style={{ width: "100%" }}>
                        <Flex vertical style={{ flex: 1 }} >
                            <Form.Item name="id" hidden>
                                <Input type="hidden" />
                            </Form.Item>
                            <Form.Item
                                label="Product name"
                                name="name"
                                rules={[{ required: true, message: 'Please input your product name!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Description"
                                name="description"
                                rules={[{ required: true, message: 'Please input your description!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Price"
                                name="price"
                                rules={[{ required: true, message: 'Please input your price!' }]}
                            >
                                <InputNumber style={{ width: "100%" }} />
                            </Form.Item>

                            <Form.Item
                                label="Stock"
                                name="stock"
                                rules={[{ required: true, message: 'Please input your stock!' }]}
                            >
                                <InputNumber style={{ width: "100%" }} />
                            </Form.Item>
                        </Flex>
                        <Flex vertical style={{ flex: 1 }} >
                            <Form.Item
                                label="Product condition"
                                name="productCondition"
                                rules={[{ required: true, message: 'Please input your product condition!' }]}
                            >
                                <Select placeholder="Select condition">
                                    <Select.Option value="NEW">New (mới)</Select.Option>
                                    <Select.Option value="USED">Used (đã sử dụng)</Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Image URL"
                                name="imageUrl"
                                rules={[{ required: true, message: 'Please input your image url!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Size"
                                name="size"
                                rules={[{ required: true, message: 'Please input your size!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Color"
                                name="color"
                                rules={[{ required: true, message: 'Please input your color!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Flex>
                    </Flex>
                </Form>
            </Modal>
        </>
    )
}

export default AdminModalUpdateProduct;