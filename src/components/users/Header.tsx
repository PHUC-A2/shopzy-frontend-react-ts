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
import { Link } from 'react-router';
import './Header.scss'
import { TiShoppingCart } from 'react-icons/ti';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/reducer/rootReducer';
type MenuItem = Required<MenuProps>['items'][number];

const Header = () => {

    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
    const account = useSelector((state: RootState) => state.user.account);

    console.log("account: ", account)
    console.log("isAuthenticated: ", isAuthenticated)
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

                // nếu chưa đăng nhập thì isAuthenticated = false
                // và sẽ hiện lên và ngược lại
                ...(isAuthenticated ?
                    [
                        { label: <Link to={'#/profile'} className='text-decoration-none'>Profile</Link>, key: 'profile', icon: <FaCircleUser /> },
                        { label: 'Log out', key: 'logout', icon: <LogoutOutlined /> }
                    ]
                    :
                    [
                        { label: <Link to={'/login'} className='text-decoration-none'>Sign in</Link>, key: 'signin', icon: <IoMdLogIn /> },
                        { label: <Link to={'/register'} className='text-decoration-none'>Sign up</Link>, key: 'signup', icon: < FaUserPlus /> }
                    ])
                // {
                //     type: 'group',
                //     children: [
                //         { label: <Link to={'/login'} className='text-decoration-none'>Sign in</Link>, key: 'signin', icon: <IoMdLogIn /> },
                //         { label: <Link to={'/register'} className='text-decoration-none'>Sign up</Link>, key: 'signup', icon: < FaUserPlus /> },
                //         { label: <Link to={'#/profile'} className='text-decoration-none'>Profile</Link>, key: 'profile', icon: <FaCircleUser /> },
                //     ],
                // },
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