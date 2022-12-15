// ///firebase v8.5
// import 'firebase/firestore';
// import 'firebase/auth';
// import firebase from 'firebase/app';

// const firebaseConfig = {
//    apiKey: 'AIzaSyCRdVSksH0QzR_12oJXVC7mMdd-sJBjYIg',
//    authDomain: 'online-shop-674ff.firebaseapp.com',
//    projectId: 'online-shop-674ff',
//    storageBucket: 'online-shop-674ff.appspot.com',
//    messagingSenderId: '994083342799',
//    appId: '1:994083342799:web:0747da05d7660c0e826aba'
// };

// firebase.initializeApp(firebaseConfig);

// const projectFireStore = firebase.firestore();
// const projectAuth = firebase.auth();

// export { projectFireStore, projectAuth };

/////////////////////////////////////

//firebase 9.14
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// const firebaseConfig = {
//    apiKey: 'AIzaSyCRdVSksH0QzR_12oJXVC7mMdd-sJBjYIg',
//    authDomain: 'online-shop-674ff.firebaseapp.com',
//    projectId: 'online-shop-674ff',
//    storageBucket: 'online-shop-674ff.appspot.com',
//    messagingSenderId: '994083342799',
//    appId: '1:994083342799:web:0747da05d7660c0e826aba'
// };
/////////////////////////////////////
//jamanakavor//
const firebaseConfig = {
   apiKey: "AIzaSyBcdCujmZJHxx2G5sGP6L8OQetmlQJ-nOc",
   authDomain: "online-shop-9baf8.firebaseapp.com",
   databaseURL: "https://online-shop-9baf8-default-rtdb.europe-west1.firebasedatabase.app",
   projectId: "online-shop-9baf8",
   storageBucket: "online-shop-9baf8.appspot.com",
   messagingSenderId: "571017545081",
   appId: "1:571017545081:web:ee2357ba70e54ed37c9ba8",
   measurementId: "G-YDBBRZ2W6K"
 };
////////////////////////////////////

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);