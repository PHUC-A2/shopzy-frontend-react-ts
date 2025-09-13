import {
    DashboardOutlined,
    LogoutOutlined,
    SettingOutlined,
    UserAddOutlined,
} from '@ant-design/icons';
import type { MenuProps, MenuTheme } from 'antd';
import { Menu } from 'antd';
import { AiOutlineProduct, AiOutlineShoppingCart } from 'react-icons/ai';
import { FaBoxesPacking, FaCartPlus, FaCircleUser } from 'react-icons/fa6';
import { MdFeaturedPlayList } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import type { RootState } from '../../redux/store';
import { logout } from '../../service/Api';
import { setLogoutUser } from '../../redux/slice/authSlice';
import { toast } from 'react-toastify';
import { BsFillJournalBookmarkFill } from 'react-icons/bs';

type MenuItem = Required<MenuProps>['items'][number];
interface IProps {
    collapsed: boolean;
    theme: MenuTheme;
}

const AdminSidebar = (props: IProps) => {
    const { collapsed, theme } = props;
    const dispatch = useDispatch();
    const navigave = useNavigate();
    const profile = useSelector((state: RootState) => state.user.user);

    const handleLogout = async () => {
        try {
            const res = await logout();
            if (res?.data?.statusCode === 200) {
                dispatch(setLogoutUser())
                toast.success('Đăng xuất thành công');
                navigave('/login');
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


    const handleProfile = async () => {
        console.log("Profile: ", profile);
    }

    const items: MenuItem[] = [
        { key: '1', icon: <DashboardOutlined />, label: <Link className='nav-link' to={"/admin"}> Dashboard</Link> },
        {
            key: 'sub1',
            label: 'Feature',
            icon: <MdFeaturedPlayList />,
            children: [
                { key: '2', icon: <UserAddOutlined />, label: <Link to="/admin/users" style={{ color: "white", textDecoration: "none" }}>User</Link> },
                { key: '3', icon: <AiOutlineProduct />, label: <Link to="/admin/products" style={{ color: "white", textDecoration: "none" }}>Product</Link> },
                { key: '4', icon: <FaCartPlus />, label: <Link to="/admin/carts" style={{ color: "white", textDecoration: "none" }}>Cart</Link> },
                { key: '5', icon: <AiOutlineShoppingCart />, label: <Link to="/admin/cart-items" style={{ color: "white", textDecoration: "none" }}>Cart Item</Link> },
                { key: '6', icon: <BsFillJournalBookmarkFill />, label: <Link to="/admin/orders" style={{ color: "white", textDecoration: "none" }}>Order</Link> },
                { key: '7', icon: <FaBoxesPacking />, label: <Link to="/admin/order-items" style={{ color: "white", textDecoration: "none" }}>Order Item</Link> },
            ],
        },
        {
            key: 'sub2',
            label: 'Settings',
            icon: <SettingOutlined />,
            children: [
                { key: "8", label: <span onClick={handleProfile}>Profile</span>, icon: <FaCircleUser /> },
                { key: "9", label: <span onClick={handleLogout}>Log out</span>, icon: <LogoutOutlined /> },
            ],
        },
    ];

    return (
        <div className='admin-sidebar-menu'
            style={{
                width: collapsed ? '80px' : '256px'
            }}
        >
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['1']}
                mode="inline"
                theme={theme}
                inlineCollapsed={collapsed}
                items={items}
            />
        </div>
    )
}
export default AdminSidebar;