import { makeObservable, observable, action, runInAction } from "mobx";
import { VehicleModelType } from "@/utils/types";
import { deleteDocById, updateDocById } from "@/services/network/base";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "@/services/firebase";

export class VehicleModelStore {
  models: VehicleModelType[] = [];

  constructor() {
    makeObservable(this, {
      models: observable,
      addModel: action,
      deleteModel: action,
      updateModel: action,
    });
  }

  async addModel(model: Omit<VehicleModelType, "id">) {
    try {
      const docRef = await addDoc(collection(db, "vehicleModel"), model);

      runInAction(() => {
        this.models.push({
          ...(model as VehicleModelType),
          id: docRef.id,
        });
      });
    } catch (error) {
      console.error("Error adding model:", error);
    }
  }

  async deleteModel(id: string) {
    try {
      await deleteDocById("vehicleModel", id);
      runInAction(() => {
        this.models = this.models.filter((model) => model.id !== id);
      });
    } catch (error) {
      console.error("Error deleting model:", error);
    }
  }

  async updateModel(id: string, newFields: Record<string, any>) {
    try {
      await updateDocById("vehicleModel", id, newFields);
      runInAction(() => {
        const modelIndex = this.models.findIndex((model) => model.id === id);
        if (modelIndex !== -1) {
          this.models[modelIndex] = { ...this.models[modelIndex], ...newFields };
        }
      });
    } catch (error) {
      console.error("Error updating model:", error);
    }
  }

  async fetchModels() {
    try {
      const makesCollection = collection(db, "vehicleModel");
      const unsubscribe = onSnapshot(makesCollection, (snapshot) => {
        runInAction(() => {
          this.models = snapshot.docs.map((doc) => ({
            ...(doc.data() as VehicleModelType),
            id: doc.id,
          }));
        });
      });

      return unsubscribe;
    } catch (error) {
      console.error("Error fetching makes:", error);
    }
  }
}
