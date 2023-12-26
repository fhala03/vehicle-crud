import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { editMakeAbrvForm } from "@/utils/schema";
import { EditMakeAbrvForm } from "@/utils/schema/makeForm/editMakeAbrv";

interface EditVehicleAbrvProps {
  makeId: string;
}

const EditVehicleAbrv = ({ makeId }: EditVehicleAbrvProps) => {
  const [open, setOpen] = useState(false);

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
        <EditMakeAbrvForm
          form={editMakeAbrvForm}
          onFinish={() => {
            setOpen(false);
          }}
          makeId={makeId}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditVehicleAbrv;
