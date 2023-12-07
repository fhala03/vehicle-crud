import { makeObservable, observable, action, runInAction } from "mobx";
import { VehicleMakeType } from "@/utils/types";

import { createDoc, deleteDocById, getDocById, getDocsSorted, onSnapshotListener, updateDocById } from "@/services/network/base";

export class VehicleMakeStore {
  makes: VehicleMakeType[] = [];
  currentPage: number = 1;
  pageSize: number = 6;
  totalMakes = 0;
  isSortingAZ: boolean = true;
  lastVisibleItemIndex: number | null = null;

  constructor() {
    makeObservable(this, {
      makes: observable,
      currentPage: observable,
      pageSize: observable,
      addMake: action,
      deleteMake: action,
      updateMake: action,
      fetchMakes: action,
      fetchMakesWithPagination: action,
      isSortingAZ: observable,
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

  async fetchMakes() {
    const unsubscribe = onSnapshotListener("vehicleMake", (snapshot) => {
      runInAction(() => {
        this.makes = snapshot.docs.map((doc: { data: () => VehicleMakeType; id: any }) => ({
          ...(doc.data() as VehicleMakeType),
          id: doc.id,
        }));

        this.totalMakes = this.makes.length;
        this.fetchMakesWithPagination(this.currentPage);
      });
    });

    return unsubscribe;
  }

  async fetchMakesSortedAZ() {
    const allMakes = await getDocsSorted<VehicleMakeType>("vehicleMake", "name", "asc");
    this.makes = allMakes.slice(0, this.pageSize);
    this.totalMakes = allMakes.length;
  }

  async fetchMakesSortedZA() {
    const allMakes = await getDocsSorted<VehicleMakeType>("vehicleMake", "name", "desc");
    this.makes = allMakes.slice(0, this.pageSize);
    this.totalMakes = allMakes.length;
  }

  async fetchMakesWithPagination(page: number) {
    const start = (page - 1) * this.pageSize;
    const end = start + this.pageSize;

    const sortedMakes = this.isSortingAZ
      ? await getDocsSorted<VehicleMakeType>("vehicleMake", "name", "asc")
      : await getDocsSorted<VehicleMakeType>("vehicleMake", "name", "desc");

    runInAction(() => {
      this.makes = sortedMakes.slice(start, end);
      this.lastVisibleItemIndex = end - 1;
    });
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
