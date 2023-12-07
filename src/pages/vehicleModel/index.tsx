import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useRootStore } from "@/stores/rootStore";
import VehicleModelCard from "@/components/vehicleModel/vehicleModelCard";
import AddVehicleModel from "@/components/vehicleModel/addVehicleModel";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const VehicleModelsPage = observer(() => {
  const { vehicleModelStore, vehicleMakeStore } = useRootStore();
  const [selectedMake, setSelectedMake] = useState<string | null>(null);

  useEffect(() => {
    vehicleModelStore.fetchModelsSortedAZ();
  }, [vehicleModelStore, selectedMake]);

  const handleSortChange = async () => {
    const previousLastVisibleItemIndex = vehicleMakeStore.lastVisibleItemIndex;

    vehicleMakeStore.isSortingAZ = !vehicleMakeStore.isSortingAZ;

    if (vehicleMakeStore.isSortingAZ) {
      await vehicleMakeStore.fetchMakesSortedAZ();
      toast.info("Sorted from Z to A");
    } else {
      await vehicleMakeStore.fetchMakesSortedZA();
      toast.info("Sorted from A to Z");
    }

    if (previousLastVisibleItemIndex !== null) {
      const newLastVisibleItemIndex = Math.min(previousLastVisibleItemIndex, vehicleMakeStore.totalMakes - 1);
      const newPage = Math.ceil((newLastVisibleItemIndex + 1) / vehicleMakeStore.pageSize);

      vehicleMakeStore.currentPage = newPage;
      await vehicleMakeStore.fetchMakesWithPagination(newPage);
    }
  };

  const handleMakeChange = (makeId: string) => {
    setSelectedMake(makeId);
  };

  const handleNextPage = () => {
    vehicleModelStore.currentPage += 1;
    vehicleModelStore.fetchModelsWithPagination(vehicleModelStore.currentPage);
  };

  const handlePrevPage = () => {
    if (vehicleModelStore.currentPage > 1) {
      vehicleModelStore.currentPage -= 1;
      vehicleModelStore.fetchModelsWithPagination(vehicleModelStore.currentPage);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row md:items-center gap-2 justify-between">
        <div className="flex md:gap-4 items-center justify-between">
          <Button variant={"secondary"} onClick={handleSortChange}>
            Sort from {vehicleModelStore.isSortingAZ ? "Z-A" : "A-Z"}
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

      <div className="flex justify-between mb-4">
        <Button onClick={handlePrevPage} variant="secondary" disabled={vehicleModelStore.currentPage === 1}>
          Previous Page
        </Button>
        <Button
          onClick={handleNextPage}
          variant="secondary"
          disabled={vehicleModelStore.currentPage === Math.ceil(vehicleModelStore.totalModels / vehicleModelStore.pageSize)}
        >
          Next Page
        </Button>
      </div>
    </div>
  );
});

export default VehicleModelsPage;
