import { Schema, z } from "zod";
import zod from "mobx-react-form/lib/validators/ZOD";
import Form from "mobx-react-form";
import { vehicleMakeStore } from "@/stores/rootStore";
import { toast } from "sonner";

export const abrvSchema = z.string().min(2).max(30);
export const nameSchema = z.string().min(2).max(40);

export const makeForm = new Form(
  {
    fields: [
      {
        name: "name",
        label: "Name",
        placeholder: "Enter name",
      },
      {
        name: "abrv",
        label: "abrv",
        placeholder: "Enter abrv",
      },
    ],
  },
  {
    plugins: createZodPlugin(
      z.object({
        name: z.string().min(4),
        abrv: z.string().min(4),
      })
    ),
    hooks: {
      onSuccess(form: any) {
        const values = form.values();
        return vehicleMakeStore.addMake(values).then(() => {
          form.clear();
          toast("Vehicle added");
          return;
        });
      },
    },
  }
);

/// reuse
export function createZodPlugin(schema: Schema) {
  return {
    zod: zod({
      package: z,
      schema,
    }),
  };
}
