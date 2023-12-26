import { makeObservable, observable, action, runInAction } from "mobx";
import { VehicleMakeType } from "@/utils/types";

import { getDocsSorted, onSnapshotListener } from "@/services/network/base";
import { VehicleMakeService } from "@/services/network/vehicleMake";

export class VehicleMakeStore {
  makes: VehicleMakeType[] = [];
  currentPage: number = 1;
  pageSize: number = 6;
  totalMakes = 0;
  isSortingAZ: boolean = true;
  lastVisibleItemIndex: number | null = null;
  vehicleMakeService: VehicleMakeService;

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

    this.vehicleMakeService = new VehicleMakeService();
    this.fetchMakes();
  }

  async addMake(newMake: Omit<VehicleMakeType, "id">) {
    await this.vehicleMakeService.addMake(newMake);
  }

  async deleteMake(id: string) {
    await this.vehicleMakeService.deleteMake(id);
    await this.fetchMakesWithPagination(this.currentPage);
    if (this.makes.length === 0 && this.currentPage > 1) {
      this.currentPage = this.currentPage - 1;
      await this.fetchMakesWithPagination(this.currentPage);
    }
  }

  async updateMake(id: string, newFields: Record<string, any>) {
    await this.vehicleMakeService.updateMake(id, newFields);
  }

  async getMakeById(id: string): Promise<VehicleMakeType | null> {
    return await this.vehicleMakeService.getMakeById(id);
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

  async fetchMakesSorted() {
    const sortOrder = this.isSortingAZ ? "asc" : "desc";
    const allMakes = await this.vehicleMakeService.fetchSortedMakes(sortOrder);
    runInAction(() => {
      this.makes = allMakes.slice(0, this.pageSize);
      this.totalMakes = allMakes.length;
    });
  }

  async fetchMakesWithPagination(page: number) {
    const start = (page - 1) * this.pageSize;
    const end = start + this.pageSize;

    const sortOrder = this.isSortingAZ ? "asc" : "desc";

    const sortedMakes = await getDocsSorted<VehicleMakeType>("vehicleMake", "name", sortOrder);

    runInAction(() => {
      this.makes = sortedMakes.slice(start, end);
      this.lastVisibleItemIndex = end - 1;
    });
  }

  async getMakeDetailsById(id: string): Promise<Pick<VehicleMakeType, "id" | "name" | "abrv"> | null> {
    return await this.vehicleMakeService.getMakeDetailsById(id);
  }
}
