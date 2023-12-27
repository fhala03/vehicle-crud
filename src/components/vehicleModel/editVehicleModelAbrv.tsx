import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { editModelAbrvForm } from "@/utils/schema";
import { EditModelAbrvForm } from "@/utils/schema/modelForm/editModelAbrv";

interface EditVehicleModelNameProps {
  modelId: string;
}

const EditVehicleModelAbrv = ({ modelId }: EditVehicleModelNameProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="flex">
        <Button onClick={() => setOpen(true)}>Rename</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename Vehicle Abrv</DialogTitle>
          <DialogDescription>
            Change the abbreviation of the Vehicle Model. Click confirm when you are done with your changes.
          </DialogDescription>
        </DialogHeader>
        <EditModelAbrvForm
          modelId={modelId}
          onFinish={() => {
            setOpen(false);
          }}
          form={editModelAbrvForm}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditVehicleModelAbrv;
