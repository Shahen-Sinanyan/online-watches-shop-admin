import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  //getProducts,
  //getOldLessProdId,
  setOldLessProdId,
  setNewLessProdId,
  //forceRerender,
} from "../whatIsNewSlice/whatIsNewSlice";
import { getData } from "../../adminAPI/adminAPI";
import { setLessProdIdInDatabase, getLessProdId } from "../whatIsNewAPI/whatIsNewAPI";

function LessQuantityProd() {
  const navToWhatIsNew = useNavigate();
  const dispatch = useDispatch();
  //const products = useSelector((state) => state.whatIsNew.products);
  // const newlessProdId = useSelector((state) => state.whatIsNew.newLessProdId);
  // const oldLessProdId = useSelector((state) => state.whatIsNew.oldLessProdId);

  const [newProd, setNewProd] = useState([]); //useState(products.filter(item => newlessProdId.includes(item.id)));
  const [oldProd, setOldProd] = useState([]); //useState(products.filter(item => oldLessProdId.includes(item.id)));
 

  useEffect(() => {
    async function setNewAndOldProducts() {
      let newLess = [];
      let currentOldLess = [];
      let fetchedProducts = await getData();
      let fetchedOldProdId = await getLessProdId();
      // let old = (product) => {
      //   return new Promise(res => {
      //     res(setOldProd(prev => [...prev, product]));
      //   })
      // }
      // let newL = (product) => {
      //   return new Promise(res => {
      //     res(setNewProd(prev => [...prev, product]));
      //   })
      // }
      
      for (let product of fetchedProducts) {
        if (product.quantity <= 10) {
          if (fetchedOldProdId.includes(product.id)) {
             currentOldLess.push(product);
            //const passOld = await old(product)
          } else {
            newLess.push(product)
            //const passNew = await newL(product)
          }
        }
      }
       setOldProd(currentOldLess);
       setNewProd(newLess);

      console.log('currentOldLess, newLess :::', currentOldLess.length, newLess.length, 'oldProd, newProd :::', oldProd.length, newProd.length)
      //setNewProd(fetchedProducts.filter((item) => newlessProdId.includes(item.id)));
      //setOldProd(fetchedProducts.filter((item) => fetchedOldProdId.includes(item.id)));
    }
    setNewAndOldProducts();
    return () => {
      async function setIdsData() {
        let passToDatabase = [];
        let maxLength = oldProd.length; 
        if (maxLength < newProd.length) {
          maxLength = newProd.length;
        }
        console.log(newProd.length, oldProd.length, 'newOld async unmount')
        for (let i = 0; i < maxLength; i++) {
          if (oldProd[i].id) {
            console.log('oldProd[i].id',oldProd[i].id)
            passToDatabase.push(oldProd[i].id);
          } else if (newProd[i].id) {
            console.log('newProd[i].id',newProd[i].id)
            passToDatabase.push(newProd[i].id);
          }
        }
        let setData = await setLessProdIdInDatabase(passToDatabase);
        console.log(newProd.length, oldProd.length, 'newOld async unmount')
      }
      
      setIdsData();
    };
  }, []);

  console.log(newProd.length, oldProd.length, 'newOld')
  return (
    <div>
      <div>list</div>
      <button onClick={() => navToWhatIsNew("/admin")}>go back</button>
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
            <th>Views</th>
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
                <td>{item.views}</td>
                <td>
                  <Button
                    //onClick={() => handleChangeBtn(item.id)}
                    variant="contained"
                    size="small"
                  >
                    change
                  </Button>
                </td>
                <td>
                  <Button
                    // onClick={() => removeProduct(item.id, item.category)}
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
                <td>{item.views}</td>
                <td>
                  <Button
                    //onClick={() => handleChangeBtn(item.id)}
                    variant="contained"
                    size="small"
                  >
                    change
                  </Button>
                </td>
                <td>
                  <Button
                    // onClick={() => removeProduct(item.id, item.category)}
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
export default LessQuantityProd;
