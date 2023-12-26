import { makeObservable, observable, action, runInAction } from "mobx";

import { VehicleModelType } from "@/utils/types";
import { VehicleModelService } from "@/services/network/vehicleModel";

export class VehicleModelStore {
  models: VehicleModelType[] = [];
  currentPage: number = 1;
  pageSize: number = 6;
  totalModels = 0;
  isSortingAZ: boolean = true;
  lastVisibleItemIndex: number | null = null;
  vehicleModelService: VehicleModelService;

  constructor() {
    makeObservable(this, {
      models: observable,
      currentPage: observable,
      pageSize: observable,
      addModel: action,
      deleteModel: action,
      updateModel: action,
      fetchModels: action,
      fetchModelsByMake: action,
      fetchModelsSortedAZ: action,
      fetchModelsSortedZA: action,
      fetchModelsWithPagination: action,
      isSortingAZ: observable,
    });

    this.vehicleModelService = new VehicleModelService();
    this.fetchModels();
  }

  async addModel(newModel: Omit<VehicleModelType, "id">) {
    await this.vehicleModelService.addModel(newModel);
  }

  async deleteModel(id: string) {
    const currentPageBeforeDelete = this.currentPage;
    await this.vehicleModelService.deleteModel(id);
    await this.fetchModelsWithPagination(currentPageBeforeDelete);
    if (this.models.length === 0 && currentPageBeforeDelete > 1) {
      this.currentPage = currentPageBeforeDelete - 1;
      await this.fetchModelsWithPagination(this.currentPage);
    }
  }

  async updateModel(id: string, newFields: Record<string, any>) {
    await this.vehicleModelService.updateModel(id, newFields);
  }

  async getModelById(id: string): Promise<VehicleModelType | null> {
    return await this.vehicleModelService.getModelById(id);
  }

  async fetchModelsByMake(makeId: string) {
    runInAction(async () => {
      this.models = await this.vehicleModelService.getModelsByMake(makeId);
    });
  }

  async fetchModelsSortedAZ() {
    const allModels = await this.vehicleModelService.fetchSortedModels("asc");
    runInAction(() => {
      this.models = allModels.slice(0, this.pageSize);
      this.totalModels = allModels.length;
    });
  }

  async fetchModelsSortedZA() {
    const allModels = await this.vehicleModelService.fetchSortedModels("desc");
    runInAction(() => {
      this.models = allModels.slice(0, this.pageSize);
      this.totalModels = allModels.length;
    });
  }

  async fetchModels() {
    const unsubscribe = this.vehicleModelService.subscribeToModels((snapshot) => {
      runInAction(() => {
        this.models = snapshot.docs.map((doc: { data: () => VehicleModelType; id: any }) => ({
          ...(doc.data() as VehicleModelType),
          id: doc.id,
        }));

        this.totalModels = this.models.length;
        this.fetchModelsWithPagination(this.currentPage);
      });
    });

    return unsubscribe;
  }

  async fetchModelsWithPagination(page: number) {
    const start = (page - 1) * this.pageSize;
    const end = start + this.pageSize;

    const sortedModels = this.isSortingAZ
      ? await this.vehicleModelService.fetchSortedModels("asc")
      : await this.vehicleModelService.fetchSortedModels("desc");

    runInAction(() => {
      this.models = sortedModels.slice(start, end);
      this.lastVisibleItemIndex = end - 1;
    });
  }

  async getModelDetailsById(id: string): Promise<Pick<VehicleModelType, "id" | "name" | "abrv"> | null> {
    return await this.vehicleModelService.getModelDetailsById(id);
  }
}
