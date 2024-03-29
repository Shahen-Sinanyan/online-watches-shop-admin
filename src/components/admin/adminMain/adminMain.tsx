import { Routes, Route } from "react-router-dom";

import AdminLayout from "../adminLayout/adminLayout";
import WhatIsNew from "../adminWhatIsNew/adminWhatIsNew";
import AdminProducts from "../adminProducts/adminProducts";
import AdminUsers from "../adminUsers/adminUsers";
import AdminSales from "../adminSales/adminSales";
import AdminMessages from "../adminMessages/adminmessages";
import AdminFAQ from "../adminFAQ/adminFAQ";
import LessQuantityProd from "../adminWhatIsNew/lessQuantityProd/lesQuantityProd";
//styles
import "./style.css";
import "../adminProducts/style.css";
import '../adminProducts/productsList/style.css';
import '../adminProducts/productsSearching/style.css';
import '../adminProducts/addProducts/style.css';
import '../adminProducts/changeProduct/style.css';
import '../adminWhatIsNew/style.css';
import '../adminWhatIsNew/lessQuantityProd/style.css'

function AdminMain() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<WhatIsNew />}></Route>
        <Route
          path="/admin/less-products"
          element={<LessQuantityProd />}
        ></Route>
        <Route path="/admin/products" element={<AdminProducts />}></Route>
        <Route path="/admin/users" element={<AdminUsers />}></Route>
        <Route path="/admin/sales" element={<AdminSales />}></Route>
        <Route path="/admin/messages" element={<AdminMessages />}></Route>
        <Route path="/admin/faq" element={<AdminFAQ />}></Route>
      </Route>
    </Routes>
  );
}

export default AdminMain;
