import React, { useState } from "react";
import Button from "@mui/material/Button";
import {doc, setDoc} from "firebase/firestore";
import {db} from '../../../../firebase';


import { changeModalWindow , forceRerender} from "../../adminSlice/adminSlice";
import { useDispatch, useSelector } from "react-redux";

function ChangeProduct() {
  const products = useSelector((state) => state.admin.filteredProducts);
  const currentId = useSelector((state) => state.admin.currentProdId);
  const dispatch = useDispatch();

  const [thisProduct, setThisProduct] = useState(
    products.find((item) => item.id === currentId)
  );

  const [name, setName] = useState(thisProduct.name);
  const [brand, setBrand] = useState(thisProduct.brand);
  const [image, setImage] = useState(thisProduct.imgUrl);
  const [color, setColor] = useState(thisProduct.color);
  const [gender, setGender] = useState(thisProduct.gender);
  const [price, setPrice] = useState(thisProduct.price);
  const [quantity, setQuantity] = useState(thisProduct.quantity);

  const handleCancelBtn = () => {
    dispatch(changeModalWindow());
  };

  const handleSaveBtn = ( ) => {
    const updatedProduct = {
      name: name,
      brand: brand,
      imgUrl: image,
      color: color,
      gender: gender,
      price: price,
      quantity: quantity,
      category: thisProduct.category, 
    }
    setDoc(doc(db, `/${thisProduct.category}`, `${thisProduct.id}`), updatedProduct, {merge: true})
    dispatch(changeModalWindow());
    dispatch(forceRerender());
  };

  return (
    <div className="change_modal_window">
      <div className="change_modal_window_child">
        <div className="flex_div">
          <h3>Product</h3>
        </div>
        <div className="input_block">
          <span>Name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name*"
          />
        </div>
        <div className="input_block">
          <span>Brand</span>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>
        <div className="input_block">
          <span>Image src</span>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="input_block">
          <span>Color</span>
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div className="input_block">
          <span>Price</span>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="input_block">
          <span>Quantity</span>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="input_block">
          <span>Gender</span>
          <select
            value={thisProduct.gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="input_button_block">
          <Button onClick={handleSaveBtn} variant="contained" color="success">
            Save
          </Button>
          <Button onClick={handleCancelBtn} variant="contained" color="error">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ChangeProduct;
