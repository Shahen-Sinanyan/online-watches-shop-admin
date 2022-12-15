import {collection, doc, setDoc, getDoc, getDocs, deleteDoc, addDoc} from "firebase/firestore";

import { db } from "../../../firebase";

const lessProdRef = doc(db, "/notifications", "/lessProducts");
const watchesProdRef = doc(db, "/collections", "/watches");
const jewelleriesProdRef = doc(db, "/collections", "/jewelleries");
const accessoriesProdRef = doc(db, "/collections", "/accessories");


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

export async function addProduct(categoryName, newData) {
  let docRef = doc(db, `${categoryName}`);
  let result = await setDoc(docRef, newData, { merge: true });
  return result;
}

export async function getData() {
  let arrayProducts = [];

  let watchQuerySnapshot /* QuerySnapshot<DocumentData */ = await getDocs(
    collection(db, "watches")
  );
  watchQuerySnapshot.forEach((doc) => {
    arrayProducts.push({
      id: doc.id,
      category: "watches",
      ...doc.data(),
    });
  });

  let accessoriesQuerySnapshot = await getDocs(collection(db, "accessories"));
  accessoriesQuerySnapshot.forEach((doc) => {
    arrayProducts.push({
      id: doc.id,
      category: "accessories",
      ...doc.data(),
    });
  });

  let jewelleriesQuerySnapShot = await getDocs(collection(db, "jewelleries"));
  jewelleriesQuerySnapShot.forEach((doc) => {
    arrayProducts.push({
      id: doc.id,
      category: "accessories",
      ...doc.data(),
    });
  });
 // console.log('getData', arrayProducts)
  return arrayProducts;
}
getData()
// ///////////////////////////////////////////////////////////
// import { projectFireStore } from "../../../firebase";

// export async function addData(newData) {
//   let result = await projectFireStore
//     .collection(`/${newData?.category}`)
//     .add(newData);
//   return result;
// }

// export async function getData() {
//   let arrayProducts = [];

//   let watches = await projectFireStore
//     .collection("/watches")
//     .get()
//     .then((res) => {
//       res.docs.forEach((doc) => {
//         arrayProducts.push({
//           id: doc.id,
//           category: "watches",
//           ...doc.data(),
//         });
//       });
//     });

//   let accessories = await projectFireStore
//     .collection("/accessories")
//     .get()
//     .then((res) => {
//       res.docs.forEach((doc) => {
//         arrayProducts.push({
//           id: doc.id,
//           category: "accessories",
//           ...doc.data(),
//         });
//       });
//     });

//   let jewelleries = await projectFireStore
//     .collection("/jewelleries")
//     .get()
//     .then((res) => {
//       res.docs.forEach((doc) => {
//         arrayProducts.push({
//           id: doc.id,
//           category: "jewelleries",
//           ...doc.data(),
//         });
//       });
//     });

//   return arrayProducts;
// }
// //getData();

// ///////////////////EXPERIMENT////////////////////////////
// // datayic categorianery zangvacov vercnel
// // ev zangvaci vra loop -ov productnery vercnel
// // export async function getData() {
// //   let arrayCategories = [];
// //   let arrayProducts = [];
// //   let products;
// //   let categories = await projectFireStore
// //     .collection("/categories")
// //     .get()
// //     .then((res) => {
// //       res.docs.forEach((doc) => {
// //         arrayCategories.push(doc.data().category);
// //       });
// //     });
// //   categories = arrayCategories;

// //   categories.forEach(async (item) => {
// //     products = await projectFireStore
// //       .collection(item)
// //       .get()
// //       .then((res) => {
// //         res.docs.forEach((doc) => {
// //           arrayProducts.push(doc.data());
// //           console.log(doc.data())
// //         });
// //       });
// //       products = arrayProducts;
// //   });
// //   console.log("asd", products);
// //   return categories;
// // }
// //////////////////////////////////////
