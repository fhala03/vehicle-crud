import { makeObservable, observable, action, runInAction } from "mobx";
import { VehicleMakeType } from "@/utils/types";
import { onSnapshot, collection } from "firebase/firestore";
import { createDoc, deleteDocById, updateDocById } from "@/services/network/base";
import { db } from "@/services/firebase";

export class VehicleMakeStore {
  makes: VehicleMakeType[] = [];

  constructor() {
    makeObservable(this, {
      makes: observable,
      addMake: action,
      deleteMake: action,
      updateMake: action,
      fetchMakes: action,
    });

    this.fetchMakes();
  }

  async addMake(newMake: Omit<VehicleMakeType, "id">) {
    try {
      await createDoc({ collectionName: "vehicleMake", doc: newMake });
    } catch (error) {
      console.error("Error adding make:", error);
    }
  }

  async deleteMake(id: string) {
    try {
      await deleteDocById("vehicleMake", id);
    } catch (error) {
      console.error("Error deleting make:", error);
    }
  }

  async updateMake(id: string, newFields: Record<string, any>) {
    try {
      await updateDocById("vehicleMake", id, newFields);
    } catch (error) {
      console.error("Error updating make:", error);
    }
  }

  async fetchMakes() {
    try {
      const makesCollection = collection(db, "vehicleMake");
      const unsubscribe = onSnapshot(makesCollection, (snapshot) => {
        runInAction(() => {
          this.makes = snapshot.docs.map((doc) => ({
            ...(doc.data() as VehicleMakeType),
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
