import { observer } from "mobx-react";
import { makeForm } from "..";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { vehicleMakeStore } from "@/stores/rootStore";
import { toast } from "sonner";

export const EditMakeNameForm = observer(
  ({ form, onFinish, makeId }: { form: typeof makeForm; onFinish: () => void; makeId: string }) => {
    form.$hooks = {
      onSuccess(form: any) {
        const values = form.values();
        return vehicleMakeStore.updateMake(makeId, values).then(() => {
          form.clear();
          toast("Vehicle name changed");
          return;
        });
      },
    };

    return (
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col gap-2">
          <Label className="font-normal" htmlFor={form.$("name").id}>
            {form.$("name").label}
          </Label>
          <Input className="shadow-none" {...form.$("name").bind()} />
          <div className="text-red-700 text-sm">{form.$("name").error}</div>

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
