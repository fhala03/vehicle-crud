import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const createDoc = async ({ collectionName, doc }: { collectionName: string; doc: Record<string, any> }) => {
  const collectionRef = collection(db, collectionName);
  await addDoc(collectionRef, doc);
};

export const deleteDocById = async (collectionName: string, id: string) => {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
};

export const updateDocById = async (collectionName: string, id: string, newFields: Record<string, any>) => {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, newFields);
};
