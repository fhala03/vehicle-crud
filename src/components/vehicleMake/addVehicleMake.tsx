import { ChangeEvent, useState } from "react";
import { observer } from "mobx-react";
import { useRootStore } from "@/stores/rootStore";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { abrvSchema, nameSchema } from "@/utils/schema";

const AddVehicleMake = observer(() => {
  const [open, setOpen] = useState(false);
  const { vehicleMakeStore } = useRootStore();
  const [newMake, setNewMake] = useState({
    name: "",
    abrv: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMake((prevMake) => ({
      ...prevMake,
      [name]: value,
    }));
  };

  const handleAddMake = async () => {
    try {
      nameSchema.parse(newMake.name);
      abrvSchema.parse(newMake.abrv);

      await vehicleMakeStore.addMake(newMake);

      setNewMake({
        name: "",
        abrv: "",
      });

      toast.success("Vehicle has been created");
      setOpen(false);
    } catch (error) {
      toast.error("There has been an error creating vehicle make");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="flex">
        <Button variant={"secondary"}>Add makes</Button>
      </DialogTrigger>
      <DialogContent className="border shadow-xl dark:border-muted/50">
        <DialogHeader className="flex flex-col gap-2">
          <DialogTitle>Add new make</DialogTitle>
          <DialogDescription>A new make will be added to your collection. Click confirm when you are done.</DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="flex flex-col gap-3"
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div>
                <Label className="flex mb-1 justify-end text-xs font-normal text-foreground/40">Max Characters: 30</Label>
                <Input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={newMake.name}
                  onChange={handleInputChange}
                  className="border shadow-none focus-visible:ring-0"
                />
              </div>
              <div>
                <Label className="flex mb-1 justify-end text-xs font-normal text-foreground/40">Max Characters: 30</Label>
                <Input
                  type="text"
                  name="abrv"
                  placeholder="Abrv"
                  value={newMake.abrv}
                  onChange={handleInputChange}
                  className="border shadow-none focus-visible:ring-0"
                />
              </div>
            </div>
            <Button onClick={handleAddMake}>Confirm</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
});

export default AddVehicleMake;
