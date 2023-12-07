import { useEffect } from "react";
import { observer } from "mobx-react";
import { useRootStore } from "@/stores/rootStore";
import VehicleMakeCard from "@/components/vehicleMake/vehicleMakeCard";
import AddVehicleMake from "@/components/vehicleMake/addVehicleMake";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const VehicleMakePage = observer(() => {
  const { vehicleMakeStore } = useRootStore();

  useEffect(() => {
    vehicleMakeStore.fetchMakesSortedAZ();
  }, [vehicleMakeStore]);

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

  const handleNextPage = () => {
    vehicleMakeStore.currentPage += 1;
    vehicleMakeStore.fetchMakesWithPagination(vehicleMakeStore.currentPage);
  };

  const handlePrevPage = () => {
    if (vehicleMakeStore.currentPage > 1) {
      vehicleMakeStore.currentPage -= 1;
      vehicleMakeStore.fetchMakesWithPagination(vehicleMakeStore.currentPage);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Button variant={"secondary"} onClick={handleSortChange}>
          Sort from {vehicleMakeStore.isSortingAZ ? "Z-A" : "A-Z"}{" "}
        </Button>
        <AddVehicleMake />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vehicleMakeStore.makes.map((make) => (
          <VehicleMakeCard key={make.id} make={make} />
        ))}
      </div>
      <div className="flex justify-between">
        <Button onClick={handlePrevPage} variant="secondary" disabled={vehicleMakeStore.currentPage === 1}>
          Previous Page
        </Button>
        <Button
          onClick={handleNextPage}
          variant="secondary"
          disabled={vehicleMakeStore.currentPage === Math.ceil(vehicleMakeStore.totalMakes / vehicleMakeStore.pageSize)}
        >
          Next Page
        </Button>
      </div>
    </div>
  );
});

export default VehicleMakePage;
