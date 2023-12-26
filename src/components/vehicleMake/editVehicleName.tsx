import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { editMakeNameForm } from "@/utils/schema";
import { EditMakeNameForm } from "@/utils/schema/makeForm/editMakeName";

interface EditVehicleNameProps {
  makeId: string;
}

const EditVehicleName = ({ makeId }: EditVehicleNameProps) => {
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
            Change the name of the Vehicle Make. Click confirm when you are done with your changes.
          </DialogDescription>
        </DialogHeader>
        <EditMakeNameForm
          form={editMakeNameForm}
          makeId={makeId}
          onFinish={() => {
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditVehicleName;
