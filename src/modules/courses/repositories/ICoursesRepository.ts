import { Course } from '@prisma/client';
import { CreateCourseDTO } from '../dtos/CreateCourseDTO';

export interface ICoursesRepository {
  all(): Promise<Course[]>;
  create(data: CreateCourseDTO): Promise<Course>;
  findById(id: string): Promise<Course | undefined>;
  save(course: Course): Promise<Course | undefined>;
  remove(id: string): Promise<void>;
}
