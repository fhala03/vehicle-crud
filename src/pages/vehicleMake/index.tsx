import { useEffect } from "react";
import { observer } from "mobx-react";
import { useRootStore } from "@/stores/rootStore";
import VehicleMakeCard from "@/components/vehicleMake/vehicleMakeCard";
import AddVehicleMake from "@/components/vehicleMake/addVehicleMake";

const VehicleMakePage = observer(() => {
  const { vehicleMakeStore } = useRootStore();

  useEffect(() => {
    vehicleMakeStore.fetchMakes();
  }, [vehicleMakeStore]);

  return (
    <div>
      <AddVehicleMake />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vehicleMakeStore.makes.map((make) => (
          <VehicleMakeCard key={make.id} make={make} />
        ))}
      </div>
    </div>
  );
});

export default VehicleMakePage;
