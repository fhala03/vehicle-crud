import { makeObservable, observable, action, runInAction } from "mobx";
import { VehicleModelType } from "@/utils/types";
import { createDoc, deleteDocById, updateDocById } from "@/services/network/base";

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

  async addModel(newModel: VehicleModelType) {
    try {
      await createDoc({ collectionName: "vehicleModels", doc: newModel });
      runInAction(() => {
        this.models.push(newModel);
      });
    } catch (error) {
      console.error("Error adding model:", error);
    }
  }

  async deleteModel(id: string) {
    try {
      await deleteDocById("vehicleModels", id);
      runInAction(() => {
        this.models = this.models.filter((model) => model.id !== id);
      });
    } catch (error) {
      console.error("Error deleting model:", error);
    }
  }

  async updateModel(id: string, newFields: Record<string, any>) {
    try {
      await updateDocById("vehicleModels", id, newFields);
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
}
