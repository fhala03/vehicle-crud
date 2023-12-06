import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useRootStore } from "@/stores/rootStore";
import VehicleMakeCard from "@/components/vehicleMake/vehicleMakeCard";
import AddVehicleMake from "@/components/vehicleMake/addVehicleMake";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const VehicleMakePage = observer(() => {
  const { vehicleMakeStore } = useRootStore();
  const [isSortingAZ, setIsSortingAZ] = useState(true);

  useEffect(() => {
    vehicleMakeStore.fetchMakesSortedAZ();
  }, [vehicleMakeStore]);

  const handleSortChange = () => {
    if (isSortingAZ) {
      vehicleMakeStore.fetchMakesSortedZA();
      toast.info("Sorted from Z to A");
    } else {
      vehicleMakeStore.fetchMakesSortedAZ();
      toast.info("Sorted from A to Z");
    }
    setIsSortingAZ(!isSortingAZ);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Button variant={"secondary"} onClick={handleSortChange}>
          Sort from {isSortingAZ ? "Z-A" : "A-Z"}
        </Button>
        <AddVehicleMake />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {vehicleMakeStore.makes.map((make) => (
          <VehicleMakeCard key={make.id} make={make} />
        ))}
      </div>
    </div>
  );
});

export default VehicleMakePage;
