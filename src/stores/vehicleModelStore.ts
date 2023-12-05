import { makeObservable, observable, action, runInAction } from "mobx";
import { VehicleModelType } from "@/utils/types";
import {
  createDoc,
  deleteDocById,
  updateDocById,
  getDocById,
  onSnapshotListener,
  getModelsByMake,
  getModelsSorted,
} from "@/services/network/base";

export class VehicleModelStore {
  models: VehicleModelType[] = [];

  constructor() {
    makeObservable(this, {
      models: observable,
      addModel: action,
      deleteModel: action,
      updateModel: action,
      fetchModels: action,
      fetchModelsByMake: action,
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
    return await getDocById<VehicleModelType>("vehicleModel", id);
  }

  async fetchModelsByMake(makeId: string) {
    runInAction(async () => {
      this.models = await getModelsByMake(makeId);
    });
  }

  async fetchModelsSortedAZ() {
    runInAction(async () => {
      this.models = await getModelsSorted("name", "asc");
    });
  }

  async fetchModelsSortedZA() {
    runInAction(async () => {
      this.models = await getModelsSorted("name", "desc");
    });
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
      });
    });

    return unsubscribe;
  }
}
