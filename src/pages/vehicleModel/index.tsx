import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useRootStore } from "@/stores/rootStore";
import VehicleModelCard from "@/components/vehicleModel/vehicleModelCard";
import AddVehicleModel from "@/components/vehicleModel/addVehicleModel";
import { Button } from "@/components/ui/button";

const VehicleModelsPage = observer(() => {
  const { vehicleModelStore } = useRootStore();
  const [isSortingAZ, setIsSortingAZ] = useState(true);

  useEffect(() => {
    vehicleModelStore.fetchModelsSortedAZ();
  }, [vehicleModelStore]);

  const handleSortChange = () => {
    if (isSortingAZ) {
      vehicleModelStore.fetchModelsSortedZA();
    } else {
      vehicleModelStore.fetchModelsSortedAZ();
    }
    setIsSortingAZ(!isSortingAZ);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Button variant={"secondary"} onClick={handleSortChange}>
          Sort from {isSortingAZ ? "Z-A" : "A-Z"}
        </Button>
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
