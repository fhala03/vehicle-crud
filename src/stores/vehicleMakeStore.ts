import { makeObservable, observable, action, runInAction } from "mobx";
import { VehicleMakeType } from "@/utils/types";

import { createDoc, deleteDocById, getDocById, getDocsSorted, onSnapshotListener, updateDocById } from "@/services/network/base";

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

  async getMakeById(id: string): Promise<VehicleMakeType | null> {
    return await getDocById("vehicleMake", id);
  }

  async fetchMakesSortedAZ() {
    runInAction(async () => {
      this.makes = await getDocsSorted<VehicleMakeType>("vehicleMake", "name", "asc");
    });
  }

  async fetchMakesSortedZA() {
    runInAction(async () => {
      this.makes = await getDocsSorted<VehicleMakeType>("vehicleMake", "name", "desc");
    });
  }

  async fetchMakes() {
    const unsubscribe = onSnapshotListener("vehicleMake", (snapshot) => {
      runInAction(() => {
        this.makes = snapshot.docs.map((doc: { data: () => VehicleMakeType; id: any }) => ({
          ...(doc.data() as VehicleMakeType),
          id: doc.id,
        }));
      });
    });

    return unsubscribe;
  }
}
