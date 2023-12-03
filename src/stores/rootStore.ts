import { createContext, useContext } from "react";
import { VehicleMakeStore } from "./vehicleMakeStore";
import { VehicleModelStore } from "./vehicleModelStore";

export class RootStore {
  vehicleMakeStore: VehicleMakeStore;
  vehicleModelStore: VehicleModelStore;

  constructor() {
    this.vehicleMakeStore = new VehicleMakeStore();
    this.vehicleModelStore = new VehicleModelStore();
  }
}

export const RootStoreContext = createContext<RootStore | undefined>(undefined);

export const useRootStore = () => {
  const context = useContext(RootStoreContext);
  if (!context) {
    throw new Error("useRootStore must be used within a RootStoreProvider");
  }
  return context;
};
