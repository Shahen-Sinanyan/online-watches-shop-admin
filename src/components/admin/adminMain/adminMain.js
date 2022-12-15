import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import AdminLayout from "../adminLayout/adminLayout";
import WhatIsNew from "../adminWhatIsNew/adminWhatIsNew";
import AdminProducts from "../adminProducts/adminProducts";
import AdminUsers from "../adminUsers/adminUsers";
import AdminSales from "../adminSales/adminSales";
import AdminMessages from "../adminMessages/adminmessages";
import AdminFAQ from "../adminFAQ/adminFAQ";
import LessQuantityProd from '../adminWhatIsNew/lessQuantityProd/lesQuantityProd';

import {getProducts} from '../../admin/adminSlice/adminSlice';
//import { useAppSelector, useAppDispatch } from "../../../app/hooks";
//import { modalSelector } from "../adminSlice/admineSlice";

function AdminMain() {
  const navToProducts = useNavigate();
  const navToWhatIsNew = useNavigate();
  const navToUsers = useNavigate();
  const navToSales = useNavigate();
  const navToMessages = useNavigate();
  const navToFAQ = useNavigate();
 
  return (
    <div>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<WhatIsNew />}></Route>
          <Route path="/admin/less-products" element={<LessQuantityProd/>}></Route>
          <Route path="/admin/products" element={<AdminProducts />}></Route>  {/*path="/admin/products" */}
          <Route path="/admin/users" element={<AdminUsers />}></Route>
          <Route path="/admin/sales" element={<AdminSales />}></Route>
          <Route path="/admin/messages" element={<AdminMessages />}></Route>
          <Route path="/admin/faq" element={<AdminFAQ />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default AdminMain;
