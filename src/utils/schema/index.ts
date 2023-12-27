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
        label: "Abrv",
        placeholder: "Enter abrv",
      },
    ],
  },
  {
    plugins: createZodPlugin(
      z.object({
        name: z.string().min(4),
        abrv: z.string().min(2),
      })
    ),
    hooks: {
      onSuccess(form: any) {
        const values = form.values();
        return vehicleMakeStore.addMake(values).then(() => {
          form.clear();
          toast.info("Vehicle make added");
          return;
        });
      },
    },
  }
);

export const editMakeNameForm = new Form(
  {
    fields: [
      {
        name: "name",
        label: "Name",
        placeholder: "Enter name",
      },
    ],
  },
  {
    plugins: createZodPlugin(
      z.object({
        name: z.string().min(4),
      })
    ),
  }
);

export const editModelNameForm = new Form(
  {
    fields: [
      {
        name: "name",
        label: "Name",
        placeholder: "Enter name",
      },
    ],
  },
  {
    plugins: createZodPlugin(
      z.object({
        name: z.string().min(4),
      })
    ),
  }
);

export const editModelAbrvForm = new Form(
  {
    fields: [
      {
        name: "abrv",
        label: "Abrv",
        placeholder: "Enter abrv",
      },
    ],
  },
  {
    plugins: createZodPlugin(
      z.object({
        abrv: z.string().min(2),
      })
    ),
  }
);

export const editMakeAbrvForm = new Form(
  {
    fields: [
      {
        name: "abrv",
        label: "Abrv",
        placeholder: "Enter abrv",
      },
    ],
  },
  {
    plugins: createZodPlugin(
      z.object({
        abrv: z.string().min(2),
      })
    ),
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
