import { createDoc, deleteDocById, updateDocById, getDocById, getDocsSorted, onSnapshotListener } from "@/services/network/base";
import { VehicleMakeType } from "@/utils/types";

export class VehicleMakeService {
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

  async getMakeDetailsById(id: string): Promise<Pick<VehicleMakeType, "id" | "name" | "abrv"> | null> {
    const make = await this.getMakeById(id);
    if (make) {
      const { id, name, abrv } = make;
      return { id, name, abrv };
    }
    return null;
  }

  async fetchSortedMakes(sortOrder: "asc" | "desc"): Promise<VehicleMakeType[]> {
    return await getDocsSorted("vehicleMake", "name", sortOrder);
  }

  subscribeToMakes(callback: (snapshot: any) => void) {
    return onSnapshotListener("vehicleMake", callback);
  }
}
