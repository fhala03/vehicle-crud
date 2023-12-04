import { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { Card, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Edit, X } from "lucide-react";
import { useRootStore } from "@/stores/rootStore";
import { VehicleModelType } from "@/utils/types";

interface VehicleModelCardProps {
  model: VehicleModelType;
}

const VehicleModelCard = observer(({ model }: VehicleModelCardProps) => {
  const { vehicleModelStore, vehicleMakeStore } = useRootStore();
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

  const handleDelete = async () => {
    if (model.id) {
      await vehicleModelStore.deleteModel(model.id);
    }
  };

  return (
    <Card className="shadow-none h-[150px] relative flex items-center justify-between overflow-hidden">
      <CardHeader>
        <div className="flex flex-col">
          <span className="font-medium text-lg">{model.name}</span>
          <span className="text-sm">{model.abrv}</span>
          {makeName && <span className="text-sm">{makeName}</span>}
        </div>
      </CardHeader>

      <div className="flex z-10 flex-col items-center gap-2">
        <Button
          variant={"secondary"}
          onClick={handleDelete}
          size={"sm"}
          className="rounded-none rounded-tl-xl rounded-bl-xl border-none shadow-none"
        >
          <X className="h-4 w-4" />
        </Button>
        <Button variant={"secondary"} size={"sm"} className="rounded-none rounded-tl-xl rounded-bl-xl  border-none shadow-none">
          <Edit className="h-4 w-4" />
        </Button>
      </div>

      <div className="absolute h-full w-1/4 bg-gradient-to-r blur-3xl opacity-90 from-fuchsia-600 to-pink-600 right-0" />
    </Card>
  );
});

export default VehicleModelCard;
