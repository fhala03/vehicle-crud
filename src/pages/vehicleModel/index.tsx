import { useEffect } from "react";
import { observer } from "mobx-react";
import { useRootStore } from "@/stores/rootStore";
import VehicleModelCard from "@/components/vehicleModel/vehicleModelCard";
import AddVehicleModel from "@/components/vehicleModel/addVehicleModel";

const VehicleModelsPage = observer(() => {
  const { vehicleModelStore } = useRootStore();

  useEffect(() => {
    vehicleModelStore.fetchModels();
  }, [vehicleModelStore]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <AddVehicleModel />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vehicleModelStore.models.map((model) => (
          <VehicleModelCard key={model.id} model={model} />
        ))}
      </div>
    </div>
  );
});

export default VehicleModelsPage;
