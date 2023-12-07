import { makeObservable, observable, action, runInAction } from "mobx";
import { VehicleModelType } from "@/utils/types";
import {
  createDoc,
  deleteDocById,
  updateDocById,
  getDocById,
  onSnapshotListener,
  getModelsByMake,
  getDocsSorted,
} from "@/services/network/base";

export class VehicleModelStore {
  models: VehicleModelType[] = [];
  currentPage: number = 1;
  pageSize: number = 6;
  totalModels = 0;
  isSortingAZ: boolean = true;
  lastVisibleItemIndex: number | null = null;

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

    this.fetchModels();
  }

  async addModel(newModel: Omit<VehicleModelType, "id">) {
    await createDoc({ collectionName: "vehicleModel", doc: newModel });
  }

  async deleteModel(id: string) {
    const currentPageBeforeDelete = this.currentPage;
    await deleteDocById("vehicleModel", id);
    await this.fetchModelsWithPagination(currentPageBeforeDelete);
    if (this.models.length === 0 && currentPageBeforeDelete > 1) {
      this.currentPage = currentPageBeforeDelete - 1;
      await this.fetchModelsWithPagination(this.currentPage);
    }
  }

  async updateModel(id: string, newFields: Record<string, any>) {
    await updateDocById("vehicleModel", id, newFields);
  }

  async getModelById(id: string): Promise<VehicleModelType | null> {
    return await getDocById<VehicleModelType>("vehicleModel", id);
  }

  async fetchModelsByMake(makeId: string) {
    runInAction(async () => {
      this.models = await getModelsByMake(makeId);
    });
  }

  async fetchModelsSortedAZ() {
    const allMakes = await getDocsSorted<VehicleModelType>("vehicleModel", "name", "asc");
    this.models = allMakes.slice(0, this.pageSize);
    this.totalModels = allMakes.length;
  }

  async fetchModelsSortedZA() {
    const allMakes = await getDocsSorted<VehicleModelType>("vehicleModel", "name", "desc");
    this.models = allMakes.slice(0, this.pageSize);
    this.totalModels = allMakes.length;
  }

  async fetchModels() {
    const unsubscribe = onSnapshotListener("vehicleModel", (snapshot) => {
      runInAction(() => {
        this.models = snapshot.docs.map((doc: { data: () => VehicleModelType; id: any }) => {
          const data = doc.data() as VehicleModelType;
          return {
            ...data,
            id: doc.id,
          } as VehicleModelType;
        });

        this.totalModels = this.models.length;
        this.fetchModelsWithPagination(this.currentPage);
      });
    });

    return unsubscribe;
  }

  async fetchModelsWithPagination(page: number) {
    const start = (page - 1) * this.pageSize;
    const end = start + this.pageSize;

    const sortedMakes = this.isSortingAZ
      ? await getDocsSorted<VehicleModelType>("vehicleModel", "name", "asc")
      : await getDocsSorted<VehicleModelType>("vehicleModel", "name", "desc");

    runInAction(() => {
      this.models = sortedMakes.slice(start, end);
      this.lastVisibleItemIndex = end - 1;
    });
  }

  async getModelDetailsById(id: string): Promise<Pick<VehicleModelType, "id" | "name" | "abrv"> | null> {
    const make = await this.getModelById(id);
    if (make) {
      const { id, name, abrv } = make;
      return { id, name, abrv };
    }
    return null;
  }
}
