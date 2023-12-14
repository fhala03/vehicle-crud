import { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { Card, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";
import { useRootStore } from "@/stores/rootStore";
import { VehicleModelType } from "@/utils/types";
import { Link } from "react-router-dom";
import DeleteVehicleModel from "./deleteVehicleModel";

interface VehicleModelCardProps {
  model: VehicleModelType;
}

const VehicleModelCard = observer(({ model }: VehicleModelCardProps) => {
  const { vehicleMakeStore } = useRootStore();
  const [makeName, setMakeName] = useState<string | null>(null);

  useEffect(() => {
    const fetchMakeName = async () => {
      if (model.makeId) {
        const make = await vehicleMakeStore.getMakeById(model.makeId);
        setMakeName(make?.name || null);
      }
    };

    fetchMakeName();
  }, [model.makeId, vehicleMakeStore]);

  return (
    <Card className="shadow-none h-[150px] relative flex items-center justify-between overflow-hidden">
      <CardHeader>
        <div className="flex flex-col">
          <span className="font-semibold text-lg">{model.name}</span>
          <span className="text-sm">{model.abrv}</span>
          {makeName && <span className="text-sm">{makeName}</span>}
        </div>
      </CardHeader>

      <div className="flex z-10 flex-col items-center gap-2">
        <DeleteVehicleModel modelId={model.id} />
        <Link aria-label="edit_model_link" to={`/${model.id}/editModel`}>
          <Button variant={"secondary"} size={"sm"} className="rounded-none rounded-tl-xl rounded-bl-xl  border-none shadow-none">
            <Edit className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="absolute h-full w-1/4 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-200 via-violet-600 to-sky-900 blur-3xl right-0" />
    </Card>
  );
});

export default VehicleModelCard;
