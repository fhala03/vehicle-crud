import { VehicleMakeType } from "@/utils/types";
import { Card, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";
import { Link } from "react-router-dom";
import DeleteVehicleMake from "./deleteVehicleMake";

interface VehicleMakeCardProps {
  make: VehicleMakeType;
}

const VehicleMakeCard = ({ make }: VehicleMakeCardProps) => {
  return (
    <Card className="shadow-none h-[150px] relative flex items-center justify-between overflow-hidden">
      <CardHeader>
        <div className="flex flex-col">
          <span className="font-semibold text-lg">{make.name}</span>
          <span className="text-sm">{make.abrv}</span>
          <span className="text-sm">{make.id}</span>
        </div>
      </CardHeader>

      <div className="flex z-10 flex-col items-center gap-2">
        <DeleteVehicleMake makeId={make.id} />
        <Link aria-label="edit_make_link" to={`/${make.id}/editMake`}>
          <Button variant={"secondary"} size={"sm"} className="rounded-none rounded-tl-xl rounded-bl-xl  border-none shadow-none">
            <Edit className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="absolute h-full w-1/4 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 blur-3xl opacity-90 right-0" />
    </Card>
  );
};

export default VehicleMakeCard;
