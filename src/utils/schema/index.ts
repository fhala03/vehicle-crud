import { z } from "zod";

export const abrvSchema = z.string().min(2).max(30);
export const nameSchema = z.string().min(2).max(40);
