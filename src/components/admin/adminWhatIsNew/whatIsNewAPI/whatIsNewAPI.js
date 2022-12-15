import { db } from "../../../../firebase";
import { getDocs, collection, setDoc, doc } from "firebase/firestore";

export async function getLessProdId() {
  let arrLessProdId = [];
  let notifications = await getDocs(collection(db, "/notifications"));
  notifications.forEach((doc) => {  
      arrLessProdId = doc.data().lessProducts;
  });
 // console.log("less prod id from API", arrLessProdId);
  return arrLessProdId;
}
//getLessProdId()

// async function getNotify () {
//   let result = await getDocs(collection(db, 'notifications'));
//   result.forEach(doc => {
//     console.log(doc.id, doc.data())
//   })
// }
// getNotify ()

export async function setLessProdIdInDatabase(newData) {
  let updateLessProdData = await setDoc(
    doc(db, "/notifications", 'tcOKb5vK7LWqQx2RpO1p'),
    { lessProducts: newData},
    {merge: true}
  );
}
//setLessProdIdInDatabase();