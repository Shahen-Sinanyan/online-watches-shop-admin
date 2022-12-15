import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {setLessProdIdInDatabase, getLessProdId} from './whatIsNewAPI/whatIsNewAPI';
import { getData } from "../adminAPI/adminAPI";

import {
  //getNewAndLessProdId,
  //getProducts, // reduxum datan fetch anelov lifecycle-y chi toxnum UI-um miangamic nkari
  //getOldLessProdId, // reduxum datan fetch anelov lifecycle-y chi toxnum UI-um miangamic nkari
  setOldLessProdId,
  setNewLessProdId,
} from "../adminWhatIsNew/whatIsNewSlice/whatIsNewSlice";
import sales from "../../assets/trolley.png";

function WhatIsNew() {
  const navToLessProd = useNavigate();

  const oldLessProdId = useSelector((state) => state.whatIsNew.oldLessProdId);
  const newLessProdId = useSelector((state) => state.whatIsNew.newLessProdId);
  const products = useSelector((state) => state.whatIsNew.products);
  const rerender = useSelector((state) => state.whatIsNew.rerender);
  const [lessLength, setLessLength] = useState(0)
  const dispatch = useDispatch();
  
  useEffect(() => {
    
     const fetchLessProd = async  () => {
      let newLess = [];
      let currentOldLess = [];
      let fetchProducts = await getData();
      let fetchOldProdId = await getLessProdId();
      
      for (let item of fetchProducts) {
        if (item.quantity <= 10) {
          if (fetchOldProdId.includes(item.id)) {
            currentOldLess.push(item.id);
          } else {
            newLess.push(item.id); 
          }
        }
      }
      setLessLength(newLess.length)
      dispatch(setOldLessProdId(currentOldLess));
      dispatch(setNewLessProdId(newLess));
     }
     fetchLessProd();
  }, []);
  

  return (
    <div className="">
      <h1>what is new</h1>
      <div className="what_is_New_borad">
        <div onClick={() => navToLessProd("/admin/less-products")}>
          <h3>LESS PRODUCTS</h3>
          <div>
            <div>{lessLength?lessLength: null }</div>
            <img src={sales} />
          </div>
        </div>
        <div>
          <h3>NEW SALES</h3>
          <div>
            <img src={sales} />
          </div>
        </div>
        <div>
          <h3>NEW USERS</h3>
          <div>
            <img src={sales} />
          </div>
        </div>
        <div>
          <h3>NEW MESSAGES</h3>
          <div>
            <img src={sales} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhatIsNew;
