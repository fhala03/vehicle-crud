import { observer } from "mobx-react";
import { makeForm } from ".";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const MakeForm = observer(({ form }: { form: typeof makeForm }) => {
  return (
    <form>
      <div className="grid gap-4">
        <div>
          <Label htmlFor={form.$("name").id}>{form.$("name").Label}</Label>
          <Input {...form.$("name").bind()} />
          <div className="text-sm ml-2 text-red-500">{form.$("name").error}</div>
        </div>
        <div>
          <Label htmlFor={form.$("abrv").id}>{form.$("abrv").Label}</Label>
          <Input {...form.$("abrv").bind()} />
          <div className="ml-2 text-sm text-red-500">{form.$("abrv").error}</div>
        </div>
        <Button type="submit" onClick={form.onSubmit}>
          Submit
        </Button>
      </div>
      {/* <Button onClick={form.onClear}>Clear</Button>
      <Button onClick={form.onReset}>Reset</Button> */}
      <p>{form.error}</p>
    </form>
  );
});
