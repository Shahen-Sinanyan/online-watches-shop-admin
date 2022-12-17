import { db } from "../../../../firebase";
import { getDocs, collection, setDoc, doc } from "firebase/firestore";

export async function getLessProdId() : Promise<string[]> {
  let arrLessProdId : string[]= [];
  let notifications = await getDocs(collection(db, "/notifications"));
  notifications.forEach((doc) => {
    if (doc.data().lessProducts) arrLessProdId = doc.data().lessProducts;
  });
  return arrLessProdId;
}
// async function getNotify () {
//   let result = await getDocs(collection(db, 'notifications'));
//   result.forEach(doc => {
//     console.log(doc.id, doc.data())
//   })
// }
// getNotify ()

export async function setLessProdIdInDatabase(newData : string[]): Promise<void> {
  let id : string = ''
  const response = await getDocs(collection(db, 'notifications'))
  response.forEach(doc => {
    if(doc.data().lessProducts) id = doc.id
  })
  setDoc(
    doc(db, "/notifications", id),
    { lessProducts: newData },
    { merge: true }
  );
}
