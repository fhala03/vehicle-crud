import { observer } from "mobx-react";
import { makeForm } from "..";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const MakeForm = observer(({ form, onFinish }: { form: typeof makeForm; onFinish: () => void }) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label className="font-normal" htmlFor={form.$("name").id}>
            {form.$("name").label}
          </Label>
          <Input className="shadow-none" {...form.$("name").bind()} />
          <div className="text-red-700 text-sm">{form.$("name").error}</div>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="font-normal" htmlFor={form.$("abrv").id}>
            {form.$("abrv").label}
          </Label>
          <Input className="shadow-none" {...form.$("abrv").bind()} />
          <div className="text-red-700 text-sm">{form.$("abrv").error}</div>
        </div>

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
});
