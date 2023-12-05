import { CourseCreate, CourseRead } from "../interfaces";
import { courseService } from "../services";
import { Request, Response } from "express";

const createCourse = async (req: Request, res: Response): Promise<Response> => {
  const course: CourseCreate = await courseService.createCourse(req.body);
  return res.status(201).json(course);
};

const readCourse = async (req: Request, res: Response): Promise<Response> => {
  const courses: CourseRead = await courseService.readCourse();
  return res.status(200).json(courses);
};

const addUser = async (req: Request, res: Response): Promise<Response> => {
  const { courseId, userId } = req.params;

  await courseService.addUser(courseId, userId);

  return res
    .status(201)
    .json({ message: "User successfully vinculed to course" });
};

const inactivate = async (req: Request, res: Response): Promise<Response> => {
  const { courseId, userId } = req.params;
  await courseService.inactivate(courseId, userId);

  return res.status(204).json();
};

const readCourseAndUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const usersAndCourses = await courseService.readCourseAndusers(req.params.id);

  return res.status(200).json(usersAndCourses);
};

export default { createCourse, readCourse, addUser, inactivate, readCourseAndUsers };
