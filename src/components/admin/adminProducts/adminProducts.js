import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';

import { useSelector } from "react-redux";

import AddProducts from "./addProducts/addProducts";
import ProductsSearching from './productsSearching/productsSearching';
import ProductsList from './productsList/productsList';
import ChangeProduct from './changeProduct/changeProduct';

function AdminProducts() {

  const isModalWindow = useSelector(state => state.admin.isModalWindow)
  
  return (
    <div className="global_products">
      <h1>Products</h1> 
      <hr/>
      <ProductsSearching/>
      <hr/>
      <AddProducts/>
      <hr/>
      <ProductsList />
      {isModalWindow && <ChangeProduct />}
    </div>
  );
}

export default AdminProducts;
