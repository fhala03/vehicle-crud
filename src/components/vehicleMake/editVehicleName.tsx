import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { useRootStore } from "@/stores/rootStore";

interface EditVehicleNameProps {
  makeId: string;
}

const EditVehicleName = ({ makeId }: EditVehicleNameProps) => {
  const { vehicleMakeStore } = useRootStore();
  const [newName, setNewName] = useState("");
  const [open, setOpen] = useState(false);

  const handleConfirm = async () => {
    if (newName && makeId) {
      await vehicleMakeStore.updateMake(makeId, { name: newName });
      setOpen(false);
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
            Change the name of the Vehicle Make. Click confirm when you are done with your changes.
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

export default EditVehicleName;
