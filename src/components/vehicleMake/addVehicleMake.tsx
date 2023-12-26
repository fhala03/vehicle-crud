import { useState } from "react";
import { observer } from "mobx-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { makeForm } from "@/utils/schema";
import { MakeForm } from "@/utils/schema/nform";

const AddVehicleMake = observer(() => {
  const [open, setOpen] = useState(false);

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
        <MakeForm
          form={makeForm}
          onFinish={() => {
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
});

export default AddVehicleMake;
