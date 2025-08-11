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
type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    { key: 'title', icon: <FaReact className='admin-sidebar-icon-1' />, label: 'Hồ Ka IT' },
    { key: 'admin', icon: <PieChartOutlined />, label: <Link to={"/admin"}>Dashboard</Link> },
    {
        key: 'sub1',
        label: 'Feature (Chức năng) ',
        icon: <MdOutlineFeaturedPlayList />,
        children: [
            { key: 'adminUser', icon: <FaUsers />, label: <Link to={"#/admin/users"}>Quản lý Users (ND)</Link> },
            { key: 'adminProducte', icon: <ProductOutlined />, label: <Link to={"#/admin/producte"}>Quản lý Producte (SP)</Link> },
            { key: 'adminRole', icon: <FaUsers />, label: <Link to={"#/admin/roles"}>Quản lý Role (VT)</Link> },
        ],
    },
    {
        key: 'sub2',
        label: 'Settings',
        icon: <IoSettingsOutline />,
        children: [
            { key: 'adminLogout', icon: <AiOutlineLogout />, label: <Link to={"#/admin/logout"}>Log out</Link> },
            { key: 'adminProfile', icon: <FaUserShield />, label: <Link to={"#/admin/profile"}>Profile</Link> },
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