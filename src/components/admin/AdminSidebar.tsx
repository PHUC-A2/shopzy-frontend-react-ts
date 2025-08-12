import {
    PieChartOutlined,
    ProductOutlined,
} from '@ant-design/icons';
import type { MenuProps, MenuTheme } from 'antd';
import { Menu } from 'antd';
import './AdminSidebar.scss'
import { MdOutlineFeaturedPlayList } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa';
import { FaReact, FaUserShield } from 'react-icons/fa6';
import { Link } from 'react-router';
import { IoSettingsOutline } from 'react-icons/io5';
import { AiOutlineLogout } from 'react-icons/ai';
import { SiAegisauthenticator } from 'react-icons/si';
type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    { key: 'title', icon: <FaReact className='admin-sidebar-icon-1' />, label: 'Hồ Ka IT' },
    { key: 'admin', icon: <PieChartOutlined />, label: <Link className='nav-link' to={"/admin"}>Dashboard</Link> },
    {
        key: 'sub1',
        label: 'Feature (Chức năng)',
        icon: <MdOutlineFeaturedPlayList />,
        children: [
            { key: 'adminUser', label: <Link className='nav-link' to={"/admin/users"}><FaUsers />  Quản lý Users (ND)</Link> },
            { key: 'adminProducte', label: <Link className='nav-link' to={"#/admin/producte"}><ProductOutlined /> Quản lý Producte (SP)</Link> },
            { key: 'adminRole', label: <Link className='nav-link' to={"#/admin/roles"}><SiAegisauthenticator /> Quản lý Role (VT)</Link> },
        ],
    },
    {
        key: 'sub2',
        label: 'Settings',
        icon: <IoSettingsOutline />,
        children: [
            { key: 'adminLogout', label: <Link className='nav-link' to={"#/admin/logout"}><AiOutlineLogout /> Log out</Link> },
            { key: 'adminProfile', label: <Link className='nav-link' to={"#/admin/profile"}><FaUserShield /> Profile</Link> },
        ],
    },
];


interface IProps {
    collapsed: boolean;
    theme: MenuTheme;
}

const AdminSidebar = (props: IProps) => {

    const { collapsed, theme } = props;

    return (
        <div className='admin-sidebar-menu'
            style={{
                width: collapsed ? '80px' : '256px'
            }}
        >
            <Menu
                defaultSelectedKeys={['admin']}
                defaultOpenKeys={['admin']}
                mode="inline"
                theme={theme}
                inlineCollapsed={collapsed}
                items={items}
            />
        </div>
    )
}
export default AdminSidebar;