import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyD5SD7-8FuuNDRnhx1vIh3Up6VITxTGOSc",
    authDomain: "o-kopi.firebaseapp.com",
    projectId: "o-kopi",
    storageBucket: "o-kopi.appspot.com",
    messagingSenderId: "1019390864875",
    appId: "1:1019390864875:web:54073bda6b0f3028aa7dae"
  };
  
  const app = initializeApp(firebaseConfig)
//   const db = getFirestore(app)

export const  db = getFirestore(app)