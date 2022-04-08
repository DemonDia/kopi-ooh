import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
    apiKey: "apiKey",
    authDomain: "authDomain",
    databaseURL: "databaseURL",
    projectId: "projectId",
    storageBucket: "storageBucket",
    messagingSenderId: "messagingSenderId",
    appId: "appId"
  };
  
const app = initializeApp(firebaseConfig)
const storage = getStorage(app);
const  db = getFirestore(app)
const tableDb = getDatabase(app);
//   const db = getFirestore(app)

export  {storage,db,tableDb}