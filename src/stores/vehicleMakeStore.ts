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
    await createDoc({ collectionName: "vehicleMake", doc: newMake });
  }

  async deleteMake(id: string) {
    await deleteDocById("vehicleMake", id);
  }

  async updateMake(id: string, newFields: Record<string, any>) {
    await updateDocById("vehicleMake", id, newFields);
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

  async getMakeDetailsById(id: string): Promise<Pick<VehicleMakeType, "id" | "name" | "abrv"> | null> {
    const make = await this.getMakeById(id);
    if (make) {
      const { id, name, abrv } = make;
      return { id, name, abrv };
    }
    return null;
  }
}
