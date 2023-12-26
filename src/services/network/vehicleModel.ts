import {
  createDoc,
  deleteDocById,
  updateDocById,
  getDocById,
  getDocsSorted,
  getModelsByMake,
  onSnapshotListener,
} from "@/services/network/base";
import { VehicleModelType } from "@/utils/types";

export class VehicleModelService {
  async addModel(newModel: Omit<VehicleModelType, "id">) {
    await createDoc({ collectionName: "vehicleModel", doc: newModel });
  }

  async deleteModel(id: string) {
    await deleteDocById("vehicleModel", id);
  }

  async updateModel(id: string, newFields: Record<string, any>) {
    await updateDocById("vehicleModel", id, newFields);
  }

  async getModelById(id: string): Promise<VehicleModelType | null> {
    return await getDocById("vehicleModel", id);
  }

  async getModelsByMake(makeId: string): Promise<VehicleModelType[]> {
    return await getModelsByMake(makeId);
  }

  async fetchSortedModels(sortOrder: "asc" | "desc"): Promise<VehicleModelType[]> {
    return await getDocsSorted("vehicleModel", "name", sortOrder);
  }

  subscribeToModels(callback: (snapshot: any) => void) {
    return onSnapshotListener("vehicleModel", callback);
  }

  async getModelDetailsById(id: string): Promise<Pick<VehicleModelType, "id" | "name" | "abrv"> | null> {
    const model = await this.getModelById(id);
    if (model) {
      const { id, name, abrv } = model;
      return { id, name, abrv };
    }
    return null;
  }
}
