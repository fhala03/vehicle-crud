import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { useRootStore } from "@/stores/rootStore";
import { toast } from "sonner";
import { nameSchema } from "@/utils/schema";

interface EditVehicleModelNameProps {
  modelId: string;
}

const EditVehicleModelName = ({ modelId }: EditVehicleModelNameProps) => {
  const { vehicleModelStore } = useRootStore();
  const [newName, setNewName] = useState("");
  const [open, setOpen] = useState(false);

  const handleConfirm = async () => {
    try {
      nameSchema.parse(newName);

      await vehicleModelStore.updateModel(modelId, { name: newName });
      toast.success("Vehicle name has been updated");
      setOpen(false);
    } catch (error) {
      toast.error("There has been an error while updating vehicle model");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="flex">
        <Button onClick={() => setOpen(true)}>Rename</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename Vehicle Name</DialogTitle>
          <DialogDescription>
            Change the name of the Vehicle Model. Click confirm when you are done with your changes.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
          <div>
            <Label className="mb-1 flex justify-end text-xs font-normal text-foreground/40">Max Characters : 25</Label>
            <Input
              required
              className="border-none focus-visible:ring-0"
              type="text"
              placeholder="Name"
              maxLength={30}
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <Button type="button" onClick={handleConfirm}>
            Confirm
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditVehicleModelName;
