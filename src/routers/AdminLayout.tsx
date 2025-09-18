import AdminSidebar from '../components/admin/AdminSidebar';

const AdminLayout = () => {
    return (
        <div className="admin-layout-container">
            <div className="admin-sidebar-container">
                <AdminSidebar/>
            </div>
        </div>
    )
}
export default AdminLayout;