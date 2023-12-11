import { Input } from "@/components/ui/input";
import EditVehicleAbrv from "@/components/vehicleMake/editVehicleAbrv";
import EditVehicleName from "@/components/vehicleMake/editVehicleName";
import { onSnapshotListener } from "@/services/network/base";
import { useRootStore } from "@/stores/rootStore";
import { VehicleMakeType } from "@/utils/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditVehicleMake = () => {
  const { id } = useParams();

  const { vehicleMakeStore } = useRootStore();
  const [makeDetails, setMakeDetails] = useState<Pick<VehicleMakeType, "id" | "name" | "abrv"> | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshotListener("vehicleMake", (snapshot) => {
      const updatedMake = snapshot.docs.find((doc: { id: string | undefined }) => doc.id === id);
      updatedMake && setMakeDetails(updatedMake.data() as VehicleMakeType);
    });

    vehicleMakeStore.getMakeDetailsById(id as string).then(setMakeDetails);

    return () => unsubscribe();
  }, [id, vehicleMakeStore]);

  return (
    <main>
      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 rounded-md p-6 relative overflow-hidden">
          <span className="text-2xl font-bold">General</span>
          <div className="absolute h-full w-1/4 -z-10 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 blur-3xl opacity-90 left-0-0" />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1>Make name</h1>
            <div className="flex w-full gap-2">
              <Input aria-label="vehicleMakeName" readOnly value={makeDetails?.name ?? ""} className="w-full shadow-none" />
              <EditVehicleName makeId={makeDetails?.id as string} />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h1>Make abbreviation</h1>
            <div className="flex w-full gap-2">
              <Input aria-label="vehicleMakeAbrv" readOnly value={makeDetails?.abrv ?? ""} className="w-full shadow-none" />
              <EditVehicleAbrv makeId={makeDetails?.id as string} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default EditVehicleMake;
