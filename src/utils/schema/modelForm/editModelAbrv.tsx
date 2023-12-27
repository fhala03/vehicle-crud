import { observer } from "mobx-react";
import { makeForm } from "..";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { vehicleModelStore } from "@/stores/rootStore";
import { toast } from "sonner";

export const EditModelAbrvForm = observer(
  ({ form, onFinish, modelId }: { form: typeof makeForm; onFinish: () => void; modelId: string }) => {
    form.$hooks = {
      onSuccess(form: any) {
        const values = form.values();
        return vehicleModelStore.updateModel(modelId, values).then(() => {
          form.clear();
          toast.info("Vehicle model abrv changed");
          return;
        });
      },
    };

    return (
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col gap-2">
          <Label className="font-normal" htmlFor={form.$("abrv").id}>
            {form.$("abrv").label}
          </Label>
          <Input className="shadow-none" {...form.$("abrv").bind()} />
          <div className="text-red-700 text-sm">{form.$("abrv").error}</div>

          <Button
            type="submit"
            onClick={() => {
              form.submit();
              onFinish();
            }}
          >
            Submit
          </Button>
        </div>

        <p>{form.error}</p>
      </form>
    );
  }
);
