import { Input } from "@/components/ui/input";
import EditVehicleModelAbrv from "@/components/vehicleModel/editVehicleModelAbrv";
import EditVehicleModelName from "@/components/vehicleModel/editVehicleModelName";
import { onSnapshotListener } from "@/services/network/base";
import { useRootStore } from "@/stores/rootStore";
import { VehicleModelType } from "@/utils/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditVehicleModel = () => {
  const { id } = useParams();

  const { vehicleModelStore } = useRootStore();
  const [modelDetails, setModelDetails] = useState<Pick<VehicleModelType, "id" | "name" | "abrv"> | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshotListener("vehicleModel", (snapshot) => {
      const updatedModel = snapshot.docs.find((doc: { id: string | undefined }) => doc.id === id);
      updatedModel && setModelDetails(updatedModel.data() as VehicleModelType);
    });

    vehicleModelStore.getModelDetailsById(id as string).then(setModelDetails);

    return () => unsubscribe();
  }, [id, vehicleModelStore]);

  return (
    <main>
      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 rounded-md p-6 relative overflow-hidden">
          <span className="text-2xl font-bold">General</span>
          <div className="absolute h-full w-1/4 -z-10 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-200 via-violet-600 to-sky-900 blur-3xl left-0" />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1>Model name</h1>
            <div className="flex w-full gap-2">
              <Input aria-label="vehicleMakeName" value={modelDetails?.name ?? ""} readOnly className="w-full shadow-none" />
              <EditVehicleModelName modelId={modelDetails?.id as string} />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h1>Model abbreviation</h1>
            <div className="flex w-full gap-2">
              <Input aria-label="vehicleMakeAbrv" readOnly value={modelDetails?.abrv ?? ""} className="w-full shadow-none" />
              <EditVehicleModelAbrv modelId={modelDetails?.id as string} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default EditVehicleModel;
