import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { editModelNameForm } from "@/utils/schema";
import { EditModelNameForm } from "@/utils/schema/modelForm/editModelName";

interface EditVehicleModelNameProps {
  modelId: string;
}

const EditVehicleModelName = ({ modelId }: EditVehicleModelNameProps) => {
  const [open, setOpen] = useState(false);

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
        <EditModelNameForm
          form={editModelNameForm}
          onFinish={() => {
            setOpen(false);
          }}
          modelId={modelId}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditVehicleModelName;
