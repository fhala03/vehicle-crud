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
    const previousLastVisibleItemIndex = vehicleModelStore.lastVisibleItemIndex;

    vehicleModelStore.isSortingAZ = !vehicleModelStore.isSortingAZ;

    if (vehicleModelStore.isSortingAZ) {
      await vehicleModelStore.fetchModelsSortedAZ();
      toast.info("Sorted from A to Z");
    } else {
      await vehicleModelStore.fetchModelsSortedZA();
      toast.info("Sorted from Z to A");
    }

    if (previousLastVisibleItemIndex !== null) {
      const newLastVisibleItemIndex = Math.min(previousLastVisibleItemIndex, vehicleModelStore.totalModels - 1);
      const newPage = Math.ceil((newLastVisibleItemIndex + 1) / vehicleModelStore.pageSize);

      vehicleModelStore.currentPage = newPage;
      await vehicleModelStore.fetchModelsWithPagination(newPage);
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
        <div className="flex gap-4 items-center justify-between">
          <Button variant={"secondary"} onClick={handleSortChange}>
            Sort from {vehicleModelStore.isSortingAZ ? "Z-A" : "A-Z"}
          </Button>
          <select
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm text-muted-foreground"
            onChange={(e) => handleMakeChange(e.target.value)}
            value={selectedMake || ""}
          >
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

      {vehicleModelStore.totalModels > 0 && !selectedMake && (
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
      )}
    </div>
  );
});

export default VehicleModelsPage;
