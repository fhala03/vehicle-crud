import { makeObservable, observable, action, runInAction } from "mobx";
import { VehicleModelType } from "@/utils/types";
import { onSnapshot, collection, query, orderBy, getDocs, getDoc, doc, where } from "firebase/firestore";
import { createDoc, deleteDocById, updateDocById } from "@/services/network/base";
import { db } from "@/services/firebase";

export class VehicleModelStore {
  models: VehicleModelType[] = [];

  constructor() {
    makeObservable(this, {
      models: observable,
      addModel: action,
      deleteModel: action,
      updateModel: action,
      fetchModels: action,
      fetchModelsSortedAZ: action,
      fetchModelsSortedZA: action,
    });

    this.fetchModels();
  }

  async addModel(newModel: Omit<VehicleModelType, "id">) {
    try {
      await createDoc({ collectionName: "vehicleModel", doc: newModel });
    } catch (error) {
      console.error("Error adding model:", error);
    }
  }

  async deleteModel(id: string) {
    try {
      await deleteDocById("vehicleModel", id);
    } catch (error) {
      console.error("Error deleting model:", error);
    }
  }

  async updateModel(id: string, newFields: Record<string, any>) {
    try {
      await updateDocById("vehicleModel", id, newFields);
    } catch (error) {
      console.error("Error updating model:", error);
    }
  }

  async getModelById(id: string): Promise<VehicleModelType | null> {
    try {
      const modelDoc = await getDoc(doc(db, "vehicleModel", id));
      return modelDoc.exists() ? { ...(modelDoc.data() as VehicleModelType), id: modelDoc.id } : null;
    } catch (error) {
      console.error("Error fetching model by id:", error);
      return null;
    }
  }

  async fetchModelsByMake(makeId: string) {
    try {
      const modelsCollection = collection(db, "vehicleModel");
      const modelsQuery = query(modelsCollection, where("makeId", "==", makeId));
      const modelsSnapshot = await getDocs(modelsQuery);

      runInAction(() => {
        this.models = modelsSnapshot.docs.map((doc) => ({
          ...(doc.data() as VehicleModelType),
          id: doc.id,
        }));
      });
    } catch (error) {
      console.error("Error fetching models by make:", error);
    }
  }

  async fetchModelsSortedAZ() {
    try {
      const modelsCollection = collection(db, "vehicleModel");
      const modelsQuery = query(modelsCollection, orderBy("name", "asc"));
      const modelsSnapshot = await getDocs(modelsQuery);

      runInAction(() => {
        this.models = modelsSnapshot.docs.map((doc) => ({
          ...(doc.data() as VehicleModelType),
          id: doc.id,
        }));
      });
    } catch (error) {
      console.error("Error fetching models:", error);
    }
  }

  async fetchModelsSortedZA() {
    try {
      const modelsCollection = collection(db, "vehicleModel");
      const modelsQuery = query(modelsCollection, orderBy("name", "desc"));
      const modelsSnapshot = await getDocs(modelsQuery);

      runInAction(() => {
        this.models = modelsSnapshot.docs.map((doc) => ({
          ...(doc.data() as VehicleModelType),
          id: doc.id,
        }));
      });
    } catch (error) {
      console.error("Error fetching models:", error);
    }
  }

  async fetchModels() {
    try {
      const modelsCollection = collection(db, "vehicleModel");
      const unsubscribe = onSnapshot(modelsCollection, (snapshot) => {
        runInAction(() => {
          this.models = snapshot.docs.map((doc) => ({
            ...(doc.data() as VehicleModelType),
            id: doc.id,
          }));
        });
      });

      return unsubscribe;
    } catch (error) {
      console.error("Error fetching models:", error);
    }
  }
}
