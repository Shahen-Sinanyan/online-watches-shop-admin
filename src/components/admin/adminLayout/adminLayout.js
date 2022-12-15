import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Outlet } from "react-router";

function AdminLayout() {
  const navToProducts = useNavigate();
  const navToWhatIsNew = useNavigate();
  const navToUsers = useNavigate();
  const navToSales = useNavigate();
  const navToMessages = useNavigate();
  const navToFAQ = useNavigate();

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
            <li onClick={() => navToWhatIsNew("/admin")}>
              Waht is new
            </li>
            <li onClick={() => navToProducts("/admin/products")}>Products</li>
            <li onClick={() => navToUsers("/admin/users")}>Users</li>
            <li onClick={() => navToSales("/admin/sales")}>Sales</li>
            <li onClick={() => navToMessages("/admin/messages")}>Messages</li>
            <li onClick={() => navToFAQ("/admin/faq")}>FAQ</li>
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
