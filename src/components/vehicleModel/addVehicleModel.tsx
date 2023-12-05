import { ChangeEvent, useState } from "react";
import { observer } from "mobx-react";
import { useRootStore } from "@/stores/rootStore";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "sonner";

const AddVehicleModel = observer(() => {
  const [open, setOpen] = useState(false);
  const { vehicleModelStore, vehicleMakeStore } = useRootStore();
  const [newModel, setNewModel] = useState({
    name: "",
    abrv: "",
    makeId: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewModel((prevModel) => ({
      ...prevModel,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setNewModel((prevModel) => ({
      ...prevModel,
      makeId: value,
    }));
  };

  const handleAddModel = async () => {
    const modelToAdd = {
      name: newModel.name,
      abrv: newModel.abrv,
      makeId: newModel.makeId,
    };

    await vehicleModelStore.addModel(modelToAdd);

    setNewModel({
      name: "",
      abrv: "",
      makeId: "",
    });
    toast.success("Model has been created");
    setOpen(false);

    await vehicleModelStore.fetchModels();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="flex">
        <Button variant={"secondary"}>Add Model</Button>
      </DialogTrigger>
      <DialogContent className="border shadow-xl dark:border-muted/50">
        <DialogHeader className="flex flex-col gap-2">
          <DialogTitle>Add new model</DialogTitle>
          <DialogDescription>A new model will be added to your collection. Click confirm when you are done.</DialogDescription>
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
                  value={newModel.name}
                  minLength={3}
                  maxLength={30}
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
                  minLength={3}
                  maxLength={30}
                  value={newModel.abrv}
                  onChange={handleInputChange}
                  className="border shadow-none focus-visible:ring-0"
                />
              </div>
              <div>
                <Label className="flex mb-1 justify-end text-xs font-normal text-foreground/40">Select Make</Label>
                <select value={newModel.makeId} onChange={handleSelectChange} className="border shadow-none focus-visible:ring-0">
                  <option value="" disabled>
                    Select Make
                  </option>
                  {vehicleMakeStore.makes.map((make) => (
                    <option key={make.id} value={make.id}>
                      {make.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <Button onClick={handleAddModel}>Confirm</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
});

export default AddVehicleModel;
