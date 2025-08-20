import { useState } from 'react';
import {
    LogoutOutlined,
    SettingOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { HiHome } from 'react-icons/hi';
import { FaReact, FaUser } from 'react-icons/fa';
import { IoMdLogIn } from 'react-icons/io';
import { FaCircleUser, FaUserPlus } from 'react-icons/fa6';
import { AiFillDashboard } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router';
import './Header.scss'
import { TiShoppingCart } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import { logout } from '../../service/Api';
import { setLogoutUser } from '../../redux/slice/authSlide';
import { toast } from 'react-toastify';
type MenuItem = Required<MenuProps>['items'][number];

const Header = () => {

    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const natigave = useNavigate();


    const handleLogout = async () => {
        try {
            const res = await logout();
            if (res?.data?.statusCode === 200) {
                dispatch(setLogoutUser())
                toast.success('Đăng xuất thành công');
                natigave('/login');
            }
        } catch (error: any) {
            const m = error?.response?.data?.message ?? "unknow";
            toast.error(
                <div>
                    <div><b>Có Lỗi xảy ra!</b></div>
                    <div>{m}</div>
                </div>
            )
        }

    }

    // const account = useSelector((state: RootState) => state.auth.user);
    // console.log("account: ", account)

    const items: MenuItem[] = [
        {
            label: <Link className='text-decoration-none' to={"/"}>Home</Link>,
            key: 'home',
            icon: <HiHome />,
        },
        {
            label: <Link className='text-decoration-none' to={"/users"}>Users</Link>,
            key: 'users',
            icon: <FaUser />,
        },
        {
            label: <Link className='text-decoration-none' to={"/admin"}>Admin</Link>,
            key: 'admin',
            icon: <AiFillDashboard />,
        },
        {
            label: <Link className='text-decoration-none' to={"#/admin"}>Cart</Link>,
            key: 'cart',
            icon: <TiShoppingCart />,
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
                                { label: <Link to={'#/profile'} className='text-decoration-none'>Profile</Link>, key: 'profile', icon: <FaCircleUser /> },
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
        <div className='user-header-menu' style={{
            display: "flex",
            alignItems: "center",
            width: "100%"
        }} >
            <h1 className='user-header-title' style={{ margin: 0 }}> <FaReact className='user-header-icon-1' /> Shopzy</h1>
            <Menu
                style={{ display: "flex", flex: 1 }}
                onClick={onClick}
                selectedKeys={[current]}
                mode="horizontal" items={items} />
        </div>
    )
}
export default Header;