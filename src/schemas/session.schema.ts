import { z } from "zod";
import { userSchema } from "./user.schema";

const sessionSchemaLogin = userSchema.pick({
  email: true,
  password: true,
});
export { sessionSchemaLogin };
