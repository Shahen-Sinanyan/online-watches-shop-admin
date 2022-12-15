import React, { useState } from "react";
import Button from "@mui/material/Button";


import { useDispatch, useSelector } from "react-redux";
import {searchByFilter, getFilteredProducts} from '../../adminSlice/adminSlice';

function ProductsSearching() {
  const dispatch = useDispatch()

  const dropByFeature = ['Search by','Name','Brand','Color','Gender'];
  const dropByCategory = ['All categories','Watches','Jewelleries' ,'Accessories'];

  const [feature, setFeature] = useState("");
  const [category, setCategory] = useState('');
  const [searchText, setSearchText] = useState('')

  const handleSearchBtn = () => {
    let selectedCtegory; 
    let selectedFeature;
    let text = searchText.trim().toLowerCase();
    if (feature === dropByFeature[0]) {
      selectedFeature = '';
    } else {
      selectedFeature = feature.toLowerCase();
    }

    if (category === dropByCategory[0]) {
      selectedCtegory = '';
    } else {
      selectedCtegory = category.toLowerCase();
    }
    dispatch(searchByFilter({selectedCtegory, selectedFeature, text})); // info pass
    dispatch(getFilteredProducts()) // fetch by passed above info
  }
  
  
  return (
    <div className="product_search_block">
       <select defaultValue={category} onChange={(e) => setCategory(e.target.value)} >
        {dropByCategory.map((item) => {
          return (
            <option key={item} value={`${item}`}>
              {item}
            </option>
          );
        })}
      </select>
      <select value={feature} onChange={(e) => setFeature(e.target.value)}>
        {dropByFeature.map((item) => {
          return (
            <option key={item} value={`${item}`}>
              {item}
            </option>
          );
        })}
      </select>

      <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
      <Button onClick={handleSearchBtn} variant="contained" size="small">
        search
      </Button>
    </div>
  );
}

export default ProductsSearching;
