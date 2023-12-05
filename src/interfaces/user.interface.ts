import { QueryResult } from "pg";
import {
  userReadSchema,
  userReturnSchema,
  userSchema,
  userSchemaCreate,
  userSchemaUpdate,
} from "../schemas";
import { z } from "zod";

type User = z.infer<typeof userSchema>;

type UserCreate = z.infer<typeof userSchemaCreate>;
type UserRead = z.infer<typeof userReadSchema>;
type UserUpdate = z.infer<typeof userSchemaUpdate>;

type UserReturn = z.infer<typeof userReturnSchema>;
type UserResult = QueryResult<User>;

export { User, UserCreate, UserRead, UserUpdate, UserResult, UserReturn };
