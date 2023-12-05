import { z } from "zod";

const userSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(50),
  email: z.string().email().max(50),
  password: z.string().max(120),
  admin: z.boolean().default(false),
});

const userSchemaCreate = userSchema.omit({ id: true });
const userSchemaUpdate = userSchema.partial();

const userReturnSchema = userSchema.omit({ password: true });
const userReadSchema = userReturnSchema.array();

export {
  userSchema,
  userSchemaCreate,
  userSchemaUpdate,
  userReturnSchema,
  userReadSchema,
};
