import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../../app/store";

import { getData } from "../../adminAPI/adminAPI";
import {
  setLessProdIdInDatabase,
  getLessProdId,
} from "../whatIsNewAPI/whatIsNewAPI";
import { TProduct } from "../../../../types";
import { deleteDoc, doc } from "firebase/firestore";
import { changeModalWindow, getProducts, passCurrentProdId, removeProduct } from "../../adminSlice/adminSlice";
import { db } from "../../../../firebase";

import ChangeProduct from '../../adminProducts/adminProducts';

function LessQuantityProd() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isModalWindow = useAppSelector(state => state.admin.isModalWindow)
  
  const product = useAppSelector(state => state.admin.filteredProducts)


  const [newProd, setNewProd] = useState<TProduct[]>([]);
  const [oldProd, setOldProd] = useState<TProduct[]>([]);

  useEffect(() => {
    dispatch(getProducts());
    async function setNewAndOldProducts() {
      let newLess: TProduct[] = [];
      let currentOldLess: TProduct[] = [];
      let fetchedProducts = await getData();
      let fetchedOldProdId = await getLessProdId();
        let seenId = [];
        for (let product of fetchedProducts) {
          if (product.quantity <= 10) {
            if (fetchedOldProdId.includes(product.id)) {
              currentOldLess.push(product);
              seenId.push(product.id);
            } else {
              newLess.push(product);
              seenId.push(product.id);
            }
          }
        }
      window.localStorage.setItem("allLessProductsId", JSON.stringify(seenId));
      setOldProd(currentOldLess);
      setNewProd(newLess);
    }
    setNewAndOldProducts();
    return () => {
      async function setIdsData() {
        let allLessProductsId =
        window.localStorage.getItem("allLessProductsId");
        await setLessProdIdInDatabase(allLessProductsId);
      }
      setIdsData();
    };
  }, []);

  const deleteProduct = (id: string, category: string) => {
    deleteDoc(doc(db, `${category}`, `${id}`)).then((res) => {
      dispatch(removeProduct(id))
      setNewProd(newProd.filter(el => el.id !== id))
      setOldProd(oldProd.filter(el => el.id !== id))
    }
    );
  };

  const openChangeModal = (id: string) => {
    dispatch(changeModalWindow())
    dispatch(passCurrentProdId(id))
  }

  return (
    <div>
      <div>list</div>
      <button onClick={() => navigate("/admin")}>go back</button>
      <table>
        <thead>
          <tr>
            <th>N</th>
            <th>Image</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Gender</th>
            <th>Color</th>
            <th>Price $</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Action</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {newProd.map((item, index) => {
            return (
              <tr key={index} className="new-less-products">
                <td>{index + 1}</td>
                <td>
                  <img className="products_list_image" src={item.imgUrl} />
                </td>
                <td>{item.name}</td>
                <td>{item.brand}</td>
                <td>{item.gender}</td>
                <td>{item.color}</td>
                <td>{item.price}$</td>
                <td>{item.quantity}</td>
                <td>{item.category}</td>
                <td>
                  <Button
                    onClick={() => openChangeModal(item.id)}
                    variant="contained"
                    size="small"
                  >
                    change
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => deleteProduct(item.id, item.category)}
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
          {oldProd.map((item, index) => {
            return (
              <tr key={index} className="old-less-products">
                <td>{index + 1}</td>
                <td>
                  <img className="products_list_image" src={item.imgUrl} />
                </td>
                <td>{item.name}</td>
                <td>{item.brand}</td>
                <td>{item.gender}</td>
                <td>{item.color}</td>
                <td>{item.price}$</td>
                <td>{item.quantity}</td>
                <td>{item.category}</td>
                <td>
                  <Button
                    onClick={() => openChangeModal(item.id)}
                    variant="contained"
                    size="small"
                  >
                    change
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => deleteProduct(item.id, item.category)}
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
      {isModalWindow && <ChangeProduct />}
    </div>
  );
}
export default LessQuantityProd;
