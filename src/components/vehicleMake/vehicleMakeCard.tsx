import { VehicleMakeType } from "@/utils/types";
import { Card, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Settings } from "lucide-react";

interface VehicleMakeCardProps {
  make: VehicleMakeType;
}

const VehicleMakeCard = ({ make }: VehicleMakeCardProps) => {
  return (
    <Card className="shadow-none relative flex items-center justify-between overflow-hidden px-6">
      <Button size={"sm"} className="absolute top-0 right-0 bg-transparent border-none shadow-none hover:bg-transparent">
        <Settings className="h-4 w-4 text-foreground" />
      </Button>
      <CardHeader className="px-0">
        <div className="flex flex-col">
          <span className="font-medium text-lg">{make.name}</span>
          <span className="text-sm">{make.abrv}</span>
          <span className="text-sm">{make.id}</span>
        </div>
      </CardHeader>
    </Card>
  );
};

export default VehicleMakeCard;
