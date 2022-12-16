import React from 'react';
import logo from './logo.svg';
import './App.css';
import "./components/admin/adminMain/style.css";
import "./components/admin/adminProducts/style.css";
import './components/admin/adminProducts/productsList/style.css';
import './components/admin/adminProducts/productsSearching/style.css';
import './components/admin/adminProducts/addProducts/style.css';
import './components/admin/adminProducts/changeProduct/style.css';
import './components/admin/adminWhatIsNew/style.css';
import './components/admin/adminWhatIsNew/lessQuantityProd/style.css'

import { Routes, Route } from "react-router-dom";

import AdminMain from "./components/admin/adminMain/adminMain";

function App() {
  
  
    return (
      <div>
        <AdminMain/>
      </div>
    );
  
}

export default App;
