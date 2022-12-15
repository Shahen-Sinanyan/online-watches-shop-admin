import React, { useCallback, useEffect, useState } from "react";
import { collection, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import {
  getProducts,
  changeModalWindow,
  forceRerender,
  passCurrentProdId,
} from "../../adminSlice/adminSlice";
import { useDispatch, useSelector } from "react-redux";

import Button from "@mui/material/Button";

function ProductsList() {
  const [checkboxToggle, setCheckboxToggle] = useState(false);

  const products = useSelector((state) => state.admin.filteredProducts);
  const rerender = useSelector((state) => state.admin.rerender);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    return () => {
      dispatch(getProducts()); //updating after product delete
    };
  }, [rerender]);

  const handleCheckbox = () => {
    setCheckboxToggle((prev) => !prev);
  };

  const handleChangeBtn = (id) => {
    dispatch(changeModalWindow());
    dispatch(passCurrentProdId(id));
  };

  const removeProduct = useCallback((id, category) => {
    deleteDoc(doc(db, `${category}`, `${id}`));
    dispatch(forceRerender());
  }, []);

  const handleQuantityClassName = (quantity) => {
    if (quantity > 50) {
      return "quantity_green";
    } else if (quantity <= 50 && quantity > 10) {
      return "quantity_blue";
    } else {
      return "quantity_red";
    }
  };
  return (
    <div className="products_list_field">
      <h3>Products list</h3>
      <table>
        <thead>
          <tr>
            <th>{checkboxToggle ? <input type="checkbox" /> : null}</th>
            <th>N</th>
            <th>Image</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Gender</th>
            <th>Color</th>
            <th>Price $</th>
            <th>Quantity</th>
            <th>Views</th>
            <th>Action</th>
            <th>
              <button onClick={handleCheckbox}>
                {checkboxToggle ? "Take off" : "Select items"}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => {
            return (
              <tr key={index}>
                <td>{checkboxToggle ? <input type="checkbox" /> : null}</td>
                <td>{index + 1}</td>
                <td>
                  <img className="products_list_image" src={item.imgUrl} />
                </td>
                <td>{item.name}</td>
                <td>{item.brand}</td>
                <td>{item.gender}</td>
                <td>{item.color}</td>
                <td>{item.price}$</td>
                <td className={handleQuantityClassName(item.quantity)}>
                  {item.quantity}
                </td>
                <td>{item.views}</td>
                <td>
                  <Button
                    onClick={() => handleChangeBtn(item.id)}
                    variant="contained"
                    size="small"
                  >
                    change
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => removeProduct(item.id, item.category)}
                    variant="contained"
                    color="error"
                    size="small"
                  >
                    delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default ProductsList;
