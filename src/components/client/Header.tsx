import { useState } from 'react';
import {
    LogoutOutlined,
    SettingOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Badge, Menu, Space } from 'antd';
import { HiHome } from 'react-icons/hi';
import { IoMdLogIn, IoMdNotifications } from 'react-icons/io';
import { FaCircleUser, FaUserPlus } from 'react-icons/fa6';
import { AiFillDashboard, AiFillMessage } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router';
import './Header.scss'
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import { logout } from '../../config/Api';
import { setLogoutUser } from '../../redux/slice/authSlice';
import { toast } from 'react-toastify';
import { RiInfoCardLine } from 'react-icons/ri';
import { FaTshirt } from 'react-icons/fa';
import { IoCartOutline } from 'react-icons/io5';
import ModalProfile from './modals/ModalProfile';
import ModalNotification from './modals/ModalNotification';
import ModalCart from './modals/ModalCart';
type MenuItem = Required<MenuProps>['items'][number];

const Header = () => {

    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const navigave = useNavigate();
    const [openModalProfile, setOpenModalProfile] = useState<boolean>(false);
    const [openModalNotification, setOpenModalNotification] = useState<boolean>(false);
    const [openModalCart, setOpenModalCart] = useState<boolean>(false);

    const handleLogout = async () => {
        try {
            const res = await logout();
            if (res?.data?.statusCode === 200) {
                dispatch(setLogoutUser())
                toast.success('Đăng xuất thành công');
                navigave('/login');
            }
        } catch (error: any) {
            const m = error?.response?.data?.message ?? "unknown";
            toast.error(
                <div>
                    <div><b>Có Lỗi xảy ra!</b></div>
                    <div>{m}</div>
                </div>
            )
        }

    }

    const items: MenuItem[] = [
        {
            label: <Link className='text-decoration-none' to={"/"}>Trang Chủ</Link>,
            key: 'home',
            icon: <HiHome />,
        },
        {
            label: <Link className='text-decoration-none' to={"/product"}>Sản Phẩm</Link>,
            key: 'product',
            icon: <FaTshirt />,
        },
        {
            label: <Link className='text-decoration-none' to={"/about"}>Giới thiệu</Link>,
            key: 'about',
            icon: <RiInfoCardLine />,
        },
        {
            label: <Link className='text-decoration-none' to={"#/message"}></Link>,
            key: 'message',
            icon: (
                <Space size={24}>
                    <Badge count={10}>
                        <Avatar shape="square" icon={<  AiFillMessage />} />
                    </Badge>
                </Space>
            ),
            className: 'header-message'
        },
        {
            label: '',
            key: 'notification',
            icon: (
                <Space size={24} onClick={() => setOpenModalNotification(true)} >
                    <Badge count={10} >
                        <Avatar shape="square" icon={<  IoMdNotifications />} />
                    </Badge>
                </Space>
            ),
            className: 'header-notification'
        },
        {
            label: '',
            key: 'cart',
            icon: (
                <Space size={24} onClick={() => setOpenModalCart(true)}>
                    <Badge count={10}>
                        <Avatar shape="square" icon={<IoCartOutline />} />
                    </Badge>
                </Space>
            ),
            className: 'header-cart'
        },
        {
            label: 'Settings',
            key: 'settings',
            icon: <SettingOutlined />,
            className: "header-settings",
            children: [
                {
                    type: 'group',
                    children: [

                        ...(isAuthenticated === false ?
                            [
                                { label: <Link to={'/login'} className='text-decoration-none'>Sign in</Link>, key: 'signin', icon: <IoMdLogIn /> },
                                { label: <Link to={'/register'} className='text-decoration-none'>Sign up</Link>, key: 'signup', icon: < FaUserPlus /> },
                            ]
                            :
                            [
                                { label: <Link to={'/admin'} className='text-decoration-none'>Dashboard</Link>, key: 'admin', icon: <AiFillDashboard /> },
                                { label: <span onClick={() => setOpenModalProfile(true)}>Profile</span>, key: 'profile', icon: <FaCircleUser /> },
                                { label: <span onClick={handleLogout}>Log out</span>, key: 'logout', icon: <LogoutOutlined /> },
                            ])
                    ],
                },
            ],
        },
    ];

    const [current, setCurrent] = useState('home');

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };
    return (
        <div>
            <Menu
                style={{ display: "flex", flex: 1 }}
                onClick={onClick}
                selectedKeys={[current]}
                mode="horizontal" items={items} />
            <ModalProfile
                openModalProfile={openModalProfile}
                setOpenModalProfile={setOpenModalProfile}
            />
            <ModalNotification
                openModalNotification={openModalNotification}
                setOpenModalNotification={setOpenModalNotification}
            />
            <ModalCart
                openModalCart={openModalCart}
                setOpenModalCart={setOpenModalCart}
            />
        </div>
    )
}
export default Header;