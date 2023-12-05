import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { useRootStore } from "@/stores/rootStore";
import { toast } from "sonner";

interface EditVehicleAbrvProps {
  makeId: string;
}

const EditVehicleAbrv = ({ makeId }: EditVehicleAbrvProps) => {
  const { vehicleMakeStore } = useRootStore();
  const [newAbrv, setNewName] = useState("");
  const [open, setOpen] = useState(false);

  const handleConfirm = async () => {
    if (newAbrv && makeId) {
      await vehicleMakeStore.updateMake(makeId, { abrv: newAbrv });
      toast.success("Vehicle abbreviation has been updated");
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
          <DialogTitle>Rename Vehicle Abbreviation</DialogTitle>
          <DialogDescription>
            Change the abbreviation of the Vehicle Make. Click confirm when you are done with your changes.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
          <div>
            <Label className="mb-1 flex justify-end text-xs font-normal text-foreground/40">Max Characters : 25</Label>
            <Input
              required
              className="border-none focus-visible:ring-0"
              type="text"
              placeholder="Abbreviation"
              maxLength={30}
              value={newAbrv}
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

export default EditVehicleAbrv;
