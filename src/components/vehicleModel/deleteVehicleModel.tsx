import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { X } from "lucide-react";
import { useRootStore } from "@/stores/rootStore";
import { toast } from "sonner";

interface DeleteVehicleMakeProps {
  modelId: string;
}

const DeleteVehicleModel = ({ modelId }: DeleteVehicleMakeProps) => {
  const { vehicleModelStore } = useRootStore();
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    if (modelId) {
      await vehicleModelStore.deleteModel(modelId);
      toast.info("Vehicle has been deleted");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="flex">
        <Button
          aria-label="deleteMake"
          variant={"secondary"}
          size={"sm"}
          className="rounded-none rounded-tl-xl rounded-bl-xl border-none shadow-none"
        >
          <X className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Vehicle Model</DialogTitle>
          <DialogDescription>
            Delete model from the database. Click confirm when you are done with your changes.
          </DialogDescription>
        </DialogHeader>
        <Button onClick={handleDelete}>Confirm</Button>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteVehicleModel;
