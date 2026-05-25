import { z } from "zod";

export const userSchema = z.object({
  uid: z.string(),
  email: z.string().email().nullable(),
  displayName: z.string().nullable(),
});

export type User = z.infer<typeof userSchema>;
