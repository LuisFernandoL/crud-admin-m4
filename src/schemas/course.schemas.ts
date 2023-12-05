import { string } from "pg-format";
import { number, z } from "zod";

const courseSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(15),
  description: z.string().min(1),
});

const courseCreateSchema = courseSchema.omit({ id: true });
const courseReadSchema = courseSchema.array();

const courseAddUserSchema = z.object({
  id: z.number().positive(),
  active: z.boolean().default(false),
  userId: z.number().positive(),
  courseId: z.number().positive(),
});

export {
  courseSchema,
  courseCreateSchema,
  courseReadSchema,
  courseAddUserSchema,
};
