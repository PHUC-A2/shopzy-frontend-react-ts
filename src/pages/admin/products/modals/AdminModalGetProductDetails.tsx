import { Drawer } from 'antd';
import type { IProduct } from '../../../../types/intefaces';
interface IProps {
    openAdminModalGetProductDetails: boolean;
    setOpenAdminModalGetProductDetails: (v: boolean) => void;
    product: IProduct | null;
}

const AdminModalGetProductDetails = (props: IProps) => {
    const { openAdminModalGetProductDetails, setOpenAdminModalGetProductDetails, product } = props;
    return (
        <>
            <Drawer
                title="Product Details"
                onClose={() => setOpenAdminModalGetProductDetails(false)}
                open={openAdminModalGetProductDetails}
                placement='right'
                closable={false}
            >
                <p><strong>ID: </strong><span> {product?.id}</span></p>
                <p><strong>Name: </strong><span> {product?.name}</span></p>
                <p><strong>Description: </strong><span> {product?.description}</span></p>
                <p><strong>Price: </strong><span> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product?.price ?? 0)}</span></p>
                <p><strong>Stock: </strong><span> {product?.stock}</span></p>
                <p><strong>Status: </strong><span> {product?.status}</span></p>
                <p><strong>Product condition: </strong><span> {product?.productCondition}</span></p>
                <p><strong>Image Url: </strong><span> {product?.imageUrl}</span></p>
                <p><strong>Size: </strong><span> {product?.size}</span></p>
                <p><strong>Color: </strong><span> {product?.color}</span></p>
                <hr />
            </Drawer>
        </>
    )
}

export default AdminModalGetProductDetails;