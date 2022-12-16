import {collection, doc, setDoc, getDoc, getDocs, deleteDoc, addDoc} from "firebase/firestore";

import { db } from "../../../firebase";
import { TProduct } from "../../../types";



async function getNotifications () {
  let test = await getDocs(collection(db, '/notifications'));
  test.forEach((doc) => console.log(doc.id, doc.data()))
}
//getNotifications()
// async function updateData () {
//   let add = await setDoc(doc(db, 'notifications', '0X3oZDwXYqPRQlFJoK'), {asdsf:324}, {merge: false})
//   let test = await getDocs(collection(db, '/notifications'));
//   test.forEach((doc) => console.log(doc.id, doc.data()))
// }
// updateData()

// async function addData () {
//  // let result = await addDoc(collection(db, '/notifications'), {name: 'newUsers', newUsers:[]}, {merge:true})
//   let test = await getDocs(collection(db, '/notifications'));
//   test.forEach((doc) => console.log(doc.id, doc.data()))
// }
// addData()

// async function deleteData() { 
//   let result = await deleteDoc(doc(db, 'notifications', 'xXmaQVLkT4bUj9nwWGbN'));
//   let test = await getDocs(collection(db, '/notifications'));
//   test.forEach((doc) => console.log(doc.id, doc.data()))
// }
// deleteData()

export async function addProduct(categoryName : string, newData : TProduct) {
  let docRef = doc(db, `${categoryName}`);
  let result = await setDoc(docRef, newData, { merge: true });
  return result;
}

export async function getData() {
  let arrayProducts : TProduct[] = [];

  let watchQuerySnapshot /* QuerySnapshot<DocumentData */ = await getDocs(
    collection(db, "watches")
  );
  watchQuerySnapshot.forEach((doc) => {
    const {price,color, name, gender, imgUrl, count, views, brand, quantity} = doc.data()
    arrayProducts.push({
      id: doc.id,
      category: "watches",
      price,name,gender, imgUrl,color, count, views, brand, quantity
    });
  });

  let accessoriesQuerySnapshot = await getDocs(collection(db, "accessories"));
  accessoriesQuerySnapshot.forEach((doc) => {
    const {price, name, gender,color, imgUrl, count, views, brand, quantity} = doc.data()
    arrayProducts.push({
      id: doc.id,
      category: "accessories",
      price,name,gender, imgUrl,color, count, views, brand, quantity
    });
  });

  let jewelleriesQuerySnapShot = await getDocs(collection(db, "jewelleries"));
  jewelleriesQuerySnapShot.forEach((doc) => {
    const {price, name, gender,color, imgUrl, count, views, brand, quantity} = doc.data()
    arrayProducts.push({
      id: doc.id,
      category: "jewelleries",
      price,name,gender, imgUrl,color, count, views, brand, quantity
    });
  });
  return arrayProducts;
}




