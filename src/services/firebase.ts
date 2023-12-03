import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAjpDRXeHXgmWAULqDm7b8QOISYoazyNsU",
  authDomain: "vehicle-crud-46ec6.firebaseapp.com",
  projectId: "vehicle-crud-46ec6",
  storageBucket: "vehicle-crud-46ec6.appspot.com",
  messagingSenderId: "827723633840",
  appId: "1:827723633840:web:328e3ac726c13ad0cf1775",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
