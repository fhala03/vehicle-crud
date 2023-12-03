import { VehicleMakeType } from "@/utils/types";
import { Card, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Edit, X } from "lucide-react";
import { useRootStore } from "@/stores/rootStore";

interface VehicleMakeCardProps {
  make: VehicleMakeType;
}

const VehicleMakeCard = ({ make }: VehicleMakeCardProps) => {
  const { vehicleMakeStore } = useRootStore();

  const handleDelete = async () => {
    if (make.id) {
      await vehicleMakeStore.deleteMake(make.id);
    }
  };

  return (
    <Card className="shadow-none relative flex items-center justify-between overflow-hidden">
      <CardHeader>
        <div className="flex flex-col">
          <span className="font-medium text-lg">{make.name}</span>
          <span className="text-sm">{make.abrv}</span>
          <span className="text-sm">{make.id}</span>
        </div>
      </CardHeader>

      <div className="flex flex-col items-center gap-2">
        <Button
          onClick={handleDelete}
          size={"sm"}
          className="rounded-none rounded-tl-xl rounded-bl-xl bg-primary border-none shadow-none"
        >
          <X className="h-4 w-4 text-background" />
        </Button>
        <Button size={"sm"} className="rounded-none rounded-tl-xl rounded-bl-xl bg-primary border-none shadow-none">
          <Edit className="h-4 w-4 text-background" />
        </Button>
      </div>
    </Card>
  );
};

export default VehicleMakeCard;
