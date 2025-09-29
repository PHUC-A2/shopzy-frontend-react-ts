import { Drawer, Empty, Image, Space, Typography, Divider, Button, Row, Col } from 'antd';
import { AiFillDelete } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { getCartClient } from '../../../config/Api';
import { FaShoppingBag } from 'react-icons/fa';
const { Text, Title } = Typography;
import './Modal.scss'

interface CartItem {
    cartItemId: number;
    productId: number;
    name: string;
    imageUrl: string;
    price: number;
    quantity: number;
    size: string;
    color: string;
    status: string;
    subtotal: number;
}

interface IProps {
    openModalCart: boolean;
    setOpenModalCart: (v: boolean) => void;
}

const ModalCart = ({ openModalCart, setOpenModalCart }: IProps) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            cartItemId: 1,
            productId: 1,
            name: 'Quần ABC',
            imageUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            price: 200000,
            quantity: 246,
            size: 'S',
            color: 'Đỏ',
            status: 'IN_STOCK',
            subtotal: 200000 * 246,
        },
        {
            cartItemId: 2,
            productId: 3,
            name: 'Quần C',
            imageUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            price: 200000,
            quantity: 224,
            size: 'S',
            color: 'Đen',
            status: 'IN_STOCK',
            subtotal: 200000 * 224,
        },
    ]);

    const handleQuantityChange = (productId: number, delta: number) => {
        setCartItems(prev =>
            prev.map(item => {
                if (item.productId === productId) {
                    const newQuantity = Math.max(1, item.quantity + delta);
                    return {
                        ...item,
                        quantity: newQuantity,
                        subtotal: newQuantity * item.price,
                    };
                }
                return item;
            })
        );
    };

    const handleRemoveItem = (productId: number) => {
        setCartItems(prev => prev.filter(item => item.productId !== productId));
    };

    const totalPrice = cartItems.reduce((acc, item) => acc + item.subtotal, 0);

    const fetchCartClient = async () => {
        const res = await getCartClient();
        console.log(res);
    }

    useEffect(() => {
        fetchCartClient();
        console.log(cartItems.length)
    }, []);

    return (
        <Drawer
            title={<Title level={4}><span onClick={() => setOpenModalCart(false)}><span style={{ color: '#389e0d' }}>Shopzy | Giỏ Hàng</span></span></Title>}
            onClose={() => setOpenModalCart(false)}
            open={openModalCart}
            placement="right"
            width={700}
        // headerStyle={{ background: "#001529" }}
        // bodyStyle={{ background: "#f9f9f9" }}

        // maskClosable={false}
        >
            {cartItems.length > 0 ? (
                <>
                    {/* Header */}
                    <Row style={{ fontWeight: 'bold', marginBottom: 12 }}>
                        <Col span={2}>STT</Col>
                        <Col span={6}>Sản phẩm</Col>
                        <Col span={4}>Đơn giá</Col>
                        <Col span={4}>Số lượng</Col>
                        <Col span={4}>Thành tiền</Col>
                        <Col span={4}>Thao tác</Col>
                    </Row>
                    <Divider />

                    {/* Cart Items */}
                    {cartItems.map((item, index) => (
                        <Row key={item.cartItemId} align="middle" style={{ marginBottom: 16 }}>
                            <Col span={2}>{index + 1}</Col>
                            <Col span={6}>
                                <Image width={80} src={item.imageUrl} />
                                <Text strong>{item.name}</Text>
                                <div>
                                    <Text type="secondary">
                                        Kích cỡ: {item.size}, Màu: {item.color}
                                    </Text>
                                </div>
                                <div>
                                    <Text type="secondary">Trạng thái: {item.status}</Text>
                                </div>
                            </Col>
                            <Col span={4}>{item.price.toLocaleString()} VND</Col>
                            <Col span={4}>
                                <Space>
                                    <Button size="small" onClick={() => handleQuantityChange(item.productId, -1)}>-</Button>
                                    <Text>{item.quantity}</Text>
                                    <Button size="small" onClick={() => handleQuantityChange(item.productId, 1)}>+</Button>
                                </Space>
                            </Col>
                            <Col span={4}>{item.subtotal.toLocaleString()} VND</Col>
                            <Col span={4}>
                                <Button type="primary" danger icon={<AiFillDelete />} onClick={() => handleRemoveItem(item.productId)} />
                            </Col>
                        </Row>
                    ))}

                    <Divider />

                    {/* Total Price */}
                    <Row justify="space-between" style={{ marginBottom: 16 }}>
                        <Col>
                            <Text strong>Tổng tiền: </Text>
                            <Text>{totalPrice.toLocaleString()} VND</Text>
                        </Col>
                        <Col>
                            <Button type="primary" style={{ backgroundColor: '#faad14' }} icon={<FaShoppingBag />} onClick={() => alert('Đã chuyển sang trang checkout')}>
                                Mua Hàng
                            </Button>
                        </Col>
                    </Row>
                </>
            ) : (
                <Empty description="Giỏ hàng trống" />
            )}
        </Drawer>
    );
};

export default ModalCart;
