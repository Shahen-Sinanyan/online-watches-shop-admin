import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router";

function AdminLayout() {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <div className="header_of_admin">
          <div className="header_of_admin_child">
            <span>Admin</span>
            <span>SHOP_NAME</span>
          </div>
        </div>
        <div className="nav_bar">
          <ul className="nav_bar_ul">
            <li onClick={() => navigate("/admin")}>What is new</li>
            <li onClick={() => navigate("/admin/products")}>Products</li>
            <li onClick={() => navigate("/admin/users")}>Users</li>
            <li onClick={() => navigate("/admin/sales")}>Sales</li>
            <li onClick={() => navigate("/admin/messages")}>Messages</li>
            <li onClick={() => navigate("/admin/faq")}>FAQ</li>
          </ul>
        </div>
      </div>
      <div className="admin_body">
        <Outlet />
      </div>
    </>
  );
}
export default AdminLayout;
