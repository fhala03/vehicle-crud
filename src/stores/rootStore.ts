import { createContext, useContext } from "react";
import { VehicleMakeStore } from "./vehicleMakeStore";
import { VehicleModelStore } from "./vehicleModelStore";

export const vehicleMakeStore = new VehicleMakeStore();
export const vehicleModelStore = new VehicleModelStore();

export class RootStore {
  vehicleMakeStore: VehicleMakeStore;
  vehicleModelStore: VehicleModelStore;

  constructor() {
    this.vehicleMakeStore = vehicleMakeStore;
    this.vehicleModelStore = vehicleModelStore;
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
