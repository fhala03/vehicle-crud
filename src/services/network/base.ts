import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  getDocs,
  getDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { VehicleModelType } from "@/utils/types";

const getCollectionRef = (collectionName: string) => collection(db, collectionName);

export const createDoc = async ({ collectionName, doc: data }: { collectionName: string; doc: Record<string, any> }) => {
  const collectionRef = getCollectionRef(collectionName);
  await addDoc(collectionRef, data);
};

export const deleteDocById = async (collectionName: string, id: string) => {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
};

export const updateDocById = async (collectionName: string, id: string, newFields: Record<string, any>) => {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, newFields);
};

export const getDocById = async <T>(collectionName: string, id: string): Promise<T | null> => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { ...(docSnap.data() as T), id: docSnap.id } : null;
};

export const getDocsSorted = async <T>(collectionName: string, field: string, order: "asc" | "desc"): Promise<T[]> => {
  const collectionRef = getCollectionRef(collectionName);
  const queryRef = query(collectionRef, orderBy(field, order));
  const snapshot = await getDocs(queryRef);

  return snapshot.docs.map((doc) => ({
    ...(doc.data() as T),
    id: doc.id,
  }));
};

export const onSnapshotListener = (collectionName: string, callback: (snapshot: any) => void) => {
  const collectionRef = getCollectionRef(collectionName);
  return onSnapshot(collectionRef, callback);
};

export const getModelsByMake = async (makeId: string): Promise<VehicleModelType[]> => {
  const modelsCollection = collection(db, "vehicleModel");
  const modelsQuery = query(modelsCollection, where("makeId", "==", makeId));
  const modelsSnapshot = await getDocs(modelsQuery);

  return modelsSnapshot.docs.map((doc) => ({
    ...(doc.data() as VehicleModelType),
    id: doc.id,
  }));
};

export const getModelsSorted = async (field: string, order: "asc" | "desc"): Promise<VehicleModelType[]> => {
  const modelsCollection = collection(db, "vehicleModel");
  const modelsQuery = query(modelsCollection, orderBy(field, order));
  const modelsSnapshot = await getDocs(modelsQuery);

  return modelsSnapshot.docs.map((doc) => ({
    ...(doc.data() as VehicleModelType),
    id: doc.id,
  }));
};
