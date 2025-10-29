import { Flex, Form, Input, InputNumber, Modal, Select, Upload, Image, type UploadFile, type GetProp, type UploadProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useForm } from 'antd/es/form/Form';
import { toast } from 'react-toastify';
import { updateProduct, uploadImageProduct } from '../../../../config/Api';
import type { IProduct, IUpdateProductReq } from '../../../../types/backend';

interface IProps {
    openAdminModalUpdateProduct: boolean;
    setOpenAdminModalUpdateProduct: (v: boolean) => void;
    fetchAllProducts: () => void;
    productUpdate: IProduct | null;
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const AdminModalUpdateProduct = ({ openAdminModalUpdateProduct, setOpenAdminModalUpdateProduct, fetchAllProducts, productUpdate }: IProps) => {
    const [form] = useForm();

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (openAdminModalUpdateProduct && productUpdate) {
            form.setFieldsValue(productUpdate);
            setImageUrl(productUpdate.imageUrl || '');

            if (productUpdate.imageUrl) {
                setFileList([{
                    uid: Date.now().toString(),
                    name: 'image',
                    status: 'done',
                    url: productUpdate.imageUrl,
                }]);
            } else {
                setFileList([]);
            }
        }
    }, [openAdminModalUpdateProduct, productUpdate]);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList);

    const handleUpload = async ({ file, onSuccess, onError }: any) => {
        try {
            const res = await uploadImageProduct(file);
            const url = res.data.url;

            setImageUrl(url); // Chỉ lưu string, không dùng originFileObj
            setFileList([{
                uid: file.uid || Date.now(),
                name: file.name,
                status: 'done',
                url,
            }]);

            onSuccess?.('ok');
            toast.success('Upload ảnh thành công');
        } catch (err) {
            console.error(err);
            onError?.(err);
            toast.error('Upload ảnh thất bại');
        }
    };

    const handleUpdateProduct = async (data: IUpdateProductReq) => {
        if (!imageUrl) {
            toast.error('Please upload an image');
            return;
        }

        try {
            const res = await updateProduct({ ...data, imageUrl });
            if (res?.data?.statusCode === 200) {
                await fetchAllProducts();
                setOpenAdminModalUpdateProduct(false);
                toast.success('Product updated successfully');
                form.resetFields();
                setFileList([]);
                setImageUrl('');
            }
        } catch (error: any) {
            const m = error?.response?.data?.message ?? 'unknown';
            toast.error(
                <div>
                    <div><strong>Có lỗi xảy ra!</strong></div>
                    <div>{m}</div>
                </div>
            );
        }
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    return (
        <Modal
            title="Update Product"
            open={openAdminModalUpdateProduct}
            onOk={() => form.submit()}
            okText="Update"
            maskClosable={false}
            onCancel={() => setOpenAdminModalUpdateProduct(false)}
            width={1000}
        >
            <Form form={form} onFinish={handleUpdateProduct} layout="vertical" autoComplete="off">
                <Flex justify="space-between" gap={20}>
                    <Flex vertical style={{ flex: 1 }}>
                        <Form.Item name="id" hidden>
                            <Input type="hidden" />
                        </Form.Item>
                        <Form.Item label="Product name" name="name" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Description" name="description" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Price" name="price" rules={[{ required: true }]}>
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item label="Stock" name="stock" rules={[{ required: true }]}>
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item label="Product condition" name="productCondition" rules={[{ required: true }]}>
                            <Select placeholder="Select condition">
                                <Select.Option value="NEW">New (mới)</Select.Option>
                                <Select.Option value="USED">Used (đã sử dụng)</Select.Option>
                            </Select>
                        </Form.Item>
                    </Flex>

                    <Flex vertical style={{ flex: 1 }}>
                        <Form.Item label="Product Image" required>
                            <Upload
                                listType="picture-circle"
                                fileList={fileList}
                                onPreview={handlePreview}
                                onChange={handleChange}
                                customRequest={handleUpload}
                                accept=".jpg,.jpeg,.png,.webp"
                            >
                                {fileList.length >= 1 ? null : uploadButton}
                            </Upload>
                            {previewImage && (
                                <Image
                                    wrapperStyle={{ display: 'none' }}
                                    preview={{
                                        visible: previewOpen,
                                        onVisibleChange: (visible) => setPreviewOpen(visible),
                                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                    }}
                                    src={previewImage}
                                />
                            )}
                        </Form.Item>

                        <Form.Item label="Size" name="size" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Color" name="color" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Flex>
                </Flex>
            </Form>
        </Modal>
    );
};

export default AdminModalUpdateProduct;
