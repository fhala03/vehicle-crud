import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useRootStore } from "@/stores/rootStore";
import VehicleModelCard from "@/components/vehicleModel/vehicleModelCard";
import AddVehicleModel from "@/components/vehicleModel/addVehicleModel";
import { Button } from "@/components/ui/button";

const VehicleModelsPage = observer(() => {
  const { vehicleModelStore, vehicleMakeStore } = useRootStore();
  const [isSortingAZ, setIsSortingAZ] = useState(true);
  const [selectedMake, setSelectedMake] = useState<string | null>(null);

  useEffect(() => {
    vehicleModelStore.fetchModelsSortedAZ();
  }, [vehicleModelStore, selectedMake]);

  const handleSortChange = () => {
    if (isSortingAZ) {
      vehicleModelStore.fetchModelsSortedZA();
    } else {
      vehicleModelStore.fetchModelsSortedAZ();
    }
    setIsSortingAZ(!isSortingAZ);
  };

  const handleMakeChange = (makeId: string) => {
    setSelectedMake(makeId);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row md:items-center gap-2 justify-between">
        <div className="flex md:gap-4 items-center justify-between">
          <Button variant={"secondary"} onClick={handleSortChange}>
            Sort from {isSortingAZ ? "Z-A" : "A-Z"}
          </Button>
          <select onChange={(e) => handleMakeChange(e.target.value)} value={selectedMake || ""}>
            <option value="">All Makes</option>
            {vehicleMakeStore.makes.map((make) => (
              <option key={make.id} value={make.id}>
                {make.name}
              </option>
            ))}
          </select>
        </div>
        <AddVehicleModel />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vehicleModelStore.models
          .filter((model) => !selectedMake || model.makeId === selectedMake)
          .map((model) => (
            <VehicleModelCard key={model.id} model={model} />
          ))}
      </div>
    </div>
  );
});

export default VehicleModelsPage;
