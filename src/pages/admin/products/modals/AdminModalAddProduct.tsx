import { Flex, Form, Input, InputNumber, Modal, Select, Upload, Image, type UploadFile, type GetProp, type UploadProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useForm } from 'antd/es/form/Form';
import { toast } from 'react-toastify';
import { createProduct, uploadImageProduct } from '../../../../config/Api';
import type { ICreateProductReq } from '../../../../types/backend';

interface IProps {
    openAdminModalAddProduct: boolean;
    setOpenAdminModalAddProduct: (v: boolean) => void;
    fetchAllProducts: () => void;
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const AdminModalAddProduct = (props: IProps) => {
    const { openAdminModalAddProduct, setOpenAdminModalAddProduct, fetchAllProducts } = props;
    const [form] = useForm();

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
        setFileList(newFileList);

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    const handleUpload = async ({ file, onSuccess, onError }: any) => {
        try {
            const res = await uploadImageProduct(file);
            const imageUrl = res.data.url;

            // Cập nhật form field "imageUrl"
            form.setFieldValue('imageUrl', imageUrl);

            // Cập nhật lại danh sách file
            setFileList([
                {
                    uid: file.uid || Date.now(),
                    name: file.name,
                    status: 'done',
                    url: imageUrl,
                    originFileObj: file,
                },
            ]);

            onSuccess?.('ok');
            toast.success('Upload ảnh thành công');
        } catch (err) {
            console.error(err);
            onError?.(err);
            toast.error('Upload ảnh thất bại');
        }
    };

    const handleAddProduct = async (data: ICreateProductReq) => {
        try {
            const res = await createProduct(data);
            if (res?.data?.statusCode === 201) {
                await fetchAllProducts();
                setOpenAdminModalAddProduct(false);
                toast.success('New product created successfully');
                form.resetFields();
                setFileList([]);
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

    return (
        <Modal
            title="Add a Product"
            open={openAdminModalAddProduct}
            onOk={() => form.submit()}
            okText="Save"
            maskClosable={false}
            onCancel={() => setOpenAdminModalAddProduct(false)}
            width={1000}
        >
            <Form form={form} onFinish={handleAddProduct} layout="vertical" autoComplete="off">
                <Flex justify="space-between" gap={20}>
                    {/* LEFT FORM */}
                    <Flex vertical style={{ flex: 1 }}>
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

                    {/* RIGHT FORM */}
                    <Flex vertical style={{ flex: 1 }}>
                        {/*Upload ảnh */}
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
                            {/* {fileList.length >= 8 ? null : uploadButton} */}
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

                        {/* Hidden field để form lưu string URL */}
                        <Form.Item name="imageUrl" hidden rules={[{ required: true, message: 'Please upload an image' }]}>
                            <Input />
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

export default AdminModalAddProduct;
