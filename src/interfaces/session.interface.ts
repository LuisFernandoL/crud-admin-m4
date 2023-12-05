import { z } from "zod";
import { sessionSchemaLogin } from "../schemas";

type SessionCreate = z.infer<typeof sessionSchemaLogin>;
type SessionReturn = { token: string}

export {SessionCreate, SessionReturn}
